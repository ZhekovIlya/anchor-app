// ========================
// LOCAL DEV API
// ========================
// Serves the api/*.js Vercel Functions on http://localhost:3001 so `npm run dev`
// (Vite on :3000, which proxies /api here) works end to end without Vercel.
//
//   node scripts/dev-api.js           # API only (memory store unless Redis env is set)
//   node scripts/dev-api.js --poll    # + run the bot by long-polling getUpdates
//
// Reads .env.local (then .env) from the project root; real environment
// variables win. With --poll the bot talks to the real Telegram API using
// TELEGRAM_BOT_TOKEN — use a separate dev bot: getUpdates does not work while
// a webhook is set on the bot.

import { createServer } from 'node:http';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const API_DIR = join(ROOT, 'api');
const MAX_BODY_BYTES = 2 * 1024 * 1024;

// ========================
// ENV FILES
// ========================

/**
 * Parse KEY=value lines (# comments, optional quotes, `export ` prefix).
 * @returns {Object}
 */
export function parseEnvFile(text) {
  const out = {};
  for (const rawLine of String(text).split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!match) continue;
    let value = match[2].trim();
    const quoted = /^(['"])(.*)\1$/.exec(value);
    if (quoted) value = quoted[2];
    else value = value.replace(/\s+#.*$/, '');
    out[match[1]] = value;
  }
  return out;
}

/**
 * Fill `env` from the first files that exist, without overriding set values.
 * @returns {string[]} files that were loaded
 */
export function loadEnvFiles(env, files = ['.env.local', '.env'].map((name) => join(ROOT, name))) {
  const loaded = [];
  for (const file of files) {
    if (!existsSync(file)) continue;
    for (const [key, value] of Object.entries(parseEnvFile(readFileSync(file, 'utf8')))) {
      if (env[key] === undefined) env[key] = value;
    }
    loaded.push(file);
  }
  return loaded;
}

// ========================
// HTTP → Web Request → Vercel Function
// ========================

/**
 * Names of the functions in api/ (file name without .js).
 */
export function listApiRoutes(dir = API_DIR) {
  return readdirSync(dir).filter((name) => /^[a-z0-9-]+\.js$/.test(name)).map((name) => name.slice(0, -3));
}

async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error('Body too large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

/**
 * Build a Node http request handler that dispatches /api/<name> to api/<name>.js.
 * @param {Object} [options]
 * @param {Function} [options.load] - (name) => Promise<{ fetch(request) }> (tests)
 * @param {string[]} [options.routes]
 */
export function createDevApiHandler({ routes = listApiRoutes(), load = (name) => import(pathToFileURL(join(API_DIR, `${name}.js`)).href).then((m) => m.default) } = {}) {
  const known = new Set(routes);
  return async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const match = /^\/api\/([a-z0-9-]+)\/?$/.exec(url.pathname);
      if (!match || !known.has(match[1])) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
        return;
      }
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }
      const hasBody = !['GET', 'HEAD'].includes(req.method);
      const request = new Request(url, { method: req.method, headers, body: hasBody ? await readBody(req) : undefined });
      const fn = await load(match[1]);
      const response = await fn.fetch(request);
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(Buffer.from(await response.arrayBuffer()));
    } catch (error) {
      console.error(error);
      if (!res.headersSent) res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Dev server error' }));
    }
  };
}

// ========================
// LONG-POLLING BOT (--poll)
// ========================

/**
 * Feed getUpdates into the bot until `signal` aborts.
 * @param {Object} params - { telegram, bot, signal, onError }
 */
export async function pollUpdates({ telegram, bot, signal, onError = console.error, timeoutSeconds = 25 }) {
  let offset = 0;
  while (!signal || !signal.aborted) {
    let updates;
    try {
      updates = await telegram.call('getUpdates', { offset, timeout: timeoutSeconds, allowed_updates: ['message', 'callback_query'] });
    } catch (error) {
      onError(error);
      if (error && error.code === 409) return; // a webhook is set — polling can't work
      await new Promise((resolve) => setTimeout(resolve, 3000));
      continue;
    }
    for (const update of updates) {
      offset = Math.max(offset, update.update_id + 1);
      try {
        await bot.handleUpdate(update);
      } catch (error) {
        onError(error);
      }
    }
  }
}

// ========================
// MAIN
// ========================

async function main() {
  const loaded = loadEnvFiles(process.env);
  const port = Number(process.env.DEV_API_PORT || 3001);
  const poll = process.argv.includes('--poll');

  const { getServerContext } = await import('../server/config.js');
  const context = getServerContext();
  const storeKind = context.config.redisUrl ? 'Upstash Redis' : 'in-memory (lost on restart)';

  // localhost only: the dev API has no rate limits and may hold a memory store
  createServer(createDevApiHandler()).listen(port, '127.0.0.1', () => {
    console.log(`[dev-api] http://localhost:${port}/api/{${listApiRoutes().join(',')}}`);
    console.log(`[dev-api] env: ${loaded.length ? loaded.map((f) => f.slice(ROOT.length + 1)).join(', ') : 'process only'} · store: ${storeKind}`);
  });

  if (poll) {
    if (!context.config.botToken) {
      console.error('[dev-api] --poll needs TELEGRAM_BOT_TOKEN in .env.local');
      return;
    }
    const { createBot } = await import('../server/bot.js');
    const { createTTS, createAudioHandler } = await import('../server/tts.js');
    const bot = createBot({
      ...context,
      onAudio: createAudioHandler({ ...context, tts: createTTS({ provider: context.config.ttsProvider }) }),
    });
    console.log('[dev-api] bot: long-polling getUpdates (Ctrl+C to stop)');
    pollUpdates({
      telegram: context.telegram,
      bot,
      onError: (error) => {
        if (error && error.code === 409) console.error('[dev-api] a webhook is set on this bot — use a separate dev bot for --poll');
        else console.error('[dev-api]', error && error.message);
      },
    });
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
