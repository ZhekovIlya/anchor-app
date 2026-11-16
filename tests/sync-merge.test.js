import { test, describe, mock } from 'node:test';
import assert from 'node:assert/strict';
import {
  emptyProgress, normalizeProgress, mergeProgress, progressEquals, totalXP,
  streakEndingAt, longestStreakIn,
} from '../src/core/sync-merge.js';
import { createDocStorage } from '../src/core/progress-adapter.js';
import { copyRenamedSrsEntries } from '../src/core/id-migrations.js';
import { createSRS } from '../src/core/srs.js';
import { createGamification, XP_REWARDS } from '../src/core/gamification.js';
import { SRS_KEY_WORDS, BUCKET_INTERVALS } from '../src/core/constants.js';
import { loadAllData, buildWordBank } from '../src/core/data-loader.js';

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    load(key) { return data[key] ? JSON.parse(JSON.stringify(data[key])) : {}; },
    save(key, value) { data[key] = JSON.parse(JSON.stringify(value)); },
  };
}

// Deterministic PRNG (mulberry32) so property tests are reproducible
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomDoc(rand) {
  const pick = (n) => Math.floor(rand() * n);
  const doc = emptyProgress();
  for (let i = 0; i < 12; i++) {
    if (rand() < 0.5) continue;
    doc.srs.words[`w${pick(8)}`] = {
      bucket: pick(5),
      dueDate: 1000 + pick(5) * 100,
      isMistake: rand() < 0.3,
      ...(rand() < 0.7 ? { updatedAt: pick(4) * 10 } : {}),
    };
  }
  for (let i = 0; i < 4; i++) doc.srs.sentences[`s${pick(4)}`] = { bucket: pick(5), dueDate: pick(3) * 100, updatedAt: pick(3) };
  for (let i = 0; i < 4; i++) doc.completions[`l${pick(5)}`] = pick(6);
  for (let i = 0; i < 6; i++) doc.activity[`2026-10-${String(20 + pick(10)).padStart(2, '0')}`] = true;
  const dates = Object.keys(doc.activity).sort();
  doc.streak = { current: pick(4), longest: pick(6), lastActiveDate: dates.length && rand() < 0.8 ? dates[dates.length - 1] : null };
  for (let i = 0; i < 3; i++) doc.xp[`dev${pick(4)}`] = pick(500);
  return doc;
}

describe('SRS writes stamp updatedAt', () => {
  test('promote, demote and registerNew record when they happened', () => {
    const storage = memoryStorage();
    const srs = createSRS(storage, SRS_KEY_WORDS);
    const before = Date.now();
    srs.registerNew('a');
    srs.promote('b');
    srs.demote('c');
    const pool = storage.data[SRS_KEY_WORDS];
    for (const id of ['a', 'b', 'c']) {
      assert.ok(pool[id].updatedAt >= before && pool[id].updatedAt <= Date.now(), `${id} has updatedAt`);
    }
    assert.equal(pool.b.bucket, 1);
    assert.equal(pool.c.isMistake, true);
  });
});

describe('normalizeProgress', () => {
  test('drops garbage instead of throwing', () => {
    const doc = normalizeProgress({
      srs: { words: { ok: { bucket: 2, dueDate: 5 }, bad: { bucket: 'x' }, neg: { bucket: -1, dueDate: 1 }, ['x'.repeat(200)]: { bucket: 1, dueDate: 1 } }, sentences: 'nope' },
      completions: { l1: 3, l2: 'many', l3: -2 },
      activity: { '2026-10-01': true, 'yesterday': true, '2026-10-02': false },
      xp: { web: 10, evil: Infinity },
      __proto__: { polluted: true },
    });
    assert.deepEqual(Object.keys(doc.srs.words), ['ok']);
    assert.deepEqual(doc.srs.words.ok, { bucket: 2, dueDate: 5, isMistake: false, updatedAt: 0 });
    assert.deepEqual(doc.srs.sentences, {});
    assert.deepEqual(doc.completions, { l1: 3 });
    assert.deepEqual(doc.activity, { '2026-10-01': true });
    assert.deepEqual(doc.xp, { web: 10 });
    assert.equal(normalizeProgress(null).v, 1);
    assert.equal(normalizeProgress('junk').streak.current, 0);
  });
});

