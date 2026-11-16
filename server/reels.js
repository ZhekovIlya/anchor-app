// ========================
// REELS SESSIONS
// ========================
// Node-only. State machine behind the Telegram reels card:
//   start → (reveal | audio)* → know | again → … → finished (summary card)
// The session lives in `anchor:u:{tgId}:reels` as a versioned doc. Every tap
// carries the session id and card position; a tap that doesn't match the
// stored session is stale (double tap, old message) and changes nothing.
// The transition is claimed first, then progress is updated, so a double tap
// can never promote a word twice.

import { randomBytes } from 'node:crypto';
import { createSRS } from '../src/core/srs.js';
import { createGamification, XP_REWARDS } from '../src/core/gamification.js';
import { createDocStorage } from '../src/core/progress-adapter.js';
import { buildReelsQueue, requeueMissed } from '../src/core/reels-queue.js';
import { SRS_KEY_WORDS } from '../src/core/constants.js';
import { totalXP } from '../src/core/sync-merge.js';
import { updateDoc } from './store.js';
import { loadProgress, updateProgress } from './progress.js';
import { escapeHtml } from './telegram.js';

export const BOT_DEVICE_ID = 'tg';
export const reelsKey = (tgId) => `anchor:u:${tgId}:reels`;

const ACTIONS = { a: 'audio', v: 'reveal', k: 'know', g: 'again' };
const SID_RE = /^[A-Za-z0-9_-]{6}$/;

// ========================
// CALLBACK DATA
// ========================

/**
 * callback_data for a card button: `r:<a|v|k|g>:<sid>:<pos>` (≤ 64 bytes).
 */
export function reelCallback(action, session) {
  const code = Object.keys(ACTIONS).find((key) => ACTIONS[key] === action);
  return `r:${code}:${session.sid}:${session.pos}`;
}

/**
 * @returns {{ action: 'audio'|'reveal'|'know'|'again', sid: string, pos: number } | null}
 */
