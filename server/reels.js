// ========================
// REELS SESSIONS (v2: quiz cards)
// ========================
// Node-only. State machine behind the Telegram reels card. The bot asks, the
// learner answers, the bot grades:
//   study → "Got it" → (re-test 3 cards later)
//   ask (choose | type | show) → correct → next card (with a receipt line)
//                              → wrong   → feedback card → "Next" → next card
// The session lives in `anchor:u:{tgId}:reels` as a versioned doc (`v: 2`).
// Every tap carries the session id and card position; a tap that doesn't match
// the stored session is stale (double tap, old message) and changes nothing.
// The transition is claimed first, then progress is updated, so a double tap
// can never promote a word twice. Sessions stored by v1 (no `v`) are stale.

import { randomBytes } from 'node:crypto';
import { createSRS } from '../src/core/srs.js';
import { createGamification, XP_REWARDS } from '../src/core/gamification.js';
import { createDocStorage } from '../src/core/progress-adapter.js';
import {
  buildQuizQueue, insertRetest, requeueWrong, matchTyped, hintFor, translationOf,
} from '../src/core/reels-quiz.js';
import { SRS_KEY_WORDS } from '../src/core/constants.js';
import { totalXP } from '../src/core/sync-merge.js';
import { updateDoc } from './store.js';
import { loadProgress, updateProgress } from './progress.js';
import { escapeHtml } from './telegram.js';

export const BOT_DEVICE_ID = 'tg';
export const SESSION_VERSION = 2;
export const reelsKey = (tgId) => `anchor:u:${tgId}:reels`;

// r:<code>:<sid>:<pos>   and   q:<sid>:<pos>:<option>
const ACTIONS = { a: 'audio', s: 'study', x: 'next', h: 'hint', d: 'dontknow', v: 'legacy', k: 'legacy', g: 'legacy' };
const CREATABLE = { audio: 'a', study: 's', next: 'x', hint: 'h', dontknow: 'd' };
const SID_RE = /^[A-Za-z0-9_-]{6}$/;
const MAX_TYPED = 80;

// ========================
// CALLBACK DATA
// ========================

/**
 * callback_data for a card button (≤ 64 bytes).
 * @param {'audio'|'study'|'next'|'hint'|'dontknow'|'choose'} action
 * @param {Object} session
 * @param {number} [option] - 0–3, for 'choose'
 */
export function reelCallback(action, session, option) {
  if (action === 'choose') return `q:${session.sid}:${session.pos}:${option}`;
  return `r:${CREATABLE[action]}:${session.sid}:${session.pos}`;
}

/**
 * @returns {{ action: string, sid: string, pos: number, option?: number } | null}
 *   action 'legacy' = a v1 button (Reveal / Know / Again) still sitting in a chat
 */
export function parseReelCallback(data) {
  const text = String(data || '');
  const choose = /^q:([^:]+):(\d{1,4}):([0-3])$/.exec(text);
  if (choose) {
    if (!SID_RE.test(choose[1])) return null;
    return { action: 'choose', sid: choose[1], pos: Number(choose[2]), option: Number(choose[3]) };
  }
  const match = /^r:([asxhdvkg]):([^:]+):(\d{1,4})$/.exec(text);
  if (!match || !SID_RE.test(match[2])) return null;
  return { action: ACTIONS[match[1]], sid: match[2], pos: Number(match[3]) };
}

// ========================
// STATE
// ========================

/**
 * Number of words due for review right now (only words the bot knows about).
 */
export function countDue(index, srsWords, now) {
  let due = 0;
  for (const id of index.order) {
    if (srsWords[id] && srsWords[id].dueDate <= now) due++;
  }
  return due;
}

