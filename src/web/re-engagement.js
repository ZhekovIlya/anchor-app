// ========================
// RE-ENGAGEMENT OVERLAY
// ========================
// Shows a "Welcome Back" overlay for returning users (3+ days inactive).
// DOM-only — belongs in web/ layer.

import { XP_REWARDS } from '../core/gamification.js';

/**
 * Calculate how many full days have passed since a given date string.
 * @param {string} lastActiveDate - 'YYYY-MM-DD' date string
 * @returns {number} Full days since that date (0 if invalid/today)
 */
function calculateDaysAway(lastActiveDate) {
  if (!lastActiveDate) return 0;
  const last = new Date(lastActiveDate + 'T00:00:00');
  const now = new Date(new Date().toISOString().split('T')[0] + 'T00:00:00');
  const diffMs = now.getTime() - last.getTime();
  return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Create and show the Welcome Back overlay on the page.
 * @param {Object} options
 * @param {number} options.daysAway - days since last activity
 * @param {number} options.dueSentences - count of overdue sentences
 * @param {number} options.dueWords - count of overdue words
 * @param {number} options.totalDue - combined due count
 * @param {number} options.previousStreak - streak value (likely 0 since broken)
 * @param {number} options.longestStreak - all-time longest streak
 * @param {Function} options.onRefresher - callback to start quick refresher
 * @param {Function} options.onDismiss - callback to dismiss overlay
 */
function showWelcomeBackOverlay({ daysAway, dueSentences, dueWords, totalDue, previousStreak, longestStreak, onRefresher, onDismiss }) {
  // Remove any existing overlay first
  const existing = document.getElementById('reengagementOverlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'reengagementOverlay';
  overlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-4';
  overlay.style.cssText = 'background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);';

  // Build due items summary
  let dueItemsHtml = '';
  if (dueSentences > 0) {
    dueItemsHtml += `
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-xl transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">menu_book</span>
        <span class="font-body text-base text-on-surface dark:text-stone-200 transition-colors duration-300">${dueSentences} phrase${dueSentences !== 1 ? 's' : ''} ready for review</span>
      </div>`;
  }
  if (dueWords > 0) {
    dueItemsHtml += `
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-xl transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">abc</span>
        <span class="font-body text-base text-on-surface dark:text-stone-200 transition-colors duration-300">${dueWords} word${dueWords !== 1 ? 's' : ''} ready for review</span>
      </div>`;
  }

  // Build refresher button text
  const refresherCount = Math.min(totalDue, 20);
  const showRefresherBtn = totalDue > 0;

  // Longest streak encouragement
  let streakEncouragement = '';
  if (longestStreak > 0) {
    streakEncouragement = `
      <div class="flex items-center gap-2 justify-center mt-1">
        <span class="font-body text-sm text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Your best streak: 🔥 ${longestStreak} day${longestStreak !== 1 ? 's' : ''}</span>
      </div>`;
  }

  overlay.innerHTML = `
    <div class="bg-surface-container-lowest dark:bg-stone-900 rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center border border-outline-variant/20 dark:border-stone-700/30 transition-colors duration-300" style="animation: reengageSlideIn 0.4s ease-out;">
      <!-- Wave greeting -->
      <div class="text-5xl mb-4">👋</div>

      <!-- Title -->
      <h2 class="font-headline text-3xl font-bold text-on-surface dark:text-stone-50 mb-2 transition-colors duration-300">¡Bienvenido de vuelta!</h2>

      <!-- Subtitle -->
      <p class="font-body text-base text-on-surface-variant dark:text-stone-400 mb-1 transition-colors duration-300">
        You've been away for <strong class="text-on-surface dark:text-stone-200 transition-colors duration-300">${daysAway} day${daysAway !== 1 ? 's' : ''}</strong>.
      </p>
      <p class="font-body text-sm text-on-surface-variant dark:text-stone-400 mb-4 transition-colors duration-300">
        Your streak was reset, but your progress is still here!
      </p>
      ${streakEncouragement}

      <!-- Due items -->
      ${dueItemsHtml ? `<div class="flex flex-col gap-2 mt-4 mb-6 w-full px-4">${dueItemsHtml}</div>` : '<div class="mb-6"></div>'}

      <!-- Quick Refresher button -->
      ${showRefresherBtn ? `
        <button id="reengageRefresherBtn" class="w-full bg-primary dark:bg-emerald-600 text-on-primary rounded-xl px-6 py-3.5 font-label font-bold text-base tracking-wide shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 outline-none">
          <span class="material-symbols-outlined text-xl">refresh</span>
          Quick Refresher (${refresherCount} items)
        </button>
      ` : ''}

      <!-- Dismiss link -->
      <button id="reengageDismissBtn" class="mt-4 font-body text-sm text-on-surface-variant dark:text-stone-400 hover:text-primary dark:hover:text-emerald-400 cursor-pointer transition-colors duration-200 bg-transparent border-none outline-none flex items-center gap-1">
        Skip to Dashboard
        <span class="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
  `;

  // Inject keyframes if not present
  if (!document.getElementById('reengageKeyframes')) {
    const style = document.createElement('style');
    style.id = 'reengageKeyframes';
    style.textContent = `
      @keyframes reengageSlideIn {
        0% { transform: translateY(30px) scale(0.95); opacity: 0; }
        100% { transform: translateY(0) scale(1); opacity: 1; }
      }
      @keyframes reengageFadeOut {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(overlay);

  // --- Event wiring ---

  function dismissOverlay() {
    overlay.style.animation = 'reengageFadeOut 0.25s ease-in forwards';
    setTimeout(() => {
      if (overlay.parentNode) overlay.remove();
    }, 280);
  }

  // Quick Refresher button
  const refresherBtn = document.getElementById('reengageRefresherBtn');
  if (refresherBtn) {
    refresherBtn.addEventListener('click', () => {
      dismissOverlay();
      if (typeof onRefresher === 'function') onRefresher();
    });
  }

  // Dismiss / Skip button
  const dismissBtn = document.getElementById('reengageDismissBtn');
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      dismissOverlay();
      if (typeof onDismiss === 'function') onDismiss();
    });
  }

  // Click on backdrop to dismiss (user can ALWAYS dismiss)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      dismissOverlay();
      if (typeof onDismiss === 'function') onDismiss();
    }
  });
}

/**
 * Check if user is returning and show welcome back overlay.
 * @param {Object} gamification - gamification engine instance
 * @param {Object} srsSentences - sentence SRS instance
 * @param {Object} srsWords - word SRS instance
 * @param {Object} phraseBank - phrase lookup table
 * @param {Object} wordBank - word lookup table
 * @param {Function} onRefresher - callback to start refresher drill
 * @param {Function} onDismiss - callback when user dismisses
 */
export function checkAndShowReengagement(gamification, srsSentences, srsWords, phraseBank, wordBank, onRefresher, onDismiss) {
  // Only show for users returning after 3+ days
  if (!gamification.isReturningUser()) return;

  // Check how many SRS items are overdue
  const dueSentences = srsSentences.getDueCount(phraseBank);
  const dueWords = srsWords.getDueCount(wordBank);
  const totalDue = dueSentences + dueWords;

  // Get streak info
  const streak = gamification.getStreak();

  // Create and show overlay
  showWelcomeBackOverlay({
    daysAway: calculateDaysAway(streak.lastActiveDate),
    dueSentences,
    dueWords,
    totalDue,
    previousStreak: streak.current, // will be 0 since streak is broken
    longestStreak: streak.longest,
    onRefresher,
    onDismiss,
  });
}