export function parseReelCallback(data) {
  const match = /^r:([avkg]):([^:]+):(\d{1,4})$/.exec(String(data || ''));
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
 * @returns {Promise<Object>} the session ({ queue: [] } when there is nothing to show)
 */
export async function startReels(store, tgId, { index, now, size = 12, topicId = null, sid = randomBytes(4).toString('base64url') }) {
  const progress = await loadProgress(store, tgId);
  const queue = buildReelsQueue({ index, srsWords: progress.srs.words, now, size, topicId });
  const session = {
    sid,
    queue,
    pos: 0,
    revealed: false,
    known: 0,
    missed: 0,
    topicId,
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

/**
 * Change the session only if it is still at `sid`/`pos` and not finished.
 * @param {Function} change - (session) => void, edits in place
 * @returns {Promise<{ before: Object, session: Object } | null>} null when stale
 */
async function claim(store, tgId, sid, pos, change) {
  let before = null;
  const { doc, written } = await updateDoc(store, reelsKey(tgId), (session) => {
    if (!session || session.finished || session.sid !== sid || session.pos !== pos) return undefined;
    before = JSON.parse(JSON.stringify(session));
    change(session);
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

/**
 * Apply one tap.
 * @param {Object} tap - { action, sid, pos } from parseReelCallback
 * @returns {Promise<Object>} { stale: true } or
 *   { stale: false, session, card, finished, staleAudioMessageId, progress? }
 */
export async function applyReelAction(store, tgId, tap) {
  const { action, sid, pos } = tap;

  if (action === 'reveal') {
    const result = await claim(store, tgId, sid, pos, (session) => { session.revealed = true; });
    if (!result) return { stale: true };
    return { stale: false, session: result.session, card: result.session.queue[pos], finished: false, changed: !result.before.revealed };
  }

  if (action === 'audio') {
    // Read-only: the card stays where it is (tts handling lives in the bot)
    const session = await getSession(store, tgId);
    if (!session || session.finished || session.sid !== sid || session.pos !== pos) return { stale: true };
    return { stale: false, session, card: session.queue[pos], finished: false, changed: false };
  }

  if (action !== 'know' && action !== 'again') return { stale: true };

  const result = await claim(store, tgId, sid, pos, (session) => {
    if (action === 'again') {
      session.queue = requeueMissed(session.queue, pos);
      session.missed++;
    } else {
      session.known++;
    }
    session.pos++;
    session.revealed = false;
    session.audioMessageId = null;
    session.finished = session.pos >= session.queue.length;
  });
  if (!result) return { stale: true };

  const card = result.before.queue[pos];
  const { session } = result;
  const progress = await updateProgress(store, tgId, (doc) => {
    const storage = createDocStorage(doc, { deviceId: BOT_DEVICE_ID });
    const srs = createSRS(storage, SRS_KEY_WORDS);
    if (action === 'again') srs.demote(card.id);
    else if (card.isNew) srs.registerNew(card.id);
    else srs.promote(card.id);
    if (session.finished) {
      const gamification = createGamification(storage);
      gamification.recordActivity();
      gamification.addXP(XP_REWARDS.review);
    }
  });

  return {
    stale: false,
    session,
    card,
    finished: session.finished,
    changed: true,
    staleAudioMessageId: result.before.audioMessageId || null,
    progress,
  };
}

// ========================
// RENDERING (parse_mode HTML)
// ========================

const translation = (word, lang) => (lang === 'uk' ? word.uk : word.ru) || word.ru || word.uk || '';

/**
 * The card for the current position.
 * @param {Object} session
 * @param {Object} index - buildWordIndex result
 * @param {Object} [options]
 * @param {'ru'|'uk'} [options.lang='ru']
 * @returns {{ text: string, reply_markup: Object }}
 */
export function renderCard(session, index, { lang = 'ru' } = {}) {
  const card = session.queue[session.pos];
  const word = index.byId[card.id];
  const lines = [`🇪🇸 <b>${escapeHtml(word.es)}</b>`];
  if (session.revealed) {
    lines.push(`🇷🇺 ${escapeHtml(word.ru || '—')}`, `🇺🇦 ${escapeHtml(word.uk || '—')}`);
  } else {
    lines.push(`<tg-spoiler>${escapeHtml(translation(word, lang))}</tg-spoiler>`);
  }
  const badge = card.isNew ? '🆕 new' : '🔁 review';
  lines.push('', `<i>${session.pos + 1}/${session.queue.length} · ${escapeHtml(word.topicTitle)} · ${badge}</i>`);

  const topRow = [{ text: '🔊 Audio', callback_data: reelCallback('audio', session) }];
  if (!session.revealed) topRow.push({ text: '👁 Reveal', callback_data: reelCallback('reveal', session) });
  return {
    text: lines.join('\n'),
    reply_markup: {
      inline_keyboard: [
        topRow,
        [
          { text: '❌ Again', callback_data: reelCallback('again', session) },
          { text: '✅ Know', callback_data: reelCallback('know', session) },
        ],
      ],
    },
  };
}

const SUMMARY_BUTTONS = {
  inline_keyboard: [[
    { text: '▶️ Next', callback_data: 'r:n' },
    { text: '📊 Progress', callback_data: 'p' },
  ]],
};

/**
 * End-of-session card.
 * @param {Object} session - finished session
 * @param {Object} progress - progress doc after the last tap
 * @param {Object} index - buildWordIndex result
 * @param {number} now
 */
export function renderSummary(session, progress, index, now) {
  const due = countDue(index, progress.srs.words, now);
  const lines = [
    '🏁 <b>Session complete</b>',
    '',
    `✅ ${session.known} known · ❌ ${session.missed} again`,
    `🔥 Streak: ${progress.streak.current} day${progress.streak.current === 1 ? '' : 's'}`,
    `⭐ XP: ${totalXP(progress)} (+${XP_REWARDS.review})`,
    due > 0 ? `📚 ${due} word${due === 1 ? '' : 's'} due now` : '📚 Nothing due right now',
  ];
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
