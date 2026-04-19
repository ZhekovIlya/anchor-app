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

// ========================
// INITIALIZE
// ========================

if (localStorage.getItem('MOCKED_V3') !== 'true') {
  localStorage.setItem('MOCKED_V3', 'true');
  
  // Mastered week 1 (Exam >= 5)
  localStorage.setItem('completion_count_w1_l1', '3');
  localStorage.setItem('completion_count_w1_l2a', '3');
  localStorage.setItem('completion_count_w1_l2b', '3');
  localStorage.setItem('completion_count_w1_l3', '3');
  localStorage.setItem('completion_count_w1_l3b', '3');
  localStorage.setItem('completion_count_w1_l4', '3');
  localStorage.setItem('completion_count_w1_l7', '3');
  localStorage.setItem('completion_count_w1_exam', '5');

  // Completed week 2 (All lessons >= 1)
  const w2_lessons = ['w2_l1', 'w2_l2', 'w2_l3', 'w2_l4', 'w2_l5', 'w2_l6', 'w2_l7', 'w2_l8', 'w2_l9', 'w2_l10', 'w2_l11', 'w2_l12', 'w2_l13', 'w2_l14', 'w2_l15', 'w2_exam'];
  w2_lessons.forEach(l => localStorage.setItem(`completion_count_${l}`, '1'));
}

const topics = loadAllTopics();
const phraseBank = buildPhraseBank(topics);
const srs = createSRS(localStorageAdapter);

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
// STATE
// ========================

let activeTopic = null;

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

function onLessonClick(lesson) {
  let drillPhrases;
  const isExam = !!lesson.exam;

  if (isExam) {
    // Final Exam: auto-populate from sibling lessons
    const siblingPhrases = [];
    activeTopic.lessons.forEach(l => {
      if (!l.exam && l.phrases) {
        siblingPhrases.push(...l.phrases);
      }
    });
    drillPhrases = siblingPhrases.sort(() => Math.random() - 0.5);
  } else {
    drillPhrases = lesson.phrases;
  }

  const onQuit = () => {
    if (activeTopic) {
      onTopicClick(activeTopic);
    } else {
      initDashboard();
    }
  };

  startDrill(elements, drillPhrases, lesson, isExam, false, srs, onQuit);
}

function onReviewClick() {
  const duePhrases = srs.getDuePhrases(phraseBank);
  if (duePhrases.length === 0) return;

  const reviewLesson = { id: 'daily_review', title: 'Daily Review', exam: false };

  startDrill(elements, duePhrases, reviewLesson, false, true, srs, initDashboard);
}

// ========================
// MODAL LOGIC
// ========================

function openAudioModal() {
  elements.audioSettingsModal.style.display = 'flex';
  elements.audioSettingsModal.classList.remove('hidden');
  // requestAnimationFrame ensures display:flex is painted before the opacity transition starts
  requestAnimationFrame(() => {
    elements.audioSettingsModal.classList.remove('opacity-0');
    elements.audioSettingsModal.classList.add('opacity-100');
  });
}

function closeAudioModal() {
  elements.audioSettingsModal.classList.remove('opacity-100');
  elements.audioSettingsModal.classList.add('opacity-0');
  setTimeout(() => {
     elements.audioSettingsModal.style.display = 'none';
     elements.audioSettingsModal.classList.add('hidden');
  }, 200);
}

elements.audioSettingsBtn.addEventListener('click', openAudioModal);
elements.closeAudioModalBtn.addEventListener('click', closeAudioModal);
elements.saveAudioModalBtn.addEventListener('click', closeAudioModal);

// Close on backdrop click
elements.audioSettingsModal.addEventListener('click', (e) => {
  if (e.target === elements.audioSettingsModal) {
    closeAudioModal();
  }
});


// START
// ========================

initVoiceSelector(elements.spanishVoiceSelect);
initPromptVoiceSelector(elements.promptVoiceSelect);
initSpeedSelector(elements.spanishSpeedRange, elements.spanishSpeedValue);
initDashboard();
