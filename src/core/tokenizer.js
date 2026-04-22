// ========================
// RUNTIME TOKENIZER
// ========================
// Splits a Spanish sentence into colored tokens using the vocabulary dictionary.
// Handles punctuation stripping, case-insensitive lookup, and positional disambiguation.
// Pure logic — no DOM.

import vocabulary from '../../data/vocabulary.js';

// Words that can be both verb and adjective depending on position.
// Default entry in vocabulary is 'verb'; this set triggers disambiguation.
const AMBIGUOUS_VERB_ADJ = new Set([
  'limpio', 'limpia', 'limpias',
  'seco', 'seca', 'secas',
]);

// Types that indicate the next ambiguous word should be an adjective
const NOUN_LIKE_TYPES = new Set(['object', 'article']);

// Types that indicate the next ambiguous word should be a verb
const VERB_PRECURSOR_TYPES = new Set(['subject', 'negation', 'adverb', 'question']);

/**
 * Tokenize a Spanish sentence into an array of { text, type } objects.
 *
 * @param {string} esString — The full Spanish sentence (e.g. "Yo lavo las patas")
 * @returns {Array<{text: string, type: string}>} — Tokens including spaces
 */
export function tokenize(esString) {
  const words = esString.split(' ');
  const tokens = [];
  let prevType = null;

  for (let i = 0; i < words.length; i++) {
    // Insert space between words
    if (i > 0) {
      tokens.push({ text: ' ', type: 'space' });
    }

    const word = words[i];
    const clean = word.replace(/[¿?¡!,.:;]/g, '').toLowerCase();
    let type = vocabulary[clean] || 'object';

    // Positional disambiguation for verb/adjective homonyms
    if (AMBIGUOUS_VERB_ADJ.has(clean)) {
      if (prevType === null || VERB_PRECURSOR_TYPES.has(prevType)) {
        type = 'verb';
      } else if (NOUN_LIKE_TYPES.has(prevType)) {
        type = 'adjective';
      } else {
        // Default after other types (verb, preposition, conjunction, etc.)
        type = 'adjective';
      }
    }

    tokens.push({ text: word, type });
    prevType = type;
  }

  return tokens;
}
