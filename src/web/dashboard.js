// ========================
// DASHBOARD + LESSONS VIEW
// ========================
// DOM rendering for the 3-tab home (Sentences / Theory / Words)
// and in-topic lessons grids.

import { getCompletionCount } from './storage.js';
import { renderStatsTab } from './stats-dashboard.js';
import { localStorageAdapter } from './storage.js';

let activeTab = null;
let activeHomeTab = 'sentences'; // Default to sentences

// ========================
// STATUS THEMES
// ========================

const GOLD = {
  bar: 'bg-[#ca8a04] dark:bg-amber-500',
  label: 'text-[#a16207] dark:text-amber-400',
  title: 'text-[#854d0e] dark:text-amber-300',
};

const GREEN = {
  bar: 'bg-[#16a34a] dark:bg-emerald-500',
  label: 'text-[#15803d] dark:text-emerald-400',
  title: 'text-[#166534] dark:text-emerald-300',
};

const TOPIC_THEMES = {
  mastered: {
    card: 'group relative bg-[#fefce8] dark:bg-amber-950/20 rounded-xl p-6 transition-all hover:bg-[#fef9c3] dark:hover:bg-amber-950/30 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#fef08a] dark:border-yellow-600/30 shadow-sm gap-4 transition-colors duration-300',
    bar: GOLD.bar,
    numBg: 'bg-[#fef08a] dark:bg-yellow-600/30 text-[#ca8a04] dark:text-amber-400 transition-colors duration-300',
    label: GOLD.label,
    title: GOLD.title,
    rightCol: () => `
      <div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start transition-colors duration-300">
        <span class="font-body text-sm font-bold text-[#ca8a04] dark:text-amber-400 uppercase tracking-wide transition-colors duration-300">Mastered</span>
        <span class="material-symbols-outlined text-[#ca8a04] dark:text-amber-400 text-3xl transition-colors duration-300">workspace_premium</span>
      </div>`,
  },
  completed: {
    card: 'group relative bg-[#f0fdf4] dark:bg-emerald-950/20 rounded-xl p-6 transition-all hover:bg-[#dcfce7] dark:hover:bg-emerald-950/30 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#bbf7d0] dark:border-emerald-600/30 shadow-sm gap-4 transition-colors duration-300',
    bar: GREEN.bar,
    numBg: 'bg-[#dcfce7] dark:bg-emerald-600/30 text-[#16a34a] dark:text-emerald-400 transition-colors duration-300',
    label: GREEN.label,
    title: GREEN.title,
    rightCol: () => `
      <div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start transition-colors duration-300">
        <span class="font-body text-sm font-bold text-[#16a34a] dark:text-emerald-400 uppercase tracking-wide transition-colors duration-300">Completed</span>
        <span class="material-symbols-outlined text-[#16a34a] dark:text-emerald-400 text-3xl transition-colors duration-300">check_circle</span>
      </div>`,
  },
  progress: {
    card: 'group relative bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 transition-all hover:bg-surface-container-low dark:hover:bg-stone-800 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline-variant/30 dark:border-stone-800 shadow-sm hover:border-primary/50 dark:hover:border-emerald-500/50 gap-4 transition-colors duration-300',
    numBg: 'bg-surface-container-high dark:bg-stone-800 text-on-surface-variant dark:text-stone-400 group-hover:bg-primary-container dark:group-hover:bg-emerald-900/40 group-hover:text-primary dark:group-hover:text-emerald-400 transition-all duration-300',
    label: 'text-on-surface-variant dark:text-stone-400 transition-colors duration-300',
    title: 'text-on-surface dark:text-stone-100 transition-colors duration-300',
    rightCol: (progressPercent) => `
      <div class="flex items-center gap-4 w-full sm:w-48 pr-2">
        <div class="flex-grow bg-surface-variant dark:bg-stone-800 rounded-full h-1.5 overflow-hidden transition-colors duration-300">
          <div class="bg-primary dark:bg-emerald-600 h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>
        <span class="font-body text-sm font-medium text-primary dark:text-emerald-400 min-w-[32px] text-right transition-colors duration-300">${progressPercent}%</span>
      </div>`,
  },
  new: {
    card: 'group relative bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 transition-all hover:bg-surface-container-low dark:hover:bg-stone-800 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline-variant/30 dark:border-stone-800 shadow-sm hover:border-primary/50 dark:hover:border-emerald-500/50 gap-4 transition-colors duration-300',
    numBg: 'bg-surface-container-highest dark:bg-stone-800 text-on-surface-variant dark:text-stone-400 group-hover:text-primary dark:group-hover:text-emerald-400 transition-all duration-300',
    label: 'text-on-surface-variant dark:text-stone-400 transition-colors duration-300',
    title: 'text-on-surface dark:text-stone-100 transition-colors duration-300',
    rightCol: () => `
      <div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span class="font-label text-sm font-bold text-primary dark:text-emerald-400 tracking-wide hidden sm:block transition-colors duration-300">START</span>
        <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-3xl sm:hidden transition-colors duration-300">arrow_forward</span>
      </div>`,
  },
};

