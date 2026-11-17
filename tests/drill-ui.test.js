import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { armEnterToContinue, renderWordFakeInput } from '../src/web/drill-ui.js';

function fakeDoc() {
  const listeners = new Set();
  return {
    listeners,
    addEventListener(t, fn) { if (t === 'keydown') listeners.add(fn); },
    removeEventListener(t, fn) { if (t === 'keydown') listeners.delete(fn); },
    press(key, extra = {}) {
      const e = { key, repeat: false, target: null, preventDefault() {}, ...extra };
      for (const fn of [...listeners]) fn(e);
    },
  };
}
function fakeScheduler() {
  const q = [];
  return {
    schedule: (fn) => { q.push(fn); return q.length - 1; },
    unschedule: (id) => { q[id] = null; },
    flush() { q.forEach((fn, i) => { if (fn) { q[i] = null; fn(); } }); },
  };
}

describe('armEnterToContinue (A1)', () => {
  test('is not attached synchronously, so the opening Enter cannot dismiss the bar', () => {
    const doc = fakeDoc(); const sch = fakeScheduler(); let n = 0;
    armEnterToContinue(doc, () => n++, sch.schedule, sch.unschedule);
    assert.strictEqual(doc.listeners.size, 0);
    doc.press('Enter');
    assert.strictEqual(n, 0);
    sch.flush();
    assert.strictEqual(doc.listeners.size, 1);
  });

  test('Enter continues once and detaches; repeat and other keys are ignored', () => {
    const doc = fakeDoc(); const sch = fakeScheduler(); let n = 0;
    armEnterToContinue(doc, () => n++, sch.schedule, sch.unschedule);
    sch.flush();
    doc.press('Enter', { repeat: true });
    doc.press('a');
    assert.strictEqual(n, 0);
    doc.press('Enter');
    assert.strictEqual(n, 1);
    assert.strictEqual(doc.listeners.size, 0);
    doc.press('Enter');
    assert.strictEqual(n, 1);
  });

  test('Enter inside the flag panel does not continue', () => {
    const doc = fakeDoc(); const sch = fakeScheduler(); let n = 0;
    armEnterToContinue(doc, () => n++, sch.schedule, sch.unschedule);
    sch.flush();
    const target = { closest: (sel) => (sel === '#feedbackBarFlagPanel' ? {} : null) };
    doc.press('Enter', { target });
    assert.strictEqual(n, 0);
    assert.strictEqual(doc.listeners.size, 1);
  });

  test('cancel detaches an attached listener and is idempotent', () => {
    const doc = fakeDoc(); const sch = fakeScheduler(); let n = 0;
    const cancel = armEnterToContinue(doc, () => n++, sch.schedule, sch.unschedule);
    sch.flush();
    cancel(); cancel();
    assert.strictEqual(doc.listeners.size, 0);
    doc.press('Enter');
    assert.strictEqual(n, 0);
  });

  test('cancel before arming prevents the listener from ever attaching', () => {
    const doc = fakeDoc(); const sch = fakeScheduler();
    const cancel = armEnterToContinue(doc, () => {}, sch.schedule, sch.unschedule);
    cancel();
    sch.flush();
    assert.strictEqual(doc.listeners.size, 0);
  });
});

describe('renderWordFakeInput (A5)', () => {
  test('escapes typed HTML', () => {
    const el = { innerHTML: '' };
    renderWordFakeInput(el, '<b>&x</b>');
    assert.ok(el.innerHTML.includes('&lt;b&gt;&amp;x&lt;/b&gt;'));
    assert.ok(!el.innerHTML.includes('<b>'));
  });
});
