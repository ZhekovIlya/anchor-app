// ========================
// WEB ENTRY POINT
// ========================
// Orchestrator: imports core modules + web adapters, wires everything together.

import './styles.css';
import { createSRS } from '../core/srs.js';
import { TAB_EXAM_PHRASE_CAP, SRS_KEY_SENTENCES, SRS_KEY_WORDS, SRS_KEY, DRILL_MODE, SESSION_PACE_KEY } from '../core/constants.js';
import { loadAllData, buildPhraseBank, buildWordBank } from '../core/data-loader.js';
import { localStorageAdapter } from './storage.js';
import { renderDashboard, renderLessonsView, renderWordLessonsView, setActiveHomeTab } from './dashboard.js';
import { startDrill } from './drill-ui.js';
import { renderReadAloudList } from './read-aloud-ui.js';
import { renderAuditionsTab } from './audition-ui.js';
import { renderStatsTab } from './stats-dashboard.js';
import { initVoiceSelector, initPromptVoiceSelector, initPromptLangSelector, initSpeedSelector } from './speech.js';
import { seedDemoDataOnce } from '../dev/seed-demo-data.js';
import { createGamification } from '../core/gamification.js';
import { updateGamificationDisplay } from './gamification-ui.js';
import { checkAndShowReengagement } from './re-engagement.js';
import { exportFlaggedItems, getFlaggedCount } from '../core/flag-store.js';
import { collectLessonIds } from '../core/sync-local.js';
import { createSyncClient } from './sync-client.js';
import { initTelegramSyncSection } from './telegram-sync-ui.js';
import { LESSON_ID_RENAMES, copyRenamedSrsEntries } from '../core/id-migrations.js';

// ========================
// SEED (dev preview only)
// ========================

// Opt-in: open the app with ?demo=1. Never touches a Telegram-linked browser.
if (import.meta.env.DEV) {
  seedDemoDataOnce();
}

// ========================
// SRS MIGRATION
// ========================

function migrateSrsData() {
  try {
    const legacy = localStorageAdapter.load(SRS_KEY);
    if (legacy && Object.keys(legacy).length > 0) {
      const existing = localStorageAdapter.load(SRS_KEY_SENTENCES);
      if (!existing || Object.keys(existing).length === 0) {
        localStorageAdapter.save(SRS_KEY_SENTENCES, legacy);
      }
      // Don't delete old key — harmless, and acts as a backup
    }
  } catch (e) {
    // Silent migration — no user-facing error
  }
}

migrateSrsData();

// Tiempo's lessons were renamed wt_* → wtf_* (they collided with Time & Calendar).
// Copy progress stored under the old ids once; both topics keep it.
const LESSON_ID_MIGRATION_FLAG = 'anchor_migration_wtf_v1';

function migrateRenamedLessonIds() {
  if (localStorage.getItem(LESSON_ID_MIGRATION_FLAG)) return;
  try {
    const { pool, changed } = copyRenamedSrsEntries(localStorageAdapter.load(SRS_KEY_WORDS));
    if (changed) localStorageAdapter.save(SRS_KEY_WORDS, pool);
    for (const { from, to } of LESSON_ID_RENAMES) {
      const count = localStorage.getItem(from);
      if (count !== null && localStorage.getItem(to) === null) localStorage.setItem(to, count);
    }
    localStorage.setItem(LESSON_ID_MIGRATION_FLAG, 'true');
  } catch (e) {
    // Silent migration — no user-facing error
  }
}

migrateRenamedLessonIds();

// ========================
// APP STATE
// ========================

const data = loadAllData();
const phraseBank = buildPhraseBank(data.sentences);
const wordBank = buildWordBank(data.words);
const srsSentences = createSRS(localStorageAdapter, SRS_KEY_SENTENCES);
const srsWords = createSRS(localStorageAdapter, SRS_KEY_WORDS);
const gamification = createGamification(localStorageAdapter);

let activeTopic = null;
let activeMode = null; // 'sentences' | 'words'

// ========================
// DOM ELEMENT REFS
// ========================

