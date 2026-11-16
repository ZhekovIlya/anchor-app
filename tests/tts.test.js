import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createMemoryStore } from '../server/store.js';
import { readConfig } from '../server/config.js';
import { createBot } from '../server/bot.js';
import { getSession } from '../server/reels.js';
import { TelegramError } from '../server/telegram.js';
import {
  createTTS, createAudioHandler, googleTranslateTtsUrl, ttsCacheKey, AUDIO_UNAVAILABLE,
} from '../server/tts.js';
import { buildWordIndex } from '../src/core/reels-queue.js';
import { createFakeTelegram } from './fake-telegram.js';

const ALICE = { id: 111, username: 'alice', first_name: 'Alice' };
const MP3 = new Uint8Array([0x49, 0x44, 0x33, 1, 2, 3]);

function quiet(fn) {
  const original = console.error;
  console.error = () => {};
  return fn().finally(() => { console.error = original; });
}

function fakeTTS({ fail = false } = {}) {
  const texts = [];
  return {
    texts,
    async synthesize(text) {
      texts.push(text);
      if (fail) throw new Error('rate limited');
      return { data: MP3, contentType: 'audio/mpeg', filename: 'word.mp3' };
    },
  };
}

/** Fake Telegram whose sendVoice upload returns a voice file_id (or fails). */
function telegramWithVoice({ voiceFails = false, cachedFails = false } = {}) {
  const telegram = createFakeTelegram();
  const baseUpload = telegram.upload;
  const baseCall = telegram.call;
  telegram.upload = async (method, params, field, file) => {
    if (method === 'sendVoice' && voiceFails) {
      telegram.calls.push({ method: 'sendVoice(rejected)' });
      throw new TelegramError('sendVoice', 'Bad Request: VOICE_MESSAGES_FORBIDDEN', 400);
    }
    const message = await baseUpload(method, params, field, file);
    return method === 'sendVoice'
      ? { ...message, voice: { file_id: 'VOICE_FILE_1' } }
      : { ...message, audio: { file_id: 'AUDIO_FILE_1' } };
  };
  telegram.call = async (method, params) => {
    if (method === 'sendVoice' && cachedFails) throw new TelegramError('sendVoice', 'Bad Request: wrong file identifier', 400);
    return baseCall(method, params);
  };
  return telegram;
}

function setup({ tts = fakeTTS(), telegram = telegramWithVoice() } = {}) {
  const config = readConfig({ ALLOWED_TELEGRAM_IDS: '111' });
  const store = createMemoryStore();
  const index = buildWordIndex([{ id: 't1', title: 'T', lessons: [{ id: 'a', title: 'A', words: [
    { es: 'el camarero', ru: 'официант', uk: 'офіціант', meta: { id: 'a_w0' } },
    { es: 'la cuenta', ru: 'счёт', uk: 'рахунок', meta: { id: 'a_w1' } },
  ] }] }]);
  const bot = createBot({ config, store, telegram, now: Date.now, index, onAudio: createAudioHandler({ store, telegram, tts }) });
  let n = 1;
  return {
    store, telegram, tts, bot,
    send: (text) => bot.handleUpdate({ message: { from: ALICE, chat: { id: 111, type: 'private' }, text } }),
    tap: (data) => bot.handleUpdate({ callback_query: { id: String(n++), from: ALICE, data, message: { message_id: 100, chat: { id: 111, type: 'private' } } } }),
    buttonOf(call, label) { return call.reply_markup.inline_keyboard.flat().find((b) => b.text.includes(label)).callback_data; },
  };
}

describe('tts provider', () => {
  test('google-translate URL encodes the text', () => {
    assert.equal(googleTranslateTtsUrl('¿qué tal?'),
      'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=es&q=%C2%BFqu%C3%A9%20tal%3F');
  });

  test('synthesize returns MP3 bytes; HTTP errors and empty bodies throw', async () => {
    const urls = [];
    const ok = createTTS({ fetch: async (url) => { urls.push(url); return new Response(MP3, { status: 200 }); } });
    const file = await ok.synthesize('hola');
    assert.deepEqual([...file.data], [...MP3]);
    assert.equal(file.contentType, 'audio/mpeg');
    assert.match(urls[0], /q=hola$/);

    const blocked = createTTS({ fetch: async () => new Response('nope', { status: 429 }) });
    await assert.rejects(blocked.synthesize('hola'), /HTTP 429/);
    const empty = createTTS({ fetch: async () => new Response(new Uint8Array(0), { status: 200 }) });
    await assert.rejects(empty.synthesize('hola'), /0 bytes/);
  });

  test('an unknown provider only fails when used', async () => {
    const tts = createTTS({ provider: 'nope', fetch: async () => assert.fail('no fetch') });
    await assert.rejects(tts.synthesize('hola'), /Unknown TTS_PROVIDER/);
  });

  test('cache key is sha1 of the text', () => {
    assert.equal(ttsCacheKey('hola'), `anchor:tts:${createHash('sha1').update('hola').digest('hex')}`);
    assert.match(ttsCacheKey('hola'), /^anchor:tts:[0-9a-f]{40}$/);
    assert.notEqual(ttsCacheKey('hola'), ttsCacheKey('Hola'));
  });
});

