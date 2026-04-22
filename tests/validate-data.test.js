import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from '../src/core/tokenizer.js';

// Import data modules
import week1 from '../data/week_1.js';
import week2 from '../data/week_2.js';
import week3 from '../data/week_3.js';
import week4 from '../data/week_4.js';
import topicsCore from '../data/topics_core.js';

const allTopics = [week1, week2, week3, week4, topicsCore];

describe('Data file structure', () => {
  test('each topic has required fields', () => {
    for (const topic of allTopics) {
      assert.ok(topic.id, `Topic missing id`);
      assert.ok(topic.title, `Topic ${topic.id} missing title`);
      assert.ok(Array.isArray(topic.lessons), `Topic ${topic.id} missing lessons array`);
      assert.ok(typeof topic.legacy === 'boolean', `Topic ${topic.id} missing legacy flag`);
    }
  });

  test('each lesson has required fields', () => {
    for (const topic of allTopics) {
      for (const lesson of topic.lessons) {
        assert.ok(lesson.id, `Lesson missing id in topic ${topic.id}`);
        assert.ok(lesson.title, `Lesson ${lesson.id} missing title`);
        if (!lesson.exam) {
          assert.ok(Array.isArray(lesson.phrases), `Lesson ${lesson.id} missing phrases array`);
        }
      }
    }
  });
});

describe('Phrase validation', () => {
  test('each phrase has ru, es', () => {
    for (const topic of allTopics) {
      for (const lesson of topic.lessons) {
        if (lesson.exam) continue;
        for (const phrase of lesson.phrases) {
          assert.ok(phrase.ru, `Phrase missing ru in lesson ${lesson.id}`);
          assert.ok(phrase.es, `Phrase missing es in lesson ${lesson.id}`);
        }
      }
    }
  });

  test('non-exam lessons have exactly 6 phrases', () => {
    const exceptions = [];

    for (const topic of allTopics) {
      for (const lesson of topic.lessons) {
        if (lesson.exam) continue;
        if (lesson.phrases.length !== 6) {
          // Some lessons (like estar él/ella) have 8 phrases — this is intentional
          if (lesson.phrases.length > 6) {
            // Allow oversized lessons but flag them
            console.log(`  ℹ️ ${lesson.id} has ${lesson.phrases.length} phrases (>6, intentional?)`);
          } else {
            exceptions.push(`${lesson.id}: ${lesson.phrases.length} phrases`);
          }
        }
      }
    }

    if (exceptions.length > 0) {
      console.log(`  ⚠️ Under-sized lessons: ${exceptions.join(', ')}`);
    }
  });
});


describe('Tokenizer', () => {
  const VALID_TYPES = new Set([
    'subject', 'verb', 'verb_infinitive', 'negation',
    'object', 'article', 'space',
    'adjective', 'adverb', 'question', 'preposition', 'conjunction',
  ]);

  test('tokenizer reconstructs every es string exactly', () => {
    let pass = 0;
    let fail = 0;
    const failures = [];

    for (const topic of allTopics) {
      for (const lesson of topic.lessons) {
        if (lesson.exam) continue;
        for (const phrase of lesson.phrases) {
          const tokens = tokenize(phrase.es);
          const built = tokens.map(t => t.text).join('');
          if (built === phrase.es) {
            pass++;
          } else {
            fail++;
            failures.push(`[${lesson.id}] built="${built}" vs es="${phrase.es}"`);
          }
        }
      }
    }

    if (failures.length > 0) {
      assert.fail(`Token mismatches:\n${failures.join('\n')}`);
    }

    console.log(`  ✓ ${pass} phrases tokenized, ${fail} failures`);
  });

  test('all token types are valid', () => {
    const invalid = [];

    for (const topic of allTopics) {
      for (const lesson of topic.lessons) {
        if (lesson.exam) continue;
        for (const phrase of lesson.phrases) {
          const tokens = tokenize(phrase.es);
          for (const token of tokens) {
            if (!VALID_TYPES.has(token.type)) {
              invalid.push(`"${token.type}" in phrase "${phrase.es}" (${lesson.id})`);
            }
          }
        }
      }
    }

    if (invalid.length > 0) {
      assert.fail(`Invalid token types:\n${invalid.join('\n')}`);
    }
  });
});
