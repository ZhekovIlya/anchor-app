import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from '../src/core/tokenizer.js';

import { readdirSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { loadAllData } from '../src/core/data-loader.js';
import { getAllTheoryTopics } from '../src/core/theory-registry.js';

// Validate exactly what the app loads (not a hand-written import list).
const loaded = loadAllData();
const allTopics = loaded.sentences;
const allWordTopics = loaded.words;
const activeTopics = allTopics.filter(t => !t.legacy);
const week6 = allTopics.find(t => t.id === 'week_6') || allTopics.find(t => /6/.test(t.id));
const week12 = allTopics.find(t => t.id === 'week_12') || allTopics.find(t => /12/.test(t.id));

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

  test('non-legacy sentence lessons have exactly 6 phrases', () => {
    const bad = [];
    for (const topic of activeTopics) {
      for (const lesson of topic.lessons) {
        if (lesson.exam) continue;
        if (lesson.phrases.length !== 6) bad.push(`${lesson.id}: ${lesson.phrases.length}`);
      }
    }
    assert.deepStrictEqual(bad, [], `Lessons without exactly 6 phrases: ${bad.join(', ')}`);
  });

  test('every non-legacy phrase has ru, uk and es', () => {
    const bad = [];
    for (const topic of activeTopics) {
      for (const lesson of topic.lessons) {
        if (lesson.exam) continue;
        for (const [i, phrase] of lesson.phrases.entries()) {
          for (const f of ['ru', 'uk', 'es']) {
            if (!phrase[f] || typeof phrase[f] !== 'string') bad.push(`${lesson.id}[${i}] missing ${f}`);
          }
        }
      }
    }
    assert.deepStrictEqual(bad, [], bad.join(', '));
  });

  test('legacy topics are flagged and have no uk requirement', () => {
    assert.ok(allTopics.some(t => t.legacy), 'expected at least one legacy topic');
  });
});

describe('Theory schema validation', () => {
  const allTheoryContainers = [
    ...allTopics.filter(t => t.theory).map(t => ({ id: t.id, theory: t.theory })),
    ...allWordTopics.filter(w => w.theory).map(w => ({ id: w.id, theory: w.theory })),
    ...loaded.theory.map(th => ({ id: th.id, theory: th })),
  ];

  const VALID_SECTION_TYPES = new Set(['heading', 'paragraph', 'callout', 'table', 'image', 'video']);
  const VALID_CALLOUT_STYLES = new Set(['tip', 'important', 'warning']);

  test('every theory container has valid structure and sections', () => {
    for (const { id, theory } of allTheoryContainers) {
      assert.ok(theory.title && typeof theory.title === 'string', `Theory ${id} missing string title`);

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


describe('Tabs and ID integrity', () => {
  test('every lesson tab is declared in its topic tabs array', () => {
    for (const topic of allTopics) {
      const declared = new Set((topic.tabs || []).map(t => t.id));
      for (const lesson of topic.lessons) {
        if (!lesson.tab) continue;
        assert.ok(declared.has(lesson.tab), `Lesson ${lesson.id} uses tab "${lesson.tab}" missing from ${topic.id}.tabs`);
      }
    }
  });

  test('week 12 restaurante tab has 2 lessons of exactly 6 phrases', () => {
    const lessons = week12.lessons.filter(l => l.tab === 'restaurante' && !l.exam);
    assert.strictEqual(lessons.length, 2);
    for (const lesson of lessons) {
      assert.strictEqual(lesson.phrases.length, 6, `Lesson ${lesson.id} must have exactly 6 phrases`);
      for (const phrase of lesson.phrases) {
        assert.ok(phrase.uk, `Phrase "${phrase.es}" in ${lesson.id} missing uk`);
      }
    }
  });

  test('lesson IDs are unique across sentences and words (they are localStorage keys)', () => {
    const ids = [
      ...allTopics.flatMap(t => t.lessons.map(l => l.id)),
      ...allWordTopics.flatMap(t => t.lessons.map(l => l.id)),
    ];
    // The old time_calendar.js vs tiempo_frecuencia.js collision (wt_l1 / wt_exam) was fixed by
    // renaming Tiempo to wtf_*; src/core/id-migrations.js carries stored progress over.
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    assert.deepStrictEqual(dupes, [], `Duplicate lesson IDs: ${dupes.join(', ')}`);
  });
});

describe('Data file discovery (a file added to data/ must be registered)', () => {
  const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');
  const listFiles = (sub) => readdirSync(join(root, sub)).filter(f => f.endsWith('.js')).sort();
  const load = async (sub, f) => (await import(pathToFileURL(join(root, sub, f)).href)).default;

  test('every data/sentences/*.js is loaded by loadAllData()', async () => {
    const missing = [];
    for (const f of listFiles('sentences')) {
      const mod = await load('sentences', f);
      if (!allTopics.includes(mod)) missing.push(`sentences/${f}`);
    }
    assert.deepStrictEqual(missing, [], `Not registered in src/core/data-loader.js: ${missing.join(', ')}`);
  });

  test('every data/words/*.js is loaded by loadAllData()', async () => {
    const missing = [];
    for (const f of listFiles('words')) {
      const mod = await load('words', f);
      if (!allWordTopics.includes(mod)) missing.push(`words/${f}`);
    }
    assert.deepStrictEqual(missing, [], `Not registered in src/core/data-loader.js: ${missing.join(', ')}`);
  });

  test('every data/theory/*.js is in the theory registry', async () => {
    const registry = getAllTheoryTopics();
    const missing = [];
    for (const f of listFiles('theory')) {
      const mod = await load('theory', f);
      if (!registry.some(t => t.sections === mod.sections)) missing.push(`theory/${f}`);
    }
    assert.deepStrictEqual(missing, [], `Not registered in src/core/theory-registry.js: ${missing.join(', ')}`);
  });
});
