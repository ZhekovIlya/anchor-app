import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { utcDayString, addUtcDays, utcDaysBetween, utcWeekday } from '../src/core/dates.js';
import { createGamification } from '../src/core/gamification.js';

describe('dates', () => {
  test('utcDayString is the UTC calendar day', () => {
    assert.equal(utcDayString(new Date('2026-11-15T23:30:00Z')), '2026-11-15');
    assert.equal(utcDayString(new Date('2026-11-16T00:30:00+01:00')), '2026-11-15');
  });
  test('addUtcDays crosses month/year boundaries', () => {
    assert.equal(addUtcDays('2026-03-01', -1), '2026-02-28');
    assert.equal(addUtcDays('2026-12-31', 1), '2027-01-01');
    assert.equal(addUtcDays('2026-10-25', 1), '2026-10-26'); // DST day in Europe
  });
  test('utcDaysBetween and utcWeekday', () => {
    assert.equal(utcDaysBetween('2026-11-01', '2026-11-16'), 15);
    assert.equal(utcWeekday('2026-11-16'), 1); // Monday
  });
  test('gamification keeps stored state shape and exports', () => {
    const store = {};
    const g = createGamification({ load: k => store[k], save: (k, v) => { store[k] = v; } });
    const r = g.recordActivity();
    assert.equal(r.current, 1);
    assert.ok(g.getActivityLog()[utcDayString(new Date())]);
  });
});
