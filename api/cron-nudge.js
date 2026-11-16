// Vercel Function: /api/cron-nudge — daily "words due" reminder (see server/api-cron-nudge.js)
import { vercelFunction } from '../server/config.js';
import { createCronNudgeHandler } from '../server/api-cron-nudge.js';

export default vercelFunction(createCronNudgeHandler);
