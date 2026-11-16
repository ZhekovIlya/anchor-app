import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { loadProgress } from '../server/progress.js';
import { createLinkCode, redeemLinkCode, issueToken, verifyToken } from '../server/auth.js';
import { createBot, parseCommand, parseSettingsCallback, getSettings, USERS_KEY } from '../server/bot.js';
import { createTelegramHandler } from '../server/api-telegram.js';
import { getSession } from '../server/reels.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { createFakeTelegram } from './fake-telegram.js';

const ALICE = { id: 111, username: 'alice', first_name: 'Alice' };
const MALLORY = { id: 999, username: 'mallory', first_name: 'M' };
const SECRET = 'test-webhook-secret';

function tinyIndex() {
  return buildWordIndex([
    { id: 't1', title: 'Colores', lessons: [{ id: 'a', title: 'A', words: [
      { es: 'rojo', ru: 'красный', uk: 'червоний', meta: { id: 'a_w0' } },
      { es: 'azul', ru: 'синий', uk: 'синій', meta: { id: 'a_w1' } },
    ] }] },
    { id: 't2', title: 'Números', lessons: [{ id: 'b', title: 'B', words: [
      { es: 'uno', ru: 'один', uk: 'один', meta: { id: 'b_w0' } },
    ] }] },
  ]);
}

function setup({ index = tinyIndex(), appWords = false } = {}) {
  const config = readConfig({ ALLOWED_TELEGRAM_IDS: '111', TELEGRAM_WEBHOOK_SECRET: SECRET, TELEGRAM_BOT_USERNAME: 'AnchorTestBot' });
  const store = createMemoryStore();
  const telegram = createFakeTelegram();
  const ctx = { config, store, telegram, now: Date.now, index: appWords ? undefined : index };
  const bot = createBot(ctx);
  let updateId = 1;
  let callbackId = 1;
  return {
    ...ctx,
    bot,
    send(text, from = ALICE) {
      return bot.handleUpdate({ update_id: updateId++, message: { message_id: updateId, from, chat: { id: from.id, type: 'private' }, text } });
    },
    tap(data, messageId, from = ALICE) {
      return bot.handleUpdate({
        update_id: updateId++,
        callback_query: { id: String(callbackId++), from, data, message: { message_id: messageId, chat: { id: from.id, type: 'private' } } },
      });
    },
  };
}

/** callback_data of the button with this label in a sent/edited message */
function button(call, label) {
  const found = call.reply_markup.inline_keyboard.flat().find((b) => b.text.includes(label));
  assert.ok(found, `button ${label}`);
  return found.callback_data;
}

describe('bot helpers', () => {
  test('parseCommand', () => {
    assert.deepEqual(parseCommand('/start link_abc'), { command: 'start', arg: 'link_abc' });
    assert.deepEqual(parseCommand('/Reels@AnchorTestBot'), { command: 'reels', arg: '' });
    assert.equal(parseCommand('hola'), null);
    assert.equal(parseCommand(undefined), null);
  });

  test('parseSettingsCallback validates values', () => {
    assert.deepEqual(parseSettingsCallback('s:lang:uk'), { lang: 'uk' });
    assert.deepEqual(parseSettingsCallback('s:size:20'), { size: 20 });
    assert.deepEqual(parseSettingsCallback('s:nudge:off'), { nudge: false });
    for (const bad of ['s:lang:en', 's:size:13', 's:nudge:maybe', 's:admin:1', 'x']) assert.equal(parseSettingsCallback(bad), null);
  });
});

describe('bot allowlist', () => {
  test('a stranger gets their id and nothing is stored', async () => {
    const t = setup();
    await t.send('/start', MALLORY);
    assert.match(t.telegram.last('sendMessage').text, /Your Telegram ID is <code>999<\/code>/);
    assert.deepEqual(await t.store.smembers(USERS_KEY), []);
    assert.equal(await t.store.getJSON('anchor:u:999:settings'), null);

    await t.tap('r:n', 5, MALLORY);
    assert.equal(t.telegram.last('answerCallbackQuery').show_alert, true);
    assert.equal(t.telegram.of('sendMessage').length, 1);
    assert.equal(await getSession(t.store, '999'), null);
  });

  test('group chats are ignored', async () => {
    const t = setup();
    await t.bot.handleUpdate({ message: { from: ALICE, chat: { id: -5, type: 'group' }, text: '/reels' } });
    assert.equal(t.telegram.calls.length, 0);
  });
});

