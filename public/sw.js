// ========================
// SERVICE WORKER
// ========================
// CACHE_VERSION is stamped at build time by scripts/stamp-sw.js
// (replaces %%CACHE_VERSION%% with the git short hash).
// During dev this stays as a static dev string — acceptable because
// Vite's dev server does not activate service workers.

const CACHE_NAME = 'spanish-anchor-%%CACHE_VERSION%%';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/apple-touch-icon.png',
];

// ── Install: pre-cache the app shell ──────────────────────────────────
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// ── Activate: delete caches from old versions ─────────────────────────
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// ── Fetch: strategy split ─────────────────────────────────────────────
//   Navigation requests (index.html / SPA shell) → NETWORK-FIRST
//     A returning visitor always gets the freshest HTML, which references
//     the latest content-hashed JS/CSS chunks. Falls back to cache only
//     when genuinely offline.
//
//   Static hashed assets (JS/CSS/images) → CACHE-FIRST
//     Filenames already change on content change, so serving from cache
//     is always safe and dramatically faster.

self.addEventListener('fetch', (e) => {
  // Never intercept anything but same-origin GETs, and never the API: the
  // Telegram link flow polls GET /api/link?code=… and must always hit the network.
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname === '/api' || url.pathname.startsWith('/api/')) return;

  const isNavigation =
    e.request.mode === 'navigate' ||
    url.pathname === '/' ||
    url.pathname === '/index.html';

  if (isNavigation) {
    // Network-first for navigation
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(e.request))
    );
  } else {
    // Cache-first for hashed static assets
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          }
          return networkResponse;
        });
      })
    );
  }
});
