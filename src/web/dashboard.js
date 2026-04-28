// ========================
// DASHBOARD + LESSONS VIEW
// ========================
// DOM rendering for the topics dashboard and in-week lessons grid.

import { getCompletionCount } from './storage.js';

let activeTab = null;

// ========================
// STATUS THEMES
// ========================

const GOLD = {
  bar: 'bg-[#ca8a04]',
  label: 'text-[#a16207]',
  title: 'text-[#854d0e]',
};

const GREEN = {
  bar: 'bg-[#16a34a]',
  label: 'text-[#15803d]',
  title: 'text-[#166534]',
};

const TOPIC_THEMES = {
  mastered: {
    card: 'group relative bg-[#fefce8] rounded-xl p-6 transition-all hover:bg-[#fef9c3] cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#fef08a] shadow-sm gap-4',
    bar: GOLD.bar,
    numBg: 'bg-[#fef08a] text-[#ca8a04]',
    label: GOLD.label,
    title: GOLD.title,
    rightCol: () => `
      <div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start">
        <span class="font-body text-sm font-bold text-[#ca8a04] uppercase tracking-wide">Mastered</span>
        <span class="material-symbols-outlined text-[#ca8a04] text-3xl">workspace_premium</span>
      </div>`,
  },
  completed: {
    card: 'group relative bg-[#f0fdf4] rounded-xl p-6 transition-all hover:bg-[#dcfce7] cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#bbf7d0] shadow-sm gap-4',
    bar: GREEN.bar,
    numBg: 'bg-[#dcfce7] text-[#16a34a]',
    label: GREEN.label,
    title: GREEN.title,
    rightCol: () => `
      <div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start">
        <span class="font-body text-sm font-bold text-[#16a34a] uppercase tracking-wide">Completed</span>
        <span class="material-symbols-outlined text-[#16a34a] text-3xl">check_circle</span>
      </div>`,
  },
  progress: {
    card: 'group relative bg-surface-container-lowest rounded-xl p-6 transition-all hover:bg-surface-container-low cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline-variant/30 shadow-sm hover:border-primary/50 gap-4',
    numBg: 'bg-surface-container-high text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary transition-colors',
    label: 'text-on-surface-variant',
    title: 'text-on-surface',
    rightCol: (progressPercent) => `
      <div class="flex items-center gap-4 w-full sm:w-48 pr-2">
        <div class="flex-grow bg-surface-variant rounded-full h-1.5 overflow-hidden">
          <div class="bg-primary h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
        </div>
        <span class="font-body text-sm font-medium text-primary min-w-[32px] text-right">${progressPercent}%</span>
      </div>`,
  },
  new: {
    card: 'group relative bg-surface-container-lowest rounded-xl p-6 transition-all hover:bg-surface-container-low cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline-variant/30 shadow-sm hover:border-primary/50 gap-4',
    numBg: 'bg-surface-container-highest text-on-surface-variant group-hover:text-primary transition-colors',
    label: 'text-on-surface-variant',
    title: 'text-on-surface',
    rightCol: () => `
      <div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start opacity-0 group-hover:opacity-100 transition-opacity">
        <span class="font-label text-sm font-bold text-primary tracking-wide hidden sm:block">START</span>
        <span class="material-symbols-outlined text-primary text-3xl sm:hidden">arrow_forward</span>
      </div>`,
  },
};

