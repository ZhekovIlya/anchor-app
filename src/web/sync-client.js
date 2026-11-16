// ========================
// TELEGRAM PROGRESS SYNC — BROWSER CLIENT
// ========================
// Sends local progress to /api/sync and merges the answer back in
// (src/core/sync-local.js does the data work). Only active once this browser
// is linked to a Telegram account (anchor_sync_auth holds the bearer token).
// Triggers: app start, tab hidden (keepalive) / visible again, every 5 min,
// shortly after a drill ends (`anchor:progress-changed` event), "Sync now".

import {
  SYNC_AUTH_KEY, loadSyncMeta, saveSyncMeta, prepareSync, applyServerDoc,
} from '../core/sync-local.js';

export const PROGRESS_CHANGED_EVENT = 'anchor:progress-changed';
const AUTO_SYNC_INTERVAL_MS = 5 * 60 * 1000;
const VISIBLE_RESYNC_GAP_MS = 60 * 1000;
const CHANGE_DEBOUNCE_MS = 2000;
const KEEPALIVE_MAX_BYTES = 60 * 1024; // browsers cap keepalive bodies at 64 KB

/**
 * Tell the sync client that local progress changed (e.g. a drill ended).
 */
export function notifyProgressChanged() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(PROGRESS_CHANGED_EVENT));
}

/**
 * @param {Object} options
 * @param {Object} options.storage - localStorage (or a fake with getItem/setItem/removeItem)
 * @param {string[]} options.lessonIds - collectLessonIds(loadAllData())
 * @param {Function} [options.fetch]
 * @param {Function} [options.onChange] - called after a sync changed local data
 * @param {Function} [options.onStatus] - called with getState() whenever it changes
 * @param {Function} [options.now]
 * @param {string} [options.apiBase=''] - same origin by default
 */
