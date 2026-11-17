import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { buildActivityGrid } from '../src/web/stats-dashboard.js';

describe('buildActivityGrid (UTC days)', () => {
  test('has 28 cells ending on the UTC day of now', () => {
    const grid = buildActivityGrid({}, new Date('2026-11-16T12:00:00Z'));
    assert.equal(grid.length, 28);
    assert.equal(grid[27].date, '2026-11-16');
    assert.equal(grid[0].date, '2026-10-20');
  });

  test('instant just after Spanish midnight (UTC+1) still maps to the UTC day recordActivity uses', () => {
    // 00:30 in Madrid on 16 Nov == 23:30 UTC on 15 Nov
    const now = new Date('2026-11-15T23:30:00Z');
    const grid = buildActivityGrid({ '2026-11-15': true }, now);
    assert.equal(grid[27].date, '2026-11-15');
    assert.equal(grid[27].active, true);
    assert.equal(grid[27].dayOfWeek, 0); // Sunday
  });

  test('UTC+2 summer midnight and day-of-week are consistent', () => {
    const now = new Date('2026-07-14T22:10:00Z'); // 00:10 on 15 Jul in Madrid
    const grid = buildActivityGrid({ '2026-07-14': true }, now);
    assert.equal(grid[27].date, '2026-07-14');
    assert.equal(grid[27].dayOfWeek, 2); // Tuesday
    assert.equal(grid.filter(d => d.active).length, 1);
  });

  test('dates are consecutive across a DST change', () => {
    const grid = buildActivityGrid({}, new Date('2026-10-28T00:00:00Z'));
    for (let i = 1; i < grid.length; i++) {
      const diff = (Date.parse(grid[i].date) - Date.parse(grid[i - 1].date)) / 86400000;
      assert.equal(diff, 1);
    }
  });
});
