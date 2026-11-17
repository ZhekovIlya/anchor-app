// Self-review (checklist 5.4): every entry point enforces its gate, inputs are
// bounded, and button data can't be used to act on someone else's state.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { issueToken, createLinkCode, getLinkCode } from '../server/auth.js';
import { createSyncHandler } from '../server/api-sync.js';
import { createTelegramHandler } from '../server/api-telegram.js';
import { createBot } from '../server/bot.js';
import { getSession } from '../server/reels.js';
import { loadProgress } from '../server/progress.js';
import { createSyncClient } from '../src/web/sync-client.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { createFakeTelegram } from './fake-telegram.js';

const ALICE = { id: 111, username: 'alice' };
const BOB = { id: 222, username: 'bob' };     // allowlisted too
const EVE = { id: 999, username: 'eve' };     // not allowlisted

const index = buildWordIndex([{ id: 't1', title: 'T', lessons: [{ id: 'a', title: 'A', words: [
  { es: 'uno', ru: 'один', uk: 'один', meta: { id: 'a_w0' } },
  { es: 'dos', ru: 'два', uk: 'два', meta: { id: 'a_w1' } },
] }] }]);

function world() {
  const config = readConfig({ ALLOWED_TELEGRAM_IDS: '111,222', TELEGRAM_WEBHOOK_SECRET: 'secret-secret-secret', TELEGRAM_BOT_USERNAME: 'B' });
  const store = createMemoryStore();
  const telegram = createFakeTelegram();
  const bot = createBot({ config, store, telegram, now: Date.now, index });
  const tap = (from, data) => bot.handleUpdate({ callback_query: { id: 'q', from, data, message: { message_id: 100, chat: { id: from.id, type: 'private' } } } });
  const say = (from, text) => bot.handleUpdate({ message: { from, chat: { id: from.id, type: 'private' }, text } });
  return { config, store, telegram, bot, tap, say };
}

describe('gates on every entry point', () => {
  test('/api/sync: a token of a user removed from the allowlist is refused', async () => {
    const w = world();
    const token = await issueToken(w.store, '111');
    const handler = createSyncHandler({ config: readConfig({ ALLOWED_TELEGRAM_IDS: '222' }), store: w.store, now: Date.now });
    const response = await handler(new Request('https://a.test/api/sync', { headers: { Authorization: `Bearer ${token}` } }));
    assert.equal(response.status, 403);
  });

  test('/api/sync: oversized bodies are rejected from Content-Length alone', async () => {
    const w = world();
    const token = await issueToken(w.store, '111');
    const handler = createSyncHandler({ config: w.config, store: w.store, now: Date.now });
    const big = JSON.stringify({ doc: { completions: { x: 1 }, pad: 'x'.repeat(1024 * 1024) } });
    const response = await handler(new Request('https://a.test/api/sync', {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: big,
    }));
    assert.equal(response.status, 413);
    assert.deepEqual((await loadProgress(w.store, '111')).completions, {});
  });

  test('/api/telegram: oversized updates are rejected', async () => {
    const w = world();
    const handler = createTelegramHandler({ ...w, bot: { handleUpdate: async () => assert.fail('must not run') } });
    const response = await handler(new Request('https://a.test/api/telegram', {
      method: 'POST',
      headers: { 'X-Telegram-Bot-Api-Secret-Token': 'secret-secret-secret', 'Content-Type': 'application/json' },
      body: JSON.stringify({ pad: 'x'.repeat(300 * 1024) }),
    }));
    assert.equal(response.status, 413);
  });

  test('a stranger cannot confirm a link code', async () => {
    const w = world();
    const { code } = await createLinkCode(w.store);
    await w.tap(EVE, `lk:${code}`);
    assert.equal((await getLinkCode(w.store, code)).status, 'pending');
    await w.say(EVE, `/link ${code}`);
    assert.match(w.telegram.last('sendMessage').text, /Your Telegram ID is/);
  });
});

describe('button data can only touch the tapping user\'s own state', () => {
  test('Bob replaying Alice\'s card buttons does nothing to Alice', async () => {
    const w = world();
    await w.say(ALICE, '/reels');
    const know = w.telegram.last('sendMessage').reply_markup.inline_keyboard[0][1].callback_data; // Got it
    await w.tap(BOB, know);
    assert.equal(w.telegram.last('answerCallbackQuery').text, 'This card is no longer active');
    assert.equal((await getSession(w.store, '111')).pos, 0);
    assert.deepEqual((await loadProgress(w.store, '111')).srs.words, {});
    assert.deepEqual((await loadProgress(w.store, '222')).srs.words, {});
  });

  test('forged or garbage callback data is answered and ignored', async () => {
    const w = world();
    await w.say(ALICE, '/reels');
    w.telegram.reset();
    for (const data of ['r:k:../../x:0', 'r:s:AAAAAA:99999', 'q:AAAAAA:0:9', 'q:../../x:0:0', 's:size:1000', 's:lang:<b>', 't:__proto__', 'lk:short', 'x'.repeat(300), '']) {
      await w.tap(ALICE, data);
    }
    assert.ok(w.telegram.calls.every((c) => c.method === 'answerCallbackQuery'), 'only answers, no edits or sends');
    const settings = await w.store.getJSON('anchor:u:111:settings');
    assert.equal(settings, null);
    assert.equal((await getSession(w.store, '111')).pos, 0);
  });
});

describe('web client', () => {
  test('refuses a deep link that does not point at Telegram', async () => {
    const storage = { getItem: () => null, setItem() {}, removeItem() {} };
    const client = createSyncClient({
      storage, lessonIds: [],
      fetch: async () => Response.json({ code: 'A'.repeat(22), deepLink: 'https://evil.example/phish', expiresIn: 600 }),
    });
    await assert.rejects(client.startLink(), /Unexpected server response/);
  });
});