const elements = {
  dashboardView: document.getElementById('dashboardView'),
  topicsContainer: document.getElementById('topicsContainer'),
  lessonsView: document.getElementById('lessonsView'),
  lessonsContainer: document.getElementById('lessonsContainer'),
  lessonsViewTitle: document.getElementById('lessonsViewTitle'),
  backToDashboardBtn: document.getElementById('backToDashboardBtn'),
  drillView: document.getElementById('drillView'),
  endScreen: document.getElementById('endScreen'),
  endScreenIconBox: document.getElementById('endScreenIconBox'),
  endScreenIcon: document.getElementById('endScreenIcon'),
  endScreenTitle: document.getElementById('endScreenTitle'),
  endScreenSubtitle: document.getElementById('endScreenSubtitle'),
  endScreenProgressContainer: document.getElementById('endScreenProgressContainer'),
  endScreenProgressBar: document.getElementById('endScreenProgressBar'),
  endScreenProgressLabel: document.getElementById('endScreenProgressLabel'),
  inputField: document.getElementById('strictInput'),
  fakeInput: document.getElementById('fakeInput'),
  streakCounter: document.getElementById('streakCounter'),
  russianPrompt: document.getElementById('russianPrompt'),
  ghostText: document.getElementById('ghostText'),
  revealAnswerBtn: document.getElementById('revealAnswerBtn'),
  quitDrillBtn: document.getElementById('quitDrillBtn'),
  restartBtn: document.getElementById('restartBtn'),
  dashboardReturnBtn: document.getElementById('dashboardReturnBtn'),
  successLoader: document.getElementById('successLoader'),
  spanishVoiceSelect: document.getElementById('spanishVoiceSelect'),
  promptVoiceSelect: document.getElementById('promptVoiceSelect'),
  promptLangSelect: document.getElementById('promptLangSelect'),

  // Drill Legend
  drillInfoBtn: document.getElementById('drillInfoBtn'),
  drillLegendOverlay: document.getElementById('drillLegendOverlay'),
  drillLegendClose: document.getElementById('drillLegendClose'),

  // Settings Modal
  settingsBtn: document.getElementById('settingsBtn'),
  settingsModal: document.getElementById('settingsModal'),
  closeSettingsModalBtn: document.getElementById('closeSettingsModalBtn'),
  saveSettingsModalBtn: document.getElementById('saveSettingsModalBtn'),
  spanishSpeedRange: document.getElementById('spanishSpeedRange'),
  spanishSpeedValue: document.getElementById('spanishSpeedValue'),
  hapticToggle: document.getElementById('hapticToggle'),
  themeSelect: document.getElementById('themeSelect'),
  disableSpeechToggle: document.getElementById('disableSpeechToggle'),

  // Profile Modal
  profileBtn: document.getElementById('profileBtn'),
  profileModal: document.getElementById('profileModal'),
  closeProfileBtn: document.getElementById('closeProfileBtn'),
  profileStatsContainer: document.getElementById('profileStatsContainer'),

};

// ========================
// NAVIGATION — SENTENCES
// ========================

function initDashboard() {
  activeTopic = null;
  activeMode = null;
  updateGamificationDisplay(gamification.getStats());

  renderDashboard(elements, data, srsSentences, srsWords, phraseBank, wordBank, {
    onTopicClick,
    onReviewClick,
    onMistakesClick,
    onPathLessonClick,
    onTheoryTopicClick,
    onWordTopicClick,
    onWordReviewClick,
    onWordMistakesClick,
    onReadAloudTabClick,
    onAuditionsTabClick,
    gamification,
    storageAdapter: localStorageAdapter,
  });
}

function onTopicClick(topic) {
  activeTopic = topic;
  activeMode = 'sentences';
  renderLessonsView(elements, topic, onLessonClick, initDashboard, onSentenceTheoryClick);
}

function openTheoryInLedger(topicOrTheoryId) {
  setActiveHomeTab('theory');
  updateGamificationDisplay(gamification.getStats());
  renderDashboard(elements, data, srsSentences, srsWords, phraseBank, wordBank, {
    onTopicClick,
    onReviewClick,
    onMistakesClick,
    onPathLessonClick,
    onTheoryTopicClick,
    onWordTopicClick,
    onWordReviewClick,
    onWordMistakesClick,
    onReadAloudTabClick,
    onAuditionsTabClick,
    gamification,
    storageAdapter: localStorageAdapter,
    initialTheoryTopicId: topicOrTheoryId
  });
}

function onSentenceTheoryClick(theory) {
  const targetId = activeTopic ? activeTopic.id : (theory && theory.id ? theory.id : 'week_1_theory');
  openTheoryInLedger(targetId);
}

function returnToActiveTopic() {
  if (activeTopic) {
    if (activeMode === 'words') {
      onWordTopicClick(activeTopic);
    } else {
      onTopicClick(activeTopic);
    }
  } else {
    initDashboard();
  }
}

