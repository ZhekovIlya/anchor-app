// Vercel Function: /api/sync — two-way progress sync (see server/api-sync.js)
import { vercelFunction } from '../server/config.js';
import { createSyncHandler } from '../server/api-sync.js';

export default vercelFunction(createSyncHandler);
