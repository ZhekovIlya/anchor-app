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
import { initVoiceSelector, initPromptVoiceSelector } from './speech.js';

// ========================
// INITIALIZE
// ========================

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

// START
// ========================

initVoiceSelector(elements.spanishVoiceSelect);
initPromptVoiceSelector(elements.promptVoiceSelect);
initDashboard();