function buildExamPhrases(topic, examLesson) {
  const pool = topic.lessons
    .filter(l => {
      if (l.exam || !l.phrases) return false;
      if (examLesson.tab) return l.tab === examLesson.tab;
      return true;
    })
    .flatMap(l => l.phrases)
    .sort(() => Math.random() - 0.5);

  if (examLesson.tab && pool.length > TAB_EXAM_PHRASE_CAP) {
    return pool.slice(0, TAB_EXAM_PHRASE_CAP);
  }
  return pool;
}

function getSessionPace() {
  const saved = localStorageAdapter.load(SESSION_PACE_KEY);
  const parsed = parseFloat(saved);
  return [0.5, 1, 1.5].includes(parsed) ? parsed : 1;
}

function onLessonClick(lesson) {
  const isExam = !!lesson.exam;
  const isTabExam = isExam && !!lesson.tab;
  const drillPhrases = isExam ? buildExamPhrases(activeTopic, lesson) : lesson.phrases;

  startDrill(elements, drillPhrases, activeTopic, lesson, isExam, false, srsSentences, returnToActiveTopic, isTabExam, DRILL_MODE.SENTENCE, gamification, getSessionPace());
}

/**
 * Launch a lesson from a Learning Path card (e.g. "Siguiente lección →").
 * Resolves the owning week topic so exam pools (buildExamPhrases) and the drill
 * context work exactly like a normal launch, but returns to the dashboard afterwards.
 */
function onPathLessonClick(lessonId) {
  const topic = data.sentences.find(t => t.lessons.some(l => l.id === lessonId));
  if (!topic) return;
  const lesson = topic.lessons.find(l => l.id === lessonId);

  activeTopic = topic;
  activeMode = 'sentences';
  setActiveHomeTab('sentences');

  const isExam = !!lesson.exam;
  const isTabExam = isExam && !!lesson.tab;
  const drillPhrases = isExam ? buildExamPhrases(topic, lesson) : lesson.phrases;

  startDrill(elements, drillPhrases, topic, lesson, isExam, false, srsSentences, initDashboard, isTabExam, DRILL_MODE.SENTENCE, gamification, getSessionPace());
}

function onReviewClick() {
  const duePhrases = srsSentences.getDuePhrases(phraseBank);
  if (duePhrases.length === 0) return;

  const reviewLesson = { id: 'daily_review', title: 'Daily Review', exam: false };
  startDrill(elements, duePhrases, null, reviewLesson, false, true, srsSentences, initDashboard, false, DRILL_MODE.SENTENCE, null, getSessionPace());
}

function onMistakesClick() {
  const mistakePhrases = srsSentences.getMistakesPhrases(phraseBank);
  if (mistakePhrases.length === 0) return;

  const reviewLesson = { id: 'mistakes_review', title: 'Practice Mistakes', exam: false };
  startDrill(elements, mistakePhrases, null, reviewLesson, false, true, srsSentences, initDashboard, false, DRILL_MODE.SENTENCE, null, getSessionPace());
}



// ========================
// NAVIGATION — THEORY (standalone)
// ========================

function onTheoryTopicClick(topic) {
  openTheoryInLedger(topic.id);
}

// ========================
// NAVIGATION — WORDS
// ========================

function onWordTopicClick(topic) {
  activeTopic = topic;
  activeMode = 'words';
  renderWordLessonsView(elements, topic, onWordLessonClick, () => {
    setActiveHomeTab('words');
    initDashboard();
  }, onWordTopicTheoryClick);
}

function onWordTopicTheoryClick(theory) {
  const targetId = activeTopic ? activeTopic.id : (theory && theory.id ? theory.id : 'words_numbers');
  openTheoryInLedger(targetId);
}

function buildWordExamItems(topic) {
  return topic.lessons
    .filter(l => !l.exam && l.words)
    .flatMap(l => l.words)
    .sort(() => Math.random() - 0.5);
}

function onWordLessonClick(lesson) {
  const isExam = !!lesson.exam;
  const drillItems = isExam ? buildWordExamItems(activeTopic) : lesson.words;

  startDrill(elements, drillItems, activeTopic, lesson, isExam, false, srsWords, returnToActiveTopic, false, DRILL_MODE.WORD, null, getSessionPace());
}

function onWordReviewClick() {
  const dueWords = srsWords.getDuePhrases(wordBank);
  if (dueWords.length === 0) return;

  const reviewLesson = { id: 'word_daily_review', title: 'Word Review', exam: false };
  startDrill(elements, dueWords, null, reviewLesson, false, true, srsWords, () => {
    setActiveHomeTab('words');
    initDashboard();
  }, false, DRILL_MODE.WORD, null, getSessionPace());
}

