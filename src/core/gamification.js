// ========================
// GAMIFICATION ENGINE
// ========================
// Pure logic — no DOM, no browser APIs.
// Accepts a storage adapter: { load(key), save(key, data) }

export const XP_REWARDS = {
  lesson: 25,
  exam: 50,
  review: 15,
  mcCorrect: 5,
  wordOrderCorrect: 5,
};

export const LEVEL_TIERS = [
  { name: 'Principiante', minXP: 0 },
  { name: 'Explorador', minXP: 100 },
  { name: 'Conversador', minXP: 500 },
  { name: 'Avanzado', minXP: 1500 },
];

export const GAMIFICATION_KEY = 'anchor_gamification';

/** Streak milestones that trigger celebrations */
export const STREAK_MILESTONES = [7, 14, 30];

/**
 * Create a gamification engine with injectable storage.
 * @param {Object} storageAdapter - { load(key): Object, save(key, data): void }
 * @param {string} storageKey - localStorage key to use for gamification data
 * @returns {Object} Gamification API
 */
export function createGamification(storageAdapter, storageKey = GAMIFICATION_KEY) {
  function getDefaultState() {
    return {
      totalXP: 0,
      streak: {
        current: 0,
        longest: 0,
        lastActiveDate: null,
      },
      activityLog: {},
    };
  }

  function loadState() {
    try {
      const raw = storageAdapter.load(storageKey);
      if (!raw || typeof raw !== 'object' || Object.keys(raw).length === 0) {
        return getDefaultState();
      }
      // Ensure all fields exist (defensive merge)
      return {
        totalXP: typeof raw.totalXP === 'number' ? raw.totalXP : 0,
        streak: {
          current: (raw.streak && typeof raw.streak.current === 'number') ? raw.streak.current : 0,
          longest: (raw.streak && typeof raw.streak.longest === 'number') ? raw.streak.longest : 0,
          lastActiveDate: (raw.streak && raw.streak.lastActiveDate) || null,
        },
        activityLog: (raw.activityLog && typeof raw.activityLog === 'object') ? raw.activityLog : {},
      };
    } catch (e) {
      return getDefaultState();
    }
  }

  function saveState(state) {
    storageAdapter.save(storageKey, state);
  }

  function getTodayString() {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Determine if two date strings represent consecutive calendar days.
   * @param {string} dateA - earlier date 'YYYY-MM-DD'
   * @param {string} dateB - later date 'YYYY-MM-DD'
   * @returns {boolean}
   */
  function isConsecutiveDay(dateA, dateB) {
    if (!dateA || !dateB) return false;
    const a = new Date(dateA + 'T00:00:00');
    const b = new Date(dateB + 'T00:00:00');
    const diffMs = b.getTime() - a.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays === 1;
  }

  /**
   * Check if two date strings are the same day.
   */
  function isSameDay(dateA, dateB) {
    return dateA === dateB;
  }

  /**
   * Find the highest tier where xp >= minXP.
   */
  function getLevelForXP(xp) {
    let level = LEVEL_TIERS[0];
    for (const tier of LEVEL_TIERS) {
      if (xp >= tier.minXP) level = tier;
    }
    return level;
  }

  return {
    /**
     * Get current streak data.
     * @returns {{ current: number, longest: number, lastActiveDate: string|null }}
     */
    getStreak() {
      const state = loadState();
      return {
        current: state.streak.current,
        longest: state.streak.longest,
        lastActiveDate: state.streak.lastActiveDate,
      };
    },

    /**
     * Record daily activity. Call when ANY drill completes.
     * Increments streak if not already recorded today.
     * Tracks consecutive CALENDAR days.
     * Updates longest streak if current exceeds it.
     * @returns {{ streakChanged: boolean, current: number, longest: number, milestone: number|null }}
     */
    recordActivity() {
      const state = loadState();
      const today = getTodayString();

      // Already recorded today — no change
      if (state.activityLog[today]) {
        return {
          streakChanged: false,
          current: state.streak.current,
          longest: state.streak.longest,
          milestone: null,
        };
      }

      // Mark today in activity log
      state.activityLog[today] = true;

      const lastDate = state.streak.lastActiveDate;

      if (!lastDate) {
        // First ever activity
        state.streak.current = 1;
      } else if (isSameDay(lastDate, today)) {
        // Same day — should not reach here due to guard above, but be safe
        // No streak change
      } else if (isConsecutiveDay(lastDate, today)) {
        // Yesterday was active → consecutive streak
        state.streak.current += 1;
      } else {
        // Streak broken — reset to 1
        state.streak.current = 1;
      }

      state.streak.lastActiveDate = today;

      // Update longest
      if (state.streak.current > state.streak.longest) {
        state.streak.longest = state.streak.current;
      }

      saveState(state);

      // Check for milestone
      let milestone = null;
      for (const m of STREAK_MILESTONES) {
        if (state.streak.current === m) {
          milestone = m;
          break;
        }
      }

      return {
        streakChanged: true,
        current: state.streak.current,
        longest: state.streak.longest,
        milestone,
      };
    },

    /**
     * Add XP to the user's total.
     * @param {number} amount - XP to add
     * @returns {{ totalXP: number, levelName: string, leveledUp: boolean }}
     */
    addXP(amount) {
      const state = loadState();
      const oldLevel = getLevelForXP(state.totalXP);
      state.totalXP += amount;
      const newLevel = getLevelForXP(state.totalXP);
      saveState(state);

      return {
        totalXP: state.totalXP,
        levelName: newLevel.name,
        leveledUp: newLevel.name !== oldLevel.name,
      };
    },

    /**
     * Get full gamification stats.
     * @returns {{ totalXP: number, level: Object, levelName: string, streak: number, longestStreak: number, activityLog: Object }}
     */
    getStats() {
      const state = loadState();
      const level = getLevelForXP(state.totalXP);
      return {
        totalXP: state.totalXP,
        level,
        levelName: level.name,
        streak: state.streak.current,
        longestStreak: state.streak.longest,
        activityLog: { ...state.activityLog },
      };
    },

    /**
     * Get activity log for heatmap/chart.
     * @returns {{ [dateString]: true }}
     */
    getActivityLog() {
      const state = loadState();
      return { ...state.activityLog };
    },

    /**
     * Check if the user is returning after 3+ days of inactivity.
     * @returns {boolean}
     */
    isReturningUser() {
      const state = loadState();
      if (!state.streak.lastActiveDate) return false;

      const today = getTodayString();
      const last = new Date(state.streak.lastActiveDate + 'T00:00:00');
      const now = new Date(today + 'T00:00:00');
      const diffDays = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays >= 3;
    },
  };
}
