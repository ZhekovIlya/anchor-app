// ========================
// REELS QUIZ
// ========================
// Pure logic — no DOM, no browser APIs, no Node APIs. Randomness is injected
// (`random`, default Math.random) so tests are deterministic.
// Decides what kind of card a word gets, picks distractors, matches typed
// answers like the web app's submit check, and builds the v2 session queue.
//
// Card shape: { id, isNew, kind, options?, retest? }
//   kind 'study'  – word + translation, not graded; `retest` is the question
//                   that follows 3 cards later
//   kind 'tr'     – choose the translation of a Spanish word (options = word ids)
//   kind 'es'     – choose the Spanish word for a translation (options = word ids)
//   kind 'type'   – type the Spanish word
//   kind 'show'   – fallback when fewer than 3 distractors exist: show answer, graded wrong

import { buildReelsQueue } from './reels-queue.js';

const ARTICLE_RE = /^(el|la|los|las|un|una)\s+/;
export const OPTION_COUNT = 4;

// ========================
// ANSWER MATCHING
// ========================

function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] = a[i - 1] === b[j - 1]
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
    }
  }
  return matrix[a.length][b.length];
}

/** Lower-case, punctuation removed, single spaces (same as engine.js checkAnswer). */
export function normalizeAnswer(text) {
  return String(text || '').replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

const stripAccents = (text) => text.normalize('NFD').replace(/[̀-ͯ]/g, '');
const stripArticle = (text) => text.replace(ARTICLE_RE, '');

/**
 * Compare a typed answer with the Spanish word.
 * Exact (ignoring case and punctuation) → correct. Otherwise accent-insensitive
 * Levenshtein ≤ max(1, floor(len/6)) → correct but `almost`. The leading
 * article may be left out; if it is typed it must be the right one.
 * @returns {{ correct: boolean, almost: boolean }}
 */
export function matchTyped(input, target) {
  const typed = normalizeAnswer(input);
  const full = normalizeAnswer(target);
  if (!typed) return { correct: false, almost: false };
  const bare = stripArticle(full);
  if (typed === full || typed === bare) return { correct: true, almost: false };

  // A different article is a real mistake (gender), not a typo
  const typedArticle = ARTICLE_RE.exec(typed);
  const targetArticle = ARTICLE_RE.exec(full);
  if (typedArticle && targetArticle && typedArticle[1] !== targetArticle[1]) return { correct: false, almost: false };

  const closeTo = (candidate) => {
    const a = stripAccents(typed);
    const b = stripAccents(candidate);
    return levenshtein(a, b) <= Math.max(1, Math.floor(b.length / 6));
  };
  if (closeTo(full) || (bare !== full && !ARTICLE_RE.test(typed) && closeTo(bare))) {
    return { correct: true, almost: true };
  }
  return { correct: false, almost: false };
}

/** Words that are reasonable to type on a phone (no `+`, `/`, brackets…). */
export function isTypeable(es) {
  return /^[\p{L}\p{N}\s'’.,¡!¿?-]+$/u.test(String(es || '')) && normalizeAnswer(es).length > 0;
}

/** `la cuenta` → `l_ c_____`: first letter and length of every word. */
export function hintFor(es) {
  return String(es).split(/(\s+)/).map((part) => {
    if (/^\s+$/.test(part) || part.length === 0) return part;
    const chars = [...part];
    return chars[0] + chars.slice(1).map((c) => (/[\p{L}\p{N}]/u.test(c) ? '_' : c)).join('');
  }).join('');
}

// ========================
// CARD TYPES
// ========================

export const translationOf = (word, lang) => (lang === 'uk' ? word.uk : word.ru) || word.ru || word.uk || '';

/**
 * Card kind for a word the learner already has in SRS.
 * @param {Object} params
 * @param {number} params.bucket - SRS bucket
 * @param {boolean} params.typing - the `typing` setting
 * @param {string} params.es - the Spanish word (multi-word `+` entries are never typed)
 * @returns {'tr'|'es'|'type'}
 */
export function kindForBucket({ bucket, typing, es }) {
  if (bucket <= 1) return 'tr';
  if (bucket === 2) return 'es';
  return typing && isTypeable(es) ? 'type' : 'es';
}

// ========================
// DISTRACTORS
// ========================

/** Fisher–Yates on a copy. */
export function shuffle(items, random = Math.random) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const shapeOf = (es) => `${ARTICLE_RE.test(normalizeAnswer(es)) ? 'a' : 'n'}${/\s/.test(normalizeAnswer(es)) ? 'm' : 's'}`;

/**
 * Up to `count` wrong options for a word: same topic and shape first, then the
 * whole index. Never a word with the same Spanish text or the same translation
 * (in `lang`) as the answer or as an option already chosen.
 * @returns {string[]} word ids (fewer than `count` when the index is too small)
 */
export function pickDistractors(index, id, { lang = 'ru', random = Math.random, count = OPTION_COUNT - 1 } = {}) {
  const target = index.byId[id];
  if (!target) return [];
  const shape = shapeOf(target.es);
  const tiers = [[], [], [], []];
  for (const otherId of index.order) {
    if (otherId === id) continue;
    const other = index.byId[otherId];
    const sameTopic = other.topicId === target.topicId;
    const sameShape = shapeOf(other.es) === shape;
    tiers[(sameTopic ? 0 : 2) + (sameShape ? 0 : 1)].push(otherId);
  }
  const seen = new Set([normalizeAnswer(target.es), normalizeAnswer(translationOf(target, lang))]);
  const picked = [];
  for (const tier of tiers) {
    for (const otherId of shuffle(tier, random)) {
      const other = index.byId[otherId];
      const es = normalizeAnswer(other.es);
      const tr = normalizeAnswer(translationOf(other, lang));
      if (!es || !tr || seen.has(es) || seen.has(tr)) continue;
      seen.add(es);
      seen.add(tr);
      picked.push(otherId);
      if (picked.length === count) return picked;
    }
  }
  return picked;
}

/**
 * The question part of a card (kind + options) for a word.
 * Falls back to kind 'show' when there are not enough distractors.
 * @returns {{ kind: string, options?: string[] }}
 */
export function buildQuestion(index, id, kind, { lang = 'ru', random = Math.random } = {}) {
  if (kind === 'type') return { kind: 'type' };
  const distractors = pickDistractors(index, id, { lang, random });
  if (distractors.length < OPTION_COUNT - 1) return { kind: 'show' };
  return { kind, options: shuffle([id, ...distractors], random) };
}

// ========================
// QUEUE
// ========================

/**
 * The v2 session queue: the v1 selection (due first, then new), each word
 * turned into a card. New words get a study card that carries its re-test.
 * @param {Object} params - buildReelsQueue params plus
 * @param {boolean} [params.typing=true]
 * @param {'ru'|'uk'} [params.lang='ru']
 * @param {Function} [params.random=Math.random]
 */
export function buildQuizQueue({ index, srsWords, now, size = 12, topicId = null, typing = true, lang = 'ru', random = Math.random }) {
  const base = buildReelsQueue({ index, srsWords, now, size, topicId });
  return base.map(({ id, isNew }) => {
    if (isNew) {
      return { id, isNew: true, kind: 'study', retest: buildQuestion(index, id, 'tr', { lang, random }) };
    }
    const kind = kindForBucket({ bucket: srsWords[id].bucket || 0, typing, es: index.byId[id].es });
    return { id, isNew: false, ...buildQuestion(index, id, kind, { lang, random }) };
  });
}

/**
 * After "Got it" on a study card: put its re-test `gap` cards later.
 * @returns {Array} new queue
 */
export function insertRetest(queue, position, { gap = 3 } = {}) {
  const study = queue[position];
  if (!study) return queue;
  const question = study.retest || { kind: 'show' };
  const next = [...queue];
  next.splice(Math.min(position + gap, next.length), 0, { id: study.id, isNew: true, ...question });
  return next;
}

/**
 * After a wrong answer: ask the same question again `gap` cards later (options
 * in reverse order), at most `maxRepeats` extra times per word per session.
 * @returns {Array} new queue (input untouched)
 */
export function requeueWrong(queue, position, { gap = 3, maxRepeats = 2 } = {}) {
  const item = queue[position];
  if (!item) return queue;
  const asked = queue.filter((card) => card.id === item.id && card.kind !== 'study').length;
  if (asked - 1 >= maxRepeats) return queue;
  const again = { id: item.id, isNew: false, kind: item.kind };
  if (item.options) again.options = [...item.options].reverse();
  const next = [...queue];
  next.splice(Math.min(position + gap, next.length), 0, again);
  return next;
}
