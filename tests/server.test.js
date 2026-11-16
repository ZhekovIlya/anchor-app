import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createMemoryStore, createRedisStore, updateDoc } from '../server/store.js';
import { readConfig, createStore } from '../server/config.js';
import { loadProgress, updateProgress } from '../server/progress.js';
import {
  createLinkCode, claimLinkCode, redeemLinkCode, issueToken, verifyToken, revokeToken, revokeAllTokens, isAllowed,
} from '../server/auth.js';
import { createSyncHandler } from '../server/api-sync.js';
import { createLinkHandler } from '../server/api-link.js';
import { createTelegramClient, escapeHtml, isNotModified, TelegramError } from '../server/telegram.js';
import { safeEqual } from '../server/http.js';
import { totalXP } from '../src/core/sync-merge.js';

const ALICE = { id: 111, username: 'alice', first_name: 'Alice' };

function context(overrides = {}) {
  let clock = Date.parse('2026-11-01T22:00:00Z');
  const config = readConfig({ TELEGRAM_BOT_USERNAME: '@AnchorTestBot', ALLOWED_TELEGRAM_IDS: '111, 222' });
  return {
    config,
    store: createMemoryStore({ now: () => clock }),
    now: () => clock,
    tick(ms) { clock += ms; },
    ...overrides,
  };
}

function request(method, path, { token, body } = {}) {
  const headers = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  return new Request(`https://anchor.test${path}`, {
    method, headers, body: body === undefined ? undefined : (typeof body === 'string' ? body : JSON.stringify(body)),
  });
}

describe('memory store', () => {
  test('versioned docs: CAS succeeds once per revision', async () => {
    const store = createMemoryStore();
    assert.equal(await store.getDoc('k'), null);
    assert.ok(await store.casDoc('k', 0, { a: 1 }));
    assert.ok(!(await store.casDoc('k', 0, { a: 2 })), 'stale revision rejected');
    assert.deepEqual(await store.getDoc('k'), { rev: 1, doc: { a: 1 } });
  });

  test('TTL, replace (XX + KEEPTTL), take and incr', async () => {
    let now = 0;
    const store = createMemoryStore({ now: () => now });
    await store.setJSON('x', { s: 1 }, { ttlSeconds: 10 });
    assert.ok(await store.replaceJSON('x', { s: 2 }));
    assert.deepEqual(await store.takeJSON('x'), { s: 2 });
    assert.equal(await store.takeJSON('x'), null);
    assert.ok(!(await store.replaceJSON('x', { s: 3 })), 'replace needs an existing key');
    await store.setJSON('y', 1, { ttlSeconds: 10 });
    now = 10_001;
    assert.equal(await store.getJSON('y'), null, 'expired');
    assert.equal(await store.incr('c', 60), 1);
    assert.equal(await store.incr('c', 60), 2);
  });

  test('updateDoc retries when another writer gets in first', async () => {
    const store = createMemoryStore();
    let interfered = false;
    const racy = {
      ...store,
      async casDoc(key, rev, doc) {
        if (!interfered) {
          interfered = true;
          await store.casDoc(key, rev, { n: 100 }); // a competing write lands first
        }
        return store.casDoc(key, rev, doc);
      },
    };
    const { doc } = await updateDoc(racy, 'k', (current) => ({ n: (current ? current.n : 0) + 1 }));
    assert.deepEqual(doc, { n: 101 }, 'the retry saw the competing write');
  });
});

describe('redis store (Upstash REST)', () => {
  function fakeRedis(results) {
    const calls = [];
    const fetch = async (url, init) => {
      calls.push({ url, auth: init.headers.Authorization, command: JSON.parse(init.body) });
      const result = results.shift();
      return new Response(JSON.stringify(result instanceof Error ? { error: result.message } : { result }), {
        status: result instanceof Error ? 400 : 200,
      });
    };
    return { calls, store: createRedisStore({ url: 'https://redis.test/', token: 'tok', fetch }) };
  }

  test('sends commands as JSON arrays with the bearer token', async () => {
    const { calls, store } = fakeRedis(['OK', '{"a":1}', [null, null], ['3', '{"x":1}'], 1, 0]);
    await store.setJSON('k', { a: 1 }, { ttlSeconds: 600 });
    assert.deepEqual(await store.getJSON('k'), { a: 1 });
    assert.equal(await store.getDoc('missing'), null);
    assert.deepEqual(await store.getDoc('d'), { rev: 3, doc: { x: 1 } });
    assert.ok(await store.casDoc('d', 3, { x: 2 }));
    assert.ok(!(await store.casDoc('d', 3, { x: 3 })));
    assert.equal(calls[0].url, 'https://redis.test');
    assert.equal(calls[0].auth, 'Bearer tok');
    assert.deepEqual(calls[0].command, ['SET', 'k', '{"a":1}', 'EX', '600']);
    assert.deepEqual(calls[2].command, ['HMGET', 'missing', 'rev', 'doc']);
    assert.equal(calls[4].command[0], 'EVAL');
    assert.deepEqual(calls[4].command.slice(2), ['1', 'd', '3', '4', '{"x":2}']);
  });

  test('surfaces Redis errors', async () => {
    const { store } = fakeRedis([new Error('WRONGTYPE')]);
    await assert.rejects(store.getJSON('k'), /WRONGTYPE/);
  });
});

