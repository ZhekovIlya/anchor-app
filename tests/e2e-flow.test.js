// End to end, in-process: one shared memory store behind the real /api/link,
// /api/sync and /api/telegram handlers, a fake Telegram, and a browser made of
// a fake localStorage + the real sync client. No network.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { loadProgress } from '../server/progress.js';
import { getSession } from '../server/reels.js';
import { createLinkHandler } from '../server/api-link.js';
import { createSyncHandler } from '../server/api-sync.js';
import { createTelegramHandler } from '../server/api-telegram.js';
import { createSyncClient } from '../src/web/sync-client.js';
import { collectLessonIds } from '../src/core/sync-local.js';
import { loadAllData } from '../src/core/data-loader.js';
import { createSRS } from '../src/core/srs.js';
import { createGamification, XP_REWARDS } from '../src/core/gamification.js';
import { SRS_KEY_WORDS } from '../src/core/constants.js';
import { totalXP } from '../src/core/sync-merge.js';
import { createFakeTelegram } from './fake-telegram.js';

const SECRET = 'e2e-webhook-secret';
const ALICE = { id: 4242, username: 'alice', first_name: 'Alice' };

function fakeLocalStorage() {
  const map = new Map();
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
  };
}

function createWorld() {
  const config = readConfig({
    TELEGRAM_BOT_USERNAME: 'AnchorTestBot',
    TELEGRAM_WEBHOOK_SECRET: SECRET,
    ALLOWED_TELEGRAM_IDS: String(ALICE.id),
  });
  const store = createMemoryStore();
  const telegram = createFakeTelegram();
  const context = { config, store, telegram, now: Date.now, onAudio: null };
  const routes = {
    '/api/link': createLinkHandler(context),
    '/api/sync': createSyncHandler(context),
    '/api/telegram': createTelegramHandler(context),
  };
  const fetch = async (url, init) => {
    const request = new Request(`https://anchor.test${url}`, init);
    return routes[new URL(request.url).pathname](request);
  };

  let updateId = 1;
  let callbackId = 1;
  const webhook = (update) => fetch('/api/telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Telegram-Bot-Api-Secret-Token': SECRET },
    body: JSON.stringify({ update_id: updateId++, ...update }),
  });
  const chat = { id: ALICE.id, type: 'private' };
  return {
    store, telegram, fetch,
    say: (text) => webhook({ message: { message_id: updateId, from: ALICE, chat, text } }),
    tap: (data, messageId) => webhook({ callback_query: { id: String(callbackId++), from: ALICE, data, message: { message_id: messageId, chat } } }),
  };
}

function button(view, label) {
  const found = view.reply_markup.inline_keyboard.flat().find((b) => b.text.includes(label));
  assert.ok(found, `no ${label} button in: ${view.text}`);
  return found.callback_data;
}

