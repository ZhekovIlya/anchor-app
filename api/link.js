// Vercel Function: /api/link — link a browser to a Telegram account (see server/api-link.js)
import { vercelFunction } from '../server/config.js';
import { createLinkHandler } from '../server/api-link.js';

export default vercelFunction(createLinkHandler);
