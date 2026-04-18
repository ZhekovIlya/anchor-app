// ========================
// SRS ENGINE (Leitner Buckets)
// ========================
// Pure logic — no DOM, no browser APIs.
// Accepts a storage adapter: { load(key), save(key, data) }

import { BUCKET_INTERVALS, SRS_KEY } from './constants.js';

/**
 * Create an SRS engine with injectable storage.
 * @param {Object} storage - { load(key): Object, save(key, data): void }
 * @returns {Object} SRS API
 */
export function createSRS(storage) {
  function loadData() {
    try {
      return storage.load(SRS_KEY) || {};
    } catch (e) {
      return {};
    }
  }

  function saveData(data) {
    storage.save(SRS_KEY, data);
  }

  return {
    /**
     * Promote a phrase to the next Leitner bucket after a correct answer.
     */
    promote(phraseId) {
      const data = loadData();
      const entry = data[phraseId] || { bucket: 0, dueDate: 0 };
      const newBucket = Math.min(entry.bucket + 1, BUCKET_INTERVALS.length - 1);
      data[phraseId] = {
        bucket: newBucket,
        dueDate: Date.now() + BUCKET_INTERVALS[newBucket],
      };
      saveData(data);
    },

    /**
     * Demote a phrase back to bucket 0 after a reveal/failure.
     */
    demote(phraseId) {
      const data = loadData();
      data[phraseId] = {
        bucket: 0,
        dueDate: Date.now() + BUCKET_INTERVALS[0],
      };
      saveData(data);
    },

    /**
     * Register a phrase as seen for the first time (due in 1 day).
     */
    registerNew(phraseId) {
      const data = loadData();
      if (!data[phraseId]) {
        data[phraseId] = {
          bucket: 0,
          dueDate: Date.now() + BUCKET_INTERVALS[1], // due in 1 day
        };
        saveData(data);
      }
    },

    /**
     * Get all phrases due for review right now.
     * @param {Object} phraseBank - { [meta.id]: phraseObject }
     * @returns {Array} Shuffled array of due phrases
     */
    getDuePhrases(phraseBank) {
      const data = loadData();
      const now = Date.now();
      const due = [];
      for (const [id, entry] of Object.entries(data)) {
        if (entry.dueDate <= now && phraseBank[id]) {
          due.push(phraseBank[id]);
        }
      }
      return due.sort(() => Math.random() - 0.5);
    },

    /**
     * Count how many phrases are currently due for review.
     * @param {Object} phraseBank - { [meta.id]: phraseObject }
     * @returns {number}
     */
    getDueCount(phraseBank) {
      const data = loadData();
      const now = Date.now();
      let count = 0;
      for (const [id, entry] of Object.entries(data)) {
        if (entry.dueDate <= now && phraseBank[id]) count++;
      }
      return count;
    },
  };
}
