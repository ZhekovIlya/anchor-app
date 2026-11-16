// ========================
// API: /api/link
// ========================
// POST              → new one-time code + Telegram deep link
// GET ?code=…       → { status: pending|cancelled|expired } or { status: ok, token, user } (once)
// DELETE (Bearer)   → revoke this browser's token

import { createLinkCode, redeemLinkCode, revokeToken, isValidLinkCode } from './auth.js';
import { HttpError, json, bearerToken, withErrors } from './http.js';

const LINK_RATE_LIMIT_PER_MINUTE = 30;

export function createLinkHandler(context) {
  return withErrors(async (request) => {
    const { config, store, now } = context;

    if (request.method === 'POST') {
      if (!config.botUsername) throw new HttpError(503, 'Bot is not configured');
      const minute = Math.floor(now() / 60000);
      const count = await store.incr(`anchor:linkrate:${minute}`, 120);
      if (count > LINK_RATE_LIMIT_PER_MINUTE) throw new HttpError(429, 'Too many link attempts, try again in a minute');
      const { code, expiresIn } = await createLinkCode(store);
      return json({
        code,
        expiresIn,
        botUsername: config.botUsername,
        deepLink: `https://t.me/${config.botUsername}?start=link_${code}`,
      });
    }

    if (request.method === 'GET') {
      const code = new URL(request.url).searchParams.get('code');
      if (!isValidLinkCode(code)) throw new HttpError(400, 'Invalid code');
      return json(await redeemLinkCode(store, code));
    }

    if (request.method === 'DELETE') {
      const revoked = await revokeToken(store, bearerToken(request));
      return json({ ok: revoked });
    }

    return json({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST, DELETE' });
  });
}
