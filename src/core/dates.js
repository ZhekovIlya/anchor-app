// ========================
// DATES (UTC DAYS)
// ========================
// One definition of "day" for streaks, the activity log, sync and the Telegram bot:
// the UTC calendar day as 'YYYY-MM-DD' (what Date#toISOString yields).
// Pure logic — no DOM, no wall clock unless the caller omits `date`.

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * UTC day string 'YYYY-MM-DD' for a date (default: now).
 * @param {Date} [date]
 * @returns {string}
 */
export function utcDayString(date = new Date()) {
  return date.toISOString().split('T')[0];
}

/**
 * Step a 'YYYY-MM-DD' UTC day by a number of days (negative = back).
 * @param {string} dayString
 * @param {number} deltaDays
 * @returns {string}
 */
export function addUtcDays(dayString, deltaDays) {
  const [y, m, d] = dayString.split('-').map(Number);
  return utcDayString(new Date(Date.UTC(y, m - 1, d + deltaDays)));
}

/**
 * Whole UTC days from dayA to dayB (positive when B is later).
 * @param {string} dayA
 * @param {string} dayB
 * @returns {number}
 */
export function utcDaysBetween(dayA, dayB) {
  return Math.round((new Date(dayB + 'T00:00:00Z') - new Date(dayA + 'T00:00:00Z')) / MS_PER_DAY);
}

/**
 * Weekday (0 = Sunday) of a 'YYYY-MM-DD' UTC day.
 * @param {string} dayString
 * @returns {number}
 */
export function utcWeekday(dayString) {
  return new Date(dayString + 'T00:00:00Z').getUTCDay();
}
