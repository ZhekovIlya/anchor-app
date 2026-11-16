// ========================
// API: /api/cron-nudge
// ========================
// GET ← Vercel Cron, once a day (vercel.json). Sends "📚 N words due" to every
// allowlisted user who has the reminder on, has due words and hasn't practised
// today (UTC, same as the streak). Requires `Authorization: Bearer ${CRON_SECRET}`.

import { isAllowed } from './auth.js';
import { loadProgress } from './progress.js';
import { USERS_KEY, getSettings, appWordIndex } from './bot.js';
import { countDue } from './reels.js';
import { HttpError, json, bearerToken, safeEqual, withErrors } from './http.js';

const NUDGE_MARK_TTL_SECONDS = 2 * 24 * 3600;
const nudgeMarkKey = (tgId, date) => `anchor:nudge:${tgId}:${date}`;

/**
 * Nudge every user who should get one today.
 * @returns {Promise<{ sent: number, skipped: number, failed: number }>}
 */
export async function sendDailyNudges({ config, store, telegram, now, index = appWordIndex() }) {
  const today = new Date(now()).toISOString().split('T')[0];
  const result = { sent: 0, skipped: 0, failed: 0 };
  for (const tgId of await store.smembers(USERS_KEY)) {
    try {
      if (!isAllowed(config, tgId) || !(await getSettings(store, tgId)).nudge) {
        result.skipped++;
        continue;
      }
      const progress = await loadProgress(store, tgId);
      const due = countDue(index, progress.srs.words, now());
      // a second cron run on the same day must not nudge twice
      if (progress.activity[today] || due === 0 || (await store.getJSON(nudgeMarkKey(tgId, today)))) {
        result.skipped++;
        continue;
      }
      await store.setJSON(nudgeMarkKey(tgId, today), true, { ttlSeconds: NUDGE_MARK_TTL_SECONDS });
      await telegram.sendMessage(tgId, `📚 <b>${due} word${due === 1 ? '' : 's'} due</b> — a few minutes keeps the streak alive.`, {
        reply_markup: { inline_keyboard: [[{ text: '▶️ Start reels', callback_data: 'r:n' }]] },
      });
      result.sent++;
    } catch (error) {
      // e.g. the user blocked the bot — keep going with everyone else
      console.error('Nudge failed for', tgId, error && error.message);
      result.failed++;
    }
  }
  return result;
}

export function createCronNudgeHandler(context) {
  return withErrors(async (request) => {
    if (request.method !== 'GET') return json({ error: 'Method not allowed' }, 405, { Allow: 'GET' });
    if (!context.config.cronSecret) throw new HttpError(503, 'CRON_SECRET is not configured');
    if (!safeEqual(bearerToken(request) || '', context.config.cronSecret)) throw new HttpError(401, 'Bad cron secret');
    return json(await sendDailyNudges(context));
  });
}
