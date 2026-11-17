// ========================
// VOCABULARY COVERAGE
// ========================
// Every Spanish word of every non-legacy phrase must be classified in data/vocabulary.js,
// otherwise the tokenizer falls back to "object" (green noun) — which colours verbs wrongly.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import vocabulary from '../data/vocabulary.js';
import { loadAllData } from '../src/core/data-loader.js';
import { COLOR_MAP } from '../src/core/constants.js';
import { normalizeWord, tokenize } from '../src/core/tokenizer.js';

const VALID_TYPES = new Set(Object.keys(COLOR_MAP).filter((type) => type !== 'space'));

/** word → first phrase it appears in, for every non-legacy phrase the app drills. */
function collectWords() {
  const words = new Map();
  for (const topic of loadAllData().sentences) {
    if (topic.legacy) continue;
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      for (const phrase of lesson.phrases) {
        for (const raw of phrase.es.split(' ')) {
          const word = normalizeWord(raw);
          if (word && !words.has(word)) words.set(word, `[${lesson.id}] ${phrase.es}`);
        }
      }
    }
  }
  return words;
}

test('normalizeWord strips punctuation, the ellipsis and case', () => {
  assert.equal(normalizeWord('¿Cómo'), 'cómo');
  assert.equal(normalizeWord('es…'), 'es');
  assert.equal(normalizeWord('¡Vale!'), 'vale');
  assert.equal(normalizeWord('"Hola",'), 'hola');
  assert.equal(normalizeWord('(casa)'), 'casa');
});

test('tokenize keeps the original text, punctuation included', () => {
  const tokens = tokenize('¿Cómo te lo explico…?');
  assert.equal(tokens.map((t) => t.text).join(''), '¿Cómo te lo explico…?');
  assert.deepEqual(tokens.filter((t) => t.type !== 'space').map((t) => t.type), ['question', 'subject', 'subject', 'verb']);
});

test('every word of every non-legacy phrase is classified in vocabulary.js', () => {
  const missing = [...collectWords()].filter(([word]) => !Object.hasOwn(vocabulary, word));
  assert.deepEqual(
    missing.map(([word, example]) => `${word}  ← ${example}`),
    [],
    'Unclassified words are shown as nouns. Add them to data/vocabulary.js (node scripts/audit-data.js --unknown).'
  );
});

test('every vocabulary value is a valid token type', () => {
  const bad = Object.entries(vocabulary).filter(([, type]) => !VALID_TYPES.has(type));
  assert.deepEqual(bad, []);
});

test('vocabulary keys are lowercase', () => {
  const bad = Object.keys(vocabulary).filter((word) => word !== word.toLowerCase());
  assert.deepEqual(bad, []);
});

test('vocabulary.js has no duplicate keys (a later duplicate silently wins)', () => {
  const source = readFileSync(fileURLToPath(new URL('../data/vocabulary.js', import.meta.url)), 'utf8');
  const stripped = source.replace(/\/\/.*$/gm, '');
  const body = stripped.slice(stripped.indexOf('const vocabulary = {'));
  const seen = new Map();
  for (const match of body.matchAll(/(?:^|[\s,{]+)('[^']+'|[\p{L}_$][\p{L}\p{N}_$]*)\s*:\s*'[a-z_]+'/gmu)) {
    const key = match[1].replace(/'/g, '');
    seen.set(key, (seen.get(key) || 0) + 1);
  }
  const duplicates = [...seen].filter(([, count]) => count > 1).map(([key]) => key);
  assert.deepEqual(duplicates, []);
  assert.equal(seen.size, Object.keys(vocabulary).length, 'every key in the source was parsed');
});

test('function words have the expected type', () => {
  const expected = {
    pero: 'conjunction', que: 'conjunction', también: 'adverb', mi: 'article', su: 'article',
    me: 'subject', lo: 'subject', se: 'subject', la: 'article', muy: 'adverb', nunca: 'adverb',
    pide: 'verb', lleva: 'verb', busca: 'verb', pedimos: 'verb', esperar: 'verb_infinitive',
  };
  for (const [word, type] of Object.entries(expected)) {
    assert.equal(vocabulary[word], type, word);
  }
});