/**
 * Build and store a fresh session; any older session becomes stale.
 * @param {Object} params
 * @param {Object} params.index - buildWordIndex result
 * @param {number} params.now
 * @param {number} [params.size=12]
 * @param {string|null} [params.topicId]
 * @param {'ru'|'uk'} [params.lang='ru'] - translation language of the options
 * @param {boolean} [params.typing=true] - allow "type it" cards
 * @param {Function} [params.random=Math.random] - distractor picking / shuffling
 * @returns {Promise<Object>} the session ({ queue: [] } when there is nothing to show)
 */
export async function startReels(store, tgId, {
  index, now, size = 12, topicId = null, lang = 'ru', typing = true, random = Math.random,
  sid = randomBytes(4).toString('base64url'),
}) {
  const progress = await loadProgress(store, tgId);
  const queue = buildQuizQueue({ index, srsWords: progress.srs.words, now, size, topicId, typing, lang, random });
  const session = {
    v: SESSION_VERSION,
    sid,
    queue,
    pos: 0,
    phase: 'ask',
    hinted: false,
    receipt: null,
    feedback: null,
    known: 0,
    missed: 0,
    missedIds: [],
    topicId,
    lang,
    startedAt: now,
    messageId: null,
    audioMessageId: null,
    finished: queue.length === 0,
  };
  await updateDoc(store, reelsKey(tgId), () => session);
  return session;
}

/**
 * @returns {Promise<Object|null>} the current session
 */
export async function getSession(store, tgId) {
  const current = await store.getDoc(reelsKey(tgId));
  return current ? current.doc : null;
}

const isLive = (session) => Boolean(session && session.v === SESSION_VERSION && !session.finished);

/**
 * The card a text message would answer, or null.
 */
export function activeTypedCard(session) {
  if (!isLive(session) || session.phase !== 'ask') return null;
  const card = session.queue[session.pos];
  return card && card.kind === 'type' ? card : null;
}

/**
 * Change the session only if it is still live at `sid`/`pos` and `guard` allows it.
 * @param {Function} guard - (session, card) => boolean
 * @param {Function} change - (session, card) => void, edits in place
 * @returns {Promise<{ before: Object, session: Object } | null>} null when stale
 */
async function claim(store, tgId, sid, pos, guard, change) {
  let before = null;
  const { doc, written } = await updateDoc(store, reelsKey(tgId), (session) => {
    if (!isLive(session) || session.sid !== sid || session.pos !== pos) return undefined;
    const card = session.queue[pos];
    if (!card || !guard(session, card)) return undefined;
    before = JSON.parse(JSON.stringify(session));
    change(session, card);
    return session;
  });
  return written ? { before, session: doc } : null;
}

/**
 * Remember which message shows the card (and which voice message to clean up).
 * With `pos`, only while the session is still on that card.
 */
export async function attachMessages(store, tgId, sid, { messageId, audioMessageId, pos } = {}) {
  const { written } = await updateDoc(store, reelsKey(tgId), (session) => {
    if (!session || session.sid !== sid) return undefined;
    if (pos !== undefined && (session.pos !== pos || session.finished)) return undefined;
    if (messageId !== undefined) session.messageId = messageId;
    if (audioMessageId !== undefined) session.audioMessageId = audioMessageId;
    return session;
  });
  return written;
}

// ========================
// TRANSITIONS
// ========================

function moveOn(session) {
  session.pos++;
  session.phase = 'ask';
  session.hinted = false;
  session.feedback = null;
  session.audioMessageId = null;
  session.finished = session.pos >= session.queue.length;
}

/** Record an answer: correct moves on with a receipt, wrong requeues and shows feedback. */
function recordAnswer(session, card, correct, { almost = false, feedback = null } = {}) {
  if (correct) {
    session.known++;
    moveOn(session);
    session.receipt = { id: card.id, almost };
    return;
  }
  session.missed++;
  if (!session.missedIds.includes(card.id)) session.missedIds.push(card.id);
  session.queue = requeueWrong(session.queue, session.pos);
  session.phase = 'feedback';
  session.feedback = feedback;
  session.receipt = null;
}

