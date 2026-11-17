import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.js';
import { loadProgress, updateProgress } from '../server/progress.js';
import {
  startReels, getSession, applyReelAction, answerTyped, attachMessages, parseReelCallback, reelCallback,
  renderCard, renderSummary, renderEmpty, countDue, activeTypedCard, reelsKey, BOT_DEVICE_ID,
} from '../server/reels.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { totalXP } from '../src/core/sync-merge.js';
import { XP_REWARDS } from '../src/core/gamification.js';
import { seededRandom, quizIndex } from './quiz-helpers.js';

const TG = '111';
const NOW = Date.now();
const HOUR = 3600000;
const due = (bucket) => ({ bucket, dueDate: NOW - HOUR });

async function seeded(srsWords = {}) {
  const store = createMemoryStore();
  if (Object.keys(srsWords).length) {
    await updateProgress(store, TG, (doc) => { doc.srs.words = srsWords; });
  }
  return store;
}

const start = (store, extra = {}) => startReels(store, TG, { index: quizIndex(), now: NOW, random: seededRandom(1), ...extra });
const tap = (session, action, extra = {}) => ({ action, sid: session.sid, pos: session.pos, ...extra });
const current = (session) => session.queue[session.pos];
const rightOption = (session) => current(session).options.indexOf(current(session).id);
const wrongOption = (session) => (rightOption(session) === 0 ? 1 : 0);
const choose = (store, session, option) => applyReelAction(store, TG, tap(session, 'choose', { option }));

describe('reel callback data', () => {
  test('round-trips and stays within 64 bytes', () => {
    const session = { sid: 'AbC-_9', pos: 17 };
    for (const action of ['audio', 'study', 'next', 'hint', 'dontknow']) {
      const data = reelCallback(action, session);
      assert.ok(Buffer.byteLength(data) <= 64);
      assert.deepEqual(parseReelCallback(data), { action, sid: 'AbC-_9', pos: 17 });
    }
    const data = reelCallback('choose', session, 3);
    assert.equal(data, 'q:AbC-_9:17:3');
    assert.deepEqual(parseReelCallback(data), { action: 'choose', sid: 'AbC-_9', pos: 17, option: 3 });
  });

  test('v1 buttons parse as "legacy"; malformed data is rejected', () => {
    for (const code of ['v', 'k', 'g']) assert.equal(parseReelCallback(`r:${code}:AbC-_9:1`).action, 'legacy');
    for (const data of ['', 'r:z:AbC-_9:1', 'r:s:short:1', 'r:s:AbC-_9:', 'r:s:AbC-_9:-1', 'q:AbC-_9:1:4', 'q:AbC-_9:1', 'q:short:1:0', 'r:n', 'p', null]) {
      assert.equal(parseReelCallback(data), null, String(data));
    }
  });
});

describe('session start', () => {
  test('builds a v2 session: due words become questions, new words study cards', async () => {
    const store = await seeded({ a_w2: due(1), a_w3: due(4) });
    const session = await start(store);
    assert.match(session.sid, /^[A-Za-z0-9_-]{6}$/);
    assert.equal(session.v, 2);
    assert.equal(session.phase, 'ask');
    assert.deepEqual(session.queue.slice(0, 2).map((c) => [c.id, c.kind]), [['a_w2', 'tr'], ['a_w3', 'type']]);
    assert.equal(session.queue[2].kind, 'study');
    assert.equal(session.finished, false);
    assert.deepEqual(await getSession(store, TG), session);
  });

  test('typing off: no typed cards', async () => {
    const store = await seeded({ a_w3: due(4) });
    const session = await start(store, { typing: false, size: 1 });
    assert.equal(session.queue[0].kind, 'es');
  });

  test('empty queue yields a finished session', async () => {
    const store = await seeded();
    const session = await start(store, { topicId: 'nope' });
    assert.deepEqual(session.queue, []);
    assert.equal(session.finished, true);
  });
});

