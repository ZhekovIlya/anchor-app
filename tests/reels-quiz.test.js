import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeAnswer, matchTyped, isTypeable, hintFor, kindForBucket, shuffle, pickDistractors, buildQuestion,
  buildQuizQueue, insertRetest, requeueWrong, translationOf,
} from '../src/core/reels-quiz.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { seededRandom, quizIndex } from './quiz-helpers.js';

const NOW = Date.parse('2026-11-16T08:00:00Z');
const HOUR = 3600000;

describe('matchTyped', () => {
  test('exact: case, punctuation and spacing are ignored', () => {
    assert.deepEqual(matchTyped('la cuenta', 'la cuenta'), { correct: true, almost: false });
    assert.deepEqual(matchTyped('  La  Cuenta! ', 'la cuenta'), { correct: true, almost: false });
    assert.deepEqual(matchTyped('¿Cómo estás?', 'cómo estás'), { correct: true, almost: false });
  });

  test('the leading article is optional, but a wrong one is not accepted', () => {
    assert.deepEqual(matchTyped('cuenta', 'la cuenta'), { correct: true, almost: false });
    assert.equal(matchTyped('el cuenta', 'la cuenta').correct, false);
    assert.equal(matchTyped('las cuenta', 'la cuenta').correct, false);
    assert.deepEqual(matchTyped('menú del día', 'el menú del día'), { correct: true, almost: false });
  });

  test('typos within max(1, floor(len/6)) are accepted as "almost"', () => {
    assert.deepEqual(matchTyped('la cuentas', 'la cuenta'), { correct: true, almost: true });
    assert.equal(matchTyped('la cuneta', 'la cuenta').correct, false, 'a transposition costs 2 edits, over the limit of 1');
    assert.deepEqual(matchTyped('camion', 'camión'), { correct: true, almost: true }, 'missing accent');
    assert.deepEqual(matchTyped('cuentaa', 'la cuenta'), { correct: true, almost: true }, 'article left out + typo');
  });

  test('wrong, empty and short-word mistakes are rejected', () => {
    assert.equal(matchTyped('la mesa', 'la cuenta').correct, false);
    assert.equal(matchTyped('', 'la cuenta').correct, false);
    assert.equal(matchTyped('?!', 'la cuenta').correct, false);
    assert.equal(matchTyped('un', 'uno').correct, true, '1 edit allowed for short words');
    assert.equal(matchTyped('dos', 'uno').correct, false);
    assert.equal(matchTyped('la cuenta bancaria', 'la cuenta').correct, false);
  });

  test('works for multi-word entries', () => {
    assert.equal(matchTyped('Harry Potter', 'Harry Potter').correct, true);
    assert.equal(matchTyped('menu del dia', 'el menú del día').correct, true);
  });
});

describe('typing helpers', () => {
  test('isTypeable rejects entries that are unreasonable to type', () => {
    assert.equal(isTypeable('la cuenta'), true);
    assert.equal(isTypeable('el menú del día'), true);
    assert.equal(isTypeable('Harry Potter'), true);
    assert.equal(isTypeable('soler + infinitivo'), false);
    assert.equal(isTypeable('el/la camarero'), false);
    assert.equal(isTypeable(''), false);
  });

  test('hintFor shows first letter and length of each word', () => {
    assert.equal(hintFor('la cuenta'), 'l_ c_____');
    assert.equal(hintFor('el menú del día'), 'e_ m___ d__ d__');
    assert.equal(hintFor('a'), 'a');
    assert.equal(normalizeAnswer(' Hola, ¿qué tal? '), 'hola qué tal');
  });

  test('translationOf falls back to the other language', () => {
    assert.equal(translationOf({ ru: 'а', uk: 'б' }, 'uk'), 'б');
    assert.equal(translationOf({ ru: 'а' }, 'uk'), 'а');
    assert.equal(translationOf({ uk: 'б' }, 'ru'), 'б');
  });
});

