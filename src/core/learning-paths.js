// ========================
// LEARNING PATHS
// ========================
// Guided routes through existing sentence lessons (e.g. "Domina el Pasado").
// A path is an ordered list of steps; each step is an ordered list of real lesson IDs
// taken from data/sentences/*. Pure logic — no DOM, no localStorage.

import { loadAllData } from './data-loader.js';
import { LESSON_MASTERED_THRESHOLD, EXAM_MASTERED_THRESHOLD } from './constants.js';

/**
 * Ordered learning paths. Lesson IDs MUST exist in loadAllData().sentences
 * (enforced by tests/learning-paths.test.js).
 */
export const LEARNING_PATHS = [
  {
    id: 'path_past',
    title: 'Domina el Pasado',
    subtitle: 'Pretérito Indefinido paso a paso',
    steps: [
      {
        label: 'Paso 1: -AR (yo / él)',
        lessonIds: [
          'w5_l1', 'w5_l2', 'w5_l3', 'w5_l4', 'w5_l5', 'w5_l6', 'w5_l7', 'w5_exam_ar',
        ],
      },
      {
        label: 'Paso 2: -ER / -IR (yo / él)',
        lessonIds: [
          'w5_l8', 'w5_l9', 'w5_l10', 'w5_l11', 'w5_l12', 'w5_l13', 'w5_l14', 'w5_exam_erir',
        ],
      },
      {
        label: 'Paso 3: Repaso de la Semana 5',
        lessonIds: [
          'w5_l15', 'w5_l16', 'w5_l17', 'w5_l18', 'w5_l19', 'w5_l20', 'w5_exam_review',
        ],
      },
      {
        label: 'Paso 4: Ayer en Barcelona',
        lessonIds: [
          'w6_l7', 'w6_l8', 'w6_l9', 'w6_l10', 'w6_l11', 'w6_l12', 'w6_l13', 'w6_exam_past',
        ],
      },
      {
        label: 'Paso 5: Todas las personas (regular)',
        lessonIds: [
          'w6_l13b', 'w11_l1', 'w11_l2', 'w11_l3', 'w11_m1',
        ],
      },
      {
        label: 'Paso 6: Verbos irregulares',
        lessonIds: [
          'w11_l4', 'w11_l5', 'w11_l6', 'w11_m2',
        ],
      },
      {
        label: 'Paso 7: Contar y biografía',
        lessonIds: [
          'w7_l12', 'w14_l1', 'w14_l2', 'w14_l3', 'w14_m1',
          'w14_l4', 'w14_l5', 'w14_l6', 'w14_m2',
        ],
      },
    ],
  },
];

// ========================
// LESSON INDEX
// ========================

/**
 * Build a flat lookup of every sentence lesson: { [lessonId]: { id, title, exam, tab, topicId, topicTitle } }
 * @param {Array} sentenceTopics - loadAllData().sentences
 * @returns {Object}
 */
export function buildLessonIndex(sentenceTopics) {
  const index = {};
  for (const topic of sentenceTopics) {
    for (const lesson of topic.lessons) {
      index[lesson.id] = {
        id: lesson.id,
        title: lesson.title,
        exam: !!lesson.exam,
        tab: lesson.tab || null,
        topicId: topic.id,
        topicTitle: topic.title,
      };
    }
  }
  return index;
}

let cachedDefaultIndex = null;

function getDefaultIndex() {
  if (!cachedDefaultIndex) {
    cachedDefaultIndex = buildLessonIndex(loadAllData().sentences);
  }
  return cachedDefaultIndex;
}

// ========================
// PROGRESS
// ========================

/**
 * Status of a single lesson from its completion count.
 * Uses the shared thresholds (lesson = 3, exam = 5).
 * @returns {'new'|'completed'|'mastered'}
 */
export function getLessonStatusFromCount(count, isExam) {
  const threshold = isExam ? EXAM_MASTERED_THRESHOLD : LESSON_MASTERED_THRESHOLD;
  if (count >= threshold) return 'mastered';
  if (count >= 1) return 'completed';
  return 'new';
}

/**
 * Compute progress of a path.
 *
 * @param {Object} path - an entry of LEARNING_PATHS
 * @param {Object} completionsMap - { [lessonId]: completionCount } (missing = 0)
 * @param {Object} [lessonIndex] - output of buildLessonIndex (defaults to the full app data)
 * @returns {{
 *   steps: Array<{ label: string, done: number, total: number, mastered: number,
 *                  isDone: boolean, isMastered: boolean,
 *                  lessons: Array<{ id: string, title: string, exam: boolean, count: number, status: string }> }>,
 *   next: ({ stepIndex: number, stepLabel: string, lessonId: string, title: string, exam: boolean } | null),
 *   done: number, total: number, mastered: number
 * }}
 *   `done` = lessons completed at least once; `mastered` = lessons at/above their mastery threshold.
 *   `next` = the first lesson (in path order) that is not mastered, or null when the whole path is mastered.
 */
export function getPathProgress(path, completionsMap = {}, lessonIndex = getDefaultIndex()) {
  let next = null;
  let totalDone = 0;
  let totalLessons = 0;
  let totalMastered = 0;

  const steps = path.steps.map((step, stepIndex) => {
    const lessons = step.lessonIds.map((id) => {
      const meta = lessonIndex[id];
      const exam = meta ? meta.exam : false;
      const count = completionsMap[id] || 0;
      const status = getLessonStatusFromCount(count, exam);
      return { id, title: meta ? meta.title : id, exam, count, status };
    });

    const done = lessons.filter((l) => l.status !== 'new').length;
    const mastered = lessons.filter((l) => l.status === 'mastered').length;
    const total = lessons.length;

    if (!next) {
      const firstOpen = lessons.find((l) => l.status !== 'mastered');
      if (firstOpen) {
        next = {
          stepIndex,
          stepLabel: step.label,
          lessonId: firstOpen.id,
          title: firstOpen.title,
          exam: firstOpen.exam,
        };
      }
    }

    totalDone += done;
    totalLessons += total;
    totalMastered += mastered;

    return {
      label: step.label,
      done,
      total,
      mastered,
      isDone: total > 0 && done === total,
      isMastered: total > 0 && mastered === total,
      lessons,
    };
  });

  return { steps, next, done: totalDone, total: totalLessons, mastered: totalMastered };
}