const LESSON_THEMES = {
  mastered: {
    classes: 'bg-[#fefce8] dark:bg-amber-950/20 border-[#fef08a] dark:border-yellow-600/30 hover:bg-[#fef9c3] dark:hover:bg-amber-950/30 hover:border-[#ca8a04] dark:hover:border-amber-500/50 transition-colors duration-300',
    bar: GOLD.bar,
    title: GOLD.title,
    lessonLayout: (bar, title) => `${bar}<div class="flex items-center gap-4 pl-4 w-full justify-between transition-colors duration-300">${title}<span class="material-symbols-outlined text-[#ca8a04] dark:text-amber-400 text-3xl hidden sm:block transition-colors duration-300">workspace_premium</span></div>`,
    examLayout: (bar, title) => `${bar}<div class="flex items-center gap-4 pl-2 sm:pl-4 w-full justify-between transition-colors duration-300"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-[#ca8a04] dark:text-amber-400 text-2xl transition-colors duration-300">workspace_premium</span>${title}</div><span class="material-symbols-outlined text-[#ca8a04] dark:text-amber-400 text-3xl hidden sm:block transition-colors duration-300">workspace_premium</span></div>`,
  },
  completed: {
    classes: 'bg-[#f0fdf4] dark:bg-emerald-950/20 border-[#bbf7d0] dark:border-emerald-600/30 hover:bg-[#dcfce7] dark:hover:bg-emerald-950/30 hover:border-[#16a34a] dark:hover:border-emerald-500/50 transition-colors duration-300',
    bar: GREEN.bar,
    title: GREEN.title,
    lessonLayout: (bar, title) => `${bar}<div class="flex items-center gap-4 pl-4 w-full justify-between transition-colors duration-300">${title}<span class="material-symbols-outlined text-[#16a34a] dark:text-emerald-400 text-3xl hidden sm:block transition-colors duration-300">check_circle</span></div>`,
    examLayout: (bar, title) => `${bar}<div class="flex items-center gap-4 pl-2 sm:pl-4 w-full justify-between transition-colors duration-300"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-[#16a34a] dark:text-emerald-400 text-2xl transition-colors duration-300">workspace_premium</span>${title}</div><span class="material-symbols-outlined text-[#16a34a] dark:text-emerald-400 text-3xl hidden sm:block transition-colors duration-300">check_circle</span></div>`,
  },
  new: {
    classes: 'border-outline-variant/50 dark:border-stone-850 hover:bg-surface-container-low dark:hover:bg-stone-800 hover:border-primary/50 dark:hover:border-emerald-500/50 transition-colors duration-300 bg-surface-container-lowest dark:bg-stone-850',
    bar: 'bg-primary dark:bg-emerald-600 opacity-0 group-hover:opacity-100 transition-all duration-300',
    title: 'text-on-surface dark:text-stone-100 group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors duration-300',
    lessonLayout: (bar, title) => `${bar}<div class="flex items-center gap-4 pl-4 w-full justify-between transition-colors duration-300">${title}<span class="material-symbols-outlined text-primary dark:text-emerald-400 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">arrow_forward</span></div>`,
    examLayout: (bar, title) => `${bar}<div class="flex items-center gap-4 pl-2 sm:pl-4 w-full justify-between transition-colors duration-300"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-on-surface-variant dark:text-stone-400 text-2xl group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors duration-300">workspace_premium</span>${title}</div><span class="material-symbols-outlined text-primary dark:text-emerald-400 text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">arrow_forward</span></div>`,
  },
};

// ========================
// STATUS HELPERS
// ========================

