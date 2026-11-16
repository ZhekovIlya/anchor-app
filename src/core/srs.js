// ========================
// SRS ENGINE (Leitner Buckets)
// ========================
// Pure logic — no DOM, no browser APIs.
// Accepts a storage adapter: { load(key), save(key, data) }
// Every write stamps `updatedAt` so entries can be merged across devices
// (last-writer-wins, see sync-merge.js).

import { BUCKET_INTERVALS } from './constants.js';

/**
 * Create an SRS engine with injectable storage.
 * @param {Object} storage - { load(key): Object, save(key, data): void }
 * @param {string} storageKey - localStorage key to use for this SRS pool
 * @returns {Object} SRS API
 */
export function createSRS(storage, storageKey) {
  function loadData() {
    try {
      return storage.load(storageKey) || {};
    } catch (e) {
      return {};
    }
  }

  function saveData(data) {
    storage.save(storageKey, data);
  }

  return {
    /**
     * Promote a phrase to the next Leitner bucket after a correct answer.
     */
    promote(phraseId) {
      const data = loadData();
      const entry = data[phraseId] || { bucket: 0, dueDate: 0 };
      const newBucket = Math.min(entry.bucket + 1, BUCKET_INTERVALS.length - 1);
      const now = Date.now();
      data[phraseId] = {
        bucket: newBucket,
        dueDate: now + BUCKET_INTERVALS[newBucket],
        isMistake: false,
        updatedAt: now,
      };
      saveData(data);
    },

    /**
     * Demote a phrase back to bucket 0 after a reveal/failure.
     */
    demote(phraseId) {
      const data = loadData();
      const now = Date.now();
      data[phraseId] = {
        bucket: 0,
        dueDate: now + BUCKET_INTERVALS[0],
        isMistake: true,
        updatedAt: now,
      };
      saveData(data);
    },

    /**
     * Register a phrase as seen for the first time (due in 1 day).
     */
    registerNew(phraseId) {
      const data = loadData();
      if (!data[phraseId]) {
        const now = Date.now();
        data[phraseId] = {
          bucket: 0,
          dueDate: now + BUCKET_INTERVALS[1], // due in 1 day
          updatedAt: now,
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
        if (entry.dueDate <= now && phraseBank[id] && !entry.isMistake) count++;
      }
      return count;
    },

    /**
     * Get all phrases tagged as mistakes.
     */
    getMistakesPhrases(phraseBank) {
      const data = loadData();
      const mistakes = [];
      for (const [id, entry] of Object.entries(data)) {
        if (entry.isMistake && phraseBank[id]) {
          mistakes.push(phraseBank[id]);
        }
      }
      return mistakes.sort(() => Math.random() - 0.5);
    },

    /**
     * Count how many phrases are currently tagged as mistakes.
     */
    getMistakesCount(phraseBank) {
      const data = loadData();
      let count = 0;
      for (const [id, entry] of Object.entries(data)) {
        if (entry.isMistake && phraseBank[id]) count++;
      }
      return count;
    },
  };
}