describe('mergeProgress rules', () => {
  test('SRS: last writer wins on updatedAt', () => {
    const a = { srs: { words: { w: { bucket: 4, dueDate: 900, updatedAt: 10 } } } };
    const b = { srs: { words: { w: { bucket: 0, dueDate: 100, isMistake: true, updatedAt: 20 } } } };
    assert.equal(mergeProgress(a, b).srs.words.w.bucket, 0);
    assert.equal(mergeProgress(b, a).srs.words.w.isMistake, true);
  });

  test('SRS: legacy entries (no updatedAt) lose to any stamped write, tie-break on bucket', () => {
    const legacyHigh = { srs: { words: { w: { bucket: 3, dueDate: 5 } } } };
    const legacyLow = { srs: { words: { w: { bucket: 1, dueDate: 9 } } } };
    const stamped = { srs: { words: { w: { bucket: 0, dueDate: 1, updatedAt: 1 } } } };
    assert.equal(mergeProgress(legacyHigh, legacyLow).srs.words.w.bucket, 3);
    assert.equal(mergeProgress(legacyHigh, stamped).srs.words.w.bucket, 0);
  });

  test('completions take the max, activity is a union', () => {
    const merged = mergeProgress(
      { completions: { a: 3, b: 1 }, activity: { '2026-10-01': true } },
      { completions: { a: 2, c: 4 }, activity: { '2026-10-02': true } },
    );
    assert.deepEqual(merged.completions, { a: 3, b: 1, c: 4 });
    assert.deepEqual(Object.keys(merged.activity).sort(), ['2026-10-01', '2026-10-02']);
  });

  test('XP is a G-counter: concurrent gains on two devices both survive', () => {
    const server = { xp: { web1: 1000, tg: 40 } };
    const web = { xp: { web1: 1025 } };          // web earned 25 since last sync
    const bot = { xp: { web1: 1000, tg: 50 } };   // bot earned 10 meanwhile
    const merged = mergeProgress(mergeProgress(server, web), bot);
    assert.equal(totalXP(merged), 1075);
    assert.equal(totalXP(mergeProgress(merged, web)), 1075, 're-sending the same doc adds nothing');
  });

  test('streak is recomputed from merged activity', () => {
    const web = { activity: { '2026-10-29': true, '2026-10-30': true }, streak: { current: 2, longest: 2, lastActiveDate: '2026-10-30' } };
    const bot = { activity: { '2026-10-31': true }, streak: { current: 1, longest: 5, lastActiveDate: '2026-10-31' } };
    const merged = mergeProgress(web, bot);
    assert.deepEqual(merged.streak, { current: 3, longest: 5, lastActiveDate: '2026-10-31' });
  });

  test('streak keeps a legacy current that predates the activity log', () => {
    const legacy = { activity: { '2026-10-31': true }, streak: { current: 9, longest: 9, lastActiveDate: '2026-10-31' } };
    assert.equal(mergeProgress(legacy, {}).streak.current, 9);
    // …but a newer active day elsewhere replaces it with the real run
    assert.equal(mergeProgress(legacy, { activity: { '2026-11-02': true } }).streak.current, 1);
  });

  test('streak helpers count across month/year boundaries and DST', () => {
    const activity = { '2025-12-31': true, '2026-01-01': true, '2026-10-24': true, '2026-10-25': true, '2026-10-26': true, '2026-10-27': true };
    assert.equal(streakEndingAt(activity, '2026-01-01'), 2);
    assert.equal(streakEndingAt(activity, '2026-10-27'), 4);
    assert.equal(streakEndingAt(activity, '2026-10-28'), 0);
    assert.equal(longestStreakIn(activity), 4);
  });

  test('progressEquals ignores key order', () => {
    const a = { completions: { x: 1, y: 2 } };
    const b = { completions: { y: 2, x: 1 } };
    assert.ok(progressEquals(a, b));
    assert.ok(!progressEquals(a, { completions: { x: 2, y: 2 } }));
  });
});

describe('mergeProgress is a join (property tests)', () => {
  const rand = rng(42);
  const samples = Array.from({ length: 60 }, () => randomDoc(rand));

  test('commutative', () => {
    for (let i = 0; i < samples.length - 1; i++) {
      const [a, b] = [samples[i], samples[i + 1]];
      assert.ok(progressEquals(mergeProgress(a, b), mergeProgress(b, a)), `pair ${i}`);
    }
  });

  test('associative', () => {
    for (let i = 0; i < samples.length - 2; i++) {
      const [a, b, c] = [samples[i], samples[i + 1], samples[i + 2]];
      assert.ok(progressEquals(mergeProgress(a, mergeProgress(b, c)), mergeProgress(mergeProgress(a, b), c)), `triple ${i}`);
    }
  });

  test('idempotent', () => {
    for (const a of samples) {
      const merged = mergeProgress(a, a);
      assert.ok(progressEquals(merged, normalizeProgress(a)));
      assert.ok(progressEquals(mergeProgress(merged, a), merged));
    }
  });
});