export const EXAM_MASTERED_THRESHOLD = 5;
export const LESSON_MASTERED_THRESHOLD = 3;

function getTopicStatus(topic) {
  const lessons = topic.lessons;
  const examLesson = lessons.find(l => l.exam);
  const examCompletions = examLesson ? getCompletionCount(examLesson.id) : 0;
  if (examCompletions >= EXAM_MASTERED_THRESHOLD) return 'mastered';

  const total = lessons.length;
  const completedCount = lessons.filter(l => getCompletionCount(l.id) >= 1).length;
  if (total > 0 && completedCount === total) return 'completed';

  const startedCount = lessons.filter(l => getCompletionCount(l.id) > 0).length;
  if (startedCount > 0) return 'progress';

  return 'new';
}

function getLessonStatus(lesson) {
  const completions = getCompletionCount(lesson.id);
  const threshold = lesson.exam ? EXAM_MASTERED_THRESHOLD : LESSON_MASTERED_THRESHOLD;
  if (completions >= threshold) return 'mastered';
  if (completions >= 1) return 'completed';
  return 'new';
}

function stripWeekPrefix(title) {
  return title.replace(/^Week\s*\d+\s*[:-]?\s*/i, '').trim() || title;
}

export function calcProgressPercent(lessons) {
  const total = lessons.length;
  const done = lessons.filter(l => getCompletionCount(l.id) >= 1).length;
  return total > 0 ? Math.round((done / total) * 100) : 0;
}

// ========================
// HOME TAB BAR
// ========================

const HOME_TABS = [
  { id: 'sentences', label: 'Sentences', icon: 'edit_note' },
  { id: 'theory',    label: 'Theory',    icon: 'lightbulb' },
  { id: 'words',     label: 'Words',     icon: 'abc' },
  { id: 'readAloud', label: 'Read',      icon: 'record_voice_over' },
  { id: 'auditions', label: 'Auditions', icon: 'mic' },
];

function renderHomeTabBar(container, activeId, onChange) {
  container.innerHTML = '';
  for (const tab of HOME_TABS) {
    const btn = document.createElement('button');
    const isActive = tab.id === activeId;
    btn.className = isActive
      ? 'flex items-center gap-2 px-6 py-3 rounded-full font-label font-bold tracking-wide transition-all bg-primary dark:bg-emerald-600 text-on-primary shadow-md cursor-pointer whitespace-nowrap outline-none transition-colors duration-300'
      : 'flex items-center gap-2 px-6 py-3 rounded-full font-label font-bold tracking-wide transition-all bg-surface-container-low dark:bg-stone-850 text-on-surface-variant dark:text-stone-400 hover:bg-surface-variant dark:hover:bg-stone-800 cursor-pointer whitespace-nowrap outline-none transition-colors duration-300';
    btn.innerHTML = `<span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' ${isActive ? 1 : 0};">${tab.icon}</span>${tab.label}`;
    btn.onclick = () => onChange(tab.id);
    container.appendChild(btn);
  }
}

// ========================
// RENDER: DASHBOARD (HOME)
// ========================

export function renderDashboard(elements, data, srsSentences, srsWords, phraseBank, wordBank, callbacks) {
  const { topicsContainer } = elements;
  const { onTopicClick, onReviewClick, onMistakesClick, onTheoryTopicClick, onWordTopicClick, onWordReviewClick, onWordMistakesClick, onReadAloudTabClick, onAuditionsTabClick, gamification } = callbacks;

  showOnly(elements, 'dashboard');
  topicsContainer.innerHTML = '';

  // Home tab bar
  const tabBar = document.getElementById('homeTabBar');
  renderHomeTabBar(tabBar, activeHomeTab, (tabId) => {
    activeHomeTab = tabId;
    renderDashboard(elements, data, srsSentences, srsWords, phraseBank, wordBank, callbacks);
  });

  if (activeHomeTab === 'sentences') {
    renderSentencesTab(topicsContainer, data.sentences, srsSentences, phraseBank, onTopicClick, onReviewClick, onMistakesClick);
  } else if (activeHomeTab === 'theory') {
    renderTheoryTab(topicsContainer, data.theory, onTheoryTopicClick);
  } else if (activeHomeTab === 'words') {
    renderWordsTab(topicsContainer, data.words, srsWords, wordBank, onWordTopicClick, onWordReviewClick, onWordMistakesClick);
  } else if (activeHomeTab === 'readAloud') {
    callbacks.onReadAloudTabClick(topicsContainer, data.readAloud, callbacks.gamification);
  } else if (activeHomeTab === 'auditions') {
    callbacks.onAuditionsTabClick(topicsContainer, callbacks.gamification);
  }
}