/**
 * Claim a transition, then grade it in the progress doc.
 * @returns {Promise<Object>} { stale: true } or { stale: false, session, card, finished, changed, staleAudioMessageId, progress?, correct? }
 */
async function run(store, tgId, { sid, pos }, guard, change) {
  let outcome = {};
  const result = await claim(store, tgId, sid, pos, guard, (session, card) => { outcome = change(session, card) || {}; });
  if (!result) return { stale: true };
  const { session } = result;
  const card = result.before.queue[pos];
  const graded = outcome.correct !== undefined;

  let progress;
  if (graded || session.finished) {
    progress = await updateProgress(store, tgId, (doc) => {
      const storage = createDocStorage(doc, { deviceId: BOT_DEVICE_ID });
      if (graded) {
        const srs = createSRS(storage, SRS_KEY_WORDS);
        if (!outcome.correct) srs.demote(card.id);
        else if (card.isNew) srs.registerNew(card.id);
        else srs.promote(card.id);
      }
      if (session.finished) {
        const gamification = createGamification(storage);
        gamification.recordActivity();
        gamification.addXP(XP_REWARDS.review);
      }
    });
  }
  return {
    stale: false,
    session,
    card,
    finished: session.finished,
    changed: true,
    staleAudioMessageId: result.before.audioMessageId || null,
    progress,
    correct: outcome.correct,
    almost: Boolean(outcome.almost),
  };
}

const isChoice = (card) => (card.kind === 'tr' || card.kind === 'es') && Array.isArray(card.options);

/**
 * Apply one tap.
 * @param {Object} tap - from parseReelCallback
 */
export async function applyReelAction(store, tgId, tap) {
  const { action, sid, pos } = tap;

  if (action === 'audio') {
    // Read-only: only where it cannot give the answer away (study + feedback)
    const session = await getSession(store, tgId);
    if (!isLive(session) || session.sid !== sid || session.pos !== pos) return { stale: true };
    const card = session.queue[pos];
    if (!card || !(session.phase === 'feedback' || card.kind === 'study')) return { stale: true };
    return { stale: false, session, card, finished: false, changed: false };
  }

  if (action === 'hint') {
    const result = await claim(store, tgId, sid, pos,
      (session, card) => session.phase === 'ask' && card.kind === 'type',
      (session) => { session.hinted = true; });
    if (!result) return { stale: true };
    return { stale: false, session: result.session, card: result.session.queue[pos], finished: false, changed: !result.before.hinted };
  }

  if (action === 'study') {
    return run(store, tgId, tap,
      (session, card) => session.phase === 'ask' && card.kind === 'study',
      (session) => {
        session.queue = insertRetest(session.queue, session.pos);
        moveOn(session);
        session.receipt = null;
      });
  }

  if (action === 'choose') {
    return run(store, tgId, tap,
      (session, card) => session.phase === 'ask' && isChoice(card) && tap.option < card.options.length,
      (session, card) => {
        const chosen = card.options[tap.option];
        const correct = chosen === card.id;
        recordAnswer(session, card, correct, { feedback: { chosen } });
        return { correct };
      });
  }

  if (action === 'dontknow') {
    return run(store, tgId, tap,
      (session, card) => session.phase === 'ask' && (card.kind === 'type' || card.kind === 'show'),
      (session, card) => {
        recordAnswer(session, card, false, { feedback: { dontKnow: true } });
        return { correct: false };
      });
  }

  if (action === 'next') {
    return run(store, tgId, tap,
      (session) => session.phase === 'feedback',
      (session) => {
        moveOn(session);
        session.receipt = null;
      });
  }

  return { stale: true }; // legacy v1 buttons and anything unknown
}

/**
 * Grade a typed answer (a plain chat message) against the active "type it" card.
 * @param {string} text - the message text
 * @param {Object} context
 * @param {Object} context.index - buildWordIndex result
 * @returns {Promise<Object>} { active: false } when no typed card is waiting,
 *   otherwise the same shape as applyReelAction
 */
