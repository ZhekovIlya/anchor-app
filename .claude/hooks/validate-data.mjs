// PostToolUse hook: after an edit to curriculum data (or the code that loads and
// tokenizes it), run the fast data validators and hand any failure back to the agent.
// Reads the hook payload on stdin. Exit 0 = nothing to say; exit 2 = stderr is shown
// to the agent. Wired up in .claude/settings.json.

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = process.env.CLAUDE_PROJECT_DIR
  || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const WATCHED = [
  /^data\//,
  /^src\/core\/(tokenizer|data-loader|theory-registry|learning-paths)\.js$/,
];

const TEST_FILES = [
  'tests/validate-data.test.js',
  'tests/vocabulary-coverage.test.js',
  'tests/theory-registry.test.js',
  'tests/learning-paths.test.js',
];

function readStdin() {
  return new Promise((resolve) => {
    let text = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { text += chunk; });
    process.stdin.on('end', () => resolve(text));
    process.stdin.on('error', () => resolve(text));
  });
}

function editedPath(payload) {
  const input = (payload && payload.tool_input) || {};
  const file = input.file_path || input.path || '';
  if (!file) return '';
  const absolute = path.isAbsolute(file) ? file : path.resolve(payload.cwd || projectDir, file);
  return path.relative(projectDir, absolute).split(path.sep).join('/');
}

let payload = {};
try {
  payload = JSON.parse((await readStdin()) || '{}');
} catch {
  process.exit(0); // not our business if the payload is unreadable
}

const relative = editedPath(payload);
if (!relative || relative.startsWith('..') || !WATCHED.some((pattern) => pattern.test(relative))) {
  process.exit(0);
}

const tests = TEST_FILES.filter((file) => existsSync(path.join(projectDir, file)));
if (tests.length === 0) process.exit(0);

const run = spawnSync(process.execPath, ['--test', ...tests], {
  cwd: projectDir,
  encoding: 'utf8',
  timeout: 60_000,
});

if (run.status === 0) process.exit(0);

// Keep the message short: the failing test names and the assertion text.
const output = `${run.stdout || ''}\n${run.stderr || ''}`.split(/\r?\n/);
const interesting = output.filter((line) => /✖|not ok|AssertionError|Error:|missing|must |Duplicate|Unknown|expected|actual/i.test(line));
const excerpt = (interesting.length ? interesting : output.slice(-25)).slice(0, 40).join('\n');

process.stderr.write(
  `Curriculum validators failed after editing ${relative}.\n`
  + 'Fix the data before continuing (run `node --test ' + tests.join(' ') + '` for the full output).\n\n'
  + excerpt + '\n',
);
process.exit(2);
