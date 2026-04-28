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
  regular: 24,
  tabExam: 30,
  exam: 50,
};

/** Max phrases to draw for a tab-scoped exam (subset of tab's full pool) */
export const TAB_EXAM_PHRASE_CAP = 30;

/** Copy stage threshold — ghost text is visible for the first N correct answers */
export const COPY_STAGE_THRESHOLD = 12;

/** SRS Leitner bucket intervals in milliseconds */
export const BUCKET_INTERVALS = [
  12 * 60 * 60 * 1000,     // Bucket 0: 12 hours
  24 * 60 * 60 * 1000,     // Bucket 1: 1 day
  3 * 24 * 60 * 60 * 1000, // Bucket 2: 3 days
  7 * 24 * 60 * 60 * 1000, // Bucket 3: 1 week
  14 * 24 * 60 * 60 * 1000,// Bucket 4: 2 weeks
];

/** SRS localStorage key */
export const SRS_KEY = 'srs_data';