function renderSentencesTab(container, sentences, srs, phraseBank, onTopicClick, onReviewClick, onMistakesClick) {
  // Daily Review Card
  const dueCount = srs.getDueCount(phraseBank);
  const mistakesCount = srs.getMistakesCount(phraseBank);
  const reviewSection = document.getElementById('reviewSection');
  reviewSection.style.display = (dueCount > 0 || mistakesCount > 0) ? 'block' : 'none';

  const startReviewBtn = document.getElementById('startReviewBtn');
  if (dueCount > 0) {
    document.getElementById('dueCountText').textContent =
      `${dueCount} phrases ready for review. Consistent practice builds lasting fluency.`;
    startReviewBtn.classList.remove('hidden');
    startReviewBtn.classList.add('flex');
    startReviewBtn.onclick = onReviewClick;
  } else if (mistakesCount > 0) {
    document.getElementById('dueCountText').textContent =
      `No reviews due right now, but you have ${mistakesCount} phrases that need extra practice.`;
    startReviewBtn.classList.add('hidden');
    startReviewBtn.classList.remove('flex');
  }

  const practiceMistakesBtn = document.getElementById('practiceMistakesBtn');
  if (mistakesCount > 0) {
    practiceMistakesBtn.classList.remove('hidden');
    practiceMistakesBtn.classList.add('flex');
    document.getElementById('mistakesCountBadge').textContent = mistakesCount;
    practiceMistakesBtn.onclick = onMistakesClick;
  } else {
    practiceMistakesBtn.classList.add('hidden');
    practiceMistakesBtn.classList.remove('flex');
  }

  // Week cards
  sentences.forEach((topic, index) => {
    const weekNumber = index + 1;
    const status = getTopicStatus(topic);
    const theme = TOPIC_THEMES[status];
    const progressPercent = calcProgressPercent(topic.lessons);
    const cleanTitle = stripWeekPrefix(topic.title);

    const leftPadding = status === 'progress' ? 'pl-2' : 'pl-4';
    const barHtml = theme.bar
      ? `<div class="absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar} rounded-l-xl"></div>`
      : '';

    const leftCol = `
      <div class="flex items-center gap-4 sm:gap-6 ${leftPadding} w-full sm:w-auto">
        <div class="w-12 h-12 rounded-xl ${theme.numBg} hidden sm:flex items-center justify-center flex-shrink-0">
          <span class="font-headline text-xl font-bold">${weekNumber}</span>
        </div>
        <div class="w-full sm:w-auto overflow-hidden">
          <div class="font-label text-xs ${theme.label} tracking-wider uppercase mb-1">Week ${weekNumber}</div>
          <h3 class="font-headline text-2xl ${theme.title} break-words line-clamp-2">${cleanTitle}</h3>
        </div>
      </div>`;

    const topicBtn = document.createElement('div');
    topicBtn.className = theme.card;
    topicBtn.innerHTML = barHtml + leftCol + theme.rightCol(progressPercent);
    topicBtn.addEventListener('click', () => onTopicClick(topic));
    container.appendChild(topicBtn);
  });
}

function renderTheoryTab(container, theoryTopics, onTheoryTopicClick) {
  // Hide review section for theory
  document.getElementById('reviewSection').style.display = 'none';

  const header = document.createElement('div');
  header.className = 'mb-2';
  header.innerHTML = `<p class="font-body text-base text-on-surface-variant dark:text-stone-400 transition-colors duration-300">Grammar explanations, visual cheat sheets, and pattern recognition guides.</p>`;
  container.appendChild(header);

  for (const topic of theoryTopics) {
    const card = document.createElement('div');
    card.className = 'group relative bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 transition-all hover:bg-surface-container-low dark:hover:bg-stone-800 cursor-pointer flex items-center justify-between border border-outline-variant/30 dark:border-stone-800 shadow-sm hover:border-primary/50 dark:hover:border-emerald-500/50 gap-4 transition-colors duration-300';
    card.innerHTML = `
      <div class="flex items-center gap-4 pl-2">
        <div class="w-12 h-12 rounded-xl bg-primary/10 dark:bg-emerald-600/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
          <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-2xl transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">${topic.icon}</span>
        </div>
        <div>
          <h3 class="font-headline text-xl font-bold text-on-surface dark:text-stone-100 group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors duration-300">${topic.title}</h3>
          <p class="font-body text-sm text-on-surface-variant dark:text-stone-400 mt-0.5 transition-colors duration-300">${topic.description}</p>
        </div>
      </div>
      <span class="material-symbols-outlined text-primary/40 dark:text-emerald-500/40 group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors duration-300 text-2xl">arrow_forward</span>
    `;
    card.addEventListener('click', () => onTheoryTopicClick(topic));
    container.appendChild(card);
  }
}