describe('config', () => {
  test('parses allowlist, username and Redis env names', () => {
    const config = readConfig({
      ALLOWED_TELEGRAM_IDS: '12, abc,34', TELEGRAM_BOT_USERNAME: '@Bot', UPSTASH_REDIS_REST_URL: 'u', UPSTASH_REDIS_REST_TOKEN: 't',
    });
    assert.deepEqual([...config.allowedIds], ['12', '34']);
    assert.equal(config.botUsername, 'Bot');
    assert.equal(config.redisUrl, 'u');
  });

  test('refuses an in-memory store on Vercel', () => {
    assert.throws(() => createStore(readConfig({ VERCEL: '1' })), /Redis is not configured/);
    assert.equal(typeof createStore(readConfig({})).getDoc, 'function');
  });
});

describe('progress', () => {
  test('concurrent updates both land', async () => {
    const store = createMemoryStore();
    await Promise.all([
      updateProgress(store, '1', (doc) => { doc.xp.web = 10; }),
      updateProgress(store, '1', (doc) => { doc.completions.l1 = 2; }),
    ]);
    const doc = await loadProgress(store, '1');
    assert.equal(doc.xp.web, 10);
    assert.equal(doc.completions.l1, 2);
  });
});

describe('auth', () => {
  test('link code: pending → claimed → redeemed exactly once', async () => {
    const { store } = context();
    const { code } = await createLinkCode(store);
    assert.deepEqual(await redeemLinkCode(store, code), { status: 'pending' });
    assert.equal(await claimLinkCode(store, code, ALICE), 'claimed');
    assert.equal(await claimLinkCode(store, code, { id: 999 }), 'already', 'cannot be re-claimed');
    const first = await redeemLinkCode(store, code);
    assert.equal(first.status, 'ok');
    assert.equal(first.user.id, '111');
    assert.equal(await verifyToken(store, first.token), '111');
    assert.deepEqual(await redeemLinkCode(store, code), { status: 'expired' }, 'second redeem gets nothing');
  });

  test('cancelled and expired codes', async () => {
    const ctx = context();
    const { code } = await createLinkCode(ctx.store);
    assert.equal(await claimLinkCode(ctx.store, code, ALICE, false), 'cancelled');
    assert.deepEqual(await redeemLinkCode(ctx.store, code), { status: 'cancelled' });
    const { code: late } = await createLinkCode(ctx.store);
    ctx.tick(601_000);
    assert.equal(await claimLinkCode(ctx.store, late, ALICE), 'expired');
    assert.deepEqual(await redeemLinkCode(ctx.store, 'not-a-code'), { status: 'expired' });
  });

  test('tokens: verify, revoke one, revoke all', async () => {
    const { store } = context();
    const a = await issueToken(store, '111');
    const b = await issueToken(store, '111');
    assert.equal(await verifyToken(store, 'x'.repeat(43)), null);
    assert.equal(await verifyToken(store, 'short'), null);
    assert.ok(await revokeToken(store, a));
    assert.equal(await verifyToken(store, a), null);
    assert.equal(await verifyToken(store, b), '111');
    assert.equal(await revokeAllTokens(store, '111'), 1);
    assert.equal(await verifyToken(store, b), null);
  });

  test('allowlist and constant-time compare', () => {
    const { config } = context();
    assert.ok(isAllowed(config, 111));
    assert.ok(!isAllowed(config, 333));
    assert.ok(safeEqual('secret', 'secret'));
    assert.ok(!safeEqual('secret', 'secreT'));
    assert.ok(!safeEqual('secret', undefined));
  });
});

describe('/api/link', () => {
  test('full browser flow: create → (bot claims) → poll → token → delete', async () => {
    const ctx = context();
    const handler = createLinkHandler(ctx);
    const created = await (await handler(request('POST', '/api/link'))).json();
    assert.match(created.deepLink, /^https:\/\/t\.me\/AnchorTestBot\?start=link_[A-Za-z0-9_-]{22}$/);
    assert.equal((await (await handler(request('GET', `/api/link?code=${created.code}`))).json()).status, 'pending');
    await claimLinkCode(ctx.store, created.code, ALICE);
    const redeemed = await (await handler(request('GET', `/api/link?code=${created.code}`))).json();
    assert.equal(redeemed.status, 'ok');
    const deleted = await (await handler(request('DELETE', '/api/link', { token: redeemed.token }))).json();
    assert.deepEqual(deleted, { ok: true });
    assert.equal(await verifyToken(ctx.store, redeemed.token), null);
  });

  test('validates input and rate-limits code creation', async () => {
    const handler = createLinkHandler(context());
    assert.equal((await handler(request('GET', '/api/link?code=../../etc'))).status, 400);
    assert.equal((await handler(request('PUT', '/api/link'))).status, 405);
    let last;
    for (let i = 0; i < 31; i++) last = await handler(request('POST', '/api/link'));
    assert.equal(last.status, 429);
  });

  test('503 when the bot is not configured', async () => {
    const handler = createLinkHandler({ ...context(), config: readConfig({}) });
    assert.equal((await handler(request('POST', '/api/link'))).status, 503);
  });
});

