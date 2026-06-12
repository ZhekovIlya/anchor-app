// ========================
// WEB ENTRY POINT
// ========================
// Orchestrator: imports core modules + web adapters, wires everything together.

import './styles.css';
import { createSRS } from '../core/srs.js';
import { TAB_EXAM_PHRASE_CAP, SRS_KEY_SENTENCES, SRS_KEY_WORDS, SRS_KEY, DRILL_MODE } from '../core/constants.js';
import { loadAllData, buildPhraseBank, buildWordBank } from '../core/data-loader.js';
import { localStorageAdapter } from './storage.js';
import { renderDashboard, renderLessonsView, renderWordLessonsView, setActiveHomeTab } from './dashboard.js';
import { startDrill } from './drill-ui.js';
import { renderTheoryArticle, renderWordTheoryArticle } from './theory-viewer.js';
import { renderReadAloudList, startReadAloud } from './read-aloud-ui.js';
import { initVoiceSelector, initPromptVoiceSelector, initSpeedSelector } from './speech.js';
import { seedDemoDataOnce } from '../dev/seed-demo-data.js';
import { createGamification } from '../core/gamification.js';
import { updateGamificationDisplay } from './gamification-ui.js';
import { checkAndShowReengagement } from './re-engagement.js';

// ========================
// SEED (dev preview only)
// ========================

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
  themeSelect: document.getElementById('themeSelect'),

  // Theory Modal (legacy — for sentence week theory images)
  theoryModal: document.getElementById('theoryModal'),
  theoryModalTitle: document.getElementById('theoryModalTitle'),
  theoryModalSubtitle: document.getElementById('theoryModalSubtitle'),
  theoryModalImage: document.getElementById('theoryModalImage'),
  closeTheoryModalBtn: document.getElementById('closeTheoryModalBtn'),

  // Theory Article View (new — for standalone theory & word theory)
  theoryArticleView: document.getElementById('theoryArticleView'),
  theoryArticleTitle: document.getElementById('theoryArticleTitle'),
  theoryArticleContent: document.getElementById('theoryArticleContent'),
  backToTheoryBtn: document.getElementById('backToTheoryBtn'),
};

// ========================
// NAVIGATION — SENTENCES
// ========================

function initDashboard() {
  activeTopic = null;
  activeMode = null;

  renderDashboard(elements, data, srsSentences, srsWords, phraseBank, wordBank, {
    onTopicClick,
    onReviewClick,
    onTheoryTopicClick,
    onWordTopicClick,
    onWordReviewClick,
    onReadAloudTabClick,
    gamification,
    storageAdapter: localStorageAdapter,
  });
}

function onTopicClick(topic) {
  activeTopic = topic;
  activeMode = 'sentences';
  renderLessonsView(elements, topic, onLessonClick, initDashboard, onSentenceTheoryClick);
}

function onSentenceTheoryClick(theory) {
  // Sentence-week theory: still uses the image modal
  if (theory.image) {
    elements.theoryModalTitle.textContent = theory.title;
    elements.theoryModalSubtitle.textContent = theory.subtitle;
    elements.theoryModalImage.src = theory.image;
    elements.theoryModal.classList.remove('hidden');
    elements.theoryModal.style.display = 'flex';
  } else if (theory.sections) {
    // Rich content theory (new style) — render in article view
    renderWordTheoryArticle(elements, theory, () => onTopicClick(activeTopic));
  }
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

function onLessonClick(lesson) {
  const isExam = !!lesson.exam;
  const isTabExam = isExam && !!lesson.tab;
  const drillPhrases = isExam ? buildExamPhrases(activeTopic, lesson) : lesson.phrases;

  startDrill(elements, drillPhrases, activeTopic, lesson, isExam, false, srsSentences, returnToActiveTopic, isTabExam, DRILL_MODE.SENTENCE, gamification);
}

function onReviewClick() {
  const duePhrases = srsSentences.getDuePhrases(phraseBank);
  if (duePhrases.length === 0) return;

  const reviewLesson = { id: 'daily_review', title: 'Daily Review', exam: false };
  startDrill(elements, duePhrases, null, reviewLesson, false, true, srsSentences, initDashboard, false, DRILL_MODE.SENTENCE);
}



// ========================
// NAVIGATION — THEORY (standalone)
// ========================

function onTheoryTopicClick(topic) {
  renderTheoryArticle(elements, topic, () => {
    setActiveHomeTab('theory');
    initDashboard();
  });
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
  renderWordTheoryArticle(elements, theory, () => onWordTopicClick(activeTopic));
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

  startDrill(elements, drillItems, activeTopic, lesson, isExam, false, srsWords, returnToActiveTopic, false, DRILL_MODE.WORD);
}

function onWordReviewClick() {
  const dueWords = srsWords.getDuePhrases(wordBank);
  if (dueWords.length === 0) return;

  const reviewLesson = { id: 'word_daily_review', title: 'Word Review', exam: false };
  startDrill(elements, dueWords, null, reviewLesson, false, true, srsWords, () => {
    setActiveHomeTab('words');
    initDashboard();
  }, false, DRILL_MODE.WORD);
}

// ========================
// NAVIGATION — READ ALOUD
// ========================

function onReadAloudTabClick(container, readAloudData, gamification, phraseBank) {
  renderReadAloudList(container, readAloudData, gamification, phraseBank, null, (savedWords) => {
    const drillLesson = {
      id: 'saved_words_practice',
      title: 'Practice Saved Words',
      exam: false
    };
    
    const drillItems = savedWords.map(sw => ({
      es: sw.es,
      ru: sw.prompt
    }));
    
    startDrill(elements, drillItems, null, drillLesson, false, true, srsWords, () => {
      onReadAloudTabClick(container, readAloudData, gamification, phraseBank);
    }, false, DRILL_MODE.WORD);
  });
}

// ========================
// SETTINGS MODAL
// ========================

function openSettingsModal() {
  elements.settingsModal.style.display = 'flex';
  elements.settingsModal.classList.remove('hidden');
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
// THEORY MODAL (legacy — sentence week images)
// ========================

function closeTheoryModal() {
  elements.theoryModal.style.display = 'none';
  elements.theoryModal.classList.add('hidden');
}

elements.closeTheoryModalBtn.addEventListener('click', closeTheoryModal);
elements.theoryModal.addEventListener('click', (e) => {
  if (e.target === elements.theoryModal) closeTheoryModal();
});

// ========================
// BOOT
// ========================

initVoiceSelector(elements.spanishVoiceSelect);
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

initDashboard();

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
      startDrill(elements, duePhrases, null, reviewLesson, false, true, srsSentences, initDashboard, false, DRILL_MODE.SENTENCE, gamification);
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