describe('study → re-test', () => {
  test('"Got it" does not register the word; the re-test 3 cards later does', async () => {
    const store = await seeded();
    let session = await start(store);
    assert.equal(current(session).kind, 'study');
    const first = current(session).id;

    let result = await applyReelAction(store, TG, tap(session, 'study'));
    assert.equal(result.stale, false);
    assert.equal(result.progress, undefined, 'nothing graded yet');
    assert.equal(result.session.queue.length, session.queue.length + 1);
    session = result.session;
    assert.deepEqual((await loadProgress(store, TG)).srs.words, {});

    for (let i = 0; i < 2; i++) {
      session = (await applyReelAction(store, TG, tap(session, 'study'))).session;
    }
    assert.equal(session.pos, 3);
    assert.equal(current(session).id, first);
    assert.equal(current(session).kind, 'tr');
    assert.equal(current(session).isNew, true);

    result = await choose(store, session, rightOption(session));
    assert.equal(result.correct, true);
    const entry = result.progress.srs.words[first];
    assert.equal(entry.bucket, 0);
    assert.ok(entry.dueDate > NOW + 23 * HOUR, 'new words are due in a day');
    assert.ok(!entry.isMistake);
  });

  test('a study card cannot be answered as a question, and questions have no "Got it"', async () => {
    const store = await seeded({ a_w2: due(1) });
    const session = await start(store);
    assert.deepEqual(await applyReelAction(store, TG, tap(session, 'study')), { stale: true }, 'question card');
    const s2 = (await choose(store, session, rightOption(session))).session;
    assert.equal(current(s2).kind, 'study');
    assert.deepEqual(await choose(store, s2, 0), { stale: true });
    assert.deepEqual(await applyReelAction(store, TG, tap(s2, 'dontknow')), { stale: true });
  });
});

describe('choice cards', () => {
  test('correct: promote, next card at once, receipt for the next card', async () => {
    const store = await seeded({ a_w2: due(1), a_w3: due(2) });
    const session = await start(store);
    assert.equal(current(session).kind, 'tr');
    const result = await choose(store, session, rightOption(session));
    assert.equal(result.stale, false);
    assert.equal(result.correct, true);
    assert.equal(result.progress.srs.words.a_w2.bucket, 2);
    assert.equal(result.session.known, 1);
    assert.equal(result.session.pos, 1);
    assert.equal(result.session.phase, 'ask');
    assert.deepEqual(result.session.receipt, { id: 'a_w2', almost: false });
    const view = renderCard(result.session, quizIndex());
    assert.match(view.text, /^✅ la mesa — стол\n\n/);
    assert.match(view.text, /How do you say it\?/);
  });

  test('wrong: demote, feedback card with the right answer, word comes back 3 cards later', async () => {
    const store = await seeded({ a_w2: due(2), a_w3: due(1), a_w4: due(1), a_w5: due(1) });
    const session = await start(store, { size: 4 });
    const wrong = wrongOption(session);
    const chosenId = current(session).options[wrong];
    const result = await choose(store, session, wrong);
    assert.equal(result.correct, false);
    assert.equal(result.progress.srs.words.a_w2.bucket, 0);
    assert.equal(result.progress.srs.words.a_w2.isMistake, true);
    assert.equal(result.session.phase, 'feedback');
    assert.equal(result.session.pos, 0, 'stays on the card until "Next"');
    assert.equal(result.session.missed, 1);
    assert.deepEqual(result.session.missedIds, ['a_w2']);
    assert.deepEqual(result.session.queue.map((c) => c.id), ['a_w2', 'a_w3', 'a_w4', 'a_w2', 'a_w5']);
    assert.equal(result.session.queue[3].isNew, false);

    const view = renderCard(result.session, quizIndex());
    assert.match(view.text, /❌ /);
    assert.match(view.text, /✅ <b>la mesa<\/b> — стол/);
    assert.ok(chosenId !== 'a_w2');
    assert.deepEqual(view.reply_markup.inline_keyboard[0].map((b) => b.callback_data), [`r:a:${session.sid}:0`, `r:x:${session.sid}:0`]);

    // answering again on the feedback card changes nothing; "Next" moves on
    assert.deepEqual(await choose(store, result.session, 0), { stale: true });
    const next = await applyReelAction(store, TG, tap(result.session, 'next'));
    assert.equal(next.session.pos, 1);
    assert.equal(next.session.phase, 'ask');
    assert.equal(next.session.receipt, null, 'no ✅ receipt after a miss');
    assert.equal((await loadProgress(store, TG)).srs.words.a_w2.bucket, 0, '"Next" does not grade');
  });

  test('a word missed again and again is requeued at most twice', async () => {
    const store = await seeded({ a_w2: due(1) });
    let session = await start(store, { size: 1 });
    for (let round = 0; round < 3; round++) {
      session = (await choose(store, session, wrongOption(session))).session;
      session = (await applyReelAction(store, TG, tap(session, 'next'))).session;
    }
    assert.equal(session.finished, true);
    assert.equal(session.queue.length, 3, 'original + 2 repeats');
    assert.equal(session.missed, 3);
    assert.deepEqual(session.missedIds, ['a_w2'], 'listed once');
  });

  test('stale taps are ignored: wrong sid, wrong pos, double tap, finished session', async () => {
    const store = await seeded({ a_w2: due(1), a_w3: due(1) });
    const session = await start(store, { size: 2 });
    const option = rightOption(session);
    assert.deepEqual(await applyReelAction(store, TG, { action: 'choose', sid: 'zzzzzz', pos: 0, option }), { stale: true });
    assert.deepEqual(await applyReelAction(store, TG, { action: 'choose', sid: session.sid, pos: 1, option }), { stale: true });
    assert.deepEqual(await applyReelAction(store, TG, tap(session, 'choose', { option: 9 })), { stale: true });

    const first = await choose(store, session, option);
    assert.equal(first.stale, false);
    assert.deepEqual(await choose(store, session, option), { stale: true }, 'double tap');
    assert.equal((await loadProgress(store, TG)).srs.words.a_w2.bucket, 2, 'promoted only once');

    const next = await start(store, { size: 2 });
    assert.deepEqual(await choose(store, first.session, 0), { stale: true }, 'old session');
    assert.equal((await choose(store, next, rightOption(next))).stale, false);
  });

  test('concurrent double tap only grades once', async () => {
    const store = await seeded({ a_w2: due(1) });
    const session = await start(store, { size: 1 });
    const option = rightOption(session);
    const results = await Promise.all([choose(store, session, option), choose(store, session, option)]);
    assert.equal(results.filter((r) => !r.stale).length, 1);
    assert.equal((await loadProgress(store, TG)).srs.words.a_w2.bucket, 2);
  });

  test('fewer than 3 distractors: a "show answer" card, graded wrong', async () => {
    const tiny = buildWordIndex([{ id: 't', title: 'T', lessons: [{ id: 'l', title: 'L', words: [
      { es: 'uno', ru: 'один', uk: 'один', meta: { id: 'u0' } },
      { es: 'dos', ru: 'два', uk: 'два', meta: { id: 'u1' } },
    ] }] }]);
    const store = await seeded({ u0: due(1) });
    const session = await startReels(store, TG, { index: tiny, now: NOW, size: 1 });
    assert.equal(current(session).kind, 'show');
    const view = renderCard(session, tiny);
    assert.deepEqual(view.reply_markup.inline_keyboard.flat().map((b) => b.text), ['👁 Show answer']);
    assert.deepEqual(await choose(store, session, 0), { stale: true });
    const result = await applyReelAction(store, TG, tap(session, 'dontknow'));
    assert.equal(result.correct, false);
    assert.equal(result.progress.srs.words.u0.isMistake, true);
    assert.equal(result.session.phase, 'feedback');
  });
});

