// ========================
// TELEGRAM BOT
// ========================
// Node-only. Routes Telegram updates (commands, deep links, button taps) to the
// reels sessions, the progress doc and the link flow. Every entry point checks
// the allowlist first; users not on it are told their id and nothing is stored.

import { loadAllData } from '../src/core/data-loader.js';
import { buildWordIndex, topicProgress } from '../src/core/reels-queue.js';
import { totalXP } from '../src/core/sync-merge.js';
import { isAllowed, getLinkCode, claimLinkCode, revokeAllTokens, isValidLinkCode } from './auth.js';
import { loadProgress } from './progress.js';
import { escapeHtml, isNotModified } from './telegram.js';
import {
  startReels, applyReelAction, attachMessages, parseReelCallback, renderCard, renderSummary, renderEmpty, countDue,
} from './reels.js';

export const USERS_KEY = 'anchor:users';
export const settingsKey = (tgId) => `anchor:u:${tgId}:settings`;
export const DEFAULT_SETTINGS = { lang: 'ru', size: 12, nudge: true };
export const SESSION_SIZES = [8, 12, 20];

const HELP_TEXT = [
  '🇪🇸 <b>Anchor reels</b> — learn the app\'s words one card at a time.',
  '',
  '/reels — start a session (due reviews first, then new words)',
  '/topics — practise one topic',
  '/progress — streak, XP and words per topic',
  '/settings — translation language, session size, daily reminder',
  '/link &lt;code&gt; — connect a browser (the app shows the code)',
  '/disconnect — log out every connected browser',
  '/help — this message',
].join('\n');

const START_BUTTON = { inline_keyboard: [[{ text: '▶️ Start reels', callback_data: 'r:n' }]] };

let defaultIndex = null;
/** The app's own word bank, indexed once per process. */
export function appWordIndex() {
  defaultIndex ||= buildWordIndex(loadAllData().words);
  return defaultIndex;
}

// ========================
// SETTINGS
// ========================

export async function getSettings(store, tgId) {
  return { ...DEFAULT_SETTINGS, ...((await store.getJSON(settingsKey(tgId))) || {}) };
}

async function saveSettings(store, tgId, patch) {
  const next = { ...(await getSettings(store, tgId)), ...patch };
  await store.setJSON(settingsKey(tgId), next);
  return next;
}

/**
 * Validate one `s:<field>:<value>` change.
 * @returns {Object|null} settings patch
 */
export function parseSettingsCallback(data) {
  const match = /^s:(lang|size|nudge):(\w+)$/.exec(String(data || ''));
  if (!match) return null;
  const [, field, value] = match;
  if (field === 'lang') return ['ru', 'uk'].includes(value) ? { lang: value } : null;
  if (field === 'size') return SESSION_SIZES.includes(Number(value)) ? { size: Number(value) } : null;
  return ['on', 'off'].includes(value) ? { nudge: value === 'on' } : null;
}

function renderSettings(settings) {
  const mark = (on, label) => (on ? `• ${label} •` : label);
  return {
    text: [
      '⚙️ <b>Settings</b>',
      '',
      `Translation: ${settings.lang === 'uk' ? '🇺🇦 Українська' : '🇷🇺 Русский'}`,
      `Cards per session: ${settings.size}`,
      `Daily reminder: ${settings.nudge ? 'on' : 'off'}`,
    ].join('\n'),
    reply_markup: {
      inline_keyboard: [
        [
          { text: mark(settings.lang === 'ru', '🇷🇺 RU'), callback_data: 's:lang:ru' },
          { text: mark(settings.lang === 'uk', '🇺🇦 UK'), callback_data: 's:lang:uk' },
        ],
        SESSION_SIZES.map((size) => ({ text: mark(settings.size === size, String(size)), callback_data: `s:size:${size}` })),
        [
          { text: mark(settings.nudge, '🔔 On'), callback_data: 's:nudge:on' },
          { text: mark(!settings.nudge, '🔕 Off'), callback_data: 's:nudge:off' },
        ],
      ],
    },
  };
}

// ========================
// TEXT HELPERS
// ========================

/**
 * Split "/cmd@BotName arg" into { command, arg } (command lower-case, no slash).
 */
export function parseCommand(text) {
  const match = /^\/([A-Za-z0-9_]+)(?:@\S+)?(?:\s+([\s\S]*))?$/.exec(String(text || '').trim());
  if (!match) return null;
  return { command: match[1].toLowerCase(), arg: (match[2] || '').trim() };
}

