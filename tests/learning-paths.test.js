import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { loadAllData } from '../src/core/data-loader.js';
import {
  LEARNING_PATHS,
  buildLessonIndex,
  getPathProgress,
  getLessonStatusFromCount,
} from '../src/core/learning-paths.js';
import { LESSON_MASTERED_THRESHOLD, EXAM_MASTERED_THRESHOLD } from '../src/core/constants.js';

const { sentences } = loadAllData();
const lessonIndex = buildLessonIndex(sentences);

describe('Learning paths: data integrity', () => {
  test('every path has id, title, subtitle and non-empty steps', () => {
    assert.ok(LEARNING_PATHS.length > 0);
    for (const path of LEARNING_PATHS) {
      assert.ok(path.id && path.title && path.subtitle, `Path ${path.id} missing id/title/subtitle`);
      assert.ok(Array.isArray(path.steps) && path.steps.length > 0, `Path ${path.id} has no steps`);
      for (const step of path.steps) {
        assert.ok(step.label, `Path ${path.id} has a step without a label`);
        assert.ok(step.lessonIds.length > 0, `Step "${step.label}" has no lessons`);
      }
    }
  });

  test('every lessonId exists in loadAllData().sentences', () => {
    for (const path of LEARNING_PATHS) {
      for (const step of path.steps) {
        for (const id of step.lessonIds) {
          assert.ok(lessonIndex[id], `Lesson "${id}" (${path.id} / ${step.label}) does not exist in sentence data`);
        }
      }
    }
  });

  test('no lessonId is repeated within a path', () => {
    for (const path of LEARNING_PATHS) {
      const all = path.steps.flatMap(s => s.lessonIds);
      assert.strictEqual(new Set(all).size, all.length, `Path ${path.id} contains duplicate lesson IDs`);
    }
  });
});

describe('Learning paths: progress', () => {
  // Small hand-made path with one exam so thresholds (3 vs 5) are exercised.
  const fakePath = {
    id: 'fake',
    title: 'Fake',
    subtitle: 'Fake',
    steps: [
      { label: 'A', lessonIds: ['w5_l1', 'w5_l2', 'w5_exam_ar'] },
      { label: 'B', lessonIds: ['w5_l8', 'w5_l9'] },
    ],
  };

  test('thresholds come from constants (lesson 3, exam 5)', () => {
    assert.strictEqual(getLessonStatusFromCount(LESSON_MASTERED_THRESHOLD - 1, false), 'completed');
    assert.strictEqual(getLessonStatusFromCount(LESSON_MASTERED_THRESHOLD, false), 'mastered');
    assert.strictEqual(getLessonStatusFromCount(LESSON_MASTERED_THRESHOLD, true), 'completed');
    assert.strictEqual(getLessonStatusFromCount(EXAM_MASTERED_THRESHOLD, true), 'mastered');
    assert.strictEqual(getLessonStatusFromCount(0, false), 'new');
  });

  test('empty completions: next is the very first lesson', () => {
    const p = getPathProgress(fakePath, {}, lessonIndex);
    assert.strictEqual(p.next.lessonId, 'w5_l1');
    assert.strictEqual(p.next.stepIndex, 0);
    assert.deepEqual(
      p.steps.map(s => ({ done: s.done, total: s.total, mastered: s.mastered })),
      [{ done: 0, total: 3, mastered: 0 }, { done: 0, total: 2, mastered: 0 }]
    );
  });

  test('next lesson is the first NOT mastered one (completed once is not enough)', () => {
    const completions = { w5_l1: 3, w5_l2: 1 };
    const p = getPathProgress(fakePath, completions, lessonIndex);
    assert.strictEqual(p.next.lessonId, 'w5_l2');
    assert.strictEqual(p.steps[0].done, 2);
    assert.strictEqual(p.steps[0].mastered, 1);
  });

  test('exam needs 5 completions, not 3', () => {
    const completions = { w5_l1: 3, w5_l2: 3, w5_exam_ar: 3 };
    const p = getPathProgress(fakePath, completions, lessonIndex);
    assert.strictEqual(p.next.lessonId, 'w5_exam_ar');
    assert.strictEqual(p.steps[0].isDone, true);
    assert.strictEqual(p.steps[0].isMastered, false);

    const p2 = getPathProgress(fakePath, { ...completions, w5_exam_ar: 5 }, lessonIndex);
    assert.strictEqual(p2.steps[0].isMastered, true);
    assert.strictEqual(p2.next.lessonId, 'w5_l8');
    assert.strictEqual(p2.next.stepIndex, 1);
  });

  test('skipped lesson in an earlier step is still the next one', () => {
    const completions = { w5_l1: 3, w5_exam_ar: 5, w5_l8: 3, w5_l9: 3 };
    const p = getPathProgress(fakePath, completions, lessonIndex);
    assert.strictEqual(p.next.lessonId, 'w5_l2');
    assert.strictEqual(p.steps[1].isMastered, true);
  });

  test('fully mastered path returns next = null', () => {
    const completions = { w5_l1: 3, w5_l2: 4, w5_exam_ar: 5, w5_l8: 3, w5_l9: 9 };
    const p = getPathProgress(fakePath, completions, lessonIndex);
    assert.strictEqual(p.next, null);
    assert.strictEqual(p.mastered, p.total);
  });

  test('real path: default lessonIndex works and totals match the data', () => {
    const path = LEARNING_PATHS[0];
    const p = getPathProgress(path, {});
    assert.strictEqual(p.total, path.steps.reduce((n, s) => n + s.lessonIds.length, 0));
    assert.strictEqual(p.next.lessonId, path.steps[0].lessonIds[0]);
  });
});
