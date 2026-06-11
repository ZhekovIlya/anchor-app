// ========================
// STATS DASHBOARD TAB
// ========================
// Renders the "Stats" home tab: streak, XP/level, progress counters,
// and a 4-week activity bar chart.
// All data is DERIVED from existing gamification, SRS, and storage APIs.
// DOM-only (web layer) — must not be imported from core modules.

import { getCompletionCount } from './storage.js';
import { LEVEL_TIERS } from '../core/gamification.js';
import { SRS_KEY_WORDS, SRS_KEY_SENTENCES } from '../core/constants.js';

/** Matches the threshold in dashboard.js — duplicated here to avoid circular import */
const LESSON_MASTERED_THRESHOLD = 3;

// ========================
// DATA DERIVATION HELPERS
// ========================

/**
 * Count unique words the user has encountered (tracked in SRS).
 * Each key in the SRS words store = one unique word seen at least once.
 * @param {Object} storageAdapter - { load(key) }
 * @returns {number}
 */
function getWordsEncountered(storageAdapter) {
  try {
    const srsData = storageAdapter.load(SRS_KEY_WORDS);
    if (!srsData || typeof srsData !== 'object') return 0;
    return Object.keys(srsData).length;
  } catch {
    return 0;
  }
}

/**
 * Count unique sentences/phrases the user has encountered (tracked in SRS).
 * @param {Object} storageAdapter - { load(key) }
 * @returns {number}
 */
function getPhrasesEncountered(storageAdapter) {
  try {
    const srsData = storageAdapter.load(SRS_KEY_SENTENCES);
    if (!srsData || typeof srsData !== 'object') return 0;
    return Object.keys(srsData).length;
  } catch {
    return 0;
  }
}

/**
 * Count sentence lessons where completionCount >= LESSON_MASTERED_THRESHOLD.
 * Iterates all sentence topics' non-exam lessons.
 * @param {Array} sentenceTopics
 * @returns {number}
 */
function getSentencesMastered(sentenceTopics) {
  let count = 0;
  for (const topic of sentenceTopics) {
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      if (getCompletionCount(lesson.id) >= LESSON_MASTERED_THRESHOLD) {
        count++;
      }
    }
  }
  return count;
}

/**
 * Count total non-exam sentence lessons available.
 * @param {Array} sentenceTopics
 * @returns {number}
 */
function getTotalSentenceLessons(sentenceTopics) {
  let count = 0;
  for (const topic of sentenceTopics) {
    for (const lesson of topic.lessons) {
      if (!lesson.exam) count++;
    }
  }
  return count;
}

/**
 * Build a 28-day (4-week) activity array from the activity log.
 * Each entry: { date: 'YYYY-MM-DD', dayOfWeek: 0-6, active: boolean }
 * Ordered oldest → newest.
 * @param {Object} activityLog - { [dateString]: true }
 * @returns {Array}
 */
function buildActivityGrid(activityLog) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = [];

  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    days.push({
      date: dateStr,
      dayOfWeek: d.getDay(),
      active: !!activityLog[dateStr],
    });
  }
  return days;
}

/**
 * Get XP progress toward next level.
 * @param {number} totalXP
 * @returns {{ currentTier: Object, nextTier: Object|null, progressPercent: number }}
 */
function getLevelProgress(totalXP) {
  let currentTier = LEVEL_TIERS[0];
  let nextTier = null;

  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (totalXP >= LEVEL_TIERS[i].minXP) {
      currentTier = LEVEL_TIERS[i];
      nextTier = LEVEL_TIERS[i + 1] || null;
    }
  }

  let progressPercent = 100;
  if (nextTier) {
    const range = nextTier.minXP - currentTier.minXP;
    const earned = totalXP - currentTier.minXP;
    progressPercent = Math.round((earned / range) * 100);
  }

  return { currentTier, nextTier, progressPercent };
}

// ========================
// RENDER: STATS TAB
// ========================

/**
 * Render the Stats/Profile tab content into the given container.
 * @param {HTMLElement} container - topicsContainer element
 * @param {Object} gamification - gamification API instance
 * @param {Object} srsSentences - SRS engine for sentences
 * @param {Object} srsWords - SRS engine for words
 * @param {Object} phraseBank - { [id]: phrase }
 * @param {Object} wordBank - { [id]: word }
 * @param {Object} data - { sentences, theory, words }
 * @param {Object} storageAdapter - { load(key), save(key, data) }
 */
