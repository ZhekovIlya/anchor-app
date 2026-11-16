import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseEnvFile } from '../scripts/dev-api.js';

test('SETUP.md documents every variable in .env.example and every npm script it mentions exists', () => {
  const doc = readFileSync(new URL('../docs/telegram-bot/SETUP.md', import.meta.url), 'utf8');
  const example = readFileSync(new URL('../.env.example', import.meta.url), 'utf8');
  const names = Object.keys(parseEnvFile(example.replace(/^#\s*(?=[A-Z_]+=)/gm, '')))
    .filter((name) => name !== 'DEV_API_PORT');
  for (const name of names) assert.ok(doc.includes(name), `${name} missing from SETUP.md`);

  const { scripts } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  for (const [, script] of doc.matchAll(/npm run ([\w:]+)/g)) assert.ok(scripts[script], `npm run ${script} does not exist`);
});
