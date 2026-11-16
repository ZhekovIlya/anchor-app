// ========================
// SERVER PROGRESS
// ========================
// Node-only. Loads and updates a user's progress doc with optimistic
// concurrency, so the web sync and bot taps never overwrite each other.

import { normalizeProgress } from '../src/core/sync-merge.js';
import { updateDoc } from './store.js';

export const progressKey = (tgId) => `anchor:u:${tgId}:progress`;

/**
 * @returns {Promise<Object>} normalized progress doc (empty if none yet)
 */
export async function loadProgress(store, tgId) {
  const current = await store.getDoc(progressKey(tgId));
  return normalizeProgress(current ? current.doc : null);
}

/**
 * Read-modify-write the progress doc. `mutate(doc)` may change the doc in place
 * or return a replacement; it can run more than once on write conflicts, so it
 * must not have side effects outside the doc.
 * @returns {Promise<Object>} the saved, normalized doc
 */
export async function updateProgress(store, tgId, mutate) {
  const { doc } = await updateDoc(store, progressKey(tgId), async (raw) => {
    const doc = normalizeProgress(raw);
    const replacement = await mutate(doc);
    return normalizeProgress(replacement === undefined ? doc : replacement);
  });
  return doc;
}
