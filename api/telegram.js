// Vercel Function: /api/telegram — Telegram webhook (see server/api-telegram.js)
import { vercelFunction } from '../server/config.js';
import { createTelegramHandler } from '../server/api-telegram.js';

export default vercelFunction(createTelegramHandler);
