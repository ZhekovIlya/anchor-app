import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore } from '../server/store.js';
import { loadProgress, updateProgress } from '../server/progress.js';
import {
  startReels, getSession, applyReelAction, attachMessages, parseReelCallback, reelCallback,
  renderCard, renderSummary, renderEmpty, countDue, BOT_DEVICE_ID,
} from '../server/reels.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { totalXP } from '../src/core/sync-merge.js';
import { XP_REWARDS } from '../src/core/gamification.js';

const TG = '111';
const NOW = Date.now();
const HOUR = 3600000;

function tinyIndex() {
  return buildWordIndex([
    { id: 't1', title: 'Cosas <&>', lessons: [
      { id: 'a', title: 'A', words: [
        { es: 'el camarero', ru: 'официант', uk: 'офіціант', meta: { id: 'a_w0' } },
        { es: 'la cuenta', ru: 'счёт', uk: 'рахунок', meta: { id: 'a_w1' } },
        { es: 'la mesa', ru: 'стол', uk: 'стіл', meta: { id: 'a_w2' } },
      ] },
    ] },
  ]);
}

async function seeded(srsWords = {}) {
  const store = createMemoryStore();
  if (Object.keys(srsWords).length) {
    await updateProgress(store, TG, (doc) => { doc.srs.words = srsWords; });
  }
  return store;
}

const tap = (session, action) => ({ action, sid: session.sid, pos: session.pos });

describe('reel callback data', () => {
  test('round-trips and stays within 64 bytes', () => {
    const session = { sid: 'AbC-_9', pos: 17 };
    for (const action of ['audio', 'reveal', 'know', 'again']) {
      const data = reelCallback(action, session);
      assert.ok(Buffer.byteLength(data) <= 64);
      assert.deepEqual(parseReelCallback(data), { action, sid: 'AbC-_9', pos: 17 });
    }
  });

  test('rejects malformed data', () => {
    for (const data of ['', 'r:x:AbC-_9:1', 'r:k:short:1', 'r:k:AbC-_9:', 'r:k:AbC-_9:-1', 'r:n', 'p', null]) {
      assert.equal(parseReelCallback(data), null, String(data));
    }
  });
});

