// ========================
// TELEGRAM BOT SETUP
// ========================
// One-time (and after every change of URL/secret) configuration of the bot:
//   node scripts/telegram-setup.js            # setWebhook + setMyCommands + descriptions
//   node scripts/telegram-setup.js --info     # print getWebhookInfo
//   node scripts/telegram-setup.js --delete-webhook   # switch back to long polling (dev bot)
//   node scripts/telegram-setup.js --url=https://…/api/telegram?x-vercel-protection-bypass=…  # explicit webhook URL
//
// Reads TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET and PUBLIC_APP_URL from the
// environment or .env.local (see .env.example). The webhook points at
// ${PUBLIC_APP_URL}/api/telegram.

import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { loadEnvFiles } from './dev-api.js';

export const BOT_COMMANDS = [
  { command: 'reels', description: 'Start a reels session' },
  { command: 'topics', description: 'Practise one topic' },
  { command: 'progress', description: 'Streak, XP and words per topic' },
  { command: 'settings', description: 'Language, session size, reminder' },
  { command: 'link', description: 'Connect a browser with a code' },
  { command: 'disconnect', description: 'Log out every connected browser' },
  { command: 'help', description: 'What the bot can do' },
];

export const BOT_DESCRIPTION = 'Learn the Anchor app\'s Spanish words as quick reels: one card, tap Know or Again. '
  + 'Progress, XP and streak sync with the web app.';
export const BOT_SHORT_DESCRIPTION = 'Spanish vocabulary reels, synced with the Anchor app.';

/**
 * Check the config before touching the Bot API.
 * @returns {string[]} problems (empty when ready)
 */
export function validateSetupConfig(config) {
  const problems = [];
  if (!config.botToken) problems.push('TELEGRAM_BOT_TOKEN is missing');
  if (!config.webhookSecret) problems.push('TELEGRAM_WEBHOOK_SECRET is missing');
  else if (!/^[A-Za-z0-9_-]{16,256}$/.test(config.webhookSecret)) {
    problems.push('TELEGRAM_WEBHOOK_SECRET must be 16–256 characters of A-Z a-z 0-9 _ - (Telegram rule)');
  }
  if (!/^https:\/\/[^/]+$/.test(config.publicUrl)) problems.push('PUBLIC_APP_URL must be an https:// origin, e.g. https://your-app.vercel.app');
  return problems;
}

/**
 * Configure webhook, commands and descriptions.
 * @param {Object} telegram - createTelegramClient()
 * @param {Object} config - readConfig()
 * @param {Object} [options]
 * @param {string} [options.url] - explicit webhook URL (default ${PUBLIC_APP_URL}/api/telegram)
 * @returns {Promise<string>} the webhook URL
 */
export async function setupBot(telegram, config, { url = `${config.publicUrl}/api/telegram` } = {}) {
  await telegram.call('setWebhook', {
    url,
    secret_token: config.webhookSecret,
    allowed_updates: ['message', 'callback_query'],
    drop_pending_updates: true,
  });
  await telegram.call('setMyCommands', { commands: BOT_COMMANDS });
  await telegram.call('setMyDescription', { description: BOT_DESCRIPTION });
  await telegram.call('setMyShortDescription', { short_description: BOT_SHORT_DESCRIPTION });
  return url;
}

async function main() {
  loadEnvFiles(process.env);
  const { readConfig } = await import('../server/config.js');
  const { createTelegramClient } = await import('../server/telegram.js');
  const config = readConfig(process.env);
  const telegram = createTelegramClient({ token: config.botToken });

  if (process.argv.includes('--info')) {
    console.log(JSON.stringify(await telegram.call('getWebhookInfo'), null, 2));
    return;
  }
  if (process.argv.includes('--delete-webhook')) {
    await telegram.call('deleteWebhook', { drop_pending_updates: false });
    console.log('Webhook deleted — the bot can now be run with `npm run dev:bot`.');
    return;
  }
  const problems = validateSetupConfig(config);
  if (problems.length) {
    console.error(problems.map((p) => `✖ ${p}`).join('\n'));
    process.exitCode = 1;
    return;
  }
  const urlArg = process.argv.find((arg) => arg.startsWith('--url='));
  const url = await setupBot(telegram, config, urlArg ? { url: urlArg.slice(6) } : {});
  console.log(`✔ Webhook → ${url}\n✔ Commands, description and short description set`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
