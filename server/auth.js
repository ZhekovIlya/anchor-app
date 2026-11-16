// ========================
// SERVER AUTH
// ========================
// Node-only. Telegram identity for the web app:
//   1. the app asks for a one-time link code (createLinkCode)
//   2. the user confirms it in the bot (claimLinkCode)
//   3. the app redeems the claimed code once for a bearer token (redeemLinkCode)
// Tokens are random 32-byte strings; only their SHA-256 is stored.

import { randomBytes, createHash } from 'node:crypto';

export const LINK_TTL_SECONDS = 600;
const CODE_RE = /^[A-Za-z0-9_-]{22}$/;
const TOKEN_RE = /^[A-Za-z0-9_-]{43}$/;

const linkKey = (code) => `anchor:link:${code}`;
const tokenKey = (hash) => `anchor:tok:${hash}`;
const userTokensKey = (tgId) => `anchor:u:${tgId}:toks`;

const randomId = (bytes) => randomBytes(bytes).toString('base64url');
const sha256 = (text) => createHash('sha256').update(text).digest('hex');

export const isValidLinkCode = (code) => typeof code === 'string' && CODE_RE.test(code);

/**
 * Only Telegram users listed in ALLOWED_TELEGRAM_IDS may use the bot or sync.
 */
export function isAllowed(config, tgId) {
  return config.allowedIds.has(String(tgId));
}

/**
 * Start a link: a short-lived code the user confirms in Telegram.
 * @returns {Promise<{ code: string, expiresIn: number }>}
 */
export async function createLinkCode(store) {
  const code = randomId(16);
  await store.setJSON(linkKey(code), { status: 'pending' }, { ttlSeconds: LINK_TTL_SECONDS });
  return { code, expiresIn: LINK_TTL_SECONDS };
}

/**
 * Peek at a link code without changing it (bot shows the confirm prompt).
 * @returns {Promise<Object|null>}
 */
export async function getLinkCode(store, code) {
  if (!isValidLinkCode(code)) return null;
  return store.getJSON(linkKey(code));
}

/**
 * The user confirmed (or cancelled) the link in Telegram.
 * @param {Object} user - { id, username, first_name } from Telegram
 * @param {boolean} [approve=true]
 * @returns {Promise<'claimed'|'cancelled'|'expired'|'already'>}
 */
export async function claimLinkCode(store, code, user, approve = true) {
  const current = await getLinkCode(store, code);
  if (!current) return 'expired';
  if (current.status !== 'pending') return 'already';
  const next = approve
    ? { status: 'claimed', tgId: String(user.id), username: user.username || null, firstName: user.first_name || null }
    : { status: 'cancelled' };
  const replaced = await store.replaceJSON(linkKey(code), next);
  if (!replaced) return 'expired';
  return approve ? 'claimed' : 'cancelled';
}

/**
 * The web app polls with its code. A claimed code is exchanged for a token
 * exactly once (atomic take), then it is gone.
 * @returns {Promise<{ status: 'pending'|'cancelled'|'expired' } | { status: 'ok', token: string, user: Object }>}
 */
export async function redeemLinkCode(store, code) {
  const current = await getLinkCode(store, code);
  if (!current) return { status: 'expired' };
  if (current.status === 'pending' || current.status === 'cancelled') return { status: current.status };
  const taken = await store.takeJSON(linkKey(code));
  if (!taken || taken.status !== 'claimed') return { status: 'expired' };
  const token = await issueToken(store, taken.tgId);
  return { status: 'ok', token, user: { id: taken.tgId, username: taken.username, firstName: taken.firstName } };
}

/**
 * Issue a long-lived bearer token for a Telegram user.
 * @returns {Promise<string>} token (shown once, never stored in clear)
 */
export async function issueToken(store, tgId) {
  const token = randomId(32);
  const hash = sha256(token);
  await store.setJSON(tokenKey(hash), String(tgId));
  await store.sadd(userTokensKey(tgId), hash);
  return token;
}

/**
 * @returns {Promise<string|null>} the Telegram id the token belongs to
 */
export async function verifyToken(store, token) {
  if (typeof token !== 'string' || !TOKEN_RE.test(token)) return null;
  return store.getJSON(tokenKey(sha256(token)));
}

export async function revokeToken(store, token) {
  const tgId = await verifyToken(store, token);
  if (!tgId) return false;
  const hash = sha256(token);
  await store.del(tokenKey(hash));
  await store.srem(userTokensKey(tgId), hash);
  return true;
}

/**
 * Log out every browser linked to this Telegram user (/disconnect).
 * @returns {Promise<number>} how many tokens were revoked
 */
export async function revokeAllTokens(store, tgId) {
  const hashes = await store.smembers(userTokensKey(tgId));
  for (const hash of hashes) await store.del(tokenKey(hash));
  await store.del(userTokensKey(tgId));
  return hashes.length;
}
