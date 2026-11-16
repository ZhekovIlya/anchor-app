// ========================
// PROGRESS SYNC — MERGE
// ========================
// Pure logic — no DOM, no browser APIs.
// A "progress doc" is the portable form of everything the app learns about the
// user: SRS pools, lesson completions, active days, streak and XP.
// mergeProgress() is a join (commutative, associative, idempotent), so the
// browser, the Telegram bot and the server can merge copies in any order and
// always converge on the same state.

export const PROGRESS_VERSION = 1;

/** SRS pools carried in the doc (doc.srs[pool]) */
export const SRS_POOLS = ['words', 'sentences'];

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_ID_LENGTH = 80;
const MAX_BUCKET = 20;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * A fresh, empty progress doc.
 */
export function emptyProgress() {
  return {
    v: PROGRESS_VERSION,
    srs: { words: {}, sentences: {} },
    completions: {},
    activity: {},
    streak: { current: 0, longest: 0, lastActiveDate: null },
    xp: {},
  };
}

/**
 * Total XP = sum of every device's contribution (G-counter).
 * @param {Object} doc - progress doc
 * @returns {number}
 */
export function totalXP(doc) {
  let sum = 0;
  for (const value of Object.values((doc && doc.xp) || {})) sum += value;
  return sum;
}

// ========================
// VALIDATION / CANONICAL FORM
// ========================

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isValidId(id) {
  return typeof id === 'string' && id.length > 0 && id.length <= MAX_ID_LENGTH;
}

function nonNegativeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null;
}

/**
 * Canonical SRS entry, or null if the input is not a usable entry.
 * Always the same four fields so merged docs compare equal regardless of origin.
 */
function canonicalEntry(raw) {
  if (!isPlainObject(raw)) return null;
  const bucket = nonNegativeNumber(raw.bucket);
  const dueDate = nonNegativeNumber(raw.dueDate);
  if (bucket === null || dueDate === null || !Number.isInteger(bucket) || bucket > MAX_BUCKET) return null;
  return {
    bucket,
    dueDate,
    isMistake: raw.isMistake === true,
    updatedAt: nonNegativeNumber(raw.updatedAt) ?? 0,
  };
}

/**
 * Total order on canonical entries: (updatedAt, bucket, dueDate, isMistake).
 * Last writer wins; the tie-breakers only matter for legacy entries without
 * updatedAt and make the choice deterministic.
 */
function compareEntries(a, b) {
  return (a.updatedAt - b.updatedAt)
    || (a.bucket - b.bucket)
    || (a.dueDate - b.dueDate)
    || (Number(a.isMistake) - Number(b.isMistake));
}

function cleanSrsPool(raw) {
  const pool = {};
  if (!isPlainObject(raw)) return pool;
  for (const [id, value] of Object.entries(raw)) {
    if (!isValidId(id)) continue;
    const entry = canonicalEntry(value);
    if (entry) pool[id] = entry;
  }
  return pool;
}

function cleanCounters(raw) {
  const out = {};
  if (!isPlainObject(raw)) return out;
  for (const [id, value] of Object.entries(raw)) {
    const n = nonNegativeNumber(value);
    if (isValidId(id) && n !== null) out[id] = Math.floor(n);
  }
  return out;
}

function cleanActivity(raw) {
  const out = {};
  if (!isPlainObject(raw)) return out;
  for (const [date, value] of Object.entries(raw)) {
    if (DATE_RE.test(date) && value) out[date] = true;
  }
  return out;
}

function cleanXP(raw) {
  const out = {};
  if (!isPlainObject(raw)) return out;
  for (const [deviceId, value] of Object.entries(raw)) {
    const n = nonNegativeNumber(value);
    if (isValidId(deviceId) && n !== null) out[deviceId] = n;
  }
  return out;
}

// ========================
// STREAK HELPERS (UTC 'YYYY-MM-DD', same as gamification.js)
// ========================

function dayBefore(date) {
  return new Date(Date.parse(date + 'T00:00:00Z') - DAY_MS).toISOString().slice(0, 10);
}

function maxDate(a, b) {
  if (!a) return b || null;
  if (!b) return a;
  return a > b ? a : b;
}

/**
 * Length of the run of consecutive active days ending at `lastDate`.
 * @param {Object} activity - { 'YYYY-MM-DD': true }
 * @param {string|null} lastDate
 * @returns {number}
 */
export function streakEndingAt(activity, lastDate) {
  let count = 0;
  let day = lastDate;
  while (day && activity[day]) {
    count++;
    day = dayBefore(day);
  }
  return count;
}

