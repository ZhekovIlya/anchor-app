import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  collectLessonIds, collectLocalDoc, prepareSync, applyServerDoc, loadSyncMeta, randomDeviceId,
  SYNC_AUTH_KEY, SYNC_META_KEY, REVIEW_LESSON_IDS,
} from '../src/core/sync-local.js';
import { createSyncClient } from '../src/web/sync-client.js';
import { mergeProgress, totalXP } from '../src/core/sync-merge.js';
import { loadAllData } from '../src/core/data-loader.js';
import { createSRS } from '../src/core/srs.js';
import { createGamification } from '../src/core/gamification.js';
import { SRS_KEY_WORDS } from '../src/core/constants.js';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { issueToken } from '../server/auth.js';
import { updateProgress, loadProgress } from '../server/progress.js';
import { createSyncHandler } from '../server/api-sync.js';

const LESSONS = ['w1_l1', 'w1_l2', 'daily_review'];
const DAY = 24 * 3600 * 1000;

function fakeStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    map,
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
    json: (key) => JSON.parse(map.get(key)),
  };
}

/** Adapter so the regular engines can run on the fake storage, like localStorageAdapter. */
const adapterFor = (storage) => ({
  load: (key) => JSON.parse(storage.getItem(key) || '{}'),
  save: (key, data) => storage.setItem(key, JSON.stringify(data)),
});

function browser(initial) {
  const storage = fakeStorage(initial);
  const adapter = adapterFor(storage);
  return {
    storage,
    srs: createSRS(adapter, SRS_KEY_WORDS),
    game: createGamification(adapter),
    xp: () => storage.json('anchor_gamification').totalXP,
  };
}

describe('sync-local helpers', () => {
  test('collectLessonIds covers data lessons and review counters', () => {
    const ids = collectLessonIds(loadAllData());
    for (const id of REVIEW_LESSON_IDS) assert.ok(ids.includes(id));
    assert.ok(ids.includes('wn_l1'));
    assert.ok(ids.includes('wtf_l1'));
    assert.equal(new Set(ids).size, ids.length);
  });

  test('device ids are random-looking and never "tg"', () => {
    assert.match(randomDeviceId(), /^w_[0-9a-z]{12}$/);
    const storage = fakeStorage({ [SYNC_META_KEY]: JSON.stringify({ deviceId: 'tg' }) });
    const meta = loadSyncMeta(storage);
    assert.notEqual(meta.deviceId, 'tg');
    assert.equal(loadSyncMeta(storage).deviceId, meta.deviceId, 'persisted');
  });

  test('collectLocalDoc reads SRS, completions and gamification', () => {
    const b = browser({ w1_l1: '3', w1_l2: 'junk', other_key: '9' });
    b.srs.registerNew('wn_l1_w0');
    b.game.recordActivity();
    b.game.addXP(40);
    const doc = collectLocalDoc(b.storage, LESSONS);
    assert.equal(doc.srs.words.wn_l1_w0.bucket, 0);
    assert.deepEqual(doc.completions, { w1_l1: 3 });
    assert.equal(doc.streak.current, 1);
    assert.equal(Object.keys(doc.activity).length, 1);
    assert.deepEqual(doc.xp, {}, 'XP is reported by prepareSync only');
  });

  test('XP bookkeeping: first sync reports local XP, later syncs only the delta', () => {
    const b = browser();
    b.game.addXP(500);
    const meta = loadSyncMeta(b.storage);
    const first = prepareSync(b.storage, LESSONS, meta);
    assert.deepEqual(first.doc.xp, { [meta.deviceId]: 500 });

    // server already had 15 XP from the bot
    const server = mergeProgress({ xp: { tg: 15 } }, first.doc);
    const applied = applyServerDoc(b.storage, LESSONS, server, { meta, totalXPAtSend: first.totalXPAtSend });
    assert.equal(b.xp(), 515);
    assert.equal(applied.changed, true);
    assert.equal(applied.meta.xpBaseline, 515);
    assert.equal(applied.meta.xpContributed, 500);

    b.game.addXP(25);
    const second = prepareSync(b.storage, LESSONS, applied.meta);
    assert.deepEqual(second.doc.xp, { [meta.deviceId]: 525 });
  });

  test('XP earned while the request was in flight is kept', () => {
    const b = browser();
    b.game.addXP(100);
    const meta = loadSyncMeta(b.storage);
    const sent = prepareSync(b.storage, LESSONS, meta);
    b.game.addXP(25); // drill finished mid-request
    const server = mergeProgress({ xp: { tg: 30 } }, sent.doc);
    const { meta: next } = applyServerDoc(b.storage, LESSONS, server, { meta, totalXPAtSend: sent.totalXPAtSend });
    assert.equal(b.xp(), 155);
    assert.deepEqual(prepareSync(b.storage, LESSONS, next).doc.xp, { [meta.deviceId]: 125 });
  });

  test('apply merges instead of overwriting (in-flight SRS change, completions max)', () => {
    const b = browser({ w1_l1: '2' });
    const meta = loadSyncMeta(b.storage);
    const sent = prepareSync(b.storage, LESSONS, meta);
    const server = mergeProgress(sent.doc, {
      srs: { words: { wn_l1_w1: { bucket: 2, dueDate: 5, updatedAt: 10 } }, sentences: {} },
      completions: { w1_l1: 1, w1_l2: 4 },
    });
    b.srs.registerNew('wn_l1_w0'); // made while the request was in flight
    applyServerDoc(b.storage, LESSONS, server, { meta, totalXPAtSend: sent.totalXPAtSend });
    const words = b.storage.json(SRS_KEY_WORDS);
    assert.deepEqual(Object.keys(words).sort(), ['wn_l1_w0', 'wn_l1_w1']);
    assert.equal(b.storage.getItem('w1_l1'), '2');
    assert.equal(b.storage.getItem('w1_l2'), '4');
  });

  test('a server doc identical to local reports no change', () => {
    const b = browser({ w1_l1: '1' });
    b.game.addXP(10);
    const meta = loadSyncMeta(b.storage);
    const sent = prepareSync(b.storage, LESSONS, meta);
    const first = applyServerDoc(b.storage, LESSONS, sent.doc, { meta, totalXPAtSend: sent.totalXPAtSend });
    assert.equal(first.changed, false);
  });
});