function renderProgress(progress, index, now) {
  const rows = topicProgress(index, progress.srs.words, now);
  const seen = rows.reduce((n, row) => n + row.seen, 0);
  const mastered = rows.reduce((n, row) => n + row.mastered, 0);
  const lines = [
    '📊 <b>Your progress</b>',
    '',
    `Words: ${seen}/${index.order.length} seen · ${mastered} mastered · ${countDue(index, progress.srs.words, now)} due`,
    `🔥 Streak: ${progress.streak.current} (best ${progress.streak.longest})`,
    `⭐ XP: ${totalXP(progress)}`,
  ];
  const started = rows.filter((row) => row.seen > 0);
  if (started.length) {
    lines.push('');
    for (const row of started) {
      lines.push(`• ${escapeHtml(row.title)} — ${row.seen}/${row.total}${row.mastered ? ` · 🏆 ${row.mastered}` : ''}${row.due ? ` · 📚 ${row.due}` : ''}`);
    }
  }
  return { text: lines.join('\n'), reply_markup: START_BUTTON };
}

function renderTopics(progress, index, now) {
  const rows = topicProgress(index, progress.srs.words, now);
  return {
    text: '📚 <b>Pick a topic</b>\nDue words of the topic come first, then new ones.',
    reply_markup: {
      inline_keyboard: rows
        .filter((row) => Buffer.byteLength(`t:${row.topicId}`) <= 64)
        .map((row) => [{
          text: `${row.title} · ${row.seen}/${row.total}${row.due ? ` · 📚 ${row.due}` : ''}`,
          callback_data: `t:${row.topicId}`,
        }]),
    },
  };
}

// ========================
// BOT
// ========================

/**
 * @param {Object} context
 * @param {Object} context.config - readConfig()
 * @param {Object} context.store
 * @param {Object} context.telegram - createTelegramClient()
 * @param {Function} context.now
 * @param {Object} [context.index] - word index (defaults to the app's words)
 * @param {Function} [context.onAudio] - ({ tgId, chatId, session, card, text, callbackId }) => Promise, handles 🔊 (server/tts.js)
 * @returns {{ handleUpdate(update): Promise<void> }}
 */