function renderWordsTab(container, wordTopics, srs, wordBank, onWordTopicClick, onWordReviewClick, onWordMistakesClick) {
  // Word Daily Review
  const dueCount = srs.getDueCount(wordBank);
  const mistakesCount = srs.getMistakesCount(wordBank);
  const reviewSection = document.getElementById('reviewSection');
  reviewSection.style.display = (dueCount > 0 || mistakesCount > 0) ? 'block' : 'none';

  const startReviewBtn = document.getElementById('startReviewBtn');
  if (dueCount > 0) {
    document.getElementById('dueCountText').textContent =
      `${dueCount} words ready for review. Build your vocabulary muscle memory.`;
    startReviewBtn.classList.remove('hidden');
    startReviewBtn.classList.add('flex');
    startReviewBtn.onclick = onWordReviewClick;
  } else if (mistakesCount > 0) {
    document.getElementById('dueCountText').textContent =
      `No reviews due right now, but you have ${mistakesCount} words that need extra practice.`;
    startReviewBtn.classList.add('hidden');
    startReviewBtn.classList.remove('flex');
  }

  const practiceMistakesBtn = document.getElementById('practiceMistakesBtn');
  if (mistakesCount > 0) {
    practiceMistakesBtn.classList.remove('hidden');
    practiceMistakesBtn.classList.add('flex');
    document.getElementById('mistakesCountBadge').textContent = mistakesCount;
    practiceMistakesBtn.onclick = onWordMistakesClick;
  } else {
    practiceMistakesBtn.classList.add('hidden');
    practiceMistakesBtn.classList.remove('flex');
  }

  // Word topic cards
  wordTopics.forEach((topic, index) => {
    const status = getTopicStatus(topic);
    const theme = TOPIC_THEMES[status];
    const progressPercent = calcProgressPercent(topic.lessons);

    const barHtml = theme.bar
      ? `<div class="absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar} rounded-l-xl"></div>`
      : '';

    const leftPadding = status === 'progress' ? 'pl-2' : 'pl-4';

    const leftCol = `
      <div class="flex items-center gap-4 sm:gap-6 ${leftPadding} w-full sm:w-auto">
        <div class="w-12 h-12 rounded-xl ${theme.numBg} hidden sm:flex items-center justify-center flex-shrink-0">
          <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">${topic.icon}</span>
        </div>
        <div class="w-full sm:w-auto overflow-hidden">
          <div class="font-label text-xs ${theme.label} tracking-wider uppercase mb-1">${topic.description}</div>
          <h3 class="font-headline text-2xl ${theme.title} break-words line-clamp-2">${topic.title}</h3>
        </div>
      </div>`;

    const card = document.createElement('div');
    card.className = theme.card;
    card.innerHTML = barHtml + leftCol + theme.rightCol(progressPercent);
    card.addEventListener('click', () => onWordTopicClick(topic));
    container.appendChild(card);
  });
}

// ========================
// RENDER: LESSONS VIEW (shared by sentences + words)
// ========================

