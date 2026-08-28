#!/usr/bin/env node
// ========================
// scripts/stamp-sw.js
// ========================
// Postbuild script: reads the current git short hash and stamps it into
// the service worker that Vite copied verbatim from public/ into dist/.
//
// Run automatically via `postbuild` in package.json.
// Usage: node scripts/stamp-sw.js

import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distSW = join(root, 'dist', 'sw.js');

if (!existsSync(distSW)) {
  console.error('[stamp-sw] dist/sw.js not found — did you run `npm run build` first?');
  process.exit(1);
}

// Get git short hash; fall back to timestamp if git is unavailable
let version;
try {
  version = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
} catch {
  version = `build-${Date.now()}`;
  console.warn(`[stamp-sw] git unavailable, using fallback version: ${version}`);
}

const original = readFileSync(distSW, 'utf8');
const stamped = original.replace(/%%CACHE_VERSION%%/g, version);

if (original === stamped) {
  console.warn('[stamp-sw] Warning: %%CACHE_VERSION%% placeholder not found in dist/sw.js');
} else {
  writeFileSync(distSW, stamped, 'utf8');
  console.log(`[stamp-sw] ✓ Stamped dist/sw.js with CACHE_NAME = 'spanish-anchor-${version}'`);
}
