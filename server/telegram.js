// ========================
// TELEGRAM BOT API CLIENT
// ========================
// Node-only. Thin fetch wrapper around https://core.telegram.org/bots/api.
// All messages use parse_mode HTML (only <, > and & need escaping).

export class TelegramError extends Error {
  constructor(method, description, code) {
    super(`Telegram ${method} failed: ${description}`);
    this.method = method;
    this.description = description || '';
    this.code = code || 0;
  }
}

/**
 * Escape text for parse_mode HTML.
 */
export function escapeHtml(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * @param {Object} options
 * @param {string} options.token - bot token from @BotFather
 * @param {Function} [options.fetch] - injectable fetch (tests)
 * @param {string} [options.apiBase]
 */
export function createTelegramClient({ token, fetch: fetchImpl = globalThis.fetch, apiBase = 'https://api.telegram.org' }) {
  async function send(method, init) {
    if (!token) throw new TelegramError(method, 'TELEGRAM_BOT_TOKEN is not set');
    const response = await fetchImpl(`${apiBase}/bot${token}/${method}`, { method: 'POST', ...init });
    let payload;
    try {
      payload = await response.json();
    } catch (e) {
      payload = { ok: false, description: `HTTP ${response.status}` };
    }
    if (!payload.ok) throw new TelegramError(method, payload.description, payload.error_code);
    return payload.result;
  }

  /** Call any Bot API method with JSON params. */
  function call(method, params = {}) {
    return send(method, {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  }

  /** Call a method that uploads a file (multipart/form-data). */
  function upload(method, params, field, { data, filename, contentType }) {
    const form = new FormData();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;
      form.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
    form.append(field, new Blob([data], { type: contentType }), filename);
    return send(method, { body: form });
  }

  return {
    call,
    upload,
    sendMessage(chatId, text, extra = {}) {
      return call('sendMessage', {
        chat_id: chatId, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true }, ...extra,
      });
    },
    editMessageText(chatId, messageId, text, extra = {}) {
      return call('editMessageText', {
        chat_id: chatId, message_id: messageId, text, parse_mode: 'HTML', link_preview_options: { is_disabled: true }, ...extra,
      });
    },
    answerCallbackQuery(callbackQueryId, text, extra = {}) {
      return call('answerCallbackQuery', { callback_query_id: callbackQueryId, ...(text ? { text } : {}), ...extra });
    },
    deleteMessage(chatId, messageId) {
      return call('deleteMessage', { chat_id: chatId, message_id: messageId });
    },
  };
}

/**
 * True for the harmless error Telegram returns when an edit changes nothing.
 */
export function isNotModified(error) {
  return error instanceof TelegramError && /message is not modified/i.test(error.description);
}
