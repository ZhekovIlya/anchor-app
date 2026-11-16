import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { mkdtempSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseEnvFile, loadEnvFiles, listApiRoutes, createDevApiHandler, pollUpdates } from '../scripts/dev-api.js';
import { TelegramError } from '../server/telegram.js';

describe('env files', () => {
  test('parseEnvFile handles comments, quotes and export', () => {
    assert.deepEqual(parseEnvFile([
      '# comment', '', 'A=1', 'export B = two ', 'C="quoted # not a comment"', "D='single'", 'E=value # trailing', 'not a line', 'F=',
    ].join('\r\n')), { A: '1', B: 'two', C: 'quoted # not a comment', D: 'single', E: 'value', F: '' });
  });

  test('loadEnvFiles never overrides existing values; first file wins', () => {
    const dir = mkdtempSync(join(tmpdir(), 'anchor-env-'));
    try {
      writeFileSync(join(dir, 'a'), 'X=from-a\nY=from-a');
      writeFileSync(join(dir, 'b'), 'Y=from-b\nZ=from-b');
      const env = { X: 'from-process' };
      const loaded = loadEnvFiles(env, [join(dir, 'a'), join(dir, 'missing'), join(dir, 'b')]);
      assert.equal(loaded.length, 2);
      assert.deepEqual(env, { X: 'from-process', Y: 'from-a', Z: 'from-b' });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test('.env.example only holds placeholders and is not ignored', () => {
    const example = parseEnvFile(readFileSync(new URL('../.env.example', import.meta.url), 'utf8'));
    assert.match(example.TELEGRAM_BOT_TOKEN, /replace/);
    assert.equal(example.KV_REST_API_TOKEN, '');
    const ignore = readFileSync(new URL('../.gitignore', import.meta.url), 'utf8');
    assert.match(ignore, /^\.env\.\*$/m);
    assert.match(ignore, /^!\.env\.example$/m);
  });
});

describe('dev api server', () => {
  test('lists the Vercel Functions', () => {
    const routes = listApiRoutes();
    for (const name of ['sync', 'link', 'telegram', 'cron-nudge']) assert.ok(routes.includes(name), name);
  });

  test('turns Node requests into Web Requests and back', async () => {
    const seen = [];
    const handler = createDevApiHandler({
      routes: ['echo'],
      load: async () => ({
        async fetch(request) {
          seen.push(request);
          const body = request.method === 'GET' ? null : await request.text();
          return Response.json({ method: request.method, body, auth: request.headers.get('authorization'), q: new URL(request.url).searchParams.get('q') }, { status: 201, headers: { 'X-Test': 'yes' } });
        },
      }),
    });
    const server = createServer(handler);
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    try {
      let response = await fetch(`${base}/api/echo?q=1`, { method: 'POST', headers: { Authorization: 'Bearer t' }, body: '{"a":1}' });
      assert.equal(response.status, 201);
      assert.equal(response.headers.get('x-test'), 'yes');
      assert.deepEqual(await response.json(), { method: 'POST', body: '{"a":1}', auth: 'Bearer t', q: '1' });
      response = await fetch(`${base}/api/echo`);
      assert.equal((await response.json()).method, 'GET');
      assert.equal((await fetch(`${base}/api/unknown`)).status, 404);
      assert.equal((await fetch(`${base}/api/../package.json`)).status, 404);
      assert.equal(seen.length, 2);
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
  });
});

describe('long-polling bot', () => {
  test('feeds updates to the bot and advances the offset', async () => {
    const controller = new AbortController();
    const offsets = [];
    const batches = [[{ update_id: 5 }, { update_id: 6 }], [{ update_id: 7 }]];
    const telegram = {
      async call(method, params) {
        assert.equal(method, 'getUpdates');
        offsets.push(params.offset);
        const batch = batches.shift();
        if (!batch) { controller.abort(); return []; }
        return batch;
      },
    };
    const handled = [];
    await pollUpdates({ telegram, bot: { handleUpdate: async (u) => handled.push(u.update_id) }, signal: controller.signal });
    assert.deepEqual(handled, [5, 6, 7]);
    assert.deepEqual(offsets, [0, 7, 8]);
  });

  test('a failing update does not stop polling; 409 (webhook set) stops it', async () => {
    let calls = 0;
    const errors = [];
    const telegram = {
      async call() {
        calls++;
        if (calls === 1) return [{ update_id: 1 }];
        throw new TelegramError('getUpdates', 'Conflict: can\'t use getUpdates method while webhook is active', 409);
      },
    };
    await pollUpdates({ telegram, bot: { handleUpdate: async () => { throw new Error('bad update'); } }, onError: (e) => errors.push(e.message) });
    assert.equal(calls, 2);
    assert.equal(errors[0], 'bad update');
    assert.match(errors[1], /webhook is active/);
  });
});