describe('🔊 audio button', () => {
  test('first tap uploads a voice and caches its file_id; next tap re-sends it', async () => {
    const t = setup();
    await t.send('/reels');
    const audio = t.buttonOf(t.telegram.last('sendMessage'), 'Audio');
    await t.tap(audio);
    const upload = t.telegram.last('sendVoice');
    assert.equal(upload.chat_id, 111);
    assert.equal(upload.voice.filename, 'word.mp3');
    assert.deepEqual(t.tts.texts, ['el camarero']);
    assert.equal(await t.store.getJSON(ttsCacheKey('el camarero')), 'VOICE_FILE_1');
    assert.equal(t.telegram.last('answerCallbackQuery').text, undefined);
    const firstVoiceId = upload.sent_message_id;
    assert.equal((await getSession(t.store, '111')).audioMessageId, firstVoiceId);

    await t.tap(audio);
    assert.deepEqual(t.tts.texts, ['el camarero'], 'served from cache');
    assert.equal(t.telegram.last('sendVoice').voice, 'VOICE_FILE_1');
    // the earlier voice message is replaced, not stacked
    assert.equal(t.telegram.last('deleteMessage').message_id, firstVoiceId);
  });

  test('advancing the card deletes its voice message', async () => {
    const t = setup();
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    await t.tap(t.buttonOf(card, 'Audio'));
    const voiceId = (await getSession(t.store, '111')).audioMessageId;
    await t.tap(t.buttonOf(card, 'Know'));
    assert.equal(t.telegram.last('deleteMessage').message_id, voiceId);
    assert.equal((await getSession(t.store, '111')).audioMessageId, null);
  });

  test('falls back to sendAudio when voice messages are refused', async () => {
    const t = setup({ telegram: telegramWithVoice({ voiceFails: true }) });
    await t.send('/reels');
    await t.tap(t.buttonOf(t.telegram.last('sendMessage'), 'Audio'));
    const audio = t.telegram.last('sendAudio');
    assert.equal(audio.title, 'el camarero');
    assert.equal(await t.store.getJSON(ttsCacheKey('el camarero')), 'AUDIO_FILE_1');
  });

  test('a stale cached file_id is replaced by a fresh upload', async () => {
    const t = setup({ telegram: telegramWithVoice({ cachedFails: true }) });
    await t.store.setJSON(ttsCacheKey('el camarero'), 'OLD_ID');
    await t.send('/reels');
    await t.tap(t.buttonOf(t.telegram.last('sendMessage'), 'Audio'));
    assert.deepEqual(t.tts.texts, ['el camarero']);
    assert.equal(await t.store.getJSON(ttsCacheKey('el camarero')), 'VOICE_FILE_1');
  });

  test('TTS failure: "Audio unavailable", nothing cached, card keeps working', async () => {
    const t = setup({ tts: fakeTTS({ fail: true }) });
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    await quiet(() => t.tap(t.buttonOf(card, 'Audio')));
    assert.equal(t.telegram.last('answerCallbackQuery').text, AUDIO_UNAVAILABLE);
    assert.equal(t.telegram.of('answerCallbackQuery').length, 1);
    assert.equal(await t.store.getJSON(ttsCacheKey('el camarero')), null);
    await t.tap(t.buttonOf(card, 'Know'));
    assert.match(t.telegram.last('editMessageText').text, /la cuenta/);
  });

  test('audio that arrives after the card moved on is deleted at once', async () => {
    const t = setup();
    await t.send('/reels');
    const card = t.telegram.last('sendMessage');
    const session = await getSession(t.store, '111');
    const onAudio = createAudioHandler({ store: t.store, telegram: t.telegram, tts: t.tts });
    await t.tap(t.buttonOf(card, 'Know')); // card advances before the audio is ready
    await onAudio({ tgId: '111', chatId: 111, session, text: 'el camarero', callbackId: 'x' });
    const voice = t.telegram.last('sendVoice');
    assert.equal(t.telegram.last('deleteMessage').message_id, voice.sent_message_id);
    assert.equal((await getSession(t.store, '111')).audioMessageId, null);
  });
});