describe('card kind by bucket', () => {
  test('0–1 choose translation, 2 choose Spanish, ≥3 type (when allowed)', () => {
    assert.equal(kindForBucket({ bucket: 0, typing: true, es: 'rojo' }), 'tr');
    assert.equal(kindForBucket({ bucket: 1, typing: true, es: 'rojo' }), 'tr');
    assert.equal(kindForBucket({ bucket: 2, typing: true, es: 'rojo' }), 'es');
    assert.equal(kindForBucket({ bucket: 3, typing: true, es: 'rojo' }), 'type');
    assert.equal(kindForBucket({ bucket: 5, typing: true, es: 'rojo' }), 'type');
  });

  test('typing off or an untypeable word falls back to choosing Spanish', () => {
    assert.equal(kindForBucket({ bucket: 3, typing: false, es: 'rojo' }), 'es');
    assert.equal(kindForBucket({ bucket: 4, typing: true, es: 'soler + infinitivo' }), 'es');
  });
});

describe('distractors', () => {
  test('shuffle is deterministic for a seed and does not touch the input', () => {
    const input = [1, 2, 3, 4, 5, 6];
    assert.deepEqual(shuffle(input, seededRandom(7)), shuffle(input, seededRandom(7)));
    assert.deepEqual(input, [1, 2, 3, 4, 5, 6]);
    assert.deepEqual([...shuffle(input, seededRandom(3))].sort(), input);
  });

  test('three distinct distractors, never the answer; same topic and shape come first', () => {
    const index = quizIndex();
    const picked = pickDistractors(index, 'a_w1', { random: seededRandom(1) }); // la cuenta
    assert.equal(picked.length, 3);
    assert.equal(new Set(picked).size, 3);
    assert.ok(!picked.includes('a_w1'));
    assert.ok(picked.every((id) => index.byId[id].topicId === 't1'), 'same topic');
    assert.ok(picked.every((id) => /^(el|la) /.test(index.byId[id].es)), 'same shape: article + noun');
  });

  test('falls back to other topics and shapes when the topic is too small', () => {
    const index = quizIndex();
    const picked = pickDistractors(index, 'b_w0', { random: seededRandom(2) }); // uno
    assert.equal(picked.length, 3);
    assert.ok(picked.every((id) => id !== 'b_w0'));
  });

  test('skips words with the same Spanish text or the same translation', () => {
    const index = buildWordIndex([{ id: 't', title: 'T', lessons: [{ id: 'l', title: 'L', words: [
      { es: 'rojo', ru: 'красный', uk: 'червоний', meta: { id: 'x0' } },
      { es: 'rojo', ru: 'алый', uk: 'червоний', meta: { id: 'x1' } },        // same Spanish
      { es: 'colorado', ru: 'красный', uk: 'рудий', meta: { id: 'x2' } },    // same RU translation
      { es: 'azul', ru: 'синий', uk: 'синій', meta: { id: 'x3' } },
      { es: 'verde', ru: 'зелёный', uk: 'зелений', meta: { id: 'x4' } },
      { es: 'negro', ru: 'чёрный', uk: 'чорний', meta: { id: 'x5' } },
      { es: 'blanco', ru: 'синий', uk: 'білий', meta: { id: 'x6' } },        // same RU as azul
    ] }] }]);
    const ru = pickDistractors(index, 'x0', { lang: 'ru', random: seededRandom(1) });
    assert.ok(!ru.includes('x1') && !ru.includes('x2'));
    const translations = ru.map((id) => index.byId[id].ru);
    assert.equal(new Set(translations).size, translations.length, 'no duplicate option text');
    assert.equal(ru.length, 3);
    const uk = pickDistractors(index, 'x0', { lang: 'uk', random: seededRandom(1) });
    assert.ok(!uk.includes('x1'), 'same Spanish, and same UK translation');
  });

  test('buildQuestion: four options with the answer inside, "show" when too few distractors', () => {
    const index = quizIndex();
    const q = buildQuestion(index, 'a_w1', 'tr', { random: seededRandom(5) });
    assert.equal(q.kind, 'tr');
    assert.equal(q.options.length, 4);
    assert.ok(q.options.includes('a_w1'));
    assert.deepEqual(buildQuestion(index, 'a_w1', 'type'), { kind: 'type' });

    const tiny = buildWordIndex([{ id: 't', title: 'T', lessons: [{ id: 'l', title: 'L', words: [
      { es: 'uno', ru: 'один', uk: 'один', meta: { id: 'u0' } },
      { es: 'dos', ru: 'два', uk: 'два', meta: { id: 'u1' } },
      { es: 'tres', ru: 'три', uk: 'три', meta: { id: 'u2' } },
    ] }] }]);
    assert.deepEqual(buildQuestion(tiny, 'u0', 'es'), { kind: 'show' });
  });
});

