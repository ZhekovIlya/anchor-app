// The service worker must never intercept /api/*, non-GET or cross-origin
// requests (AGENTS.md rule 10): the Telegram link flow polls GET /api/link.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const swPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sw.js');
const source = readFileSync(swPath, 'utf8');

function loadWorker() {
  const listeners = {};
  const fakeResponse = { status: 200, type: 'basic', clone() { return this; } };
  const self = {
    location: { origin: 'https://anchor.example' },
    addEventListener(type, fn) { listeners[type] = fn; },
    skipWaiting() {},
    clients: { claim() {} },
  };
  const caches = {
    open: async () => ({ addAll: async () => {}, put: async () => {} }),
    keys: async () => [],
    match: async () => undefined,
    delete: async () => true,
  };
  vm.runInNewContext(source, {
    self, caches, URL, Promise,
    fetch: async () => fakeResponse,
  });
  return listeners;
}

function dispatch(listeners, { method = 'GET', url, mode = 'cors' }) {
  let intercepted = false;
  listeners.fetch({
    request: { method, url, mode },
    respondWith() { intercepted = true; },
  });
  return intercepted;
}

const ORIGIN = 'https://anchor.example';

test('registers install, activate and fetch handlers', () => {
  const l = loadWorker();
  assert.equal(typeof l.install, 'function');
  assert.equal(typeof l.activate, 'function');
  assert.equal(typeof l.fetch, 'function');
});

test('keeps the build-time cache version placeholder', () => {
  assert.match(source, /%%CACHE_VERSION%%/);
});

test('does not intercept API requests', () => {
  const l = loadWorker();
  assert.equal(dispatch(l, { url: `${ORIGIN}/api/link?code=abc` }), false);
  assert.equal(dispatch(l, { url: `${ORIGIN}/api/sync` }), false);
  assert.equal(dispatch(l, { url: `${ORIGIN}/api` }), false);
});

test('does not intercept non-GET requests', () => {
  const l = loadWorker();
  assert.equal(dispatch(l, { method: 'POST', url: `${ORIGIN}/` }), false);
  assert.equal(dispatch(l, { method: 'PUT', url: `${ORIGIN}/assets/app.js` }), false);
});

test('does not intercept cross-origin GET requests', () => {
  const l = loadWorker();
  assert.equal(dispatch(l, { url: 'https://fonts.googleapis.com/css2?family=Inter' }), false);
  assert.equal(dispatch(l, { url: 'https://api.telegram.org/x' }), false);
});

test('intercepts navigations and same-origin static assets', () => {
  const l = loadWorker();
  assert.equal(dispatch(l, { url: `${ORIGIN}/`, mode: 'navigate' }), true);
  assert.equal(dispatch(l, { url: `${ORIGIN}/some/deep/link`, mode: 'navigate' }), true);
  assert.equal(dispatch(l, { url: `${ORIGIN}/assets/index-abc123.js` }), true);
});
