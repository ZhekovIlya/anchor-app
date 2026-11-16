import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { updateProgress } from '../server/progress.js';
import { USERS_KEY, settingsKey } from '../server/bot.js';
import { sendDailyNudges, createCronNudgeHandler } from '../server/api-cron-nudge.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { TelegramError } from '../server/telegram.js';
import { createFakeTelegram } from './fake-telegram.js';

const NOW = Date.parse('2026-11-02T17:00:00Z');
const HOUR = 3600000;
const CRON_SECRET = 'test-cron-secret';

const index = buildWordIndex([{ id: 't1', title: 'T', lessons: [{ id: 'a', title: 'A', words: [
  { es: 'uno', ru: 'один', uk: 'один', meta: { id: 'a_w0' } },
  { es: 'dos', ru: 'два', uk: 'два', meta: { id: 'a_w1' } },
] }] }]);

async function setup() {
  const config = readConfig({ ALLOWED_TELEGRAM_IDS: '111,222,333,444', CRON_SECRET });
  const store = createMemoryStore({ now: () => NOW });
  const telegram = createFakeTelegram();
  const due = { a_w0: { bucket: 0, dueDate: NOW - HOUR }, a_w1: { bucket: 1, dueDate: NOW - 2 * HOUR } };
  // 111: 2 due → nudged · 222: practised today · 333: reminder off · 444: nothing due · 999: not allowlisted
  for (const id of ['111', '222', '333', '444', '999']) await store.sadd(USERS_KEY, id);
  await updateProgress(store, '111', (doc) => { doc.srs.words = due; });
  await updateProgress(store, '222', (doc) => { doc.srs.words = due; doc.activity['2026-11-02'] = true; });
  await updateProgress(store, '333', (doc) => { doc.srs.words = due; });
  await store.setJSON(settingsKey('333'), { nudge: false });
  await updateProgress(store, '444', (doc) => { doc.srs.words = { a_w0: { bucket: 2, dueDate: NOW + HOUR } }; });
  await updateProgress(store, '999', (doc) => { doc.srs.words = due; });
  return { config, store, telegram, now: () => NOW, index };
}

describe('daily nudge', () => {
  test('only users with due words, the reminder on and no activity today', async () => {
    const ctx = await setup();
    assert.deepEqual(await sendDailyNudges(ctx), { sent: 1, skipped: 4, failed: 0 });
    const message = ctx.telegram.last('sendMessage');
    assert.equal(message.chat_id, '111');
    assert.match(message.text, /2 words due/);
    assert.equal(message.reply_markup.inline_keyboard[0][0].callback_data, 'r:n');
  });

  test('a second run on the same day sends nothing', async () => {
    const ctx = await setup();
    await sendDailyNudges(ctx);
    assert.deepEqual(await sendDailyNudges(ctx), { sent: 0, skipped: 5, failed: 0 });
    assert.equal(ctx.telegram.of('sendMessage').length, 1);
  });

  test('a user who blocked the bot does not stop the others', async () => {
    const ctx = await setup();
    await updateProgress(ctx.store, '444', (doc) => { doc.srs.words.a_w0.dueDate = NOW - HOUR; });
    const send = ctx.telegram.sendMessage;
    ctx.telegram.sendMessage = async (chatId, ...rest) => {
      if (chatId === '111') throw new TelegramError('sendMessage', 'Forbidden: bot was blocked by the user', 403);
      return send(chatId, ...rest);
    };
    const original = console.error;
    console.error = () => {};
    try {
      assert.deepEqual(await sendDailyNudges(ctx), { sent: 1, skipped: 3, failed: 1 });
    } finally {
      console.error = original;
    }
    assert.equal(ctx.telegram.last('sendMessage').chat_id, '444');
  });
});

describe('/api/cron-nudge', () => {
  const get = (token) => new Request('https://anchor.test/api/cron-nudge', { headers: token ? { Authorization: `Bearer ${token}` } : {} });

  test('requires the cron secret', async () => {
    const ctx = await setup();
    const handler = createCronNudgeHandler(ctx);
    assert.equal((await handler(get())).status, 401);
    assert.equal((await handler(get('wrong'))).status, 401);
    assert.equal((await handler(new Request('https://anchor.test/api/cron-nudge', { method: 'POST' }))).status, 405);
    assert.equal(ctx.telegram.calls.length, 0);
    const response = await handler(get(CRON_SECRET));
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { sent: 1, skipped: 4, failed: 0 });
  });

  test('refuses to run without CRON_SECRET', async () => {
    const ctx = await setup();
    const handler = createCronNudgeHandler({ ...ctx, config: readConfig({ ALLOWED_TELEGRAM_IDS: '111' }) });
    assert.equal((await handler(get(''))).status, 503);
  });

  test('vercel.json schedules it daily at 17:00 UTC', () => {
    const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
    assert.deepEqual(vercel.crons, [{ path: '/api/cron-nudge', schedule: '0 17 * * *' }]);
  });
});
