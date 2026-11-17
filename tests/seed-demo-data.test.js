import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadAllData } from '../src/core/data-loader.js';
import { DEMO_SEED_LESSON_IDS, shouldSeed, seedDemoData } from '../src/dev/seed-demo-data.js';

function fakeStorage(initial = {}) {
  const m = new Map(Object.entries(initial));
  return {
    getItem: k => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    keys: () => [...m.keys()],
  };
}

test('every seeded id is a real lesson id', () => {
  const data = loadAllData();
  const ids = new Set(data.sentences.flatMap(t => t.lessons.map(l => l.id)));
  const unknown = DEMO_SEED_LESSON_IDS.filter(id => !ids.has(id));
  assert.deepEqual(unknown, []);
});

test('seed is opt-in via ?demo=1', () => {
  assert.equal(shouldSeed('', fakeStorage()), false);
  assert.equal(shouldSeed('?x=1', fakeStorage()), false);
  assert.equal(shouldSeed('?demo=1', fakeStorage()), true);
});

test('seed never runs in a Telegram-linked browser', () => {
  assert.equal(shouldSeed('?demo=1', fakeStorage({ anchor_sync_auth: '{"token":"x"}' })), false);
});

test('seed runs once and writes bare lesson ids', () => {
  const st = fakeStorage();
  seedDemoData(st);
  assert.equal(st.getItem('w1_exam'), '5');
  assert.equal(st.getItem('w2_l1'), '1');
  assert.equal(st.keys().some(k => k.startsWith('completion_count_')), false);
  assert.equal(shouldSeed('?demo=1', st), false);
});
