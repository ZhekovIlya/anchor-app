// ========================
// DEMO DATA SEED
// ========================
// Seeds localStorage with a representative state for development previews:
//   - Week 1: Mastered (exam completed 5× means gold status)
//   - Week 2: Completed (all lessons done once means green status)
//
// Opt-in: runs only in Vite's dev mode, only when the URL has ?demo=1, only
// once per browser (DEMO_SEEDED flag) and never when this browser is linked to
// Telegram (`anchor_sync_auth`) — sync merges counters with max(), so fake
// completions would be pushed to the real account and could not be undone.
//
// The app stores a lesson's completion count under the bare lesson id
// (see collectLessonIds / sync-local.js).

const DEMO_SEEDED_FLAG = 'anchor_demo_seeded_v4';
const SYNC_AUTH_KEY = 'anchor_sync_auth';

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

/** Every lesson id the seed writes (exported so a test can check they exist). */
export const DEMO_SEED_LESSON_IDS = [
  ...WEEK_1_MASTERED_LESSON_IDS,
  WEEK_1_EXAM_ID,
  ...WEEK_2_ALL_LESSON_IDS,
];

/** Pure decision: should the seed run for this URL search string / storage? */
export function shouldSeed(search, storage) {
  if (!new URLSearchParams(search || '').has('demo')) return false;
  if (storage.getItem(SYNC_AUTH_KEY) !== null) return false;
  return storage.getItem(DEMO_SEEDED_FLAG) !== 'true';
}

export function seedDemoData(storage) {
  WEEK_1_MASTERED_LESSON_IDS.forEach(id => storage.setItem(id, String(MASTERED_COMPLETIONS)));
  storage.setItem(WEEK_1_EXAM_ID, String(EXAM_MASTERED_COMPLETIONS));
  WEEK_2_ALL_LESSON_IDS.forEach(id => storage.setItem(id, String(COMPLETED_COMPLETIONS)));
  storage.setItem(DEMO_SEEDED_FLAG, 'true');
}

export function seedDemoDataOnce() {
  if (!shouldSeed(window.location.search, localStorage)) return;
  seedDemoData(localStorage);
}
