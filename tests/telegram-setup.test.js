import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { setupBot, validateSetupConfig, BOT_COMMANDS, BOT_DESCRIPTION, BOT_SHORT_DESCRIPTION } from '../scripts/telegram-setup.js';
import { readConfig } from '../server/config.js';
import { createTelegramClient } from '../server/telegram.js';

const GOOD = {
  TELEGRAM_BOT_TOKEN: '123:abc',
  TELEGRAM_WEBHOOK_SECRET: 'a-very-long_secret-123',
  PUBLIC_APP_URL: 'https://anchor.example.app/',
};

describe('telegram setup', () => {
  test('validates the config', () => {
    assert.deepEqual(validateSetupConfig(readConfig(GOOD)), []);
    const bad = validateSetupConfig(readConfig({ TELEGRAM_WEBHOOK_SECRET: 'short!', PUBLIC_APP_URL: 'http://x.app' }));
    assert.equal(bad.length, 3);
    assert.match(bad.join('\n'), /TELEGRAM_BOT_TOKEN/);
    assert.match(bad.join('\n'), /16–256/);
    assert.match(bad.join('\n'), /https/);
  });

  test('sets webhook (with secret), commands and descriptions', async () => {
    const requests = [];
    const fetch = async (url, init) => {
      requests.push({ method: url.split('/').pop(), url, params: JSON.parse(init.body) });
      return Response.json({ ok: true, result: true });
    };
    const config = readConfig(GOOD);
    const url = await setupBot(createTelegramClient({ token: config.botToken, fetch }), config);
    assert.equal(url, 'https://anchor.example.app/api/telegram');
    assert.deepEqual(requests.map((r) => r.method), ['setWebhook', 'setMyCommands', 'setMyDescription', 'setMyShortDescription']);
    assert.ok(requests.every((r) => r.url.startsWith('https://api.telegram.org/bot123:abc/')));
    assert.deepEqual(requests[0].params, {
      url, secret_token: GOOD.TELEGRAM_WEBHOOK_SECRET, allowed_updates: ['message', 'callback_query'], drop_pending_updates: true,
    });
    assert.deepEqual(requests[1].params.commands, BOT_COMMANDS);
  });

  test('commands and descriptions respect Bot API limits', () => {
    for (const { command, description } of BOT_COMMANDS) {
      assert.match(command, /^[a-z0-9_]{1,32}$/);
      assert.ok(description.length >= 1 && description.length <= 256);
    }
    assert.ok(BOT_DESCRIPTION.length <= 512);
    assert.ok(BOT_SHORT_DESCRIPTION.length <= 120);
  });
});

test('an explicit webhook URL (e.g. with a Vercel protection bypass) wins', async () => {
  const urls = [];
  const fetch = async (url, init) => {
    const params = JSON.parse(init.body);
    if (params.url) urls.push(params.url);
    return Response.json({ ok: true, result: true });
  };
  const config = readConfig(GOOD);
  const explicit = 'https://preview.example.app/api/telegram?x-vercel-protection-bypass=abc';
  assert.equal(await setupBot(createTelegramClient({ token: config.botToken, fetch }), config, { url: explicit }), explicit);
  assert.deepEqual(urls, [explicit]);
});