/**
 * Longest run of consecutive active days anywhere in the log.
 * @param {Object} activity - { 'YYYY-MM-DD': true }
 * @returns {number}
 */
export function longestStreakIn(activity) {
  let longest = 0;
  for (const date of Object.keys(activity)) {
    // Only count from the start of a run
    if (activity[dayBefore(date)]) continue;
    let length = 0;
    let day = date;
    while (activity[day]) {
      length++;
      day = new Date(Date.parse(day + 'T00:00:00Z') + DAY_MS).toISOString().slice(0, 10);
    }
    if (length > longest) longest = length;
  }
  return longest;
}

function canonicalStreak(rawStreak, activity) {
  const streak = isPlainObject(rawStreak) ? rawStreak : {};
  const ownLast = typeof streak.lastActiveDate === 'string' && DATE_RE.test(streak.lastActiveDate)
    ? streak.lastActiveDate
    : null;
  const activityLast = Object.keys(activity).reduce((max, d) => maxDate(max, d), null);
  const lastActiveDate = maxDate(ownLast, activityLast);
  const ownCurrent = ownLast === lastActiveDate ? (nonNegativeNumber(streak.current) ?? 0) : 0;
  const current = Math.max(Math.floor(ownCurrent), streakEndingAt(activity, lastActiveDate));
  const longest = Math.max(
    Math.floor(nonNegativeNumber(streak.longest) ?? 0),
    current,
    longestStreakIn(activity),
  );
  return { current, longest, lastActiveDate };
}

/**
 * Validate and canonicalize any input (possibly partial, legacy or hostile)
 * into a well-formed progress doc. Invalid fields are dropped, never thrown on.
 * @param {*} raw
 * @returns {Object} progress doc
 */
export function normalizeProgress(raw) {
  const input = isPlainObject(raw) ? raw : {};
  const srsIn = isPlainObject(input.srs) ? input.srs : {};
  const activity = cleanActivity(input.activity);
  return {
    v: PROGRESS_VERSION,
    srs: {
      words: cleanSrsPool(srsIn.words),
      sentences: cleanSrsPool(srsIn.sentences),
    },
    completions: cleanCounters(input.completions),
    activity,
    streak: canonicalStreak(input.streak, activity),
    xp: cleanXP(input.xp),
  };
}

// ========================
// MERGE
// ========================

function mergeSrsPool(a, b) {
  const out = { ...a };
  for (const [id, entry] of Object.entries(b)) {
    if (!out[id] || compareEntries(entry, out[id]) > 0) out[id] = entry;
  }
  return out;
}

function mergeMax(a, b) {
  const out = { ...a };
  for (const [key, value] of Object.entries(b)) {
    if (!(key in out) || value > out[key]) out[key] = value;
  }
  return out;
}

/**
 * Merge two progress docs. Pure join: the result does not depend on argument
 * order or on how many times the same doc is merged in.
 * - SRS items: last writer wins (updatedAt), deterministic tie-breaks
 * - completions: max per lesson
 * - activity: union; streak recomputed from it
 * - xp: max per device (G-counter), total = sum
 * @param {Object} a - progress doc (any shape, normalized first)
 * @param {Object} b - progress doc (any shape, normalized first)
 * @returns {Object} merged, normalized progress doc
 */
export function mergeProgress(a, b) {
  const left = normalizeProgress(a);
  const right = normalizeProgress(b);

  const lastActiveDate = maxDate(left.streak.lastActiveDate, right.streak.lastActiveDate);
  const sideCurrent = (side) => (side.streak.lastActiveDate === lastActiveDate ? side.streak.current : 0);

  return normalizeProgress({
    srs: {
      words: mergeSrsPool(left.srs.words, right.srs.words),
      sentences: mergeSrsPool(left.srs.sentences, right.srs.sentences),
    },
    completions: mergeMax(left.completions, right.completions),
    activity: { ...left.activity, ...right.activity },
    streak: {
      current: Math.max(sideCurrent(left), sideCurrent(right)),
      longest: Math.max(left.streak.longest, right.streak.longest),
      lastActiveDate,
    },
    xp: mergeMax(left.xp, right.xp),
  });
}

// ========================
// COMPARISON
// ========================

function stableStringify(value) {
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']';
  if (isPlainObject(value)) {
    return '{' + Object.keys(value).sort()
      .map((key) => JSON.stringify(key) + ':' + stableStringify(value[key]))
      .join(',') + '}';
  }
  return JSON.stringify(value);
}

/**
 * True when two docs hold the same progress (key order does not matter).
 */
export function progressEquals(a, b) {
  return stableStringify(normalizeProgress(a)) === stableStringify(normalizeProgress(b));
}