export function createBot(context) {
  const { config, store, telegram, now } = context;
  const index = () => context.index || appWordIndex();

  async function edit(chatId, messageId, view) {
    try {
      await telegram.editMessageText(chatId, messageId, view.text, { reply_markup: view.reply_markup });
    } catch (error) {
      if (!isNotModified(error)) throw error;
    }
  }

  async function sendView(chatId, view) {
    return telegram.sendMessage(chatId, view.text, { reply_markup: view.reply_markup });
  }

  async function deleteQuietly(chatId, messageId) {
    if (!messageId) return;
    try {
      await telegram.deleteMessage(chatId, messageId);
    } catch (e) {
      // already gone or too old — nothing to clean up
    }
  }

  async function sendNewSession(tgId, chatId, topicId = null) {
    const settings = await getSettings(store, tgId);
    const words = index();
    const session = await startReels(store, tgId, { index: words, now: now(), size: settings.size, topicId });
    if (session.queue.length === 0) {
      const topicTitle = topicId ? (words.byId[words.order.find((id) => words.byId[id].topicId === topicId)] || {}).topicTitle : null;
      return sendView(chatId, renderEmpty({ topicTitle }));
    }
    const message = await sendView(chatId, renderCard(session, words, settings));
    await attachMessages(store, tgId, session.sid, { messageId: message.message_id });
    return message;
  }

  async function sendLinkPrompt(chatId, code) {
    const link = await getLinkCode(store, code);
    if (!link) return telegram.sendMessage(chatId, '⌛ This link has expired. Press <b>Connect</b> in the app again.');
    if (link.status !== 'pending') return telegram.sendMessage(chatId, 'This link was already used.');
    return telegram.sendMessage(chatId,
      '🔗 <b>Connect this browser to your Anchor progress?</b>\nOnly confirm if you just pressed Connect in the app.', {
        reply_markup: { inline_keyboard: [[
          { text: '✅ Connect', callback_data: `lk:${code}` },
          { text: 'Cancel', callback_data: `lx:${code}` },
        ]] },
      });
  }

  async function handleMessage(message) {
    const from = message.from;
    const chatId = message.chat.id;
    if (!from || message.chat.type !== 'private') return;
    if (!isAllowed(config, from.id)) {
      await telegram.sendMessage(chatId, `⛔ Your Telegram ID is <code>${from.id}</code> — add it to ALLOWED_TELEGRAM_IDS.`);
      return;
    }
    const tgId = String(from.id);
    const parsed = parseCommand(message.text);
    if (!parsed) {
      await telegram.sendMessage(chatId, 'Send /reels to start, or /help for all commands.');
      return;
    }
    const { command, arg } = parsed;

    switch (command) {
      case 'start': {
        await store.sadd(USERS_KEY, tgId);
        await saveSettings(store, tgId, { username: from.username || null, firstName: from.first_name || null });
        if (arg.startsWith('link_')) {
          await sendLinkPrompt(chatId, arg.slice(5));
          return;
        }
        await telegram.sendMessage(chatId, HELP_TEXT, { reply_markup: START_BUTTON });
        return;
      }
      case 'reels':
      case 'learn':
        await sendNewSession(tgId, chatId);
        return;
      case 'topics':
        await sendView(chatId, renderTopics(await loadProgress(store, tgId), index(), now()));
        return;
      case 'progress':
        await sendView(chatId, renderProgress(await loadProgress(store, tgId), index(), now()));
        return;
      case 'settings':
        await sendView(chatId, renderSettings(await getSettings(store, tgId)));
        return;
      case 'link':
        if (!isValidLinkCode(arg)) {
          await telegram.sendMessage(chatId, 'Usage: /link &lt;code&gt; — the code is shown in the app under Settings → Telegram sync.');
          return;
        }
        await sendLinkPrompt(chatId, arg);
        return;
      case 'disconnect': {
        const count = await revokeAllTokens(store, tgId);
        await telegram.sendMessage(chatId, count
          ? `🔌 Disconnected ${count} browser${count === 1 ? '' : 's'}. Your progress stays saved here.`
          : 'No browsers are connected.');
        return;
      }
      case 'help':
        await telegram.sendMessage(chatId, HELP_TEXT);
        return;
      default:
        await telegram.sendMessage(chatId, 'Unknown command. /help lists what I can do.');
    }
  }

  async function handleReelTap(query, tgId, tap) {
    const chatId = query.message.chat.id;
    const result = await applyReelAction(store, tgId, tap);
    if (result.stale) {
      await telegram.answerCallbackQuery(query.id, 'This card is no longer active');
      return;
    }
    if (tap.action === 'audio') {
      if (context.onAudio) {
        const word = index().byId[result.card.id];
        await context.onAudio({ tgId, chatId, session: result.session, card: result.card, text: word.es, callbackId: query.id });
      } else {
        await telegram.answerCallbackQuery(query.id, 'Audio unavailable right now');
      }
      return;
    }
    await telegram.answerCallbackQuery(query.id);
    const words = index();
    if (tap.action === 'reveal') {
      if (result.changed) await edit(chatId, query.message.message_id, renderCard(result.session, words, await getSettings(store, tgId)));
      return;
    }
    await deleteQuietly(chatId, result.staleAudioMessageId);
    const view = result.finished
      ? renderSummary(result.session, result.progress, words, now())
      : renderCard(result.session, words, await getSettings(store, tgId));
    await edit(chatId, query.message.message_id, view);
  }

  async function handleLinkTap(query, tgId, code, approve) {
    const outcome = await claimLinkCode(store, code, query.from, approve);
    const text = {
      claimed: '✅ <b>Connected.</b> Go back to the app — it picks up the connection in a few seconds.',
      cancelled: 'Cancelled. Nothing was connected.',
      expired: '⌛ This link has expired. Press <b>Connect</b> in the app again.',
      already: 'This link was already used.',
    }[outcome];
    await telegram.answerCallbackQuery(query.id);
    await edit(query.message.chat.id, query.message.message_id, { text, reply_markup: { inline_keyboard: [] } });
  }

  async function handleCallback(query) {
    const from = query.from;
    if (!from || !query.message) {
      await telegram.answerCallbackQuery(query.id);
      return;
    }
    if (!isAllowed(config, from.id)) {
      await telegram.answerCallbackQuery(query.id, `Your Telegram ID is ${from.id} — add it to ALLOWED_TELEGRAM_IDS`, { show_alert: true });
      return;
    }
    const tgId = String(from.id);
    const chatId = query.message.chat.id;
    const data = String(query.data || '');

    const tap = parseReelCallback(data);
    if (tap) return handleReelTap(query, tgId, tap);

    if (data === 'r:n') {
      await telegram.answerCallbackQuery(query.id);
      await sendNewSession(tgId, chatId);
      return;
    }
    if (data === 'p') {
      await telegram.answerCallbackQuery(query.id);
      await sendView(chatId, renderProgress(await loadProgress(store, tgId), index(), now()));
      return;
    }
    const link = /^l([kx]):(.+)$/.exec(data);
    if (link && isValidLinkCode(link[2])) return handleLinkTap(query, tgId, link[2], link[1] === 'k');

    const topic = /^t:(.+)$/.exec(data);
    if (topic && index().order.some((id) => index().byId[id].topicId === topic[1])) {
      await telegram.answerCallbackQuery(query.id);
      await sendNewSession(tgId, chatId, topic[1]);
      return;
    }
    const patch = parseSettingsCallback(data);
    if (patch) {
      const settings = await saveSettings(store, tgId, patch);
      await telegram.answerCallbackQuery(query.id, 'Saved');
      await edit(chatId, query.message.message_id, renderSettings(settings));
      return;
    }
    await telegram.answerCallbackQuery(query.id);
  }

  return {
    async handleUpdate(update) {
      if (update.message) return handleMessage(update.message);
      if (update.callback_query) return handleCallback(update.callback_query);
      return undefined;
    },
  };
}
