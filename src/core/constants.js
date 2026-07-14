// ========================
// SHARED CONSTANTS
// ========================

/** Token type → CSS class mapping (used by web adapter) */
export const COLOR_MAP = {
  subject: 'text-blue-500',
  negation: 'text-yellow-500',
  verb: 'text-red-500',
  verb_infinitive: 'text-red-400',
  object: 'text-green-500',
  article: 'text-teal-400',
  preposition: 'text-purple-400',
  adjective: 'text-orange-400',
  adverb: 'text-cyan-400',
  question: 'text-pink-400',
  conjunction: 'text-indigo-400',
  space: '',
};

/** Human-readable labels for token types (used in legend UI) */
export const TOKEN_LABELS = {
  subject: 'Subject / Pronoun',
  verb: 'Verb (conjugated)',
  verb_infinitive: 'Verb (infinitive)',
  negation: 'Negation',
  object: 'Noun / Object',
  article: 'Article',
  preposition: 'Preposition',
  adjective: 'Adjective',
  adverb: 'Adverb',
  question: 'Question word',
  conjunction: 'Conjunction',
};

/** Streak targets by lesson type */
export const STREAK_TARGETS = {
  regular: 24,      // sentence lessons (6 phrases × 4 loops)
  tabExam: 30,      // tab-scoped sentence exams
  exam: 50,         // sentence final exams
  word: 48,          // word lessons (12 words × 4 loops)
  wordExam: 50,      // word topic exams
};

/** Max phrases to draw for a tab-scoped exam (subset of tab's full pool) */
export const TAB_EXAM_PHRASE_CAP = 30;

/** Copy stage thresholds — ghost text is visible for the first N correct answers */
export const COPY_STAGE_THRESHOLDS = {
  sentence: 12,    // first half of 24-streak
  word: 24,        // first half of 48-streak
};

// Legacy alias — used by engine.js for sentence mode
export const COPY_STAGE_THRESHOLD = COPY_STAGE_THRESHOLDS.sentence;

/** SRS Leitner bucket intervals in milliseconds */
export const BUCKET_INTERVALS = [
  12 * 60 * 60 * 1000,     // Bucket 0: 12 hours
  24 * 60 * 60 * 1000,     // Bucket 1: 1 day
  3 * 24 * 60 * 60 * 1000, // Bucket 2: 3 days
  7 * 24 * 60 * 60 * 1000, // Bucket 3: 1 week
  14 * 24 * 60 * 60 * 1000,// Bucket 4: 2 weeks
];

/** SRS localStorage keys — separate pools for sentences and words */
export const SRS_KEY_SENTENCES = 'srs_sentences';
export const SRS_KEY_WORDS = 'srs_words';

// Legacy alias for backwards compatibility during migration
export const SRS_KEY = 'srs_data';

/** Drill modes */
export const DRILL_MODE = {
  SENTENCE: 'sentence',
  WORD: 'word',
};

/** Maximum mistakes allowed before an exam is failed */
export const EXAM_MAX_MISTAKES = 5;
