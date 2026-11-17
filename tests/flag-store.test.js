import { test } from 'node:test';
import assert from 'node:assert/strict';
import { flagPhrase, getFlaggedItems, getFlaggedCount, exportFlaggedItems, clearFlaggedItems } from '../src/core/flag-store.js';

// Same contract as src/web/storage.js: a missing key loads as {} (not null / undefined).
function webLikeAdapter() {
  const map = new Map();
  return {
    load: (key) => (map.has(key) ? JSON.parse(map.get(key)) : {}),
    save: (key, data) => { map.set(key, JSON.stringify(data)); },
  };
}

test('count is 0 on an empty store', () => {
  const s = webLikeAdapter();
  assert.equal(getFlaggedCount(s), 0);
  assert.deepEqual(getFlaggedItems(s), []);
  assert.equal(exportFlaggedItems(s), '[]');
});

test('flagging twice stores two entries with id and flaggedAt', () => {
  const s = webLikeAdapter();
  flagPhrase(s, { es: 'Hola', field: 'ru', lessonId: 'w1_l1' });
  flagPhrase(s, { es: 'Adiós', field: 'uk' });
  const items = getFlaggedItems(s);
  assert.equal(getFlaggedCount(s), 2);
  assert.equal(items.length, 2);
  for (const it of items) {
    assert.equal(typeof it.id, 'string');
    assert.ok(!Number.isNaN(Date.parse(it.flaggedAt)));
  }
  assert.notEqual(items[0].id, items[1].id);
});

test('export is a JSON array', () => {
  const s = webLikeAdapter();
  flagPhrase(s, { es: 'Hola', field: 'both' });
  const parsed = JSON.parse(exportFlaggedItems(s));
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].es, 'Hola');
});

test('clear empties the list', () => {
  const s = webLikeAdapter();
  flagPhrase(s, { es: 'Hola', field: 'ru' });
  clearFlaggedItems(s);
  assert.equal(getFlaggedCount(s), 0);
  flagPhrase(s, { es: 'Otra', field: 'ru' });
  assert.equal(getFlaggedCount(s), 1);
});

test('non-array stored values are treated as empty', () => {
  const s = { load: () => ({ junk: true }), save() {} };
  assert.equal(getFlaggedCount(s), 0);
  assert.doesNotThrow(() => flagPhrase(s, { es: 'x', field: 'ru' }));
});