function onWordMistakesClick() {
  const mistakeItems = srsWords.getMistakesPhrases(wordBank);
  if (mistakeItems.length === 0) return;

  const reviewLesson = { id: 'word_mistakes_review', title: 'Practice Mistakes', exam: false };
  startDrill(elements, mistakeItems, null, reviewLesson, false, true, srsWords, () => {
    setActiveHomeTab('words');
    initDashboard();
  }, false, DRILL_MODE.WORD, null, getSessionPace());
}

// ========================
// NAVIGATION — READ ALOUD
// ========================

function onReadAloudTabClick(container, readAloudData, gamification) {
  renderReadAloudList(container, readAloudData, gamification, null);
}

// ========================
// NAVIGATION — AUDITIONS
// ========================

function onAuditionsTabClick(container, gamification) {
  renderAuditionsTab(container, gamification, () => {
    setActiveHomeTab('auditions');
    initDashboard();
  });
}

// ========================
// SETTINGS MODAL
// ========================

function openSettingsModal() {
  elements.settingsModal.style.display = 'flex';
  elements.settingsModal.classList.remove('hidden');
  telegramSyncSection.render();
  requestAnimationFrame(() => {
    elements.settingsModal.classList.remove('opacity-0');
    elements.settingsModal.classList.add('opacity-100');
  });
}

function closeSettingsModal() {
  const modal = elements.settingsModal;
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');

  modal.addEventListener('transitionend', () => {
    modal.style.display = 'none';
    modal.classList.add('hidden');
  }, { once: true });
}

elements.settingsBtn.addEventListener('click', openSettingsModal);
elements.closeSettingsModalBtn.addEventListener('click', closeSettingsModal);
elements.saveSettingsModalBtn.addEventListener('click', closeSettingsModal);
elements.settingsModal.addEventListener('click', (e) => {
  if (e.target === elements.settingsModal) closeSettingsModal();
});

if (elements.themeSelect) {
  elements.themeSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    if (value === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorageAdapter.save('anchor_theme_settings', { theme: value });
  });
}

if (elements.hapticToggle) {
  elements.hapticToggle.addEventListener('change', (e) => {
    localStorageAdapter.save('anchor_haptics', e.target.checked);
  });
}

if (elements.disableSpeechToggle) {
  elements.disableSpeechToggle.addEventListener('change', (e) => {
    localStorageAdapter.save('anchor_disable_speech', e.target.checked);
  });
}

// ========================
// DRILL LEGEND
// ========================

function openDrillLegend() {
  elements.drillLegendOverlay.classList.remove('hidden');
}

function closeDrillLegend() {
  elements.drillLegendOverlay.classList.add('hidden');
}

elements.drillInfoBtn.addEventListener('click', openDrillLegend);
elements.drillLegendClose.addEventListener('click', closeDrillLegend);
elements.drillLegendOverlay.addEventListener('click', (e) => {
  if (e.target === elements.drillLegendOverlay) closeDrillLegend();
});

// ========================
// PROFILE MODAL
// ========================

function openProfileModal() {
  renderStatsTab(elements.profileStatsContainer, gamification, srsSentences, srsWords, phraseBank, wordBank, data, localStorageAdapter);
  elements.profileModal.classList.remove('pointer-events-none');
  void elements.profileModal.offsetWidth; // force reflow
  elements.profileModal.classList.remove('opacity-0');
  const innerDiv = elements.profileModal.querySelector('div');
  if (innerDiv) innerDiv.classList.remove('translate-x-full');
}

function closeProfileModal() {
  elements.profileModal.classList.add('opacity-0');
  elements.profileModal.classList.add('pointer-events-none');
  const innerDiv = elements.profileModal.querySelector('div');
  if (innerDiv) innerDiv.classList.add('translate-x-full');
}

elements.profileBtn.addEventListener('click', openProfileModal);
elements.closeProfileBtn.addEventListener('click', closeProfileModal);
elements.profileModal.addEventListener('click', (e) => {
  if (e.target === elements.profileModal) closeProfileModal();
});

// ========================
// BOOT
// ========================

initVoiceSelector(elements.spanishVoiceSelect);
initPromptLangSelector(elements.promptLangSelect, elements.promptVoiceSelect);
initPromptVoiceSelector(elements.promptVoiceSelect);
initSpeedSelector(elements.spanishSpeedRange, elements.spanishSpeedValue);

