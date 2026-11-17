import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createSRS } from '../src/core/srs.js';
import { BUCKET_INTERVALS } from '../src/core/constants.js';

const KEY = 'srs_test';
const FAR_FUTURE = 8.64e15;

function makeStore(initial = {}) {
  const db = { [KEY]: JSON.parse(JSON.stringify(initial)) };
  return {
    db,
    load: (k) => db[k],
    save: (k, d) => { db[k] = JSON.parse(JSON.stringify(d)); },
  };
}
const bank = { a: { es: 'A' }, b: { es: 'B' }, c: { es: 'C' }, d: { es: 'D' } };

describe('SRS', () => {
  test('registerNew creates a bucket-0 entry due in one day and never overwrites', () => {
    const store = makeStore();
    const srs = createSRS(store, KEY);
    srs.registerNew('a');
    const e = store.db[KEY].a;
    assert.strictEqual(e.bucket, 0);
    assert.strictEqual(e.dueDate - e.updatedAt, BUCKET_INTERVALS[1]);
    store.db[KEY].a.bucket = 3;
    srs.registerNew('a');
    assert.strictEqual(store.db[KEY].a.bucket, 3);
  });

  test('promote moves up one bucket, clears mistake flag, caps at last bucket', () => {
    const store = makeStore({ a: { bucket: 0, dueDate: 0, isMistake: true, updatedAt: 1 } });
    const srs = createSRS(store, KEY);
    srs.promote('a');
    let e = store.db[KEY].a;
    assert.strictEqual(e.bucket, 1);
    assert.strictEqual(e.isMistake, false);
    assert.strictEqual(e.dueDate - e.updatedAt, BUCKET_INTERVALS[1]);
    for (let i = 0; i < BUCKET_INTERVALS.length + 3; i++) srs.promote('a');
    e = store.db[KEY].a;
    assert.strictEqual(e.bucket, BUCKET_INTERVALS.length - 1);
    assert.strictEqual(e.dueDate - e.updatedAt, BUCKET_INTERVALS[BUCKET_INTERVALS.length - 1]);
  });

  test('promote on an unknown id starts from bucket 0 => bucket 1', () => {
    const store = makeStore();
    createSRS(store, KEY).promote('zzz');
    assert.strictEqual(store.db[KEY].zzz.bucket, 1);
  });

  test('demote resets to bucket 0 and flags a mistake, keeping the entry shape', () => {
    const store = makeStore({ a: { bucket: 4, dueDate: FAR_FUTURE, updatedAt: 1 } });
    createSRS(store, KEY).demote('a');
    const e = store.db[KEY].a;
    assert.strictEqual(e.bucket, 0);
    assert.strictEqual(e.isMistake, true);
    assert.strictEqual(e.dueDate - e.updatedAt, BUCKET_INTERVALS[0]);
    assert.deepStrictEqual(Object.keys(e).sort(), ['bucket', 'dueDate', 'isMistake', 'updatedAt']);
  });

  test('due filtering: only past-due, non-mistake, known ids; count matches list', () => {
    const store = makeStore({
      a: { bucket: 1, dueDate: 0 },
      b: { bucket: 1, dueDate: FAR_FUTURE },
      c: { bucket: 0, dueDate: 0, isMistake: true },
      d: { bucket: 1, dueDate: 0, isMistake: false },
      unknown: { bucket: 1, dueDate: 0 },
    });
    const srs = createSRS(store, KEY);
    const due = srs.getDuePhrases(bank).map(p => p.es).sort();
    assert.deepStrictEqual(due, ['A', 'D']);
    assert.strictEqual(srs.getDueCount(bank), 2);
    assert.strictEqual(srs.getDuePhrases(bank).length, srs.getDueCount(bank));
  });

  test('mistakes list and count ignore unknown ids and non-mistakes', () => {
    const store = makeStore({
      a: { bucket: 0, dueDate: FAR_FUTURE, isMistake: true },
      b: { bucket: 0, dueDate: 0, isMistake: false },
      gone: { bucket: 0, dueDate: 0, isMistake: true },
    });
    const srs = createSRS(store, KEY);
    assert.deepStrictEqual(srs.getMistakesPhrases(bank).map(p => p.es), ['A']);
    assert.strictEqual(srs.getMistakesCount(bank), 1);
  });

  test('a throwing storage yields an empty pool', () => {
    const srs = createSRS({ load() { throw new Error('x'); }, save() {} }, KEY);
    assert.strictEqual(srs.getDueCount(bank), 0);
    assert.deepStrictEqual(srs.getDuePhrases(bank), []);
  });
});
