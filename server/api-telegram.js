// ========================
// API: /api/telegram
// ========================
// POST ← Telegram webhook. Only accepted with the secret header set by
// setWebhook(secret_token). Always answers 200 once authenticated, so a bug in
// one update can't make Telegram retry it forever.

import { createBot } from './bot.js';
import { createTTS, createAudioHandler } from './tts.js';
import { HttpError, json, readJsonBody, safeEqual, withErrors } from './http.js';

const MAX_UPDATE_BYTES = 256 * 1024;

export function createTelegramHandler(context) {
  const bot = context.bot || createBot({
    ...context,
    onAudio: context.onAudio || createAudioHandler({ ...context, tts: context.tts || createTTS({ provider: context.config.ttsProvider }) }),
  });
  return withErrors(async (request) => {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
    const { webhookSecret } = context.config;
    if (!webhookSecret) throw new HttpError(503, 'Webhook secret is not configured');
    if (!safeEqual(request.headers.get('x-telegram-bot-api-secret-token') || '', webhookSecret)) {
      throw new HttpError(401, 'Bad secret');
    }
    const update = await readJsonBody(request, MAX_UPDATE_BYTES);
    if (!update || typeof update !== 'object') throw new HttpError(400, 'Expected an update object');
    try {
      await bot.handleUpdate(update);
    } catch (error) {
      console.error('Telegram update failed', update.update_id, error);
    }
    return json({ ok: true });
  });
}
