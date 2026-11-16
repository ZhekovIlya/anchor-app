// ========================
// PROGRESS DOC STORAGE ADAPTER
// ========================
// Pure logic — no DOM, no browser APIs.
// Implements the storage interface { load(key), save(key, data) } on top of a
// progress doc (see sync-merge.js), so the regular engines — createSRS and
// createGamification — run unchanged on synced data. The Telegram bot uses this,
// which keeps its SRS, XP and streak rules identical to the app's.

import { SRS_KEY_WORDS, SRS_KEY_SENTENCES } from './constants.js';
import { GAMIFICATION_KEY } from './gamification.js';
import { totalXP } from './sync-merge.js';

/**
 * Create a storage adapter that reads and writes a progress doc in place.
 * @param {Object} doc - normalized progress doc (mutated by save)
 * @param {Object} options
 * @param {string} options.deviceId - XP earned through this adapter is credited to doc.xp[deviceId]
 * @returns {{ load(key): Object, save(key, data): void }}
 */
export function createDocStorage(doc, { deviceId }) {
  return {
    load(key) {
      if (key === SRS_KEY_WORDS) return { ...doc.srs.words };
      if (key === SRS_KEY_SENTENCES) return { ...doc.srs.sentences };
      if (key === GAMIFICATION_KEY) {
        return {
          totalXP: totalXP(doc),
          streak: { ...doc.streak },
          activityLog: { ...doc.activity },
        };
      }
      return {};
    },

    save(key, data) {
      if (key === SRS_KEY_WORDS) {
        doc.srs.words = { ...data };
      } else if (key === SRS_KEY_SENTENCES) {
        doc.srs.sentences = { ...data };
      } else if (key === GAMIFICATION_KEY) {
        const earned = (data.totalXP || 0) - totalXP(doc);
        if (earned > 0) doc.xp[deviceId] = (doc.xp[deviceId] || 0) + earned;
        doc.streak = {
          current: data.streak.current,
          longest: data.streak.longest,
          lastActiveDate: data.streak.lastActiveDate,
        };
        doc.activity = { ...data.activityLog };
      }
    },
  };
}