const LESSON_THEMES = {
  mastered: {
    classes: 'bg-[#fefce8] border-[#fef08a] hover:bg-[#fef9c3] hover:border-[#ca8a04]',
    bar: GOLD.bar,
    title: GOLD.title,
    lessonLayout: (bar, title) => `
      ${bar}
      <div class="flex items-center gap-4 pl-4 w-full justify-between">
        ${title}
        <span class="material-symbols-outlined text-[#ca8a04] text-3xl hidden sm:block">workspace_premium</span>
      </div>`,
    examLayout: (bar, title) => `
      ${bar}
      <div class="flex items-center gap-4 pl-2 sm:pl-4 w-full justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-[#ca8a04] text-2xl">workspace_premium</span>
          ${title}
        </div>
        <span class="material-symbols-outlined text-[#ca8a04] text-3xl hidden sm:block">workspace_premium</span>
      </div>`,
  },
  completed: {
    classes: 'bg-[#f0fdf4] border-[#bbf7d0] hover:bg-[#dcfce7] hover:border-[#16a34a]',
    bar: GREEN.bar,
    title: GREEN.title,
    lessonLayout: (bar, title) => `
      ${bar}
      <div class="flex items-center gap-4 pl-4 w-full justify-between">
        ${title}
        <span class="material-symbols-outlined text-[#16a34a] text-3xl hidden sm:block">check_circle</span>
      </div>`,
    examLayout: (bar, title) => `
      ${bar}
      <div class="flex items-center gap-4 pl-2 sm:pl-4 w-full justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-[#16a34a] text-2xl">workspace_premium</span>
          ${title}
        </div>
        <span class="material-symbols-outlined text-[#16a34a] text-3xl hidden sm:block">check_circle</span>
      </div>`,
  },
  new: {
    classes: 'border-outline-variant/50 hover:bg-surface-container-low hover:border-primary/50',
    bar: 'bg-primary opacity-0 group-hover:opacity-100 transition-opacity',
    title: 'text-on-surface group-hover:text-primary transition-colors',
    lessonLayout: (bar, title) => `
      ${bar}
      <div class="flex items-center gap-4 pl-4 w-full justify-between">
        ${title}
        <span class="material-symbols-outlined text-primary text-3xl opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">arrow_forward</span>
      </div>`,
    examLayout: (bar, title) => `
      ${bar}
      <div class="flex items-center gap-4 pl-2 sm:pl-4 w-full justify-between">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-on-surface-variant text-2xl group-hover:text-primary transition-colors">workspace_premium</span>
          ${title}
        </div>
        <span class="material-symbols-outlined text-primary text-3xl opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">arrow_forward</span>
      </div>`,
  },
};

// ========================
// STATUS HELPERS
// ========================

export const EXAM_MASTERED_THRESHOLD = 5;
export const LESSON_MASTERED_THRESHOLD = 3;

function getTopicStatus(topic) {
  const examLesson = topic.lessons.find(l => l.exam);
  const examCompletions = examLesson ? getCompletionCount(examLesson.id) : 0;
  if (examCompletions >= EXAM_MASTERED_THRESHOLD) return 'mastered';

  const total = topic.lessons.length;
  const completedCount = topic.lessons.filter(l => getCompletionCount(l.id) >= 1).length;
  if (total > 0 && completedCount === total) return 'completed';

  const startedCount = topic.lessons.filter(l => getCompletionCount(l.id) > 0).length;
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
// RENDER FUNCTIONS
// ========================

export function renderDashboard(elements, topics, srs, phraseBank, onTopicClick, onReviewClick) {
  const { topicsContainer } = elements;

  showOnly(elements, 'dashboard');
  topicsContainer.innerHTML = '';

  const dueCount = srs.getDueCount(phraseBank);
  const reviewSection = document.getElementById('reviewSection');
  reviewSection.style.display = dueCount > 0 ? 'block' : 'none';

  if (dueCount > 0) {
    document.getElementById('dueCountText').textContent =
      `${dueCount} ready for review. Consistent practice builds lasting fluency.`;
    document.getElementById('startReviewBtn').onclick = onReviewClick;
  }

  topics.forEach((topic, index) => {
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
    topicsContainer.appendChild(topicBtn);
  });
}

export function renderLessonsView(elements, topic, onLessonClick, onBackClick) {
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

  renderTabs(personTabsContainer, topic, elements, onLessonClick, onBackClick);
  renderLessonCards(lessonsContainer, topic, onLessonClick);

  backToDashboardBtn.onclick = onBackClick;
}

function renderTabs(container, topic, elements, onLessonClick, onBackClick) {
  const tabs = topic.tabs || [];
  if (tabs.length === 0) return;

  // Filter to only tabs that have at least one lesson
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
      ? 'px-6 py-2.5 rounded-full font-label font-bold tracking-wide transition-all bg-primary text-on-primary shadow-md cursor-pointer whitespace-nowrap outline-none'
      : 'px-6 py-2.5 rounded-full font-label font-bold tracking-wide transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-variant cursor-pointer whitespace-nowrap outline-none';
    btn.textContent = tabDef.label;
    btn.onclick = () => {
      activeTab = tabDef.id;
      renderLessonsView(elements, topic, onLessonClick, onBackClick);
    };
    container.appendChild(btn);
  });
}

function renderLessonCards(container, topic, onLessonClick) {
  const baseClasses = 'w-full p-5 rounded-xl transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between border relative overflow-hidden group shadow-sm bg-surface-container-lowest';

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

export function showOnly(elements, viewName) {
  const views = {
    dashboard: elements.dashboardView,
    lessons: elements.lessonsView,
    drill: elements.drillView,
    end: elements.endScreen,
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
