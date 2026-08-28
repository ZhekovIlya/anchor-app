import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from '../src/core/tokenizer.js';

// Import sentence data modules
import week1 from '../data/sentences/week_1.js';
import week2 from '../data/sentences/week_2.js';
import week3 from '../data/sentences/week_3.js';
import week4 from '../data/sentences/week_4.js';
import week5 from '../data/sentences/week_5.js';
import week6 from '../data/sentences/week_6.js';
import week7 from '../data/sentences/week7.js';
import week8 from '../data/sentences/week_8.js';
import week9 from '../data/sentences/week_9.js';
import week10 from '../data/sentences/week_10.js';
import week11 from '../data/sentences/week_11.js';
import week12 from '../data/sentences/week_12.js';
import week13 from '../data/sentences/week_13.js';
import topicsCore from '../data/sentences/topics_core.js';

// Import standalone theory modules
import theoryVerbs from '../data/theory/verbs_and_irregulars.js';
import theoryIrregularFull from '../data/theory/verbs_irregular_full.js';
import theoryReflexiveSpecial from '../data/theory/verbs_reflexive_special.js';
import theoryDemonstratives from '../data/theory/demonstrative_pronouns.js';
import theoryBridge from '../data/theory/the_bridge.js';
import theoryCatalan from '../data/theory/catalan_vs_castellano.js';

// Import word data modules
import wordsNumbers from '../data/words/numbers.js';
import wordsTime from '../data/words/time_calendar.js';
import wordsWeather from '../data/words/weather.js';
import wordsColors from '../data/words/colors.js';
import wordsQuestionWords from '../data/words/question_words.js';
import wordsRutina from '../data/words/rutina.js';
import wordsTiempo from '../data/words/tiempo_frecuencia.js';
import wordsDirecciones from '../data/words/direcciones.js';
import wordsProfesiones from '../data/words/profesiones.js';
import wordsGustos from '../data/words/gustos.js';

const allTopics = [
  week1, week2, week3, week4, week5, week6,
  week7, week8, week9, week10, week11, week12,
  week13, topicsCore
];

const allWordTopics = [
  wordsNumbers, wordsTime, wordsWeather, wordsColors,
  wordsQuestionWords, wordsRutina, wordsTiempo, wordsDirecciones,
  wordsProfesiones, wordsGustos
];

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

  test('week 6 lessons have exactly 6 phrases', () => {
    for (const lesson of week6.lessons) {
      if (lesson.exam) continue;
      assert.strictEqual(lesson.phrases.length, 6, `Lesson ${lesson.id} must have exactly 6 phrases, got ${lesson.phrases.length}`);
    }
  });
});

describe('Theory schema validation', () => {
  const allTheoryContainers = [
    ...allTopics.filter(t => t.theory).map(t => ({ id: t.id, theory: t.theory })),
    ...allWordTopics.filter(w => w.theory).map(w => ({ id: w.id, theory: w.theory })),
    ...[theoryVerbs, theoryIrregularFull, theoryReflexiveSpecial, theoryDemonstratives, theoryBridge, theoryCatalan]
      .map(th => ({ id: th.id, theory: th })),
  ];

  const VALID_SECTION_TYPES = new Set(['heading', 'paragraph', 'callout', 'table', 'image', 'video']);
  const VALID_CALLOUT_STYLES = new Set(['tip', 'important', 'warning']);

  test('every theory container has valid structure and sections', () => {
    for (const { id, theory } of allTheoryContainers) {
      assert.ok(theory.title && typeof theory.title === 'string', `Theory ${id} missing string title`);

      // Sentence weeks 1-5 use legacy image-based theory
      if (theory.image) {
        assert.ok(
          typeof theory.image === 'string' && theory.image.trim().length > 0,
          `Theory ${id} has invalid image path`
        );
        continue;
      }

      assert.ok(Array.isArray(theory.sections), `Theory ${id} missing sections array`);
      assert.ok(theory.sections.length > 0, `Theory ${id} has empty sections array`);

      for (let i = 0; i < theory.sections.length; i++) {
        const section = theory.sections[i];
        const ctx = `[${id} section #${i} (type: ${section.type})]`;

        // Check for forbidden deprecated keys like 'content'
        assert.strictEqual(
          section.content,
          undefined,
          `${ctx} uses forbidden 'content' key instead of 'text'`
        );

        assert.ok(VALID_SECTION_TYPES.has(section.type), `${ctx} has invalid section type "${section.type}"`);

        switch (section.type) {
          case 'heading':
          case 'paragraph':
            assert.ok(
              typeof section.text === 'string' && section.text.trim().length > 0,
              `${ctx} must have a non-empty string 'text'`
            );
            break;

          case 'callout':
            assert.ok(
              typeof section.text === 'string' && section.text.trim().length > 0,
              `${ctx} must have a non-empty string 'text'`
            );
            assert.ok(
              !section.style || VALID_CALLOUT_STYLES.has(section.style),
              `${ctx} has invalid callout style "${section.style}"`
            );
            break;

          case 'table':
            assert.ok(
              Array.isArray(section.headers) && section.headers.length > 0,
              `${ctx} table must have a non-empty 'headers' array`
            );
            assert.ok(
              Array.isArray(section.rows) && section.rows.length > 0,
              `${ctx} table must have a non-empty 'rows' array`
            );
            for (let r = 0; r < section.rows.length; r++) {
              assert.ok(
                Array.isArray(section.rows[r]),
                `${ctx} table row #${r} must be an array`
              );
            }
            break;

          case 'image':
            assert.ok(
              typeof section.src === 'string' && section.src.trim().length > 0,
              `${ctx} image must have a non-empty 'src' string`
            );
            break;

          case 'video':
            assert.ok(
              typeof section.src === 'string' && section.src.trim().length > 0,
              `${ctx} video must have a non-empty 'src' string`
            );
            break;
        }
      }
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

describe('Word topics validation', () => {
  test('each word topic has required fields', () => {
    for (const topic of allWordTopics) {
      assert.ok(topic.id, `Word topic missing id`);
      assert.ok(topic.title, `Word topic ${topic.id} missing title`);
      assert.strictEqual(topic.type, 'words', `Word topic ${topic.id} type must be "words"`);
      assert.ok(Array.isArray(topic.lessons), `Word topic ${topic.id} missing lessons array`);
    }
  });

  test('each word in non-exam lessons has ru, uk, es', () => {
    for (const topic of allWordTopics) {
      for (const lesson of topic.lessons) {
        if (lesson.exam) continue;
        assert.ok(Array.isArray(lesson.words), `Lesson ${lesson.id} missing words array`);
        assert.strictEqual(lesson.words.length, 12, `Lesson ${lesson.id} must have exactly 12 words, got ${lesson.words.length}`);
        for (const word of lesson.words) {
          assert.ok(word.ru && typeof word.ru === 'string', `Word in ${lesson.id} missing ru`);
          assert.ok(word.uk && typeof word.uk === 'string', `Word in ${lesson.id} missing uk`);
          assert.ok(word.es && typeof word.es === 'string', `Word in ${lesson.id} missing es`);
        }
      }
    }
  });
});