// Load and apply theme setting
const savedTheme = localStorageAdapter.load('anchor_theme_settings');
const theme = (savedTheme && savedTheme.theme) || 'light';
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
if (elements.themeSelect) {
  elements.themeSelect.value = theme;
}

const savedHaptics = localStorageAdapter.load('anchor_haptics');
if (elements.hapticToggle) {
  elements.hapticToggle.checked = savedHaptics !== false;
}

const savedDisableSpeech = localStorageAdapter.load('anchor_disable_speech') === true;
if (elements.disableSpeechToggle) {
  elements.disableSpeechToggle.checked = savedDisableSpeech;
}

initDashboard(); // also refreshes the XP/streak header

// Re-engagement check for returning users
checkAndShowReengagement(
  gamification,
  srsSentences,
  srsWords,
  phraseBank,
  wordBank,
  () => {
    // onRefresher: start a review drill with overdue phrases (capped at 20)
    const duePhrases = srsSentences.getDuePhrases(phraseBank).slice(0, 20);
    if (duePhrases.length > 0) {
      const reviewLesson = { id: 'refresher_review', title: 'Quick Refresher', exam: false };
      startDrill(elements, duePhrases, null, reviewLesson, false, true, srsSentences, initDashboard, false, DRILL_MODE.SENTENCE, gamification, getSessionPace());
    } else {
      initDashboard();
    }
  },
  () => {
    // onDismiss: dashboard is already shown, nothing extra needed
  }
);

// Dynamic Revision Injection
const revisionTag = document.getElementById('revisionTag');
if (revisionTag && typeof __GIT_REVISION__ !== 'undefined') {
  revisionTag.textContent = __GIT_REVISION__;
}

// ========================
// SESSION PACE SETTING
// ========================

const paceButtons = document.querySelectorAll('[data-pace]');
if (paceButtons.length) {
  const currentPace = getSessionPace();
  paceButtons.forEach((btn) => {
    const pace = parseFloat(btn.dataset.pace);
    if (pace === currentPace) {
      btn.classList.add('bg-indigo-600', 'text-white', 'dark:bg-indigo-500');
      btn.classList.remove('bg-stone-100', 'dark:bg-stone-700', 'text-stone-700', 'dark:text-stone-300');
    }
    btn.addEventListener('click', () => {
      localStorageAdapter.save(SESSION_PACE_KEY, pace);
      paceButtons.forEach((b) => {
        b.classList.remove('bg-indigo-600', 'text-white', 'dark:bg-indigo-500');
        b.classList.add('bg-stone-100', 'dark:bg-stone-700', 'text-stone-700', 'dark:text-stone-300');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'dark:bg-indigo-500');
      btn.classList.remove('bg-stone-100', 'dark:bg-stone-700', 'text-stone-700', 'dark:text-stone-300');
    });
  });
}

// ========================
// FLAGGED ITEMS EXPORT
// ========================

const exportFlagBtn = document.getElementById('exportFlaggedBtn');
const flaggedCountEl = document.getElementById('flaggedItemsCount');

function refreshFlaggedCount() {
  const count = getFlaggedCount(localStorageAdapter);
  if (flaggedCountEl) flaggedCountEl.textContent = count;
  if (exportFlagBtn) exportFlagBtn.disabled = count === 0;
}

if (exportFlagBtn) {
  exportFlagBtn.addEventListener('click', () => {
    const json = exportFlaggedItems(localStorageAdapter);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `anchor-flagged-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });
}

// Expose refreshFlaggedCount so drill-ui can call it after flagging
window.__anchorRefreshFlagCount = refreshFlaggedCount;
refreshFlaggedCount();

// ========================
// TELEGRAM PROGRESS SYNC
// ========================
// Inactive until this browser is linked to the Telegram bot.

function onSyncedChanges() {
  // Header XP/streak can update anywhere; the dashboard only while it is on
  // screen (renderDashboard switches views, which would interrupt a drill).
  updateGamificationDisplay(gamification.getStats());
  if (!elements.dashboardView.classList.contains('hidden')) initDashboard();
}

const syncClient = createSyncClient({
  storage: localStorage,
  lessonIds: collectLessonIds(data),
  onChange: onSyncedChanges,
  onStatus: () => telegramSyncSection.render(),
});
const telegramSyncSection = initTelegramSyncSection(document.getElementById('telegramSyncSection'), syncClient);
syncClient.startAutoSync();

// ========================
// SERVICE WORKER (production builds only)
// ========================
// public/sw.js never touches /api/*, non-GET or cross-origin requests.

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Offline support is optional — ignore registration failures.
    });
  });
}