describe('typed cards', () => {
  const index = quizIndex();
  const typedSession = async (extra = {}) => {
    const store = await seeded({ a_w1: due(3) });
    return { store, session: await start(store, { size: 1, ...extra }) };
  };

  test('only a live typed card in the ask phase is waiting for text', async () => {
    const { store, session } = await typedSession();
    assert.equal(activeTypedCard(session).id, 'a_w1');
    assert.equal(activeTypedCard({ ...session, phase: 'feedback' }), null);
    assert.equal(activeTypedCard({ ...session, finished: true }), null);
    assert.equal(activeTypedCard({ ...session, v: undefined }), null);
    assert.equal(activeTypedCard(null), null);
    assert.deepEqual(await answerTyped(store, TG, 42, { index }), { active: false });
    const choiceStore = await seeded({ a_w2: due(1) });
    await start(choiceStore);
    assert.deepEqual(await answerTyped(choiceStore, TG, 'mesa', { index }), { active: false });
  });

  test('exact answer (article optional): promote and finish', async () => {
    const { store } = await typedSession();
    const result = await answerTyped(store, TG, 'Cuenta!', { index });
    assert.equal(result.active, true);
    assert.equal(result.correct, true);
    assert.equal(result.almost, false);
    assert.equal(result.progress.srs.words.a_w1.bucket, 4);
    assert.equal(result.finished, true);
    assert.equal(result.progress.xp[BOT_DEVICE_ID], XP_REWARDS.review);
  });

  test('typo: accepted as "almost", receipt shows the written form', async () => {
    const store = await seeded({ a_w1: due(3), a_w2: due(3) });
    const session = await start(store, { size: 2 });
    assert.equal(current(session).id, 'a_w1');
    const result = await answerTyped(store, TG, 'la cuentas', { index });
    assert.equal(result.correct, true);
    assert.equal(result.almost, true);
    assert.deepEqual(result.session.receipt, { id: 'a_w1', almost: true });
    assert.match(renderCard(result.session, index).text, /^✅ almost — written: la cuenta — счёт\n\n/);
  });

  test('wrong answer: demote, feedback shows what was typed, requeued', async () => {
    const { store } = await typedSession();
    const result = await answerTyped(store, TG, 'la <mesa>', { index });
    assert.equal(result.correct, false);
    assert.equal(result.finished, false, 'the summary comes after "Next"');
    const progress = await loadProgress(store, TG);
    assert.equal(progress.srs.words.a_w1.bucket, 0);
    assert.equal(progress.srs.words.a_w1.isMistake, true);
    assert.equal(result.session.phase, 'feedback');
    assert.equal(result.session.queue.length, 2);
    assert.equal(result.session.queue[1].kind, 'type');
    const view = renderCard(result.session, index);
    assert.match(view.text, /❌ la &lt;mesa&gt;/);
    assert.match(view.text, /✅ <b>la cuenta<\/b> — счёт/);
    // the feedback card no longer takes text
    assert.deepEqual(await answerTyped(store, TG, 'la cuenta', { index }), { active: false });
    const next = await applyReelAction(store, TG, tap(result.session, 'next'));
    assert.equal(next.finished, false);
    assert.equal(current(next.session).id, 'a_w1', 'asked again');
  });

  test("don't know counts as wrong", async () => {
    const { store, session } = await typedSession();
    const result = await applyReelAction(store, TG, tap(session, 'dontknow'));
    assert.equal(result.correct, false);
    assert.equal(result.session.feedback.dontKnow, true);
    assert.match(renderCard(result.session, index).text, /🤷 Don't know\n✅ <b>la cuenta<\/b>/);
    assert.equal((await loadProgress(store, TG)).srs.words.a_w1.isMistake, true);
  });

  test('hint: first letter and length, once, no grading', async () => {
    const { store, session } = await typedSession();
    assert.deepEqual(renderCard(session, index).reply_markup.inline_keyboard[0].map((b) => b.text), ['💡 Hint', "🤷 Don't know"]);
    const hint = await applyReelAction(store, TG, tap(session, 'hint'));
    assert.equal(hint.changed, true);
    assert.equal(hint.session.hinted, true);
    const view = renderCard(hint.session, index);
    assert.match(view.text, /💡 <code>l_ c_____<\/code>/);
    assert.deepEqual(view.reply_markup.inline_keyboard[0].map((b) => b.text), ["🤷 Don't know"]);
    assert.equal((await applyReelAction(store, TG, tap(session, 'hint'))).changed, false);
    assert.deepEqual((await loadProgress(store, TG)).srs.words.a_w1.bucket, 3, 'a hint costs nothing');
    // the hint is per card
    const choiceStore = await seeded({ a_w2: due(1) });
    const choiceSession = await start(choiceStore);
    assert.deepEqual(await applyReelAction(choiceStore, TG, tap(choiceSession, 'hint')), { stale: true });
  });

  test('untypeable words get a choice card even at a high bucket', async () => {
    const store = await seeded({ b_w1: due(5) });
    const session = await start(store, { size: 1 });
    assert.equal(current(session).kind, 'es');
  });
});

describe('v1 sessions and buttons', () => {
  const v1 = { sid: 'AbC-_9', queue: [{ id: 'a_w0', isNew: true }], pos: 0, revealed: false, known: 0, missed: 0, finished: false, messageId: 7 };

  test('a stored v1 session is stale for every action and takes no text', async () => {
    const store = await seeded();
    assert.equal(await store.casDoc(reelsKey(TG), 0, v1), true);
    for (const action of ['audio', 'study', 'next', 'hint', 'dontknow', 'legacy']) {
      assert.deepEqual(await applyReelAction(store, TG, { action, sid: 'AbC-_9', pos: 0 }), { stale: true }, action);
    }
    assert.deepEqual(await applyReelAction(store, TG, { action: 'choose', sid: 'AbC-_9', pos: 0, option: 0 }), { stale: true });
    assert.deepEqual(await answerTyped(store, TG, 'rojo', { index: quizIndex() }), { active: false });
    assert.deepEqual((await loadProgress(store, TG)).srs.words, {});
    assert.equal(await attachMessages(store, TG, 'AbC-_9', { messageId: 9 }), true, 'bookkeeping still works');
  });

  test('a v1 button on a v2 session is stale', async () => {
    const store = await seeded({ a_w2: due(1) });
    const session = await start(store);
    for (const code of ['v', 'k', 'g']) {
      const tapped = parseReelCallback(`r:${code}:${session.sid}:0`);
      assert.deepEqual(await applyReelAction(store, TG, tapped), { stale: true });
    }
    assert.equal((await getSession(store, TG)).pos, 0);
  });
});

describe('audio and cleanup', () => {
  test('audio is only available on study and feedback cards', async () => {
    const store = await seeded({ a_w2: due(1) });
    const session = await start(store);
    assert.deepEqual(await applyReelAction(store, TG, tap(session, 'audio')), { stale: true }, 'question card hides the answer');
    const wrong = await choose(store, session, wrongOption(session));
    assert.equal((await applyReelAction(store, TG, tap(wrong.session, 'audio'))).stale, false, 'feedback card');
    const next = await applyReelAction(store, TG, tap(wrong.session, 'next'));
    assert.equal(current(next.session).kind, 'study');
    assert.equal((await applyReelAction(store, TG, tap(next.session, 'audio'))).stale, false, 'study card');
  });

  test('advancing hands back the voice message to delete', async () => {
    const store = await seeded();
    const session = await start(store);
    assert.equal(await attachMessages(store, TG, session.sid, { messageId: 50, audioMessageId: 51 }), true);
    assert.equal(await attachMessages(store, TG, 'zzzzzz', { messageId: 1 }), false);
    const result = await applyReelAction(store, TG, tap(session, 'study'));
    assert.equal(result.staleAudioMessageId, 51);
    assert.equal(result.session.audioMessageId, null);
    assert.equal(result.session.messageId, 50);
  });
});

describe('finishing', () => {
  test('records activity and review XP for the bot device, once', async () => {
    const store = await seeded({ a_w2: due(1), a_w3: due(1) });
    let session = await start(store, { size: 2 });
    let result = await choose(store, session, rightOption(session));
    assert.equal(result.finished, false);
    assert.equal(totalXP(result.progress), 0);
    result = await choose(store, result.session, rightOption(result.session));
    assert.equal(result.finished, true);
    assert.equal(result.progress.xp[BOT_DEVICE_ID], XP_REWARDS.review);
    const today = new Date().toISOString().split('T')[0];
    assert.equal(result.progress.activity[today], true);
    assert.equal(result.progress.streak.current, 1);
    assert.deepEqual(await choose(store, result.session, 0), { stale: true });
    assert.deepEqual(await applyReelAction(store, TG, tap(result.session, 'next')), { stale: true });
  });

  test('finishing through "Next" after a last miss also pays XP', async () => {
    const store = await seeded({ a_w2: due(1) });
    let session = await start(store, { size: 1 });
    session = (await choose(store, session, wrongOption(session))).session;
    assert.equal(totalXP(await loadProgress(store, TG)), 0);
    // burn the two repeats
    for (let i = 0; i < 2; i++) {
      session = (await applyReelAction(store, TG, tap(session, 'next'))).session;
      session = (await choose(store, session, wrongOption(session))).session;
    }
    const last = await applyReelAction(store, TG, tap(session, 'next'));
    assert.equal(last.finished, true);
    assert.equal(last.progress.xp[BOT_DEVICE_ID], XP_REWARDS.review);
  });
});

describe('reels rendering', () => {
  const index = quizIndex();
  const base = { sid: 'AbC-_9', pos: 0, phase: 'ask', hinted: false, receipt: null, feedback: null, lang: 'ru' };

  test('no spoilers anywhere; study card shows both languages and escapes HTML', () => {
    const session = { ...base, queue: [{ id: 'a_w0', isNew: true, kind: 'study' }] };
    const { text, reply_markup } = renderCard(session, index);
    assert.equal(text, '🇪🇸 <b>el camarero</b>\n🇷🇺 официант\n🇺🇦 офіціант\n\n<i>Remember it — you will be asked in a moment.</i>\n\n<i>1/1 · Cosas &lt;&amp;&gt; · 🆕 new</i>');
    assert.doesNotMatch(text, /tg-spoiler/);
    assert.deepEqual(reply_markup.inline_keyboard[0].map((b) => b.callback_data), ['r:a:AbC-_9:0', 'r:s:AbC-_9:0']);
  });

  test('choose translation: four options, one per row, in the session language', () => {
    const queue = [{ id: 'a_w1', isNew: false, kind: 'tr', options: ['a_w3', 'a_w1', 'a_w2', 'a_w4'] }];
    const ru = renderCard({ ...base, queue }, index);
    assert.match(ru.text, /^🇪🇸 <b>la cuenta<\/b>\n\n<i>What does it mean\?<\/i>/);
    assert.deepEqual(ru.reply_markup.inline_keyboard.map((row) => row.map((b) => b.text)), [['книга'], ['счёт'], ['стол'], ['стул']]);
    assert.deepEqual(ru.reply_markup.inline_keyboard.flat().map((b) => b.callback_data), ['q:AbC-_9:0:0', 'q:AbC-_9:0:1', 'q:AbC-_9:0:2', 'q:AbC-_9:0:3']);
    const uk = renderCard({ ...base, lang: 'uk', queue }, index);
    assert.deepEqual(uk.reply_markup.inline_keyboard.flat().map((b) => b.text), ['книжка', 'рахунок', 'стіл', 'стілець']);
  });

  test('choose Spanish: translation shown, 2×2 grid of Spanish words', () => {
    const queue = [{ id: 'a_w1', isNew: false, kind: 'es', options: ['a_w3', 'a_w1', 'a_w2', 'a_w4'] }];
    const { text, reply_markup } = renderCard({ ...base, pos: 0, queue }, index);
    assert.match(text, /^🇷🇺 <b>счёт<\/b>\n\n<i>How do you say it\?<\/i>/);
    assert.deepEqual(reply_markup.inline_keyboard.map((row) => row.map((b) => b.text)), [['el libro', 'la cuenta'], ['la mesa', 'la silla']]);
  });

  test('the answer is never on a question card', () => {
    const queue = [{ id: 'a_w1', isNew: false, kind: 'type' }];
    const typed = renderCard({ ...base, queue }, index);
    assert.doesNotMatch(typed.text, /cuenta/);
    assert.match(typed.text, /счёт/);
    const feedback = renderCard({ ...base, phase: 'feedback', feedback: { chosen: 'a_w2' }, queue: [{ id: 'a_w1', isNew: false, kind: 'tr', options: ['a_w1', 'a_w2', 'a_w3', 'a_w4'] }] }, index);
    assert.match(feedback.text, /❌ стол\n✅ <b>la cuenta<\/b> — счёт/);
  });

  test('every button fits in 64 bytes of callback data', () => {
    const queue = [{ id: 'a_w1', isNew: false, kind: 'tr', options: ['a_w1', 'a_w2', 'a_w3', 'a_w4'] }];
    for (const view of [renderCard({ ...base, sid: 'AbC-_9', pos: 9999, queue: Array(10000).fill(queue[0]) }, index)]) {
      for (const b of view.reply_markup.inline_keyboard.flat()) assert.ok(Buffer.byteLength(b.callback_data) <= 64);
    }
  });

  test('summary shows counts, accuracy, streak, XP, due words and the words to repeat', () => {
    const progress = {
      srs: { words: { a_w0: { bucket: 0, dueDate: NOW - 1 }, a_w1: { bucket: 1, dueDate: NOW + HOUR } } },
      streak: { current: 3, longest: 5, lastActiveDate: '2026-11-02' },
      xp: { tg: 15, web1: 100 },
    };
    const session = { known: 9, missed: 3, missedIds: ['a_w1', 'a_w2'], lang: 'uk' };
    const { text, reply_markup } = renderSummary(session, progress, index, NOW);
    assert.match(text, /✅ 9 correct · ❌ 3 to repeat · accuracy 75 %/);
    assert.match(text, /Streak: 3 days/);
    assert.match(text, /XP: 115/);
    assert.match(text, /1 word due now/);
    assert.match(text, /Words to repeat<\/b>\n• la cuenta — рахунок\n• la mesa — стіл/);
    assert.deepEqual(reply_markup.inline_keyboard[0].map((b) => b.callback_data), ['r:n', 'p']);
    assert.equal(countDue(index, progress.srs.words, NOW), 1);
    assert.doesNotMatch(renderSummary({ known: 0, missed: 0 }, progress, index, NOW).text, /accuracy|Words to repeat/);
  });

  test('empty state', () => {
    assert.match(renderEmpty({ topicTitle: 'A<b>' }).text, /All caught up in <b>A&lt;b&gt;<\/b>/);
  });
});
