// ========================
// LOCALSTORAGE ADAPTER
// ========================
// Implements the storage interface for web browser.
// Interface: { load(key): Object, save(key, data): void }

export const localStorageAdapter = {
  load(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (e) {
      return {};
    }
  },

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  },
};

/**
 * Read a simple counter from localStorage (e.g. lesson completion tally).
 */
export function getCompletionCount(lessonId) {
  return parseInt(localStorage.getItem(lessonId) || '0', 10);
}

/**
 * Increment a lesson completion counter.
 */
export function incrementCompletion(lessonId) {
  const count = getCompletionCount(lessonId);
  localStorage.setItem(lessonId, count + 1);
}