export function renderLessonsView(elements, topic, onLessonClick, onBackClick, onTheoryClick) {
  const { lessonsViewTitle, lessonsContainer, backToDashboardBtn } = elements;
  const personTabsContainer = document.getElementById('personTabsContainer');

  showOnly(elements, 'lessons');
  lessonsViewTitle.textContent = topic.title;
  personTabsContainer.innerHTML = '';

  lessonsContainer.classList.remove('transition-all', 'duration-300', 'opacity-100', 'scale-100');
  lessonsContainer.classList.add('opacity-0', 'scale-95');
  lessonsContainer.innerHTML = '';

  requestAnimationFrame(() => {
    lessonsContainer.classList.remove('opacity-0', 'scale-95');
    lessonsContainer.classList.add('transition-all', 'duration-300', 'opacity-100', 'scale-100');
  });

  // Theory card — rendered before tabs (for sentence weeks)
  if (topic.theory && onTheoryClick) {
    renderTheoryCard(lessonsContainer, topic.theory, onTheoryClick);
  }

  // Person tabs (sentence weeks only)
  if (topic.tabs) {
    renderTabs(personTabsContainer, topic, elements, onLessonClick, onBackClick, onTheoryClick);
  }

  renderLessonCards(lessonsContainer, topic, onLessonClick);
  backToDashboardBtn.onclick = onBackClick;
}

/**
 * Render word topic lessons view.
 * Similar to sentence lessons but items use `words` instead of `phrases`.
 */
export function renderWordLessonsView(elements, topic, onLessonClick, onBackClick, onTheoryClick) {
  const { lessonsViewTitle, lessonsContainer, backToDashboardBtn } = elements;
  const personTabsContainer = document.getElementById('personTabsContainer');

  showOnly(elements, 'lessons');
  lessonsViewTitle.textContent = topic.title;
  personTabsContainer.innerHTML = '';

  lessonsContainer.classList.remove('transition-all', 'duration-300', 'opacity-100', 'scale-100');
  lessonsContainer.classList.add('opacity-0', 'scale-95');
  lessonsContainer.innerHTML = '';

  requestAnimationFrame(() => {
    lessonsContainer.classList.remove('opacity-0', 'scale-95');
    lessonsContainer.classList.add('transition-all', 'duration-300', 'opacity-100', 'scale-100');
  });

  // Theory card for word topics (pattern explanations)
  if (topic.theory && onTheoryClick) {
    renderTheoryCard(lessonsContainer, topic.theory, onTheoryClick);
  }

  // Render word lesson cards
  const baseClasses = 'w-full p-5 rounded-xl transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 flex items-center justify-between border dark:border-stone-800 relative overflow-hidden group shadow-sm bg-surface-container-lowest dark:bg-stone-850 transition-colors duration-300';

  topic.lessons.forEach(lesson => {
    const status = getLessonStatus(lesson);
    const theme = LESSON_THEMES[status];
    const wordCount = lesson.exam
      ? topic.lessons.filter(l => !l.exam).reduce((sum, l) => sum + (l.words ? l.words.length : 0), 0)
      : (lesson.words ? lesson.words.length : 0);

    const bar = `<div class="absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar} rounded-l-xl"></div>`;
    const titleHtml = `<div><h3 class="font-headline text-xl font-bold ${theme.title}">${lesson.title}</h3><p class="font-body text-xs text-on-surface-variant dark:text-stone-400 mt-1 transition-colors duration-300">${wordCount} words</p></div>`;
    const layout = lesson.exam ? theme.examLayout(bar, titleHtml) : theme.lessonLayout(bar, titleHtml);
    const examSpacing = lesson.exam ? ' mt-8' : '';

    const card = document.createElement('button');
    card.className = `${baseClasses} ${theme.classes}${examSpacing}`;
    card.innerHTML = layout;
    card.addEventListener('click', () => onLessonClick(lesson));
    lessonsContainer.appendChild(card);
  });

  backToDashboardBtn.onclick = onBackClick;
}

function renderTheoryCard(container, theory, onClick) {
  const card = document.createElement('button');
  card.className = 'w-full p-5 rounded-xl transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 flex items-center justify-between border relative overflow-hidden group shadow-sm bg-gradient-to-r from-primary-container/10 to-surface-container-lowest dark:from-emerald-900/10 dark:to-stone-850 border-primary/20 dark:border-stone-800 hover:border-primary/40 dark:hover:border-emerald-500/50 hover:shadow-md mb-2 transition-all duration-300';
  card.innerHTML = `
    <div class="flex items-center gap-4 pl-2">
      <div class="w-10 h-10 rounded-full bg-primary/10 dark:bg-emerald-600/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
        <span class="material-symbols-outlined text-primary dark:text-emerald-400 transition-colors duration-300" style="font-size: 22px; font-variation-settings: 'FILL' 1;">lightbulb</span>
      </div>
      <div>
        <h3 class="font-headline text-lg font-bold text-primary dark:text-emerald-400 transition-colors duration-300">${theory.title}</h3>
        <p class="font-body text-xs text-on-surface-variant dark:text-stone-400 mt-0.5 transition-colors duration-300">${theory.subtitle}</p>
      </div>
    </div>
    <span class="material-symbols-outlined text-primary/60 dark:text-emerald-400/60 group-hover:text-primary dark:group-hover:text-emerald-400 transition-colors duration-300">open_in_full</span>
  `;
  card.addEventListener('click', () => onClick(theory));
  container.appendChild(card);
}

