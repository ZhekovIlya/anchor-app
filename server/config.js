// ========================
// SERVER CONFIG
// ========================
// Node-only. Reads environment variables once and builds the shared context
// (config + store + Telegram client) used by every api/*.js function.

import { createMemoryStore, createRedisStore } from './store.js';
import { createTelegramClient } from './telegram.js';

/**
 * Parse environment variables into a config object.
 * @param {Object} env - usually process.env
 */
export function readConfig(env = process.env) {
  const allowedIds = new Set(
    String(env.ALLOWED_TELEGRAM_IDS || '')
      .split(/[,\s]+/)
      .map((id) => id.trim())
      .filter((id) => /^\d+$/.test(id)),
  );
  return {
    botToken: env.TELEGRAM_BOT_TOKEN || '',
    botUsername: String(env.TELEGRAM_BOT_USERNAME || '').replace(/^@/, ''),
    webhookSecret: env.TELEGRAM_WEBHOOK_SECRET || '',
    allowedIds,
    publicUrl: String(env.PUBLIC_APP_URL || '').replace(/\/+$/, ''),
    cronSecret: env.CRON_SECRET || '',
    redisUrl: env.KV_REST_API_URL || env.UPSTASH_REDIS_REST_URL || '',
    redisToken: env.KV_REST_API_TOKEN || env.UPSTASH_REDIS_REST_TOKEN || '',
    ttsProvider: env.TTS_PROVIDER || 'google-translate',
    onVercel: Boolean(env.VERCEL),
  };
}

/**
 * Pick the store: Redis when credentials exist, memory otherwise.
 * On Vercel a memory store would silently lose data between invocations,
 * so missing credentials there are a hard error.
 */
export function createStore(config, { fetch = globalThis.fetch } = {}) {
  if (config.redisUrl && config.redisToken) {
    return createRedisStore({ url: config.redisUrl, token: config.redisToken, fetch });
  }
  if (config.onVercel) {
    throw new Error('Redis is not configured: set KV_REST_API_URL and KV_REST_API_TOKEN (Upstash via Vercel Marketplace).');
  }
  return createMemoryStore();
}

let sharedContext = null;

/**
 * Process-wide context for the api/*.js functions (built on first use).
 * @returns {{ config: Object, store: Object, telegram: Object, now: Function }}
 */
export function getServerContext() {
  if (!sharedContext) {
    const config = readConfig();
    sharedContext = {
      config,
      store: createStore(config),
      telegram: createTelegramClient({ token: config.botToken }),
      now: Date.now,
    };
  }
  return sharedContext;
}

/**
 * Build a Vercel Function (`export default { fetch }`) from a handler factory.
 * The context is created lazily so a configuration error becomes a clear 500
 * instead of a crash at import time.
 * @param {Function} createHandler - (context) => (request) => Response
 */
export function vercelFunction(createHandler) {
  let handler = null;
  return {
    async fetch(request) {
      try {
        handler ||= createHandler(getServerContext());
      } catch (error) {
        console.error(error);
        return Response.json({ error: 'Server is not configured' }, { status: 500 });
      }
      return handler(request);
    },
  };
}
