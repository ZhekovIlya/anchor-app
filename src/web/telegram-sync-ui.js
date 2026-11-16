// ========================
// TELEGRAM SYNC — SETTINGS SECTION
// ========================
// Renders the "Telegram Sync" block of the Settings modal:
//   not linked → [Connect Telegram] → deep link + code, polling every 2 s
//   linked     → "Connected as @user · synced 2 min ago" [Sync now] [Disconnect]
// All user-provided text goes through textContent (never innerHTML).

const POLL_INTERVAL_MS = 2000;

const BUTTON_PRIMARY = 'px-4 py-2 rounded-lg text-sm font-label font-semibold bg-primary dark:bg-emerald-600 text-on-primary hover:opacity-90 dark:hover:bg-emerald-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer';
const BUTTON_SECONDARY = 'px-4 py-2 rounded-lg text-sm font-label font-semibold bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer';
const TEXT = 'font-body text-sm text-on-surface-variant/80 dark:text-stone-400 transition-colors duration-300';

// ========================
// PURE HELPERS
// ========================

/**
 * "just now", "5 min ago", "3 h ago", "2 days ago", or "never".
 */
export function formatSyncAge(lastSyncAt, now = Date.now()) {
  if (!lastSyncAt) return 'never';
  const minutes = Math.floor(Math.max(0, now - lastSyncAt) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

/**
 * One-line status for the linked state.
 * @param {Object} state - syncClient.getState()
 */
export function describeSyncState(state, now = Date.now()) {
  const user = state.user || {};
  const who = user.username ? `@${user.username}` : (user.firstName || 'your Telegram account');
  if (state.syncing) return `Connected as ${who} · syncing…`;
  if (state.lastError) return `Connected as ${who} · last sync failed (${state.lastError})`;
  return `Connected as ${who} · synced ${formatSyncAge(state.lastSyncAt, now)}`;
}

// ========================
// DOM
// ========================

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/**
 * @param {HTMLElement} container - empty element inside the settings modal
 * @param {Object} syncClient - createSyncClient()
 * @returns {{ render(): void }} call render() when the modal opens
 */
export function initTelegramSyncSection(container, syncClient) {
  let linking = null; // { code, deepLink, expiresAt, timer }
  let message = '';

  function stopPolling() {
    if (linking) clearInterval(linking.timer);
    linking = null;
  }

  async function poll() {
    if (!linking) return;
    if (Date.now() > linking.expiresAt) {
      stopPolling();
      message = 'The link expired. Press Connect to try again.';
      render();
      return;
    }
    const status = await syncClient.pollLink(linking.code);
    if (status === 'ok') {
      stopPolling();
      message = '';
      render();
      syncClient.syncNow();
    } else if (status === 'cancelled' || status === 'expired') {
      stopPolling();
      message = status === 'cancelled' ? 'Connection cancelled in Telegram.' : 'The link expired. Press Connect to try again.';
      render();
    }
  }

  async function connect(button) {
    button.disabled = true;
    message = '';
    try {
      const { code, deepLink, expiresIn } = await syncClient.startLink();
      stopPolling();
      linking = { code, deepLink, expiresAt: Date.now() + expiresIn * 1000, timer: setInterval(poll, POLL_INTERVAL_MS) };
    } catch (error) {
      message = error.message;
    }
    render();
  }

  function renderUnlinked() {
    container.append(el('p', TEXT, 'Learn words as reels in the Anchor Telegram bot. Progress, XP and streak stay in sync between the app and the bot.'));
    const button = el('button', `self-start ${BUTTON_PRIMARY}`, '✈️ Connect Telegram');
    button.type = 'button';
    button.addEventListener('click', () => connect(button));
    container.append(button);
  }

  function renderLinking() {
    container.append(el('p', TEXT, 'Open the bot and press ✅ Connect. This page notices it within a few seconds.'));
    const open = el('a', `self-start inline-block ${BUTTON_PRIMARY}`, 'Open Telegram');
    open.href = linking.deepLink;
    open.target = '_blank';
    open.rel = 'noopener';
    container.append(open);

    const fallback = el('p', TEXT, 'Or send this to the bot: ');
    const code = el('code', 'font-mono text-xs break-all text-on-surface dark:text-stone-100 select-all', `/link ${linking.code}`);
    fallback.append(code);
    container.append(fallback);

    const cancel = el('button', `self-start ${BUTTON_SECONDARY}`, 'Cancel');
    cancel.type = 'button';
    cancel.addEventListener('click', () => { stopPolling(); render(); });
    container.append(cancel);
  }

  function renderLinked() {
    const state = syncClient.getState();
    container.append(el('p', TEXT, describeSyncState(state)));
    const row = el('div', 'flex gap-2');
    const syncButton = el('button', BUTTON_PRIMARY, '🔄 Sync now');
    syncButton.type = 'button';
    syncButton.disabled = state.syncing;
    syncButton.addEventListener('click', () => syncClient.syncNow());
    const disconnectButton = el('button', BUTTON_SECONDARY, 'Disconnect');
    disconnectButton.type = 'button';
    disconnectButton.addEventListener('click', async () => {
      disconnectButton.disabled = true;
      await syncClient.disconnect();
      message = 'Disconnected. Local progress stays on this device.';
      render();
    });
    row.append(syncButton, disconnectButton);
    container.append(row);
  }

  function render() {
    container.replaceChildren();
    if (syncClient.getState().linked) renderLinked();
    else if (linking) renderLinking();
    else renderUnlinked();
    if (message) container.append(el('p', 'font-body text-sm text-amber-700 dark:text-amber-400', message));
  }

  // Coming back from Telegram: check right away instead of waiting for the timer
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && linking) poll();
  });

  render();
  return { render };
}