describe('sync client against the real /api/sync handler', () => {
  function server() {
    const store = createMemoryStore();
    const context = { config: readConfig({ ALLOWED_TELEGRAM_IDS: '111' }), store, now: Date.now };
    const handler = createSyncHandler(context);
    let requests = 0;
    const fetch = async (url, init) => {
      requests++;
      return handler(new Request(`https://anchor.test${url}`, init));
    };
    return { store, fetch, requests: () => requests };
  }

  async function linkedBrowser(srv, { onChange } = {}) {
    const b = browser();
    const token = await issueToken(srv.store, '111');
    b.storage.setItem(SYNC_AUTH_KEY, JSON.stringify({ token, user: { id: '111', username: 'alice' } }));
    b.client = createSyncClient({ storage: b.storage, lessonIds: LESSONS, fetch: srv.fetch, onChange });
    return b;
  }

  test('not linked: no request at all', async () => {
    const srv = server();
    const b = browser();
    const client = createSyncClient({ storage: b.storage, lessonIds: LESSONS, fetch: srv.fetch });
    assert.deepEqual(await client.syncNow(), { status: 'unlinked' });
    assert.equal(client.getState().linked, false);
    assert.equal(srv.requests(), 0);
  });

  test('up and down: web progress reaches the server, bot progress reaches the web', async () => {
    const srv = server();
    let changes = 0;
    const b = await linkedBrowser(srv, { onChange: () => changes++ });
    b.srs.registerNew('wn_l1_w0');
    b.game.addXP(40);
    assert.equal((await b.client.syncNow()).status, 'ok');
    let remote = await loadProgress(srv.store, '111');
    assert.ok(remote.srs.words.wn_l1_w0);
    assert.equal(totalXP(remote), 40);

    // the bot promotes a word and earns XP
    await updateProgress(srv.store, '111', (doc) => {
      doc.srs.words.wn_l1_w5 = { bucket: 1, dueDate: Date.now() + DAY, updatedAt: Date.now() };
      doc.xp.tg = 15;
    });
    const result = await b.client.syncNow();
    assert.equal(result.changed, true);
    assert.equal(changes, 1);
    assert.ok(b.storage.json(SRS_KEY_WORDS).wn_l1_w5);
    assert.equal(b.xp(), 55);
    assert.ok(b.client.getState().lastSyncAt > 0);

    // syncing again changes nothing and does not inflate XP
    assert.equal((await b.client.syncNow()).changed, false);
    remote = await loadProgress(srv.store, '111');
    assert.equal(totalXP(remote), 55);
    assert.equal(b.xp(), 55);
  });

  test('two browsers converge on the same XP and words', async () => {
    const srv = server();
    const a = await linkedBrowser(srv);
    const b = await linkedBrowser(srv);
    a.game.addXP(100);
    a.srs.registerNew('wn_l1_w0');
    b.game.addXP(30);
    b.srs.registerNew('wn_l1_w1');
    await a.client.syncNow();
    await b.client.syncNow();
    await a.client.syncNow();
    assert.equal(a.xp(), 130);
    assert.equal(b.xp(), 130);
    assert.deepEqual(Object.keys(a.storage.json(SRS_KEY_WORDS)).sort(), Object.keys(b.storage.json(SRS_KEY_WORDS)).sort());
  });

  test('concurrent calls share a request; a call during a request adds one round', async () => {
    const srv = server();
    const b = await linkedBrowser(srv);
    const [one, two, three] = [b.client.syncNow(), b.client.syncNow(), b.client.syncNow()];
    assert.equal(one, two);
    assert.equal(two, three);
    await one;
    assert.equal(srv.requests(), 2);
  });

  test('a revoked token unlinks the browser', async () => {
    const srv = server();
    const b = await linkedBrowser(srv);
    b.storage.setItem(SYNC_AUTH_KEY, JSON.stringify({ token: 'A'.repeat(43) }));
    assert.deepEqual(await b.client.syncNow(), { status: 'unlinked', changed: false });
    assert.equal(b.storage.getItem(SYNC_AUTH_KEY), null);
  });

  test('network and server errors are reported, local data untouched', async () => {
    const b = browser({ w1_l1: '1' });
    b.storage.setItem(SYNC_AUTH_KEY, JSON.stringify({ token: 'A'.repeat(43) }));
    const offline = createSyncClient({ storage: b.storage, lessonIds: LESSONS, fetch: async () => { throw new TypeError('Failed to fetch'); } });
    assert.equal((await offline.syncNow()).error, 'offline');
    assert.equal(offline.getState().lastError, 'offline');
    const broken = createSyncClient({ storage: b.storage, lessonIds: LESSONS, fetch: async () => new Response('x', { status: 500 }) });
    assert.equal((await broken.syncNow()).error, 'HTTP 500');
    assert.equal(b.storage.getItem('w1_l1'), '1');
    assert.ok(b.storage.getItem(SYNC_AUTH_KEY), 'still linked');
  });

  test('auto-sync triggers: start, hidden tab (keepalive), visible after a gap only, stop', async () => {
    const srv = server();
    const b = await linkedBrowser(srv);
    const listeners = {};
    const target = () => ({ addEventListener: (type, fn) => { listeners[type] = fn; }, removeEventListener: (type) => { delete listeners[type]; } });
    const doc = { ...target(), visibilityState: 'visible' };
    const win = target();
    const calls = [];
    const settle = () => new Promise((resolve) => setTimeout(resolve, 20));
    const client = createSyncClient({
      storage: b.storage, lessonIds: LESSONS,
      fetch: async (url, init) => { calls.push(Boolean(init.keepalive)); return srv.fetch(url, init); },
    });
    const stop = client.startAutoSync({ win, doc });
    try {
      await settle();
      assert.deepEqual(calls, [false], 'synced on start');
      doc.visibilityState = 'hidden';
      listeners.visibilitychange();
      await settle();
      assert.deepEqual(calls, [false, true], 'keepalive when hidden');
      doc.visibilityState = 'visible';
      listeners.visibilitychange();
      await settle();
      assert.equal(calls.length, 2, 'visible right after a sync → skipped');
      assert.equal(typeof listeners['anchor:progress-changed'], 'function');
    } finally {
      stop();
    }
    assert.equal(listeners.visibilitychange, undefined);
    assert.equal(listeners['anchor:progress-changed'], undefined);
  });
});