describe('quiz queue', () => {
  test('new words get a study card with a re-test; reviews get a kind by bucket', () => {
    const index = quizIndex();
    const srsWords = {
      a_w0: { bucket: 0, dueDate: NOW - HOUR },
      a_w1: { bucket: 2, dueDate: NOW - HOUR },
      a_w2: { bucket: 3, dueDate: NOW - HOUR },
      a_w3: { bucket: 4, dueDate: NOW - HOUR },
      b_w1: { bucket: 4, dueDate: NOW - HOUR }, // `soler + infinitivo` → choice
    };
    const queue = buildQuizQueue({ index, srsWords, now: NOW, size: 8, typing: true, random: seededRandom(1) });
    const byId = Object.fromEntries(queue.map((card) => [card.id, card]));
    assert.equal(byId.a_w0.kind, 'tr');
    assert.equal(byId.a_w1.kind, 'es');
    assert.equal(byId.a_w2.kind, 'type');
    assert.equal(byId.a_w3.kind, 'type');
    assert.equal(byId.b_w1.kind, 'es');
    assert.ok(queue.filter((c) => !c.isNew).every((c) => (c.options ? c.options.includes(c.id) : c.kind === 'type')));
    const study = queue.find((c) => c.isNew);
    assert.equal(study.kind, 'study');
    assert.equal(study.retest.kind, 'tr');
    assert.ok(study.retest.options.includes(study.id));
  });

  test('typing off turns "type" cards into choose-Spanish', () => {
    const index = quizIndex();
    const srsWords = { a_w0: { bucket: 4, dueDate: NOW - HOUR } };
    const queue = buildQuizQueue({ index, srsWords, now: NOW, size: 1, typing: false, random: seededRandom(1) });
    assert.equal(queue[0].kind, 'es');
  });

  test('is deterministic for a seed', () => {
    const index = quizIndex();
    const make = () => buildQuizQueue({ index, srsWords: {}, now: NOW, size: 5, random: seededRandom(11) });
    assert.deepEqual(make(), make());
  });
});

describe('requeue', () => {
  const queue = [
    { id: 'a', isNew: true, kind: 'study', retest: { kind: 'tr', options: ['a', 'b', 'c', 'd'] } },
    { id: 'b', isNew: false, kind: 'type' }, { id: 'c', isNew: false, kind: 'type' },
    { id: 'd', isNew: false, kind: 'type' }, { id: 'e', isNew: false, kind: 'type' },
  ];

  test('insertRetest puts the question 3 cards after the study card, as a new word', () => {
    const next = insertRetest(queue, 0);
    assert.deepEqual(next.map((c) => c.id), ['a', 'b', 'c', 'a', 'd', 'e']);
    assert.deepEqual(next[3], { id: 'a', isNew: true, kind: 'tr', options: ['a', 'b', 'c', 'd'] });
    assert.equal(queue.length, 5, 'input untouched');
    assert.equal(insertRetest([{ id: 'z', isNew: true, kind: 'study' }], 0)[1].kind, 'show', 'no re-test stored → show');
  });

  test('requeueWrong repeats the question later with reversed options, at most twice', () => {
    const choice = [{ id: 'a', isNew: false, kind: 'tr', options: ['a', 'b', 'c', 'd'] }, ...queue.slice(1)];
    const once = requeueWrong(choice, 0);
    assert.deepEqual(once[3], { id: 'a', isNew: false, kind: 'tr', options: ['d', 'c', 'b', 'a'] });
    const twice = requeueWrong(once, 3);
    assert.equal(twice.filter((c) => c.id === 'a').length, 3);
    assert.equal(requeueWrong(twice, 0), twice, 'third miss does not add a card');
    assert.equal(choice.length, 5, 'input untouched');
  });

  test('a study card does not count against the repeat limit', () => {
    const next = insertRetest(queue, 0);
    const retest = next.findIndex((c, i) => i > 0 && c.id === 'a');
    assert.equal(requeueWrong(next, retest).filter((c) => c.id === 'a').length, 3);
  });
});
