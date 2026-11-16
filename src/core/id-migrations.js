// ========================
// LESSON ID MIGRATIONS
// ========================
// Pure logic — no DOM, no browser APIs.
// Lesson ids are storage keys (completion counters) and prefixes of SRS item ids
// (`${lessonId}_w${i}`), so renaming a lesson must carry its progress along.

/**
 * Tiempo (words_tiempo) used to reuse Time & Calendar's lesson ids, which made
 * the 12 "Days of the Week" words unreachable. Progress stored under the shared
 * ids may belong to either topic, so it is copied (never moved) to the new ids.
 */
export const LESSON_ID_RENAMES = [
  { from: 'wt_l1', to: 'wtf_l1' },
  { from: 'wt_exam', to: 'wtf_exam' },
];

/**
 * Copy SRS entries of renamed lessons to their new item ids (only where the new
 * id has no entry yet). Idempotent.
 * @param {Object} pool - SRS pool { [itemId]: entry }
 * @param {Array} renames - [{ from, to }]
 * @returns {{ pool: Object, changed: boolean }}
 */
export function copyRenamedSrsEntries(pool, renames = LESSON_ID_RENAMES) {
  const out = { ...pool };
  let changed = false;
  for (const { from, to } of renames) {
    const prefix = `${from}_w`;
    for (const [id, entry] of Object.entries(pool)) {
      if (!id.startsWith(prefix)) continue;
      const newId = `${to}_w${id.slice(prefix.length)}`;
      if (!out[newId]) {
        out[newId] = { ...entry };
        changed = true;
      }
    }
  }
  return { pool: out, changed };
}