export function renderStatsTab(container, gamification, srsSentences, srsWords, phraseBank, wordBank, data, storageAdapter) {
  // Hide review section when stats is active
  const reviewSection = document.getElementById('reviewSection');
  if (reviewSection) reviewSection.style.display = 'none';

  const stats = gamification.getStats();
  const activityLog = gamification.getActivityLog();
  const { currentTier, nextTier, progressPercent } = getLevelProgress(stats.totalXP);

  // Derived counts
  const wordsEncountered = getWordsEncountered(storageAdapter);
  const phrasesEncountered = getPhrasesEncountered(storageAdapter);
  const sentencesMastered = getSentencesMastered(data.sentences);
  const totalSentenceLessons = getTotalSentenceLessons(data.sentences);
  const dueSentences = srsSentences.getDueCount(phraseBank);
  const dueWords = srsWords.getDueCount(wordBank);
  const totalDue = dueSentences + dueWords;
  const activityDays = buildActivityGrid(activityLog);

  // Count active days in last 28
  const activeDaysCount = activityDays.filter(d => d.active).length;

  container.innerHTML = '';

  // ── Streak & Level Row ──
  const heroRow = document.createElement('div');
  heroRow.className = 'grid grid-cols-2 gap-4';
  heroRow.innerHTML = `
    <!-- Streak Card -->
    <div class="bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex flex-col gap-2 transition-colors duration-300">
      <div class="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Daily Streak</div>
      <div class="flex items-baseline gap-2">
        <span class="font-headline text-4xl font-bold text-on-surface dark:text-stone-100 transition-colors duration-300">${stats.streak}</span>
        <span class="font-body text-sm text-on-surface-variant dark:text-stone-400 transition-colors duration-300">days</span>
      </div>
      <div class="font-body text-xs text-on-surface-variant dark:text-stone-500 transition-colors duration-300">
        Longest: ${stats.longestStreak} days
      </div>
    </div>

    <!-- Level Card -->
    <div class="bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex flex-col gap-2 transition-colors duration-300">
      <div class="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Level</div>
      <div class="flex items-baseline gap-2">
        <span class="font-headline text-2xl font-bold text-primary dark:text-emerald-400 transition-colors duration-300">${stats.levelName}</span>
      </div>
      <div class="font-body text-xs text-on-surface-variant dark:text-stone-500 mb-1 transition-colors duration-300">${stats.totalXP} XP</div>
      ${nextTier ? `
        <div class="w-full bg-surface-variant dark:bg-stone-800 rounded-full h-1.5 overflow-hidden transition-colors duration-300">
          <div class="bg-primary dark:bg-emerald-600 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>
        <div class="font-body text-[10px] text-on-surface-variant dark:text-stone-500 transition-colors duration-300">${nextTier.minXP - stats.totalXP} XP to ${nextTier.name}</div>
      ` : `
        <div class="w-full bg-surface-variant dark:bg-stone-800 rounded-full h-1.5 overflow-hidden transition-colors duration-300">
          <div class="bg-primary dark:bg-emerald-600 h-1.5 rounded-full" style="width: 100%"></div>
        </div>
        <div class="font-body text-[10px] text-on-surface-variant dark:text-stone-500 transition-colors duration-300">Max level reached!</div>
      `}
    </div>
  `;
  container.appendChild(heroRow);

  // ── Progress Counters Row ──
  const progressRow = document.createElement('div');
  progressRow.className = 'grid grid-cols-3 gap-4 mt-4';
  progressRow.innerHTML = `
    <!-- Words Encountered -->
    <div class="bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-5 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex flex-col items-center text-center gap-1 transition-colors duration-300">
      <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-2xl mb-1 transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">dictionary</span>
      <span class="font-headline text-2xl font-bold text-on-surface dark:text-stone-100 transition-colors duration-300">${wordsEncountered}</span>
      <span class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Words</span>
    </div>

    <!-- Sentences Mastered -->
    <div class="bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-5 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex flex-col items-center text-center gap-1 transition-colors duration-300">
      <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-2xl mb-1 transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">check_circle</span>
      <span class="font-headline text-2xl font-bold text-on-surface dark:text-stone-100 transition-colors duration-300">${sentencesMastered}</span>
      <span class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Mastered</span>
      <span class="font-body text-[9px] text-on-surface-variant dark:text-stone-500 transition-colors duration-300">of ${totalSentenceLessons} lessons</span>
    </div>

    <!-- Due Items -->
    <div class="bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-5 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex flex-col items-center text-center gap-1 transition-colors duration-300">
      <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-2xl mb-1 transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">schedule</span>
      <span class="font-headline text-2xl font-bold text-on-surface dark:text-stone-100 transition-colors duration-300">${totalDue}</span>
      <span class="font-label text-[10px] uppercase tracking-wider text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Due</span>
      <span class="font-body text-[9px] text-on-surface-variant dark:text-stone-500 transition-colors duration-300">${dueSentences} phrases · ${dueWords} words</span>
    </div>
  `;
  container.appendChild(progressRow);

  // ── Phrases Encountered ──
  const phrasesRow = document.createElement('div');
  phrasesRow.className = 'mt-4 bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-5 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex items-center gap-4 transition-colors duration-300';
  phrasesRow.innerHTML = `
    <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-2xl transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">edit_note</span>
    <div class="flex-1">
      <div class="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Phrases Encountered</div>
      <div class="font-headline text-xl font-bold text-on-surface dark:text-stone-100 transition-colors duration-300">${phrasesEncountered}</div>
    </div>
  `;
  container.appendChild(phrasesRow);

  // ── Activity Chart (Last 4 Weeks) ──
  const activitySection = document.createElement('div');
  activitySection.className = 'mt-6 bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 border border-outline-variant/30 dark:border-stone-800 shadow-sm transition-colors duration-300';

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Build 4 week rows (each week = 7 days)
  let weeksHtml = '';
  for (let w = 0; w < 4; w++) {
    const weekDays = activityDays.slice(w * 7, (w + 1) * 7);
    const weekStart = weekDays[0];
    const weekLabel = formatWeekLabel(weekStart.date, w);

    let barsHtml = '';
    for (const day of weekDays) {
      const barColor = day.active
        ? 'bg-primary dark:bg-emerald-500'
        : 'bg-surface-variant dark:bg-stone-800';
      const barHeight = day.active ? 'h-8' : 'h-2';
      const tooltip = `${dayLabels[day.dayOfWeek]} ${day.date}${day.active ? ' ✓' : ''}`;
      barsHtml += `
        <div class="flex flex-col items-center gap-1 flex-1" title="${tooltip}">
          <div class="w-full flex items-end justify-center" style="height: 32px;">
            <div class="${barColor} ${barHeight} w-full max-w-[20px] rounded-sm transition-all duration-300"></div>
          </div>
        </div>`;
    }

    weeksHtml += `
      <div class="flex items-end gap-1">
        <div class="font-label text-[9px] text-on-surface-variant dark:text-stone-500 w-14 text-right pr-2 pb-1 flex-shrink-0 transition-colors duration-300">${weekLabel}</div>
        <div class="flex gap-1 flex-1">${barsHtml}</div>
      </div>`;
  }

  // Day-of-week header
  let dayHeaderHtml = '<div class="flex gap-1">';
  dayHeaderHtml += '<div class="w-14 flex-shrink-0"></div>'; // spacer to align with week label
  for (const label of dayLabels) {
    dayHeaderHtml += `<div class="flex-1 text-center font-label text-[9px] text-on-surface-variant dark:text-stone-500 transition-colors duration-300">${label}</div>`;
  }
  dayHeaderHtml += '</div>';

  activitySection.innerHTML = `
    <div class="flex items-center justify-between mb-4">
      <div class="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Activity — Last 4 Weeks</div>
      <div class="font-body text-xs text-on-surface-variant dark:text-stone-500 transition-colors duration-300">${activeDaysCount} active days</div>
    </div>
    <div class="flex flex-col gap-2">
      ${dayHeaderHtml}
      ${weeksHtml}
    </div>
  `;
  container.appendChild(activitySection);
}

/**
 * Format a week label like "Jun 2" from a date string.
 * @param {string} dateStr - 'YYYY-MM-DD'
 * @param {number} weekIndex - 0 = oldest, 3 = current
 * @returns {string}
 */
function formatWeekLabel(dateStr, weekIndex) {
  const d = new Date(dateStr + 'T00:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.getMonth()]} ${d.getDate()}`;
}