describe('reels session', () => {
  test('start builds a queue (due first) and stores it', async () => {
    const store = await seeded({ a_w2: { bucket: 1, dueDate: NOW - HOUR } });
    const session = await startReels(store, TG, { index: tinyIndex(), now: NOW, size: 12 });
    assert.match(session.sid, /^[A-Za-z0-9_-]{6}$/);
    assert.deepEqual(session.queue, [
      { id: 'a_w2', isNew: false }, { id: 'a_w0', isNew: true }, { id: 'a_w1', isNew: true },
    ]);
    assert.equal(session.finished, false);
    assert.deepEqual(await getSession(store, TG), session);
  });

  test('know: registerNew for a new card, promote for a review card', async () => {
    const store = await seeded({ a_w2: { bucket: 1, dueDate: NOW - HOUR } });
    let session = await startReels(store, TG, { index: tinyIndex(), now: NOW });
    let result = await applyReelAction(store, TG, tap(session, 'know'));
    assert.equal(result.stale, false);
    assert.equal(result.card.id, 'a_w2');
    assert.equal(result.session.pos, 1);
    assert.equal(result.progress.srs.words.a_w2.bucket, 2);

    session = result.session;
    result = await applyReelAction(store, TG, tap(session, 'know'));
    const entry = result.progress.srs.words.a_w0;
    assert.equal(entry.bucket, 0);
    assert.ok(entry.dueDate > NOW + 23 * HOUR, 'new words are due in a day');
    assert.ok(entry.updatedAt > 0);
  });

  test('again: demotes, marks a mistake and re-queues the word, at most twice', async () => {
    const store = await seeded();
    let session = await startReels(store, TG, { index: tinyIndex(), now: NOW });
    const result = await applyReelAction(store, TG, tap(session, 'again'));
    assert.equal(result.progress.srs.words.a_w0.bucket, 0);
    assert.equal(result.progress.srs.words.a_w0.isMistake, true);
    assert.deepEqual(result.session.queue.map((c) => c.id), ['a_w0', 'a_w1', 'a_w2', 'a_w0']);
    assert.equal(result.session.missed, 1);

    session = result.session;
    session = (await applyReelAction(store, TG, tap(session, 'know'))).session;
    session = (await applyReelAction(store, TG, tap(session, 'know'))).session;
    assert.equal(session.queue[session.pos].isNew, false);
    session = (await applyReelAction(store, TG, tap(session, 'again'))).session; // repeat 2
    session = (await applyReelAction(store, TG, tap(session, 'again'))).session; // no repeat 3
    assert.deepEqual(session.queue.map((c) => c.id), ['a_w0', 'a_w1', 'a_w2', 'a_w0', 'a_w0']);
    assert.equal(session.finished, true);
  });

  test('stale taps are ignored: wrong sid, wrong pos, double tap, finished session', async () => {
    const store = await seeded();
    const session = await startReels(store, TG, { index: tinyIndex(), now: NOW });
    assert.deepEqual(await applyReelAction(store, TG, { action: 'know', sid: 'zzzzzz', pos: 0 }), { stale: true });
    assert.deepEqual(await applyReelAction(store, TG, { action: 'know', sid: session.sid, pos: 2 }), { stale: true });

    const first = await applyReelAction(store, TG, tap(session, 'know'));
    assert.equal(first.stale, false);
    assert.deepEqual(await applyReelAction(store, TG, tap(session, 'know')), { stale: true }, 'double tap');
    assert.equal((await loadProgress(store, TG)).srs.words.a_w0.bucket, 0, 'promoted only once');

    // a new session makes the old one's buttons stale
    const next = await startReels(store, TG, { index: tinyIndex(), now: NOW });
    assert.notEqual(next.sid, session.sid);
    assert.deepEqual(await applyReelAction(store, TG, tap(first.session, 'know')), { stale: true });
    assert.deepEqual(await applyReelAction(store, TG, { action: 'know', sid: 'x', pos: 0 }), { stale: true });
    assert.equal(await applyReelAction(store, TG, { action: 'know', sid: next.sid, pos: 0 }).then((r) => r.stale), false);
  });

  test('concurrent double tap only advances once', async () => {
    const store = await seeded();
    const session = await startReels(store, TG, { index: tinyIndex(), now: NOW });
    const results = await Promise.all([
      applyReelAction(store, TG, tap(session, 'know')),
      applyReelAction(store, TG, tap(session, 'know')),
    ]);
    assert.equal(results.filter((r) => !r.stale).length, 1);
    assert.equal((await getSession(store, TG)).pos, 1);
  });

  test('reveal is idempotent and does not touch progress', async () => {
    const store = await seeded();
    const session = await startReels(store, TG, { index: tinyIndex(), now: NOW });
    const first = await applyReelAction(store, TG, tap(session, 'reveal'));
    assert.equal(first.session.revealed, true);
    assert.equal(first.changed, true);
    const second = await applyReelAction(store, TG, tap(session, 'reveal'));
    assert.equal(second.changed, false);
    assert.deepEqual((await loadProgress(store, TG)).srs.words, {});
    // advancing hides the translation again
    const next = await applyReelAction(store, TG, tap(session, 'know'));
    assert.equal(next.session.revealed, false);
  });

  test('advancing hands back the voice message to delete', async () => {
    const store = await seeded();
    const session = await startReels(store, TG, { index: tinyIndex(), now: NOW });
    assert.equal((await applyReelAction(store, TG, tap(session, 'audio'))).stale, false);
    assert.equal(await attachMessages(store, TG, session.sid, { messageId: 50, audioMessageId: 51 }), true);
    assert.equal(await attachMessages(store, TG, 'zzzzzz', { messageId: 1 }), false);
    const result = await applyReelAction(store, TG, tap(session, 'know'));
    assert.equal(result.staleAudioMessageId, 51);
    assert.equal(result.session.audioMessageId, null);
    assert.equal(result.session.messageId, 50);
  });

  test('finishing records activity and review XP for the bot device', async () => {
    const store = await seeded();
    let session = await startReels(store, TG, { index: tinyIndex(), now: NOW, size: 2 });
    let result = await applyReelAction(store, TG, tap(session, 'know'));
    assert.equal(result.finished, false);
    assert.equal(totalXP(result.progress), 0);
    result = await applyReelAction(store, TG, tap(result.session, 'know'));
    assert.equal(result.finished, true);
    assert.equal(result.progress.xp[BOT_DEVICE_ID], XP_REWARDS.review);
    const today = new Date().toISOString().split('T')[0];
    assert.equal(result.progress.activity[today], true);
    assert.equal(result.progress.streak.current, 1);
    assert.deepEqual(await applyReelAction(store, TG, tap(result.session, 'know')), { stale: true });
  });

  test('empty queue yields a finished session', async () => {
    const store = await seeded();
    const session = await startReels(store, TG, { index: tinyIndex(), now: NOW, topicId: 'nope' });
    assert.deepEqual(session.queue, []);
    assert.equal(session.finished, true);
  });
});

