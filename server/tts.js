// ========================
// TEXT-TO-SPEECH (🔊 button)
// ========================
// Node-only. Fetches a Spanish pronunciation once, uploads it to Telegram as a
// voice message and caches the returned file_id under anchor:tts:{sha1(text)},
// so every later tap is a cheap re-send. Any failure only costs the audio:
// the user sees "Audio unavailable right now" and the card keeps working.

import { createHash } from 'node:crypto';
import { attachMessages } from './reels.js';

const MAX_AUDIO_BYTES = 1024 * 1024;
const TTS_TIMEOUT_MS = 8000;
export const AUDIO_UNAVAILABLE = 'Audio unavailable right now';

export const ttsCacheKey = (text) => `anchor:tts:${createHash('sha1').update(text).digest('hex')}`;

// ========================
// PROVIDERS
// ========================

/**
 * Unofficial Google Translate endpoint (free, no key, may rate-limit or change).
 */
export function googleTranslateTtsUrl(text) {
  return `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=es&q=${encodeURIComponent(text)}`;
}

/**
 * @param {Object} options
 * @param {string} [options.provider='google-translate']
 * @param {Function} [options.fetch] - injectable fetch (tests)
 * @returns {{ synthesize(text): Promise<{ data: Uint8Array, contentType: string, filename: string }> }}
 */
export function createTTS({ provider = 'google-translate', fetch: fetchImpl = globalThis.fetch } = {}) {
  return {
    async synthesize(text) {
      // Fail per tap, not at startup: a typo in TTS_PROVIDER only disables 🔊
      if (provider !== 'google-translate') throw new Error(`Unknown TTS_PROVIDER: ${provider}`);
      const signal = typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(TTS_TIMEOUT_MS) : undefined;
      const response = await fetchImpl(googleTranslateTtsUrl(text), {
        headers: { 'User-Agent': 'Mozilla/5.0 (AnchorBot)' },
        signal,
      });
      if (!response.ok) throw new Error(`TTS failed: HTTP ${response.status}`);
      const data = new Uint8Array(await response.arrayBuffer());
      if (data.byteLength === 0 || data.byteLength > MAX_AUDIO_BYTES) throw new Error(`TTS returned ${data.byteLength} bytes`);
      return { data, contentType: 'audio/mpeg', filename: 'word.mp3' };
    },
  };
}

// ========================
// TELEGRAM DELIVERY
// ========================

const fileIdOf = (message) => (message && ((message.voice && message.voice.file_id) || (message.audio && message.audio.file_id))) || null;

/**
 * Build the bot's onAudio hook (see createBot).
 * @param {Object} context - { store, telegram, tts }
 */
export function createAudioHandler({ store, telegram, tts }) {
  async function sendCached(chatId, fileId) {
    try {
      return await telegram.call('sendVoice', { chat_id: chatId, voice: fileId });
    } catch (e) {
      return null; // stale file_id — upload again
    }
  }

  async function uploadFresh(chatId, text) {
    const file = await tts.synthesize(text);
    try {
      return await telegram.upload('sendVoice', { chat_id: chatId }, 'voice', file);
    } catch (e) {
      // e.g. VOICE_MESSAGES_FORBIDDEN in the user's privacy settings
      return telegram.upload('sendAudio', { chat_id: chatId, title: text }, 'audio', file);
    }
  }

  return async function onAudio({ tgId, chatId, session, text, callbackId }) {
    let message;
    try {
      const key = ttsCacheKey(text);
      const cached = await store.getJSON(key);
      message = cached ? await sendCached(chatId, cached) : null;
      if (!message) {
        message = await uploadFresh(chatId, text);
        const fileId = fileIdOf(message);
        if (fileId) await store.setJSON(key, fileId);
      }
    } catch (error) {
      console.error('Audio failed', error && error.message);
      await telegram.answerCallbackQuery(callbackId, AUDIO_UNAVAILABLE);
      return;
    }
    await telegram.answerCallbackQuery(callbackId);

    // One voice message per card: replace an earlier one, and clean up if the
    // card moved on while the audio was being prepared.
    const previous = session.audioMessageId;
    const attached = await attachMessages(store, tgId, session.sid, { audioMessageId: message.message_id, pos: session.pos });
    const toDelete = attached ? previous : message.message_id;
    if (toDelete) {
      try {
        await telegram.deleteMessage(chatId, toDelete);
      } catch (e) {
        // already gone
      }
    }
  };
}
