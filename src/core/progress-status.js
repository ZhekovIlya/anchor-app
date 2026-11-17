// ========================
// PROGRESS STATUS
// ========================
// Pure status rules for lessons and topic cards.
// `getCount(lessonId)` returns the completion count of a lesson.
// Pure logic — no DOM.

import { EXAM_MASTERED_THRESHOLD, LESSON_MASTERED_THRESHOLD } from './constants.js';

/**
 * @param {Object} lesson
 * @param {(id: string) => number} getCount
 * @returns {'mastered'|'completed'|'new'}
 */
export function getLessonStatus(lesson, getCount) {
  const completions = getCount(lesson.id);
  const threshold = lesson.exam ? EXAM_MASTERED_THRESHOLD : LESSON_MASTERED_THRESHOLD;
  if (completions >= threshold) return 'mastered';
  if (completions >= 1) return 'completed';
  return 'new';
}

/**
 * A topic is mastered when its final exam (exam lesson without `tab`) has enough
 * completions; with no final exam, when every exam lesson has.
 * @param {Object} topic
 * @param {(id: string) => number} getCount
 * @returns {'mastered'|'completed'|'progress'|'new'}
 */
export function getTopicStatus(topic, getCount) {
  const lessons = topic.lessons;
  const exams = lessons.filter(l => l.exam);
  const finals = exams.filter(l => !l.tab);
  const deciding = finals.length > 0 ? finals : exams;
  if (deciding.length > 0 && deciding.every(l => getCount(l.id) >= EXAM_MASTERED_THRESHOLD)) {
    return 'mastered';
  }

  const total = lessons.length;
  const completedCount = lessons.filter(l => getCount(l.id) >= 1).length;
  if (total > 0 && completedCount === total) return 'completed';

  const startedCount = lessons.filter(l => getCount(l.id) > 0).length;
  if (startedCount > 0) return 'progress';

  return 'new';
}