export function createSyncClient({
  storage, lessonIds, fetch: fetchImpl = globalThis.fetch && globalThis.fetch.bind(globalThis),
  onChange = () => {}, onStatus = () => {}, now = Date.now, apiBase = '',
}) {
  let inflight = null;
  let again = false;
  let syncing = false;
  let lastError = null;

  function getAuth() {
    try {
      const auth = JSON.parse(storage.getItem(SYNC_AUTH_KEY) || 'null');
      return auth && typeof auth.token === 'string' ? auth : null;
    } catch (e) {
      return null;
    }
  }

  function getState() {
    const auth = getAuth();
    const meta = loadSyncMeta(storage);
    return { linked: Boolean(auth), user: auth ? auth.user || null : null, lastSyncAt: meta.lastSyncAt, syncing, lastError };
  }

  const emit = () => onStatus(getState());

  function forgetAuth() {
    storage.removeItem(SYNC_AUTH_KEY);
    const meta = loadSyncMeta(storage);
    saveSyncMeta(storage, { ...meta, linkedAs: null });
  }

  async function runOnce({ keepalive }) {
    const auth = getAuth();
    if (!auth) return { status: 'unlinked' };
    const meta = loadSyncMeta(storage);
    const { doc, totalXPAtSend } = prepareSync(storage, lessonIds, meta);
    const body = JSON.stringify({ doc });
    let response;
    try {
      response = await fetchImpl(`${apiBase}/api/sync`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}`, 'Content-Type': 'application/json' },
        body,
        keepalive: keepalive && body.length < KEEPALIVE_MAX_BYTES,
      });
    } catch (error) {
      return { status: 'error', error: 'offline' };
    }
    if (response.status === 401) {
      forgetAuth();
      return { status: 'unlinked' };
    }
    if (!response.ok) return { status: 'error', error: `HTTP ${response.status}` };
    let payload;
    try {
      payload = await response.json();
    } catch (e) {
      return { status: 'error', error: 'bad response' };
    }
    const { changed } = applyServerDoc(storage, lessonIds, payload.doc, { meta, totalXPAtSend, now: now() });
    return { status: 'ok', changed };
  }

  /**
   * Sync now. Concurrent calls share one request; a call made while a request
   * is running schedules exactly one more round afterwards.
   * @returns {Promise<{ status: 'ok'|'unlinked'|'error', changed?: boolean, error?: string }>}
   */
  function syncNow({ keepalive = false } = {}) {
    if (!getAuth()) return Promise.resolve({ status: 'unlinked' });
    if (inflight) {
      again = true;
      return inflight;
    }
    syncing = true;
    emit();
    inflight = (async () => {
      let result;
      let anyChange = false;
      do {
        again = false;
        result = await runOnce({ keepalive });
        if (result.changed) anyChange = true;
      } while (again && result.status === 'ok');
      return { ...result, changed: anyChange };
    })().then((result) => {
      inflight = null;
      syncing = false;
      lastError = result.status === 'error' ? result.error : null;
      if (result.changed) onChange();
      emit();
      return result;
    });
    return inflight;
  }

  /**
   * Wire the automatic triggers. Safe to call when not linked (syncs are no-ops).
   * @returns {Function} stop
   */
  function startAutoSync({ win = typeof window !== 'undefined' ? window : null, doc = typeof document !== 'undefined' ? document : null } = {}) {
    if (!win || !doc) return () => {};
    let debounce = null;
    const onVisibility = () => {
      if (doc.visibilityState === 'hidden') {
        syncNow({ keepalive: true });
      } else {
        const { lastSyncAt } = loadSyncMeta(storage);
        if (!lastSyncAt || now() - lastSyncAt > VISIBLE_RESYNC_GAP_MS) syncNow();
      }
    };
    const onProgress = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => syncNow(), CHANGE_DEBOUNCE_MS);
    };
    const timer = setInterval(() => {
      if (doc.visibilityState !== 'hidden') syncNow();
    }, AUTO_SYNC_INTERVAL_MS);
    doc.addEventListener('visibilitychange', onVisibility);
    win.addEventListener(PROGRESS_CHANGED_EVENT, onProgress);
    syncNow();
    return () => {
      clearInterval(timer);
      clearTimeout(debounce);
      doc.removeEventListener('visibilitychange', onVisibility);
      win.removeEventListener(PROGRESS_CHANGED_EVENT, onProgress);
    };
  }

  // ========================
  // LINKING (see server/api-link.js)
  // ========================

  /**
   * Ask the server for a one-time code + Telegram deep link.
   * @returns {Promise<{ code: string, deepLink: string, expiresIn: number }>}
   * @throws {Error} with a user-readable message
   */
  async function startLink() {
    let response;
    try {
      response = await fetchImpl(`${apiBase}/api/link`, { method: 'POST' });
    } catch (e) {
      throw new Error('You are offline.');
    }
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || `Server error (HTTP ${response.status})`);
    // Only ever send the user to Telegram itself
    if (typeof payload.deepLink !== 'string' || !payload.deepLink.startsWith('https://t.me/')) throw new Error('Unexpected server response.');
    return payload;
  }

  /**
   * Check a code once. On 'ok' the token is stored and this browser is linked.
   * @returns {Promise<'pending'|'cancelled'|'expired'|'ok'|'error'>}
   */
  async function pollLink(code) {
    let response;
    try {
      response = await fetchImpl(`${apiBase}/api/link?code=${encodeURIComponent(code)}`);
    } catch (e) {
      return 'error';
    }
    if (!response.ok) return response.status === 400 ? 'expired' : 'error';
    const payload = await response.json().catch(() => ({}));
    if (payload.status !== 'ok') return ['pending', 'cancelled', 'expired'].includes(payload.status) ? payload.status : 'error';
    storage.setItem(SYNC_AUTH_KEY, JSON.stringify({ token: payload.token, user: payload.user }));
    saveSyncMeta(storage, { ...loadSyncMeta(storage), linkedAs: payload.user });
    emit();
    return 'ok';
  }

  /**
   * Revoke this browser's token on the server (best effort) and forget it.
   */
  async function disconnect() {
    const auth = getAuth();
    if (auth) {
      try {
        await fetchImpl(`${apiBase}/api/link`, { method: 'DELETE', headers: { Authorization: `Bearer ${auth.token}` } });
      } catch (e) {
        // offline: the token stays valid until /disconnect in the bot
      }
    }
    forgetAuth();
    emit();
  }

  return { syncNow, startAutoSync, getState, getAuth, forgetAuth, startLink, pollLink, disconnect };
}
