// ========================
// API: /api/sync
// ========================
// GET  → the user's progress doc
// POST { doc } → merged with the server copy (CRDT join), saved, returned
// Auth: `Authorization: Bearer <token>` from the Telegram link flow.

import { mergeProgress } from '../src/core/sync-merge.js';
import { loadProgress, updateProgress } from './progress.js';
import { verifyToken, isAllowed } from './auth.js';
import { HttpError, json, readJsonBody, bearerToken, withErrors } from './http.js';

const MAX_SYNC_BYTES = 1024 * 1024;

/**
 * Resolve the Telegram user behind the bearer token.
 * @throws {HttpError} 401 / 403
 */
export async function authenticate(request, { config, store }) {
  const tgId = await verifyToken(store, bearerToken(request));
  if (!tgId) throw new HttpError(401, 'Not linked');
  if (!isAllowed(config, tgId)) throw new HttpError(403, 'This Telegram account is not allowed');
  return tgId;
}

export function createSyncHandler(context) {
  return withErrors(async (request) => {
    const { store, now } = context;
    if (request.method === 'GET') {
      const tgId = await authenticate(request, context);
      return json({ doc: await loadProgress(store, tgId), serverTime: now() });
    }
    if (request.method === 'POST') {
      const tgId = await authenticate(request, context);
      const body = await readJsonBody(request, MAX_SYNC_BYTES);
      if (!body || typeof body.doc !== 'object' || body.doc === null) throw new HttpError(400, 'Expected { doc }');
      const doc = await updateProgress(store, tgId, (current) => mergeProgress(current, body.doc));
      return json({ doc, serverTime: now() });
    }
    return json({ error: 'Method not allowed' }, 405, { Allow: 'GET, POST' });
  });
}
