// ========================
// SERVER HTTP HELPERS
// ========================
// Node-only. Small helpers around the Web-standard Request/Response objects
// that Vercel passes to `export default { fetch(request) }` functions.

import { createHash, timingSafeEqual } from 'node:crypto';

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

/**
 * Read a JSON body with a size cap.
 * @throws {HttpError} 413 when too large, 400 when not JSON
 */
export async function readJsonBody(request, maxBytes) {
  // Cheap early reject before buffering an oversized body
  const declared = Number(request.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maxBytes) throw new HttpError(413, 'Body too large');
  const text = await request.text();
  if (Buffer.byteLength(text, 'utf8') > maxBytes) throw new HttpError(413, 'Body too large');
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new HttpError(400, 'Body must be JSON');
  }
}

/**
 * @returns {string|null} the token from `Authorization: Bearer <token>`
 */
export function bearerToken(request) {
  const header = request.headers.get('authorization') || '';
  const match = header.match(/^Bearer\s+(\S+)$/i);
  return match ? match[1] : null;
}

/**
 * Constant-time string comparison (hashing first makes lengths equal).
 */
export function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const ha = createHash('sha256').update(a).digest();
  const hb = createHash('sha256').update(b).digest();
  return timingSafeEqual(ha, hb) && a.length === b.length;
}

/**
 * Wrap a handler: HttpError → JSON error response, anything else → logged 500.
 */
export function withErrors(handler) {
  return async (request) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof HttpError) return json({ error: error.message }, error.status);
      console.error(error);
      return json({ error: 'Internal error' }, 500);
    }
  };
}