describe('/api/sync', () => {
  test('rejects missing, unknown and non-allowlisted tokens', async () => {
    const ctx = context();
    const handler = createSyncHandler(ctx);
    assert.equal((await handler(request('GET', '/api/sync'))).status, 401);
    assert.equal((await handler(request('GET', '/api/sync', { token: 'y'.repeat(43) }))).status, 401);
    const outsider = await issueToken(ctx.store, '333');
    assert.equal((await handler(request('GET', '/api/sync', { token: outsider }))).status, 403);
  });

  test('POST merges with the server copy and returns the result', async () => {
    const ctx = context();
    const handler = createSyncHandler(ctx);
    const token = await issueToken(ctx.store, '111');
    await updateProgress(ctx.store, '111', (doc) => {
      doc.xp.tg = 40;
      doc.srs.words.w1 = { bucket: 1, dueDate: 5, updatedAt: 50 };
    });
    const response = await handler(request('POST', '/api/sync', {
      token,
      body: { doc: { xp: { web1: 100 }, srs: { words: { w1: { bucket: 3, dueDate: 9, updatedAt: 10 }, w2: { bucket: 0, dueDate: 1 } } } } },
    }));
    assert.equal(response.status, 200);
    const { doc, serverTime } = await response.json();
    assert.equal(totalXP(doc), 140);
    assert.equal(doc.srs.words.w1.bucket, 1, 'newer server entry wins');
    assert.ok(doc.srs.words.w2);
    assert.equal(serverTime, ctx.now());
    const fetched = await (await handler(request('GET', '/api/sync', { token }))).json();
    assert.deepEqual(fetched.doc, doc);
  });

  test('bad bodies', async () => {
    const ctx = context();
    const handler = createSyncHandler(ctx);
    const token = await issueToken(ctx.store, '111');
    assert.equal((await handler(request('POST', '/api/sync', { token, body: '{nope' }))).status, 400);
    assert.equal((await handler(request('POST', '/api/sync', { token, body: { doc: 5 } }))).status, 400);
    assert.equal((await handler(request('POST', '/api/sync', { token, body: { doc: {}, pad: 'x'.repeat(1024 * 1024) } }))).status, 413);
    assert.equal((await handler(request('DELETE', '/api/sync', { token }))).status, 405);
  });
});

describe('telegram client', () => {
  test('calls the Bot API with JSON and unwraps results', async () => {
    const calls = [];
    const telegram = createTelegramClient({
      token: '123:abc',
      fetch: async (url, init) => {
        calls.push({ url, body: JSON.parse(init.body) });
        return new Response(JSON.stringify({ ok: true, result: { message_id: 7 } }));
      },
    });
    const result = await telegram.sendMessage(5, '<b>hi</b>', { reply_markup: { inline_keyboard: [] } });
    assert.deepEqual(result, { message_id: 7 });
    assert.equal(calls[0].url, 'https://api.telegram.org/bot123:abc/sendMessage');
    assert.equal(calls[0].body.parse_mode, 'HTML');
    assert.deepEqual(calls[0].body.reply_markup, { inline_keyboard: [] });
  });

  test('turns API errors into TelegramError', async () => {
    const telegram = createTelegramClient({
      token: 't',
      fetch: async () => new Response(JSON.stringify({ ok: false, error_code: 400, description: 'Bad Request: message is not modified' })),
    });
    await assert.rejects(telegram.editMessageText(1, 2, 'x'), (error) => error instanceof TelegramError && isNotModified(error));
    await assert.rejects(createTelegramClient({ token: '' }).call('getMe'), /TELEGRAM_BOT_TOKEN/);
  });

  test('uploads files as multipart form data', async () => {
    let captured;
    const telegram = createTelegramClient({
      token: 't',
      fetch: async (url, init) => { captured = init.body; return new Response(JSON.stringify({ ok: true, result: { voice: { file_id: 'F' } } })); },
    });
    const result = await telegram.upload('sendVoice', { chat_id: 1, reply_markup: { a: 1 } }, 'voice', { data: new Uint8Array([1, 2]), filename: 'v.mp3', contentType: 'audio/mpeg' });
    assert.equal(result.voice.file_id, 'F');
    assert.ok(captured instanceof FormData);
    assert.equal(captured.get('chat_id'), '1');
    assert.equal(captured.get('reply_markup'), '{"a":1}');
    assert.equal(captured.get('voice').type, 'audio/mpeg');
  });

  test('escapeHtml', () => {
    assert.equal(escapeHtml('a < b & c > d'), 'a &lt; b &amp; c &gt; d');
  });
});
