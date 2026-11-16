import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildWordIndex, buildReelsQueue, requeueMissed, topicProgress } from '../src/core/reels-queue.js';
import { loadAllData } from '../src/core/data-loader.js';

const NOW = Date.parse('2026-11-02T08:00:00Z');
const HOUR = 3600000;

function tinyIndex() {
  const topics = [
    { id: 't1', title: 'One', lessons: [
      { id: 'a', title: 'A', words: [{ es: 'uno', ru: 'один', uk: 'один', meta: { id: 'a_w0' } }, { es: 'dos', ru: 'два', uk: 'два', meta: { id: 'a_w1' } }] },
      { id: 'a_exam', title: 'Exam', exam: true },
    ] },
    { id: 't2', title: 'Two', lessons: [
      { id: 'b', title: 'B', words: [
        { es: 'rojo', ru: 'красный', uk: 'червоний', meta: { id: 'b_w0' } },
        { es: 'azul', ru: 'синий', uk: 'синій', meta: { id: 'b_w1' } },
        { es: 'verde', ru: 'зелёный', uk: 'зелений', meta: { id: 'b_w2' } },
      ] },
    ] },
  ];
  return buildWordIndex(topics);
}

describe('buildWordIndex', () => {
  test('indexes every app word once, in curriculum order', () => {
    const { words } = loadAllData();
    const index = buildWordIndex(words);
    const expected = words.flatMap((t) => t.lessons).filter((l) => !l.exam).reduce((n, l) => n + l.words.length, 0);
    assert.equal(index.order.length, expected);
    assert.equal(new Set(index.order).size, expected);
    assert.equal(index.order[0], 'wn_l1_w0');
    const first = index.byId.wn_l1_w0;
    assert.deepEqual(Object.keys(first).sort(), ['es', 'id', 'lessonId', 'lessonTitle', 'ru', 'topicId', 'topicTitle', 'uk']);
  });
});

describe('buildReelsQueue', () => {
  test('due reviews first (mistakes, then most overdue), then new words in order', () => {
    const index = tinyIndex();
    const srsWords = {
      a_w0: { bucket: 2, dueDate: NOW - 1 * HOUR },
      a_w1: { bucket: 0, dueDate: NOW - 5 * HOUR },
      b_w0: { bucket: 0, dueDate: NOW - 0.5 * HOUR, isMistake: true },
      b_w1: { bucket: 3, dueDate: NOW + 48 * HOUR }, // not due yet
    };
    const queue = buildReelsQueue({ index, srsWords, now: NOW, size: 12 });
    assert.deepEqual(queue, [
      { id: 'b_w0', isNew: false },
      { id: 'a_w1', isNew: false },
      { id: 'a_w0', isNew: false },
      { id: 'b_w2', isNew: true },
    ]);
  });

  test('respects size and topic filter', () => {
    const index = tinyIndex();
    assert.deepEqual(buildReelsQueue({ index, srsWords: {}, now: NOW, size: 2 }).map((c) => c.id), ['a_w0', 'a_w1']);
    assert.deepEqual(buildReelsQueue({ index, srsWords: {}, now: NOW, topicId: 't2' }).map((c) => c.id), ['b_w0', 'b_w1', 'b_w2']);
    const allDue = { a_w0: { bucket: 0, dueDate: 0 }, a_w1: { bucket: 0, dueDate: 1 }, b_w0: { bucket: 0, dueDate: 2 } };
    assert.deepEqual(buildReelsQueue({ index, srsWords: allDue, now: NOW, size: 2 }).map((c) => c.id), ['a_w0', 'a_w1'], 'reviews can fill the whole session');
  });

  test('empty when everything is learned and nothing is due', () => {
    const index = tinyIndex();
    const later = Object.fromEntries(index.order.map((id) => [id, { bucket: 4, dueDate: NOW + HOUR }]));
    assert.deepEqual(buildReelsQueue({ index, srsWords: later, now: NOW }), []);
  });
});

describe('requeueMissed', () => {
  const queue = ['a', 'b', 'c', 'd', 'e'].map((id) => ({ id, isNew: true }));

  test('re-inserts the card 3 positions later', () => {
    const next = requeueMissed(queue, 0);
    assert.deepEqual(next.map((c) => c.id), ['a', 'b', 'c', 'a', 'd', 'e']);
    assert.equal(next[3].isNew, false);
    assert.equal(queue.length, 5, 'input untouched');
  });

  test('appends near the end and stops after maxRepeats', () => {
    assert.deepEqual(requeueMissed(queue, 4).map((c) => c.id), ['a', 'b', 'c', 'd', 'e', 'e']);
    let q = requeueMissed(queue, 0);      // a repeated once
    q = requeueMissed(q, 3);              // a repeated twice
    assert.equal(q.filter((c) => c.id === 'a').length, 3);
    assert.equal(requeueMissed(q, 6), q, 'third miss does not add another copy');
  });
});

describe('topicProgress', () => {
  test('counts total, seen, mastered and due per topic', () => {
    const index = tinyIndex();
    const rows = topicProgress(index, {
      a_w0: { bucket: 3, dueDate: NOW + HOUR },
      b_w0: { bucket: 1, dueDate: NOW - HOUR },
    }, NOW);
    assert.deepEqual(rows, [
      { topicId: 't1', title: 'One', total: 2, seen: 1, mastered: 1, due: 0 },
      { topicId: 't2', title: 'Two', total: 3, seen: 1, mastered: 0, due: 1 },
    ]);
  });
});
