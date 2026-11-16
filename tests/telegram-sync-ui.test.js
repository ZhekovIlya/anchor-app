import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { formatSyncAge, describeSyncState } from '../src/web/telegram-sync-ui.js';
import { createSyncClient } from '../src/web/sync-client.js';
import { SYNC_AUTH_KEY, SYNC_META_KEY } from '../src/core/sync-local.js';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { claimLinkCode, verifyToken } from '../server/auth.js';
import { createLinkHandler } from '../server/api-link.js';

const NOW = Date.parse('2026-11-02T12:00:00Z');
const MIN = 60000;

function fakeStorage() {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
  };
}

describe('sync status text', () => {
  test('formatSyncAge', () => {
    assert.equal(formatSyncAge(null, NOW), 'never');
    assert.equal(formatSyncAge(NOW - 20000, NOW), 'just now');
    assert.equal(formatSyncAge(NOW - 5 * MIN, NOW), '5 min ago');
    assert.equal(formatSyncAge(NOW - 3 * 60 * MIN, NOW), '3 h ago');
    assert.equal(formatSyncAge(NOW - 24 * 60 * MIN, NOW), '1 day ago');
    assert.equal(formatSyncAge(NOW - 72 * 60 * MIN, NOW), '3 days ago');
    assert.equal(formatSyncAge(NOW + MIN, NOW), 'just now', 'clock skew');
  });

  test('describeSyncState', () => {
    const user = { username: 'alice', firstName: 'Alice' };
    assert.equal(describeSyncState({ user, lastSyncAt: NOW - 2 * MIN }, NOW), 'Connected as @alice · synced 2 min ago');
    assert.equal(describeSyncState({ user: { firstName: 'Alice' }, syncing: true }, NOW), 'Connected as Alice · syncing…');
    assert.equal(describeSyncState({ user: null, lastError: 'offline' }, NOW), 'Connected as your Telegram account · last sync failed (offline)');
  });
});

describe('link flow from the browser', () => {
  function setup({ botUsername = 'AnchorTestBot' } = {}) {
    const store = createMemoryStore();
    const config = readConfig({ ALLOWED_TELEGRAM_IDS: '111', TELEGRAM_BOT_USERNAME: botUsername });
    const handler = createLinkHandler({ config, store, now: Date.now });
    const storage = fakeStorage();
    const statuses = [];
    const client = createSyncClient({
      storage, lessonIds: [], onStatus: (s) => statuses.push(s),
      fetch: async (url, init) => handler(new Request(`https://anchor.test${url}`, init)),
    });
    return { store, storage, client, statuses };
  }

  test('connect → confirm in the bot → poll stores the token → disconnect revokes it', async () => {
    const { store, storage, client, statuses } = setup();
    const { code, deepLink } = await client.startLink();
    assert.equal(deepLink, `https://t.me/AnchorTestBot?start=link_${code}`);
    assert.equal(await client.pollLink(code), 'pending');
    assert.equal(client.getState().linked, false);

    await claimLinkCode(store, code, { id: 111, username: 'alice', first_name: 'Alice' });
    assert.equal(await client.pollLink(code), 'ok');
    const state = client.getState();
    assert.equal(state.linked, true);
    assert.equal(state.user.username, 'alice');
    assert.equal(JSON.parse(storage.getItem(SYNC_META_KEY)).linkedAs.id, '111');
    assert.ok(statuses.some((s) => s.linked));
    const { token } = JSON.parse(storage.getItem(SYNC_AUTH_KEY));
    assert.equal(await verifyToken(store, token), '111');

    // the code is single-use
    assert.equal(await client.pollLink(code), 'expired');

    await client.disconnect();
    assert.equal(client.getState().linked, false);
    assert.equal(await verifyToken(store, token), null, 'revoked server-side');
  });

  test('cancelled and malformed codes', async () => {
    const { store, client } = setup();
    const { code } = await client.startLink();
    await claimLinkCode(store, code, { id: 111 }, false);
    assert.equal(await client.pollLink(code), 'cancelled');
    assert.equal(await client.pollLink('not-a-code'), 'expired');
  });

  test('startLink surfaces server errors as messages', async () => {
    const { client } = setup({ botUsername: '' });
    await assert.rejects(client.startLink(), /Bot is not configured/);
    const offline = createSyncClient({ storage: fakeStorage(), lessonIds: [], fetch: async () => { throw new TypeError('x'); } });
    await assert.rejects(offline.startLink(), /offline/);
    assert.equal(await offline.pollLink('A'.repeat(22)), 'error');
  });

  test('disconnect works offline (forgets locally)', async () => {
    const storage = fakeStorage();
    storage.setItem(SYNC_AUTH_KEY, JSON.stringify({ token: 'A'.repeat(43), user: {} }));
    const client = createSyncClient({ storage, lessonIds: [], fetch: async () => { throw new TypeError('x'); } });
    await client.disconnect();
    assert.equal(storage.getItem(SYNC_AUTH_KEY), null);
  });
});