describe('createDocStorage runs the app engines on a doc', () => {
  test('createSRS writes into doc.srs.words', () => {
    const doc = emptyProgress();
    const srs = createSRS(createDocStorage(doc, { deviceId: 'tg' }), SRS_KEY_WORDS);
    srs.registerNew('wn_l1_w0');
    srs.promote('wn_l1_w1');
    srs.demote('wn_l1_w2');
    assert.deepEqual(Object.keys(doc.srs.words).sort(), ['wn_l1_w0', 'wn_l1_w1', 'wn_l1_w2']);
    assert.equal(doc.srs.words.wn_l1_w1.bucket, 1);
    assert.equal(srs.getMistakesCount({ wn_l1_w2: {} }), 1);
  });

  test('createGamification credits XP to the device and keeps others', () => {
    const doc = normalizeProgress({ xp: { web1: 100 } });
    const gamification = createGamification(createDocStorage(doc, { deviceId: 'tg' }));
    gamification.addXP(XP_REWARDS.review);
    assert.deepEqual(doc.xp, { web1: 100, tg: 15 });
    assert.equal(gamification.getStats().totalXP, 115);
  });

  test('recordActivity updates doc.activity and streak like the app', () => {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const doc = normalizeProgress({ activity: { [yesterday]: true }, streak: { current: 4, longest: 4, lastActiveDate: yesterday } });
    const result = createGamification(createDocStorage(doc, { deviceId: 'tg' })).recordActivity();
    assert.equal(result.current, 5);
    assert.ok(doc.activity[today]);
    assert.deepEqual(doc.streak, { current: 5, longest: 5, lastActiveDate: today });
  });
});

describe('gamification streak survives DST changes', () => {
  test('Oct 25 → Oct 26 2026 (CEST → CET) counts as consecutive', (t) => {
    const previousTZ = process.env.TZ;
    process.env.TZ = 'Europe/Madrid';
    t.after(() => { process.env.TZ = previousTZ; mock.timers.reset(); });
    mock.timers.enable({ apis: ['Date'], now: Date.parse('2026-10-26T10:00:00Z') });
    const storage = memoryStorage({ anchor_gamification: { totalXP: 0, streak: { current: 3, longest: 3, lastActiveDate: '2026-10-25' }, activityLog: { '2026-10-25': true } } });
    const result = createGamification(storage).recordActivity();
    assert.equal(result.current, 4);
  });
});

describe('lesson id migration (wt_* → wtf_*)', () => {
  test('copies, never overwrites, and is idempotent', () => {
    const pool = {
      wt_l1_w0: { bucket: 2, dueDate: 1 },
      wt_l1_w1: { bucket: 1, dueDate: 1 },
      wtf_l1_w1: { bucket: 4, dueDate: 9 },
      wt_l2_w0: { bucket: 3, dueDate: 1 },
    };
    const { pool: migrated, changed } = copyRenamedSrsEntries(pool);
    assert.ok(changed);
    assert.deepEqual(migrated.wtf_l1_w0, { bucket: 2, dueDate: 1 });
    assert.equal(migrated.wtf_l1_w1.bucket, 4, 'existing entry kept');
    assert.ok(migrated.wt_l1_w0, 'old entry kept');
    assert.ok(!('wtf_l2_w0' in migrated), 'only renamed lessons move');
    assert.equal(copyRenamedSrsEntries(migrated).changed, false);
  });

  test('every word is reachable in the word bank (no shadowed lessons)', () => {
    const { words } = loadAllData();
    const expected = words.flatMap((t) => t.lessons).filter((l) => !l.exam).reduce((n, l) => n + l.words.length, 0);
    assert.equal(Object.keys(buildWordBank(words)).length, expected);
  });
});

describe('BUCKET_INTERVALS sanity for docs', () => {
  test('dueDate math stays within safe integers', () => {
    assert.ok(Number.isSafeInteger(Date.now() + BUCKET_INTERVALS[BUCKET_INTERVALS.length - 1]));
  });
});
