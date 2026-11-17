import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function listJs(dir) {
  const out = [];
  let entries = [];
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...listJs(p));
    else if (name.endsWith('.js')) out.push(p);
  }
  return out;
}

/** Remove block and line comments (string-aware enough for this codebase). */
export function stripComments(src) {
  let out = '';
  let i = 0;
  let quote = null;
  while (i < src.length) {
    const c = src[i];
    const n = src[i + 1];
    if (quote) {
      out += c;
      if (c === '\\') { out += n ?? ''; i += 2; continue; }
      if (c === quote) quote = null;
      i++;
      continue;
    }
    if (c === '/' && n === '*') {
      const end = src.indexOf('*/', i + 2);
      i = end < 0 ? src.length : end + 2;
      continue;
    }
    if (c === '/' && n === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') quote = c;
    out += c;
    i++;
  }
  return out;
}

const rel = (p) => p.slice(ROOT.length + 1).replace(/\\/g, '/');

test('stripComments removes comments but keeps code and strings', () => {
  const s = stripComments("a // window\n/* document */ b 'x // y' c");
  assert.ok(!s.includes('window') && !s.includes('document'));
  assert.ok(s.includes("'x // y'") && s.includes('b'));
});

test('src/core has no browser globals (outside comments)', () => {
  const banned = /\b(document|window|localStorage|sessionStorage|navigator)\b/;
  const violations = [];
  for (const file of listJs(join(ROOT, 'src/core'))) {
    const lines = stripComments(readFileSync(file, 'utf8')).split('\n');
    lines.forEach((line, i) => {
      if (!banned.test(line)) return;
      if (/typeof\s+window\s*!==\s*['"]undefined['"]/.test(line)) return;
      violations.push(`${rel(file)}:${i + 1}: ${line.trim()}`);
    });
  }
  assert.deepEqual(violations, []);
});

function importsOf(file) {
  const src = stripComments(readFileSync(file, 'utf8'));
  const specs = [];
  const re = /(?:import|export)\s[^'"`;]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g;
  let m;
  while ((m = re.exec(src))) specs.push(m[1] || m[2] || m[3]);
  return specs;
}

const touchesWeb = (spec) => /(^|\/)src\/web\//.test(spec) || /^(\.\.?\/)+web\//.test(spec);

test('src/core does not import from src/web', () => {
  const bad = [];
  for (const file of listJs(join(ROOT, 'src/core'))) {
    for (const spec of importsOf(file)) if (touchesWeb(spec)) bad.push(`${rel(file)} -> ${spec}`);
  }
  assert.deepEqual(bad, []);
});

test('server/ does not import from src/web', () => {
  const bad = [];
  for (const file of listJs(join(ROOT, 'server'))) {
    for (const spec of importsOf(file)) if (touchesWeb(spec)) bad.push(`${rel(file)} -> ${spec}`);
  }
  assert.deepEqual(bad, []);
});
