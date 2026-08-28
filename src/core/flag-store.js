// ========================
// FLAG STORE (Core)
// ========================
// Pure core module — no DOM. Persists flagged translation issues to localStorage.
// These can be reviewed/exported by a future agent session or by the user.

const FLAG_KEY = 'anchor_flagged_items';

/**
 * Flag a phrase's translation as potentially wrong.
 * @param {Object} storage - Storage adapter { load, save }
 * @param {Object} item
 * @param {string} item.es        - The Spanish phrase
 * @param {string} [item.ru]      - Russian translation
 * @param {string} [item.uk]      - Ukrainian translation
 * @param {string} item.field     - Which field is wrong: 'ru' | 'uk' | 'both'
 * @param {string} [item.correction] - Optional user-provided correction note
 * @param {string} [item.lessonId]   - Lesson ID for traceability
 */
export function flagPhrase(storage, item) {
  const existing = storage.load(FLAG_KEY) || [];
  const entry = {
    ...item,
    flaggedAt: new Date().toISOString(),
    id: `flag_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
  };
  existing.push(entry);
  storage.save(FLAG_KEY, existing);
  return entry;
}

/**
 * Get all flagged items.
 * @param {Object} storage - Storage adapter { load, save }
 * @returns {Array}
 */
export function getFlaggedItems(storage) {
  return storage.load(FLAG_KEY) || [];
}

/**
 * Export flagged items as a formatted JSON string.
 * @param {Object} storage
 * @returns {string}
 */
export function exportFlaggedItems(storage) {
  const items = getFlaggedItems(storage);
  return JSON.stringify(items, null, 2);
}

/**
 * Clear all flagged items.
 * @param {Object} storage
 */
export function clearFlaggedItems(storage) {
  storage.save(FLAG_KEY, []);
}

/**
 * Get count of flagged items.
 * @param {Object} storage
 * @returns {number}
 */
export function getFlaggedCount(storage) {
  return getFlaggedItems(storage).length;
}
