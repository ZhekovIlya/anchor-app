// Test double for server/telegram.js createTelegramClient(): records every call
// and hands out increasing message ids (kept as sent_message_id on each call).
// Not a test file itself.

import { TelegramError } from '../server/telegram.js';

export function createFakeTelegram() {
  let nextMessageId = 100;
  const calls = [];
  const record = (method, params) => {
    const id = nextMessageId++;
    calls.push({ method, ...params, sent_message_id: id });
    return { message_id: id };
  };
  const fake = {
    calls,
    failNextEditWith: null,
    of(method) { return calls.filter((call) => call.method === method); },
    last(method) { return fake.of(method).at(-1); },
    reset() { calls.length = 0; },
    async call(method, params = {}) { return record(method, params); },
    async upload(method, params, field, file) { return record(method, { ...params, [field]: file }); },
    async sendMessage(chatId, text, extra = {}) { return record('sendMessage', { chat_id: chatId, text, ...extra }); },
    async editMessageText(chatId, messageId, text, extra = {}) {
      if (fake.failNextEditWith) {
        const description = fake.failNextEditWith;
        fake.failNextEditWith = null;
        throw new TelegramError('editMessageText', description, 400);
      }
      record('editMessageText', { chat_id: chatId, message_id: messageId, text, ...extra });
      return true;
    },
    async answerCallbackQuery(id, text, extra = {}) {
      record('answerCallbackQuery', { callback_query_id: id, ...(text ? { text } : {}), ...extra });
      return true;
    },
    async deleteMessage(chatId, messageId) {
      record('deleteMessage', { chat_id: chatId, message_id: messageId });
      return true;
    },
  };
  return fake;
}
