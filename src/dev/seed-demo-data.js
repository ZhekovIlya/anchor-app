// ========================
// DEMO DATA SEED
// ========================
// Seeds localStorage with a representative state for development previews:
//   - Week 1: Mastered (exam completed 5× means gold status)
//   - Week 2: Completed (all lessons done once means green status)
//
// Runs only in Vite's dev mode (import.meta.env.DEV) and only once per
// browser session via the DEMO_SEEDED guard flag.

const DEMO_SEEDED_FLAG = 'anchor_demo_seeded_v3';

const WEEK_1_MASTERED_LESSON_IDS = [
  'w1_l1', 'w1_l2a', 'w1_l2b', 'w1_l3', 'w1_l3b', 'w1_l4', 'w1_l7',
];
const WEEK_1_EXAM_ID = 'w1_exam';
const MASTERED_COMPLETIONS = 3;
const EXAM_MASTERED_COMPLETIONS = 5;

const WEEK_2_ALL_LESSON_IDS = [
  'w2_l1', 'w2_l2', 'w2_l3', 'w2_l4', 'w2_l5', 'w2_l6', 'w2_l7',
  'w2_l8', 'w2_l9', 'w2_l10', 'w2_l11', 'w2_l12', 'w2_l13', 'w2_l14',
  'w2_l15', 'w2_exam',
];
const COMPLETED_COMPLETIONS = 1;

function completionKey(lessonId) {
  return `completion_count_${lessonId}`;
}

function seedWeek1Mastered() {
  WEEK_1_MASTERED_LESSON_IDS.forEach(id => {
    localStorage.setItem(completionKey(id), String(MASTERED_COMPLETIONS));
  });
  localStorage.setItem(completionKey(WEEK_1_EXAM_ID), String(EXAM_MASTERED_COMPLETIONS));
}

function seedWeek2Completed() {
  WEEK_2_ALL_LESSON_IDS.forEach(id => {
    localStorage.setItem(completionKey(id), String(COMPLETED_COMPLETIONS));
  });
}

export function seedDemoDataOnce() {
  if (localStorage.getItem(DEMO_SEEDED_FLAG) === 'true') return;
  seedWeek1Mastered();
  seedWeek2Completed();
  localStorage.setItem(DEMO_SEEDED_FLAG, 'true');
}