describe('reels rendering', () => {
  const session = { sid: 'AbC-_9', pos: 0, queue: [{ id: 'a_w0', isNew: true }, { id: 'a_w1', isNew: false }], revealed: false };

  test('card hides the chosen translation in a spoiler and escapes HTML', () => {
    const { text, reply_markup } = renderCard(session, tinyIndex(), { lang: 'uk' });
    assert.equal(text, '🇪🇸 <b>el camarero</b>\n<tg-spoiler>офіціант</tg-spoiler>\n\n<i>1/2 · Cosas &lt;&amp;&gt; · 🆕 new</i>');
    assert.deepEqual(reply_markup.inline_keyboard.flat().map((b) => b.callback_data),
      ['r:a:AbC-_9:0', 'r:v:AbC-_9:0', 'r:g:AbC-_9:0', 'r:k:AbC-_9:0']);
  });

  test('revealed card shows RU and UK and drops the Reveal button', () => {
    const { text, reply_markup } = renderCard({ ...session, pos: 1, revealed: true }, tinyIndex());
    assert.match(text, /🇷🇺 счёт\n🇺🇦 рахунок/);
    assert.doesNotMatch(text, /tg-spoiler/);
    assert.match(text, /2\/2 · .* · 🔁 review/);
    assert.deepEqual(reply_markup.inline_keyboard[0].map((b) => b.text), ['🔊 Audio']);
  });

  test('summary shows counts, streak, XP and due words', () => {
    const progress = {
      srs: { words: { a_w0: { bucket: 0, dueDate: NOW - 1 }, a_w1: { bucket: 1, dueDate: NOW + HOUR } } },
      streak: { current: 3, longest: 5, lastActiveDate: '2026-11-02' },
      xp: { tg: 15, web1: 100 },
    };
    const { text, reply_markup } = renderSummary({ known: 4, missed: 2 }, progress, tinyIndex(), NOW);
    assert.match(text, /✅ 4 known · ❌ 2 again/);
    assert.match(text, /Streak: 3 days/);
    assert.match(text, /XP: 115/);
    assert.match(text, /1 word due now/);
    assert.deepEqual(reply_markup.inline_keyboard[0].map((b) => b.callback_data), ['r:n', 'p']);
    assert.equal(countDue(tinyIndex(), progress.srs.words, NOW), 1);
  });

  test('empty state', () => {
    assert.match(renderEmpty({ topicTitle: 'A<b>' }).text, /All caught up in <b>A&lt;b&gt;<\/b>/);
  });
});