describe('bot flows', () => {
  test('/start registers the user and shows help', async () => {
    const t = setup();
    await t.send('/start');
    assert.deepEqual(await t.store.smembers(USERS_KEY), ['111']);
    assert.deepEqual(await getSettings(t.store, '111'), { lang: 'ru', size: 12, nudge: true, username: 'alice', firstName: 'Alice' });
    const help = t.telegram.last('sendMessage');
    assert.match(help.text, /\/reels/);
    assert.equal(button(help, 'Start reels'), 'r:n');
  });

  test('full reels session: reveal, again, know until the summary', async () => {
    const t = setup();
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    assert.match(card.text, /🇪🇸 <b>rojo<\/b>\n<tg-spoiler>красный<\/tg-spoiler>/);
    const messageId = 100;
    assert.equal((await getSession(t.store, '111')).messageId, messageId);

    await t.tap(button(card, 'Reveal'), messageId);
    let edited = t.telegram.last('editMessageText');
    assert.equal(edited.message_id, messageId);
    assert.match(edited.text, /🇷🇺 красный\n🇺🇦 червоний/);

    await t.tap(button(edited, 'Again'), messageId);
    edited = t.telegram.last('editMessageText');
    assert.match(edited.text, /azul/);
    assert.match(edited.text, /2\/4/);

    // walk the rest: azul, uno, rojo (again)
    for (let i = 0; i < 3; i++) {
      await t.tap(button(t.telegram.last('editMessageText'), 'Know'), messageId);
    }
    const summary = t.telegram.last('editMessageText');
    assert.match(summary.text, /Session complete/);
    assert.match(summary.text, /✅ 3 known · ❌ 1 again/);
    assert.match(summary.text, /XP: 15/);
    assert.equal(t.telegram.of('answerCallbackQuery').length, 5, 'every tap is answered');

    const progress = await loadProgress(t.store, '111');
    assert.equal(progress.srs.words.a_w0.bucket, 1, 'missed then known → bucket 1');
    assert.equal(progress.srs.words.a_w1.bucket, 0, 'new word registered');
    assert.equal(progress.xp.tg, 15);

    // ▶️ Next starts a fresh session in a new message
    await t.tap(button(summary, 'Next'), messageId);
    assert.equal(t.telegram.of('sendMessage').length, 2);
  });

  test('stale and double taps are answered but change nothing', async () => {
    const t = setup();
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    const know = button(card, 'Know');
    await t.tap(know, 100);
    await t.tap(know, 100);
    assert.equal(t.telegram.last('answerCallbackQuery').text, 'This card is no longer active');
    assert.equal(t.telegram.of('editMessageText').length, 1);
    assert.equal((await getSession(t.store, '111')).pos, 1);
  });

  test('"message is not modified" errors are swallowed', async () => {
    const t = setup();
    await t.send('/reels');
    t.telegram.failNextEditWith = 'Bad Request: message is not modified';
    await t.tap(button(t.telegram.last('sendMessage'), 'Reveal'), 100);
    assert.equal(t.telegram.of('answerCallbackQuery').length, 1);
  });

  test('audio without a handler degrades gracefully', async () => {
    const t = setup();
    await t.send('/reels');
    await t.tap(button(t.telegram.last('sendMessage'), 'Audio'), 100);
    assert.equal(t.telegram.last('answerCallbackQuery').text, 'Audio unavailable right now');
  });

  test('/topics starts a topic-only session; unknown topics are ignored', async () => {
    const t = setup();
    await t.send('/topics');
    const list = t.telegram.last('sendMessage');
    assert.deepEqual(list.reply_markup.inline_keyboard.map((row) => row[0].callback_data), ['t:t1', 't:t2']);
    await t.tap('t:t2', list.message_id);
    const card = t.telegram.last('sendMessage');
    assert.match(card.text, /uno/);
    assert.match(card.text, /1\/1 · Números/);
    await t.tap('t:nope', list.message_id);
    assert.equal(t.telegram.of('sendMessage').length, 2);
  });

  test('empty queue sends the all-caught-up message', async () => {
    const t = setup({ index: buildWordIndex([]) });
    await t.send('/reels');
    assert.match(t.telegram.last('sendMessage').text, /All caught up/);
  });

  test('/settings changes language and size', async () => {
    const t = setup();
    await t.send('/settings');
    const view = t.telegram.last('sendMessage');
    await t.tap('s:lang:uk', view.message_id);
    await t.tap('s:size:8', view.message_id);
    await t.tap('s:size:999', view.message_id);
    const settings = await getSettings(t.store, '111');
    assert.equal(settings.lang, 'uk');
    assert.equal(settings.size, 8);
    assert.match(t.telegram.last('editMessageText').text, /Cards per session: 8/);
    await t.send('/reels');
    assert.match(t.telegram.last('sendMessage').text, /<tg-spoiler>червоний<\/tg-spoiler>/);
  });

  test('/progress lists started topics', async () => {
    const t = setup();
    await t.send('/reels');
    await t.tap(button(t.telegram.last('sendMessage'), 'Know'), 100);
    await t.send('/progress');
    const text = t.telegram.last('sendMessage').text;
    assert.match(text, /Words: 1\/3 seen/);
    assert.match(text, /• Colores — 1\/2/);
    assert.doesNotMatch(text, /Números/);
  });

  test('deep-link connect: confirm claims the code for the web app', async () => {
    const t = setup();
    const { code } = await createLinkCode(t.store);
    await t.send(`/start link_${code}`);
    const prompt = t.telegram.last('sendMessage');
    assert.match(prompt.text, /Only confirm if you just pressed Connect/);
    assert.equal(button(prompt, 'Connect'), `lk:${code}`);
    assert.equal((await redeemLinkCode(t.store, code)).status, 'pending');

    await t.tap(`lk:${code}`, prompt.message_id);
    assert.match(t.telegram.last('editMessageText').text, /Connected/);
    const redeemed = await redeemLinkCode(t.store, code);
    assert.equal(redeemed.status, 'ok');
    assert.equal(redeemed.user.id, '111');

    // tapping again after redemption
    await t.tap(`lk:${code}`, prompt.message_id);
    assert.match(t.telegram.last('editMessageText').text, /expired/);
  });

  test('/link <code> and cancel; bad or expired codes', async () => {
    const t = setup();
    const { code } = await createLinkCode(t.store);
    await t.send(`/link ${code}`);
    await t.tap(`lx:${code}`, t.telegram.last('sendMessage').message_id);
    assert.match(t.telegram.last('editMessageText').text, /Cancelled/);
    assert.equal((await redeemLinkCode(t.store, code)).status, 'cancelled');

    await t.send('/link nonsense');
    assert.match(t.telegram.last('sendMessage').text, /Usage/);
    await t.send(`/link ${'A'.repeat(22)}`);
    assert.match(t.telegram.last('sendMessage').text, /expired/);
  });

  test('/disconnect revokes every browser token', async () => {
    const t = setup();
    const token = await issueToken(t.store, '111');
    await issueToken(t.store, '111');
    await t.send('/disconnect');
    assert.match(t.telegram.last('sendMessage').text, /Disconnected 2 browsers/);
    assert.equal(await verifyToken(t.store, token), null);
    await t.send('/disconnect');
    assert.match(t.telegram.last('sendMessage').text, /No browsers/);
  });

  test('plain text and unknown commands get a hint', async () => {
    const t = setup();
    await t.send('hola');
    assert.match(t.telegram.last('sendMessage').text, /\/reels/);
    await t.send('/nope');
    assert.match(t.telegram.last('sendMessage').text, /Unknown command/);
  });

  test('uses the app word bank by default', async () => {
    const t = setup({ appWords: true });
    await t.send('/reels');
    assert.match(t.telegram.last('sendMessage').text, /1\/12 · /);
  });
});