function renderTabs(container, topic, elements, onLessonClick, onBackClick, onTheoryClick) {
  const tabs = topic.tabs || [];
  if (tabs.length === 0) return;

  const available = new Set(topic.lessons.filter(l => l.tab).map(l => l.tab));
  const visibleTabs = tabs.filter(t => available.has(t.id));

  if (visibleTabs.length === 0) return;

  if (!activeTab || !visibleTabs.find(t => t.id === activeTab)) {
    activeTab = visibleTabs[0].id;
  }

  visibleTabs.forEach(tabDef => {
    const isActive = activeTab === tabDef.id;
    const btn = document.createElement('button');
    btn.className = isActive
      ? 'px-6 py-2.5 rounded-full font-label font-bold tracking-wide transition-all bg-primary dark:bg-emerald-600 text-on-primary shadow-md cursor-pointer whitespace-nowrap outline-none transition-colors duration-300'
      : 'px-6 py-2.5 rounded-full font-label font-bold tracking-wide transition-all bg-surface-container-low dark:bg-stone-850 text-on-surface-variant dark:text-stone-400 hover:bg-surface-variant dark:hover:bg-stone-800 cursor-pointer whitespace-nowrap outline-none transition-colors duration-300';
    btn.textContent = tabDef.label;
    btn.onclick = () => {
      activeTab = tabDef.id;
      renderLessonsView(elements, topic, onLessonClick, onBackClick, onTheoryClick);
    };
    container.appendChild(btn);
  });
}

function renderLessonCards(container, topic, onLessonClick) {
  const baseClasses = 'w-full p-5 rounded-xl transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 flex items-center justify-between border dark:border-stone-800 relative overflow-hidden group shadow-sm bg-surface-container-lowest dark:bg-stone-850 transition-colors duration-300';

  topic.lessons
    .filter(l => (l.exam && !l.tab) || l.tab === activeTab)
    .forEach(lesson => {
      const status = getLessonStatus(lesson);
      const theme = LESSON_THEMES[status];

      const bar = `<div class="absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar} rounded-l-xl"></div>`;
      const title = `<h3 class="font-headline text-xl font-bold ${theme.title}">${lesson.title}</h3>`;
      const layout = lesson.exam ? theme.examLayout(bar, title) : theme.lessonLayout(bar, title);
      const examSpacing = lesson.exam ? ' mt-8' : '';

      const card = document.createElement('button');
      card.className = `${baseClasses} ${theme.classes}${examSpacing}`;
      card.innerHTML = layout;
      card.addEventListener('click', () => onLessonClick(lesson));
      container.appendChild(card);
    });
}

// ========================
// VIEW MANAGER
// ========================

export function showOnly(elements, viewName) {
  const views = {
    dashboard: elements.dashboardView,
    lessons: elements.lessonsView,
    drill: elements.drillView,
    end: elements.endScreen,
    theoryArticle: elements.theoryArticleView,
  };

  for (const [name, el] of Object.entries(views)) {
    if (!el) continue;
    el.classList.toggle('hidden', name !== viewName);
    el.style.display = name === viewName ? 'flex' : 'none';
  }

  // Toggle fixed info button — visible only during drill
  if (elements.drillInfoBtn) {
    elements.drillInfoBtn.classList.toggle('hidden', viewName !== 'drill');
  }
  // Auto-close legend when leaving drill
  if (viewName !== 'drill' && elements.drillLegendOverlay) {
    elements.drillLegendOverlay.classList.add('hidden');
  }
}

/**
 * Get/set the active home tab (for external access).
 */
export function getActiveHomeTab() {
  return activeHomeTab;
}

export function setActiveHomeTab(tab) {
  activeHomeTab = tab;
}
