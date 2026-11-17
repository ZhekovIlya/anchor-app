import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { loadProgress } from '../server/progress.js';
import { createLinkCode, redeemLinkCode, issueToken, verifyToken } from '../server/auth.js';
import { createBot, parseCommand, parseSettingsCallback, getSettings, USERS_KEY } from '../server/bot.js';
import { createTelegramHandler } from '../server/api-telegram.js';
import { getSession, reelsKey } from '../server/reels.js';
import { updateProgress } from '../server/progress.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { createFakeTelegram } from './fake-telegram.js';
import { seededRandom, quizIndex } from './quiz-helpers.js';

const ALICE = { id: 111, username: 'alice', first_name: 'Alice' };
const MALLORY = { id: 999, username: 'mallory', first_name: 'M' };
const SECRET = 'test-webhook-secret';

function setup({ index = quizIndex(), appWords = false } = {}) {
  const config = readConfig({ ALLOWED_TELEGRAM_IDS: '111', TELEGRAM_WEBHOOK_SECRET: SECRET, TELEGRAM_BOT_USERNAME: 'AnchorTestBot' });
  const store = createMemoryStore();
  const telegram = createFakeTelegram();
  const ctx = { config, store, telegram, now: Date.now, index: appWords ? undefined : index, random: seededRandom(1) };
  const bot = createBot(ctx);
  let updateId = 1;
  let callbackId = 1;
  return {
    ...ctx,
    bot,
    send(text, from = ALICE) {
      return bot.handleUpdate({ update_id: updateId++, message: { message_id: updateId, from, chat: { id: from.id, type: 'private' }, text } });
    },
    /** Put words into the user's SRS: { id: bucket }, all due. */
    updateSrs(buckets) {
      return updateProgress(store, '111', (doc) => {
        for (const [id, bucket] of Object.entries(buckets)) doc.srs.words[id] = { bucket, dueDate: Date.now() - 3600000 };
      });
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
    assert.deepEqual(parseSettingsCallback('s:typing:off'), { typing: false });
    assert.deepEqual(parseSettingsCallback('s:typing:on'), { typing: true });
    for (const bad of ['s:lang:en', 's:size:13', 's:nudge:maybe', 's:typing:maybe', 's:admin:1', 'x']) assert.equal(parseSettingsCallback(bad), null);
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
    assert.deepEqual(await getSettings(t.store, '111'), { lang: 'ru', size: 12, nudge: true, typing: true, username: 'alice', firstName: 'Alice' });
    const help = t.telegram.last('sendMessage');
    assert.match(help.text, /\/reels/);
    assert.equal(button(help, 'Start reels'), 'r:n');
  });

  /** Play one step the right way; returns false when the session is over. */
  async function stepRight(t, messageId = 100) {
    const edits = t.telegram.of('editMessageText');
    const view = edits.length ? edits.at(-1) : t.telegram.last('sendMessage');
    if (/Session complete/.test(view.text)) return false;
    const session = await getSession(t.store, '111');
    const card = session.queue[session.pos];
    if (session.phase === 'feedback') await t.tap(button(view, 'Next'), messageId);
    else if (card.kind === 'study') await t.tap(button(view, 'Got it'), messageId);
    else await t.tap(`q:${session.sid}:${session.pos}:${card.options.indexOf(card.id)}`, messageId);
    return true;
  }

  test('full quiz session: study, re-test, one miss, summary with the missed word', async () => {
    const t = setup();
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    assert.match(card.text, /🇪🇸 <b>el camarero<\/b>\n🇷🇺 официант\n🇺🇦 офіціант/);
    assert.doesNotMatch(card.text, /tg-spoiler/);
    const messageId = 100;
    assert.equal((await getSession(t.store, '111')).messageId, messageId);

    // three study cards, then the first word comes back as a question
    await t.tap(button(card, 'Got it'), messageId);
    await t.tap(button(t.telegram.last('editMessageText'), 'Got it'), messageId);
    await t.tap(button(t.telegram.last('editMessageText'), 'Got it'), messageId);
    let edited = t.telegram.last('editMessageText');
    assert.equal(edited.message_id, messageId);
    assert.match(edited.text, /🇪🇸 <b>el camarero<\/b>\n\n<i>What does it mean\?<\/i>/);
    assert.doesNotMatch(edited.text, /официант/);
    assert.equal(edited.reply_markup.inline_keyboard.length, 4, 'four options');

    // miss it: a feedback card with the right answer
    const session = await getSession(t.store, '111');
    const wrong = session.queue[session.pos].options.findIndex((id) => id !== 'a_w0');
    await t.tap(`q:${session.sid}:${session.pos}:${wrong}`, messageId);
    edited = t.telegram.last('editMessageText');
    assert.match(edited.text, /❌ .*\n✅ <b>el camarero<\/b> — официант/);
    await t.tap(button(edited, 'Next'), messageId);

    // answer everything else correctly until the summary
    for (let guard = 0; guard < 60; guard++) {
      if (!(await stepRight(t))) break;
    }
    const summary = t.telegram.last('editMessageText');
    assert.match(summary.text, /Session complete/);
    assert.match(summary.text, /✅ 9 correct · ❌ 1 to repeat · accuracy 90 %/);
    assert.match(summary.text, /Words to repeat<\/b>\n• el camarero — официант/);
    assert.match(summary.text, /XP: 15/);
    assert.equal(t.telegram.of('answerCallbackQuery').length, t.telegram.of('editMessageText').length, 'every tap is answered');

    const progress = await loadProgress(t.store, '111');
    assert.equal(progress.srs.words.a_w0.bucket, 1, 'missed, then right on the repeat → bucket 1');
    assert.equal(progress.srs.words.a_w1.bucket, 0, 'new word registered by its re-test');
    assert.equal(Object.keys(progress.srs.words).length, 9);
    assert.equal(progress.xp.tg, 15);

    // ▶️ Next starts a fresh session in a new message
    await t.tap(button(summary, 'Next'), messageId);
    assert.equal(t.telegram.of('sendMessage').length, 2);
  });

  test('a correct answer shows the next card with a receipt line, in the same message', async () => {
    const t = setup();
    await t.updateSrs({ a_w2: 1, a_w3: 2 });
    await t.send('/reels');
    const first = t.telegram.last('sendMessage');
    assert.match(first.text, /la mesa/);
    const session = await getSession(t.store, '111');
    await t.tap(`q:${session.sid}:0:${session.queue[0].options.indexOf('a_w2')}`, 100);
    const next = t.telegram.last('editMessageText');
    assert.equal(next.message_id, 100);
    assert.match(next.text, /^✅ la mesa — стол\n\n/);
    assert.match(next.text, /How do you say it\?/);
    assert.equal((await loadProgress(t.store, '111')).srs.words.a_w2.bucket, 2);
  });

  test('stale and double taps are answered but change nothing', async () => {
    const t = setup();
    await t.send('/reels');
    const gotIt = button(t.telegram.last('sendMessage'), 'Got it');
    await t.tap(gotIt, 100);
    await t.tap(gotIt, 100);
    assert.equal(t.telegram.last('answerCallbackQuery').text, 'This card is no longer active');
    assert.equal(t.telegram.of('editMessageText').length, 1);
    assert.equal((await getSession(t.store, '111')).pos, 1);
  });

  test('a v1 session and v1 buttons are tolerated', async () => {
    const t = setup();
    const v1 = { sid: 'AbC-_9', queue: [{ id: 'a_w0', isNew: true }], pos: 0, revealed: false, known: 0, missed: 0, finished: false, messageId: 100 };
    await t.store.casDoc(reelsKey('111'), 0, v1);
    for (const data of ['r:k:AbC-_9:0', 'r:g:AbC-_9:0', 'r:v:AbC-_9:0', 'r:a:AbC-_9:0', 'r:s:AbC-_9:0', 'q:AbC-_9:0:0']) {
      await t.tap(data, 100);
      assert.equal(t.telegram.last('answerCallbackQuery').text, 'This card is no longer active', data);
    }
    await t.send('rojo');
    assert.match(t.telegram.last('sendMessage').text, /Send \/reels/);
    assert.equal(t.telegram.of('editMessageText').length, 0);
    assert.deepEqual((await loadProgress(t.store, '111')).srs.words, {});
    await t.send('/reels'); // a new session replaces it
    assert.equal((await getSession(t.store, '111')).v, 2);
  });

  test('"message is not modified" errors are swallowed', async () => {
    const t = setup();
    await t.send('/reels');
    t.telegram.failNextEditWith = 'Bad Request: message is not modified';
    await t.tap(button(t.telegram.last('sendMessage'), 'Got it'), 100);
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
    assert.match(card.text, /1\/2 · Números/);
    await t.tap('t:nope', list.message_id);
    assert.equal(t.telegram.of('sendMessage').length, 2);
  });

  test('empty queue sends the all-caught-up message', async () => {
    const t = setup({ index: buildWordIndex([]) });
    await t.send('/reels');
    assert.match(t.telegram.last('sendMessage').text, /All caught up/);
  });

  test('/settings changes language, size and typing cards', async () => {
    const t = setup();
    await t.send('/settings');
    const view = t.telegram.last('sendMessage');
    assert.match(view.text, /Typing cards: on/);
    await t.tap('s:lang:uk', view.message_id);
    await t.tap('s:size:8', view.message_id);
    await t.tap('s:size:999', view.message_id);
    await t.tap('s:typing:off', view.message_id);
    const settings = await getSettings(t.store, '111');
    assert.equal(settings.lang, 'uk');
    assert.equal(settings.size, 8);
    assert.equal(settings.typing, false);
    assert.match(t.telegram.last('editMessageText').text, /Cards per session: 8/);
    assert.match(t.telegram.last('editMessageText').text, /Typing cards: off/);
    await t.updateSrs({ a_w1: 1 });
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    assert.match(card.text, /la cuenta/);
    assert.ok(card.reply_markup.inline_keyboard.flat().some((b) => b.text === 'рахунок'), 'Ukrainian options');
  });

  test('typing cards off: high-bucket words become choose-Spanish cards', async () => {
    const t = setup();
    await t.updateSrs({ a_w1: 4 });
    await t.send('/settings');
    await t.tap('s:typing:off', 5);
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    assert.match(card.text, /How do you say it\?/);
    assert.equal(card.reply_markup.inline_keyboard.flat().length, 4);
  });

  test('/progress lists started topics', async () => {
    const t = setup();
    await t.send('/reels');
    await t.tap(button(t.telegram.last('sendMessage'), 'Got it'), 100);
    await t.tap(button(t.telegram.last('editMessageText'), 'Got it'), 100);
    await t.tap(button(t.telegram.last('editMessageText'), 'Got it'), 100);
    const session = await getSession(t.store, '111');
    await t.tap(`q:${session.sid}:${session.pos}:${session.queue[session.pos].options.indexOf('a_w0')}`, 100);
    await t.send('/progress');
    const text = t.telegram.last('sendMessage').text;
    assert.match(text, /Words: 1\/9 seen/);
    assert.match(text, /• Cosas &lt;&amp;&gt; — 1\/7/);
    assert.doesNotMatch(text, /Números/);
  });

  describe('typed answers', () => {
    async function typedSetup() {
      const t = setup();
      await t.updateSrs({ a_w1: 3 });
      await t.send('/reels');
      const card = t.telegram.last('sendMessage');
      assert.match(card.text, /<i>Type it in Spanish/);
      assert.match(card.text, /<b>счёт<\/b>/);
      return { t, card };
    }

    test('a text message answers the typed card by editing the card; the answer stays in the chat', async () => {
      const { t } = await typedSetup();
      await t.send('la cuenta');
      assert.equal(t.telegram.of('sendMessage').length, 1, 'no extra bot message');
      const edited = t.telegram.last('editMessageText');
      assert.equal(edited.message_id, 100);
      assert.match(edited.text, /^✅ la cuenta — счёт\n\n🇪🇸/);
      assert.equal((await loadProgress(t.store, '111')).srs.words.a_w1.bucket, 4);
    });

    test('a typo is accepted as "almost"', async () => {
      const { t } = await typedSetup();
      await t.send('la cuentas');
      assert.match(t.telegram.last('editMessageText').text, /^✅ almost — written: la cuenta — счёт/);
    });

    test('a wrong answer gets a feedback card, then the word comes back', async () => {
      const { t } = await typedSetup();
      await t.send('la <mesa>');
      const feedback = t.telegram.last('editMessageText');
      assert.match(feedback.text, /❌ la &lt;mesa&gt;\n✅ <b>la cuenta<\/b> — счёт/);
      assert.equal((await loadProgress(t.store, '111')).srs.words.a_w1.isMistake, true);
      // text on a feedback card is not an answer
      await t.send('la cuenta');
      assert.match(t.telegram.last('sendMessage').text, /Send \/reels/);
      await t.tap(button(feedback, 'Next'), 100);
      assert.match(t.telegram.last('editMessageText').text, /🇪🇸 <b>el camarero<\/b>/);
    });

    test('hint and "Don\'t know" are buttons on the card', async () => {
      const { t, card } = await typedSetup();
      await t.tap(button(card, 'Hint'), 100);
      const hinted = t.telegram.last('editMessageText');
      assert.match(hinted.text, /💡 <code>l_ c_____<\/code>/);
      await t.tap(button(card, 'Hint'), 100); // again: nothing new to show
      assert.equal(t.telegram.of('editMessageText').length, 1);
      await t.tap(button(hinted, "Don't know"), 100);
      assert.match(t.telegram.last('editMessageText').text, /🤷 Don't know\n✅ <b>la cuenta<\/b>/);
      assert.equal((await loadProgress(t.store, '111')).srs.words.a_w1.isMistake, true);
    });

    test('text outside a typed card still gets the /reels hint; strangers get nothing graded', async () => {
      const t = setup();
      await t.send('la cuenta');
      assert.match(t.telegram.last('sendMessage').text, /Send \/reels/);
      await t.send('/reels'); // a study card is not waiting for text
      await t.send('el camarero');
      assert.match(t.telegram.last('sendMessage').text, /Send \/reels/);
      assert.equal(t.telegram.of('editMessageText').length, 0);
      await t.send('el camarero', MALLORY);
      assert.match(t.telegram.last('sendMessage').text, /Your Telegram ID is <code>999<\/code>/);
    });

    test('an answer for a card whose message id is unknown is sent as a new message', async () => {
      const { t } = await typedSetup();
      const { rev, doc } = await t.store.getDoc(reelsKey('111'));
      await t.store.casDoc(reelsKey('111'), rev, { ...doc, messageId: null });
      await t.send('la cuenta');
      assert.equal(t.telegram.of('editMessageText').length, 0);
      assert.match(t.telegram.last('sendMessage').text, /^✅ la cuenta — счёт/);
      assert.equal((await getSession(t.store, '111')).messageId, t.telegram.last('sendMessage').sent_message_id);
    });
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
    assert.match(t.telegram.last('sendMessage').text, /camarero/);
  });
});