test('link → web sync up → quiz reels → web sync down', async () => {
  const world = createWorld();
  const data = loadAllData();
  const storage = fakeLocalStorage();
  const adapter = {
    load: (key) => JSON.parse(storage.getItem(key) || '{}'),
    save: (key, value) => storage.setItem(key, JSON.stringify(value)),
  };
  const srs = createSRS(adapter, SRS_KEY_WORDS);
  const game = createGamification(adapter);
  let webChanges = 0;
  const client = createSyncClient({ storage, lessonIds: collectLessonIds(data), fetch: world.fetch, onChange: () => webChanges++ });

  // ---- 1. link the browser through the bot
  const { code, deepLink } = await client.startLink();
  assert.equal(deepLink, `https://t.me/AnchorTestBot?start=link_${code}`);
  await world.say(`/start link_${code}`);
  const prompt = world.telegram.last('sendMessage');
  await world.tap(button(prompt, 'Connect'), prompt.sent_message_id);
  assert.match(world.telegram.last('editMessageText').text, /Connected/);
  assert.equal(await client.pollLink(code), 'ok');
  assert.equal(client.getState().user.username, 'alice');

  // ---- 2. the user learns the first lesson's words in the app, then syncs up
  const firstLesson = data.words[0].lessons[0];
  for (const word of firstLesson.words) srs.registerNew(word.meta.id);
  storage.setItem(firstLesson.id, '1');
  game.recordActivity();
  game.addXP(XP_REWARDS.lesson);
  assert.equal((await client.syncNow()).status, 'ok');
  let remote = await loadProgress(world.store, String(ALICE.id));
  assert.equal(Object.keys(remote.srs.words).length, firstLesson.words.length);
  assert.equal(remote.completions[firstLesson.id], 1);
  assert.equal(totalXP(remote), XP_REWARDS.lesson);

  // ---- 3. a quiz session in Telegram: new words continue where the app stopped
  await world.say('/reels');
  const card = world.telegram.last('sendMessage');
  const messageId = card.sent_message_id;
  const secondLessonFirstWord = data.words[0].lessons[1].words[0];
  assert.ok(card.text.includes(secondLessonFirstWord.es), 'first new word after lesson 1');
  assert.match(card.text, /^🇪🇸 .*\n/s);
  assert.ok(card.text.includes('1/12 · '));
  assert.doesNotMatch(card.text, /tg-spoiler/);

  const userId = String(ALICE.id);
  const view = () => {
    const edits = world.telegram.of('editMessageText').filter((e) => e.message_id === messageId);
    return edits.length ? edits.at(-1) : card;
  };
  // 3 study cards ("Got it"), then the first word comes back as a question: miss it once
  for (let i = 0; i < 3; i++) await world.tap(button(view(), 'Got it'), messageId);
  let session = await getSession(world.store, userId);
  assert.equal(session.queue[session.pos].id, secondLessonFirstWord.meta.id);
  assert.equal(session.queue[session.pos].kind, 'tr');
  const wrong = session.queue[session.pos].options.findIndex((id) => id !== secondLessonFirstWord.meta.id);
  await world.tap(`q:${session.sid}:${session.pos}:${wrong}`, messageId);
  assert.match(view().text, /❌/);
  await world.tap(button(view(), 'Next'), messageId);

  // everything else right: study → re-test, until the summary
  for (let guard = 0; guard < 60 && !/Session complete/.test(view().text); guard++) {
    session = await getSession(world.store, userId);
    const current = session.queue[session.pos];
    if (session.phase === 'feedback') await world.tap(button(view(), 'Next'), messageId);
    else if (current.kind === 'study') await world.tap(button(view(), 'Got it'), messageId);
    else await world.tap(`q:${session.sid}:${session.pos}:${current.options.indexOf(current.id)}`, messageId);
  }
  const summary = view();
  assert.match(summary.text, /✅ 12 correct · ❌ 1 to repeat · accuracy 92 %/);
  assert.ok(summary.text.includes(secondLessonFirstWord.es), 'the missed word is listed');
  assert.match(summary.text, new RegExp(`XP: ${XP_REWARDS.lesson + XP_REWARDS.review}`));

  remote = await loadProgress(world.store, String(ALICE.id));
  assert.equal(Object.keys(remote.srs.words).length, firstLesson.words.length + 12);
  assert.equal(remote.xp.tg, XP_REWARDS.review);

  // ---- 4. back in the app: the bot's progress arrives, nothing is lost or doubled
  const down = await client.syncNow();
  assert.equal(down.changed, true);
  assert.equal(webChanges, 1);
  const localWords = JSON.parse(storage.getItem(SRS_KEY_WORDS));
  assert.equal(Object.keys(localWords).length, firstLesson.words.length + 12);
  const missedId = secondLessonFirstWord.meta.id;
  assert.equal(localWords[missedId].bucket, 1, 'missed in the re-test, right on the repeat → promoted once');
  assert.equal(localWords[missedId].isMistake, false);
  assert.equal(game.getStats().totalXP, XP_REWARDS.lesson + XP_REWARDS.review);
  assert.equal(game.getStreak().current, 1);

  // a further sync is a no-op on both sides
  assert.equal((await client.syncNow()).changed, false);
  assert.equal(totalXP(await loadProgress(world.store, String(ALICE.id))), XP_REWARDS.lesson + XP_REWARDS.review);

  // ---- 5. /disconnect in the bot logs the browser out on its next sync
  await world.say('/disconnect');
  assert.match(world.telegram.last('sendMessage').text, /Disconnected 1 browser/);
  assert.equal((await client.syncNow()).status, 'unlinked');
  assert.equal(client.getState().linked, false);
});