export async function answerTyped(store, tgId, text, { index }) {
  if (typeof text !== 'string') return { active: false };
  const session = await getSession(store, tgId);
  const waiting = activeTypedCard(session);
  if (!waiting) return { active: false };
  const word = index.byId[waiting.id];
  const match = matchTyped(text, word ? word.es : '');
  const result = await run(store, tgId, { sid: session.sid, pos: session.pos },
    (current, card) => current.phase === 'ask' && card.kind === 'type',
    (current, card) => {
      recordAnswer(current, card, match.correct, {
        almost: match.almost,
        feedback: { typed: text.trim().slice(0, MAX_TYPED) },
      });
      return { correct: match.correct, almost: match.almost };
    });
  return { active: true, ...result };
}

// ========================
// RENDERING (parse_mode HTML)
// ========================

const MAX_BUTTON = 60;
const clip = (text) => (text.length > MAX_BUTTON ? `${text.slice(0, MAX_BUTTON - 1)}…` : text);

const AUDIO_BUTTON = (session) => ({ text: '🔊 Audio', callback_data: reelCallback('audio', session) });

function receiptLine(receipt, index, lang) {
  const word = index.byId[receipt.id];
  if (!word) return null;
  const answer = `${escapeHtml(word.es)} — ${escapeHtml(translationOf(word, lang))}`;
  return receipt.almost ? `✅ almost — written: ${answer}` : `✅ ${answer}`;
}

function optionLabel(card, optionId, index, lang) {
  const word = index.byId[optionId];
  return clip(card.kind === 'tr' ? translationOf(word, lang) : word.es);
}

/**
 * The card for the current position (question, study card or feedback).
 * @param {Object} session
 * @param {Object} index - buildWordIndex result
 * @param {Object} [options]
 * @param {'ru'|'uk'} [options.lang='ru'] - used only when the session has no language
 * @returns {{ text: string, reply_markup: Object }}
 */
export function renderCard(session, index, options = {}) {
  const lang = session.lang || options.lang || 'ru';
  const card = session.queue[session.pos];
  const word = index.byId[card.id];
  const lines = [];
  const rows = [];

  if (session.phase === 'feedback') {
    const fb = session.feedback || {};
    if (fb.dontKnow) lines.push("🤷 Don't know");
    else if (fb.typed !== undefined) lines.push(`❌ ${escapeHtml(fb.typed)}`);
    else if (fb.chosen && index.byId[fb.chosen]) lines.push(`❌ ${escapeHtml(optionLabel(card, fb.chosen, index, lang))}`);
    else lines.push('❌');
    lines.push(`✅ <b>${escapeHtml(word.es)}</b> — ${escapeHtml(translationOf(word, lang))}`);
    rows.push([AUDIO_BUTTON(session), { text: 'Next ➡️', callback_data: reelCallback('next', session) }]);
  } else {
    if (session.receipt) {
      const receipt = receiptLine(session.receipt, index, lang);
      if (receipt) lines.push(receipt, '');
    }
    if (card.kind === 'study') {
      lines.push(`🇪🇸 <b>${escapeHtml(word.es)}</b>`, `🇷🇺 ${escapeHtml(word.ru || '—')}`, `🇺🇦 ${escapeHtml(word.uk || '—')}`,
        '', '<i>Remember it — you will be asked in a moment.</i>');
      rows.push([AUDIO_BUTTON(session), { text: 'Got it ➡️', callback_data: reelCallback('study', session) }]);
    } else if (card.kind === 'tr') {
      lines.push(`🇪🇸 <b>${escapeHtml(word.es)}</b>`, '', '<i>What does it mean?</i>');
      card.options.forEach((optionId, i) => {
        rows.push([{ text: optionLabel(card, optionId, index, lang), callback_data: reelCallback('choose', session, i) }]);
      });
    } else if (card.kind === 'es') {
      lines.push(`${lang === 'uk' ? '🇺🇦' : '🇷🇺'} <b>${escapeHtml(translationOf(word, lang))}</b>`, '', '<i>How do you say it?</i>');
      const buttons = card.options.map((optionId, i) => ({
        text: optionLabel(card, optionId, index, lang), callback_data: reelCallback('choose', session, i),
      }));
      for (let i = 0; i < buttons.length; i += 2) rows.push(buttons.slice(i, i + 2));
    } else if (card.kind === 'type') {
      lines.push(`${lang === 'uk' ? '🇺🇦' : '🇷🇺'} <b>${escapeHtml(translationOf(word, lang))}</b>`, '',
        '<i>Type it in Spanish — send your answer as a message.</i>');
      if (session.hinted) lines.push(`💡 <code>${escapeHtml(hintFor(word.es))}</code>`);
      const row = [];
      if (!session.hinted) row.push({ text: '💡 Hint', callback_data: reelCallback('hint', session) });
      row.push({ text: "🤷 Don't know", callback_data: reelCallback('dontknow', session) });
      rows.push(row);
    } else {
      lines.push(`${lang === 'uk' ? '🇺🇦' : '🇷🇺'} <b>${escapeHtml(translationOf(word, lang))}</b>`, '', '<i>Do you remember the Spanish word?</i>');
      rows.push([{ text: '👁 Show answer', callback_data: reelCallback('dontknow', session) }]);
    }
  }

  const badge = card.isNew ? '🆕 new' : '🔁 review';
  lines.push('', `<i>${session.pos + 1}/${session.queue.length} · ${escapeHtml(word.topicTitle)} · ${badge}</i>`);
  return { text: lines.join('\n'), reply_markup: { inline_keyboard: rows } };
}