describe('/api/telegram webhook', () => {
  function post(body, secret) {
    const headers = { 'Content-Type': 'application/json' };
    if (secret !== undefined) headers['X-Telegram-Bot-Api-Secret-Token'] = secret;
    return new Request('https://anchor.test/api/telegram', { method: 'POST', headers, body: JSON.stringify(body) });
  }

  test('rejects a missing or wrong secret before touching the bot', async () => {
    const t = setup();
    const seen = [];
    const handler = createTelegramHandler({ ...t, bot: { handleUpdate: async (u) => seen.push(u) } });
    assert.equal((await handler(post({ update_id: 1 }))).status, 401);
    assert.equal((await handler(post({ update_id: 1 }, 'wrong'))).status, 401);
    assert.equal((await handler(new Request('https://anchor.test/api/telegram'))).status, 405);
    assert.equal(seen.length, 0);
    assert.equal((await handler(post({ update_id: 1 }, SECRET))).status, 200);
    assert.equal(seen.length, 1);
  });

  test('refuses everything when no secret is configured', async () => {
    const t = setup();
    const config = readConfig({ ALLOWED_TELEGRAM_IDS: '111' });
    const handler = createTelegramHandler({ ...t, config, bot: { handleUpdate: async () => assert.fail('called') } });
    assert.equal((await handler(post({ update_id: 1 }, ''))).status, 503);
  });

  test('a failing update still answers 200 so Telegram does not retry', async () => {
    const t = setup();
    const handler = createTelegramHandler({ ...t, bot: { handleUpdate: async () => { throw new Error('boom'); } } });
    const original = console.error;
    console.error = () => {};
    try {
      assert.equal((await handler(post({ update_id: 7 }, SECRET))).status, 200);
    } finally {
      console.error = original;
    }
  });

  test('end to end through the real bot', async () => {
    const t = setup();
    const handler = createTelegramHandler(t);
    const response = await handler(post({ update_id: 1, message: { message_id: 1, from: ALICE, chat: { id: 111, type: 'private' }, text: '/reels' } }, SECRET));
    assert.equal(response.status, 200);
    assert.match(t.telegram.last('sendMessage').text, /rojo/);
  });
});
