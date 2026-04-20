// ========================
// WEB ENTRY POINT
// ========================
// Orchestrator: imports core modules + web adapters, wires everything together.

import './styles.css';
import { createSRS } from '../core/srs.js';
import { loadAllTopics, buildPhraseBank } from '../core/data-loader.js';
import { localStorageAdapter } from './storage.js';
import { renderDashboard, renderLessonsView } from './dashboard.js';
import { startDrill } from './drill-ui.js';
import { initVoiceSelector, initPromptVoiceSelector, initSpeedSelector } from './speech.js';
import { seedDemoDataOnce } from '../dev/seed-demo-data.js';

// ========================
// SEED (dev preview only)
// ========================

if (import.meta.env.DEV) {
  seedDemoDataOnce();
}

// ========================
// APP STATE
// ========================

const topics = loadAllTopics();
const phraseBank = buildPhraseBank(topics);
const srs = createSRS(localStorageAdapter);

let activeTopic = null;

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

  // Audio Modal
  audioSettingsBtn: document.getElementById('audioSettingsBtn'),
  audioSettingsModal: document.getElementById('audioSettingsModal'),
  closeAudioModalBtn: document.getElementById('closeAudioModalBtn'),
  saveAudioModalBtn: document.getElementById('saveAudioModalBtn'),
  spanishSpeedRange: document.getElementById('spanishSpeedRange'),
  spanishSpeedValue: document.getElementById('spanishSpeedValue'),
};

// ========================
// NAVIGATION
// ========================

function initDashboard() {
  activeTopic = null;
  renderDashboard(elements, topics, srs, phraseBank, onTopicClick, onReviewClick);
}

function onTopicClick(topic) {
  activeTopic = topic;
  renderLessonsView(elements, topic, onLessonClick, initDashboard);
}

function returnToActiveTopic() {
  if (activeTopic) {
    onTopicClick(activeTopic);
  } else {
    initDashboard();
  }
}

function buildExamPhrases(topic) {
  return topic.lessons
    .filter(l => !l.exam && l.phrases)
    .flatMap(l => l.phrases)
    .sort(() => Math.random() - 0.5);
}

function onLessonClick(lesson) {
  const isExam = !!lesson.exam;
  const drillPhrases = isExam ? buildExamPhrases(activeTopic) : lesson.phrases;

  startDrill(elements, drillPhrases, activeTopic, lesson, isExam, false, srs, returnToActiveTopic);
}

function onReviewClick() {
  const duePhrases = srs.getDuePhrases(phraseBank);
  if (duePhrases.length === 0) return;

  const reviewLesson = { id: 'daily_review', title: 'Daily Review', exam: false };
  startDrill(elements, duePhrases, null, reviewLesson, false, true, srs, initDashboard);
}

// ========================
// AUDIO MODAL
// ========================

function openAudioModal() {
  elements.audioSettingsModal.style.display = 'flex';
  elements.audioSettingsModal.classList.remove('hidden');
  requestAnimationFrame(() => {
    elements.audioSettingsModal.classList.remove('opacity-0');
    elements.audioSettingsModal.classList.add('opacity-100');
  });
}

function closeAudioModal() {
  const modal = elements.audioSettingsModal;
  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0');

  modal.addEventListener('transitionend', () => {
    modal.style.display = 'none';
    modal.classList.add('hidden');
  }, { once: true });
}

elements.audioSettingsBtn.addEventListener('click', openAudioModal);
elements.closeAudioModalBtn.addEventListener('click', closeAudioModal);
elements.saveAudioModalBtn.addEventListener('click', closeAudioModal);
elements.audioSettingsModal.addEventListener('click', (e) => {
  if (e.target === elements.audioSettingsModal) closeAudioModal();
});

// ========================
// BOOT
// ========================

initVoiceSelector(elements.spanishVoiceSelect);
initPromptVoiceSelector(elements.promptVoiceSelect);
initSpeedSelector(elements.spanishSpeedRange, elements.spanishSpeedValue);
initDashboard();

// Dynamic Revision Injection
const revisionTag = document.getElementById('revisionTag');
if (revisionTag && typeof __GIT_REVISION__ !== 'undefined') {
  revisionTag.textContent = __GIT_REVISION__;
}
