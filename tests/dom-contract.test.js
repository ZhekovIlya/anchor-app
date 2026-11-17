// The page and the script must agree: every id the browser code looks up with
// getElementById exists in index.html or is created in JS. (AGENTS.md rule 2)
// Reads files from disk with regexes — no DOM needed.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const webDir = join(root, 'src', 'web');
const webFiles = readdirSync(webDir).filter(f => f.endsWith('.js'));
const sources = webFiles.map(f => ({ f, text: readFileSync(join(webDir, f), 'utf8') }));

const htmlIds = new Set([...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(m => m[1]));

// Ids created at runtime: id="…" in templates, .id = '…', setAttribute('id', '…').
const createdIds = new Set();
for (const { text } of sources) {
  for (const m of text.matchAll(/\bid\s*=\s*["']([^"'$]+)["']/g)) createdIds.add(m[1]);
  for (const m of text.matchAll(/\.id\s*=\s*['"`]([^'"`$]+)['"`]/g)) createdIds.add(m[1]);
  for (const m of text.matchAll(/setAttribute\(\s*['"]id['"]\s*,\s*['"]([^'"]+)['"]/g)) createdIds.add(m[1]);
}

test('every literal id passed to getElementById exists in index.html or is created in JS', () => {
  const missing = [];
  for (const { f, text } of sources) {
    for (const m of text.matchAll(/getElementById\(\s*['"]([^'"]+)['"]\s*\)/g)) {
      const id = m[1];
      if (!htmlIds.has(id) && !createdIds.has(id)) missing.push(`${f}: ${id}`);
    }
  }
  assert.deepEqual([...new Set(missing)], [], 'ids read by JS but absent from the page');
});

test('PWA wiring is present in the page and entry script', () => {
  assert.match(html, /<link[^>]+rel=["']manifest["'][^>]*href=["']\/manifest\.json["']/);
  assert.match(html, /name=["']theme-color["']/);
  const main = readFileSync(join(webDir, 'main.js'), 'utf8');
  assert.match(main, /serviceWorker\.register\(\s*['"]\/sw\.js['"]/);
  assert.match(main, /import\.meta\.env\.PROD/);
});

test('icon-only buttons carry an accessible name', () => {
  const offenders = [];
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const attrs = m[1];
    const inner = m[2].replace(/<span[^>]*material-symbols-outlined[^>]*>[\s\S]*?<\/span>/g, '').replace(/<[^>]+>/g, '').trim();
    if (inner === '' && !/aria-label=/.test(attrs)) offenders.push((attrs.match(/id="([^"]+)"/) || [])[1] || attrs.trim());
  }
  assert.deepEqual(offenders, []);
});
