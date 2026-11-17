import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getTopicStatus, getLessonStatus } from '../src/core/progress-status.js';
import { EXAM_MASTERED_THRESHOLD, LESSON_MASTERED_THRESHOLD } from '../src/core/constants.js';

const counts = (o) => (id) => o[id] || 0;

const week = {
  lessons: [
    { id: 'l1', tab: 'a' }, { id: 'l2', tab: 'a' },
    { id: 'mini', exam: true, tab: 'a' },
    { id: 'final', exam: true },
  ],
};

describe('getTopicStatus', () => {
  test('tab mini-exam alone does not master the week', () => {
    assert.notEqual(getTopicStatus(week, counts({ mini: 9 })), 'mastered');
  });
  test('final exam masters the week', () => {
    assert.equal(getTopicStatus(week, counts({ final: EXAM_MASTERED_THRESHOLD })), 'mastered');
    assert.notEqual(getTopicStatus(week, counts({ final: EXAM_MASTERED_THRESHOLD - 1 })), 'mastered');
  });
  test('no final exam: every exam lesson must be mastered', () => {
    const w = { lessons: [{ id: 'a', exam: true, tab: 'x' }, { id: 'b', exam: true, tab: 'y' }, { id: 'c' }] };
    assert.notEqual(getTopicStatus(w, counts({ a: 5 })), 'mastered');
    assert.equal(getTopicStatus(w, counts({ a: 5, b: 5 })), 'mastered');
  });
  test('word topic with single exam', () => {
    const t = { lessons: [{ id: 'w1' }, { id: 'wexam', exam: true }] };
    assert.equal(getTopicStatus(t, counts({ wexam: 5 })), 'mastered');
  });
  test('completed / progress / new', () => {
    assert.equal(getTopicStatus(week, counts({ l1: 1, l2: 1, mini: 1, final: 1 })), 'completed');
    assert.equal(getTopicStatus(week, counts({ l1: 1 })), 'progress');
    assert.equal(getTopicStatus(week, counts({})), 'new');
  });
  test('topic without exams is never mastered', () => {
    assert.equal(getTopicStatus({ lessons: [{ id: 'x' }] }, counts({ x: 99 })), 'completed');
  });
});

describe('getLessonStatus', () => {
  test('thresholds differ for lessons and exams', () => {
    assert.equal(getLessonStatus({ id: 'a' }, counts({ a: LESSON_MASTERED_THRESHOLD })), 'mastered');
    assert.equal(getLessonStatus({ id: 'e', exam: true }, counts({ e: LESSON_MASTERED_THRESHOLD })), 'completed');
    assert.equal(getLessonStatus({ id: 'a' }, counts({})), 'new');
  });
});
