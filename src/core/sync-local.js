// ========================
// PROGRESS SYNC — LOCAL SIDE
// ========================
// Pure logic — no DOM, no browser APIs.
// Converts the app's local storage (a Storage-like { getItem, setItem }, i.e.
// localStorage in the browser, a Map-backed fake in tests) to a progress doc and
// back. Lesson completions are raw counters keyed by lesson id; SRS pools and
// gamification are JSON blobs.
//
// XP bookkeeping (anchor_sync_meta): the server keeps XP as a per-device
// G-counter. Locally the app only knows its own running totalXP, so we track
//   xpContributed — what this device has reported so far (its counter value)
//   xpBaseline    — the merged total we wrote into totalXP at the last sync
// and report xpContributed + (totalXP − xpBaseline) on the next sync.

import { SRS_KEY_WORDS, SRS_KEY_SENTENCES } from './constants.js';
import { GAMIFICATION_KEY } from './gamification.js';
import { emptyProgress, mergeProgress, normalizeProgress, progressEquals, totalXP } from './sync-merge.js';

export const SYNC_META_KEY = 'anchor_sync_meta';
export const SYNC_AUTH_KEY = 'anchor_sync_auth';

/** Synthetic lessons whose completion counters live next to the data lessons (see main.js). */
export const REVIEW_LESSON_IDS = ['daily_review', 'mistakes_review', 'word_daily_review', 'word_mistakes_review'];

function readJSON(storage, key) {
  try {
    const value = JSON.parse(storage.getItem(key) || 'null');
    return value && typeof value === 'object' ? value : null;
  } catch (e) {
    return null;
  }
}

const samePool = (a, b) => progressEquals({ srs: { words: a } }, { srs: { words: b } });

function writeJSON(storage, key, value) {
  storage.setItem(key, JSON.stringify(value));
}

/**
 * Every completion counter key the app may write.
 * @param {Object} data - loadAllData() result
 * @returns {string[]}
 */
export function collectLessonIds(data) {
  const ids = new Set(REVIEW_LESSON_IDS);
  for (const topic of [...(data.sentences || []), ...(data.words || [])]) {
    for (const lesson of topic.lessons || []) ids.add(lesson.id);
  }
  return [...ids];
}

/**
 * @param {Function} [random] - returns a float in [0, 1)
 */
export function randomDeviceId(random = Math.random) {
  let id = 'w_';
  for (let i = 0; i < 12; i++) id += Math.floor(random() * 36).toString(36);
  return id;
}

/**
 * Sync bookkeeping, created on first use.
 * @returns {{ deviceId: string, xpContributed: number, xpBaseline: number, lastSyncAt: number|null, linkedAs: Object|null }}
 */
export function loadSyncMeta(storage, { random } = {}) {
  const raw = readJSON(storage, SYNC_META_KEY) || {};
  const meta = {
    deviceId: typeof raw.deviceId === 'string' && /^[\w-]{3,40}$/.test(raw.deviceId) && raw.deviceId !== 'tg'
      ? raw.deviceId : randomDeviceId(random),
    xpContributed: Number.isFinite(raw.xpContributed) && raw.xpContributed >= 0 ? raw.xpContributed : 0,
    xpBaseline: Number.isFinite(raw.xpBaseline) && raw.xpBaseline >= 0 ? raw.xpBaseline : 0,
    lastSyncAt: Number.isFinite(raw.lastSyncAt) ? raw.lastSyncAt : null,
    linkedAs: raw.linkedAs && typeof raw.linkedAs === 'object' ? raw.linkedAs : null,
  };
  if (raw.deviceId !== meta.deviceId) writeJSON(storage, SYNC_META_KEY, meta);
  return meta;
}

export function saveSyncMeta(storage, meta) {
  writeJSON(storage, SYNC_META_KEY, meta);
}

function localTotalXP(storage) {
  const state = readJSON(storage, GAMIFICATION_KEY);
  return state && Number.isFinite(state.totalXP) ? state.totalXP : 0;
}

/**
 * Local progress as a doc. XP is left out unless `xp` is given (the caller
 * decides what this device reports).
 * @param {Object} storage - { getItem, setItem }
 * @param {string[]} lessonIds - from collectLessonIds
 * @param {Object} [xp] - { [deviceId]: number }
 */
export function collectLocalDoc(storage, lessonIds, xp = {}) {
  const doc = emptyProgress();
  doc.srs.words = readJSON(storage, SRS_KEY_WORDS) || {};
  doc.srs.sentences = readJSON(storage, SRS_KEY_SENTENCES) || {};
  for (const id of lessonIds) {
    const count = parseInt(storage.getItem(id) || '0', 10);
    if (count > 0) doc.completions[id] = count;
  }
  const game = readJSON(storage, GAMIFICATION_KEY) || {};
  doc.activity = game.activityLog || {};
  doc.streak = game.streak || doc.streak;
  doc.xp = xp;
  return normalizeProgress(doc);
}

/**
 * What to send to POST /api/sync.
 * @returns {{ doc: Object, totalXPAtSend: number }}
 */
export function prepareSync(storage, lessonIds, meta) {
  const totalXPAtSend = localTotalXP(storage);
  const earned = Math.max(0, totalXPAtSend - meta.xpBaseline);
  const doc = collectLocalDoc(storage, lessonIds, { [meta.deviceId]: meta.xpContributed + earned });
  return { doc, totalXPAtSend };
}

/**
 * Write the server's doc into local storage. Never overwrites: the local state
 * *now* (which may include taps made while the request was in flight) is merged
 * with the server doc and the merge is written.
 * @param {Object} serverDoc - doc returned by /api/sync (already contains our XP)
 * @param {Object} params
 * @param {Object} params.meta - sync meta used for this request
 * @param {number} params.totalXPAtSend - from prepareSync
 * @param {number} [params.now]
 * @returns {{ changed: boolean, meta: Object, doc: Object }} changed = local data differs from before
 */
export function applyServerDoc(storage, lessonIds, serverDoc, { meta, totalXPAtSend, now = Date.now() }) {
  const server = normalizeProgress(serverDoc);
  const local = collectLocalDoc(storage, lessonIds);
  const merged = mergeProgress(local, { ...server, xp: {} });

  if (!samePool(merged.srs.words, local.srs.words)) writeJSON(storage, SRS_KEY_WORDS, merged.srs.words);
  if (!samePool(merged.srs.sentences, local.srs.sentences)) writeJSON(storage, SRS_KEY_SENTENCES, merged.srs.sentences);
  for (const [id, count] of Object.entries(merged.completions)) {
    if ((local.completions[id] || 0) < count) storage.setItem(id, String(count));
  }

  const xpTotal = totalXP(server);
  const totalXPNow = localTotalXP(storage);
  const inflight = Math.max(0, totalXPNow - totalXPAtSend);
  const nextTotalXP = xpTotal + inflight;
  const game = readJSON(storage, GAMIFICATION_KEY) || {};
  writeJSON(storage, GAMIFICATION_KEY, {
    ...game,
    totalXP: nextTotalXP,
    streak: { ...merged.streak },
    activityLog: { ...merged.activity },
  });

  const nextMeta = {
    ...meta,
    xpBaseline: xpTotal,
    xpContributed: server.xp[meta.deviceId] || 0,
    lastSyncAt: now,
  };
  saveSyncMeta(storage, nextMeta);

  const changed = !progressEquals({ ...merged, xp: {} }, { ...local, xp: {} }) || nextTotalXP !== totalXPNow;
  return { changed, meta: nextMeta, doc: merged };
}