const SUMMARY_BUTTONS = {
  inline_keyboard: [[
    { text: '▶️ Next', callback_data: 'r:n' },
    { text: '📊 Progress', callback_data: 'p' },
  ]],
};

const MAX_MISSED_LISTED = 15;

/**
 * End-of-session card.
 * @param {Object} session - finished session
 * @param {Object} progress - progress doc after the last tap
 * @param {Object} index - buildWordIndex result
 * @param {number} now
 */
export function renderSummary(session, progress, index, now) {
  const due = countDue(index, progress.srs.words, now);
  const answered = session.known + session.missed;
  const accuracy = answered ? ` · accuracy ${Math.round((session.known / answered) * 100)} %` : '';
  const lang = session.lang || 'ru';
  const lines = [
    '🏁 <b>Session complete</b>',
    '',
    `✅ ${session.known} correct · ❌ ${session.missed} to repeat${accuracy}`,
    `🔥 Streak: ${progress.streak.current} day${progress.streak.current === 1 ? '' : 's'}`,
    `⭐ XP: ${totalXP(progress)} (+${XP_REWARDS.review})`,
    due > 0 ? `📚 ${due} word${due === 1 ? '' : 's'} due now` : '📚 Nothing due right now',
  ];
  const missed = (session.missedIds || []).map((id) => index.byId[id]).filter(Boolean);
  if (missed.length) {
    lines.push('', '<b>Words to repeat</b>');
    for (const word of missed.slice(0, MAX_MISSED_LISTED)) {
      lines.push(`• ${escapeHtml(word.es)} — ${escapeHtml(translationOf(word, lang))}`);
    }
    if (missed.length > MAX_MISSED_LISTED) lines.push(`… and ${missed.length - MAX_MISSED_LISTED} more`);
  }
  return { text: lines.join('\n'), reply_markup: SUMMARY_BUTTONS };
}

/**
 * Shown instead of a card when the queue is empty.
 */
export function renderEmpty({ topicTitle = null } = {}) {
  const scope = topicTitle ? ` in <b>${escapeHtml(topicTitle)}</b>` : '';
  return {
    text: `🎉 All caught up${scope}! Nothing is due and there are no new words left.`,
    reply_markup: { inline_keyboard: [[{ text: '📊 Progress', callback_data: 'p' }]] },
  };
}
