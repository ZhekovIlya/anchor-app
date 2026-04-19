// ========================
// DASHBOARD + LESSONS VIEW
// ========================
// DOM rendering for the topics dashboard and in-week lessons grid.

import { getCompletionCount } from './storage.js';

let activePersonTab = 'yo';

// ========================
// STATUS THEMES
// ========================

const TOPIC_THEMES = {
  mastered: {
    card: 'group relative bg-[#fefce8] rounded-xl p-6 transition-all hover:bg-[#fef9c3] cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#fef08a] shadow-sm gap-4',
    bar: 'bg-[#ca8a04]',
    badge: `<span class="font-body text-sm font-bold text-[#ca8a04] uppercase tracking-wide">Mastered</span>
            <span class="material-symbols-outlined text-[#ca8a04] text-3xl">workspace_premium</span>`,
    numBg: 'bg-[#fef08a] text-[#ca8a04]',
    label: 'text-[#a16207]',
    title: 'text-[#854d0e]',
  },
  completed: {
    card: 'group relative bg-[#f0fdf4] rounded-xl p-6 transition-all hover:bg-[#dcfce7] cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#bbf7d0] shadow-sm gap-4',
    bar: 'bg-[#16a34a]',
    badge: `<span class="font-body text-sm font-bold text-[#16a34a] uppercase tracking-wide">Completed</span>
            <span class="material-symbols-outlined text-[#16a34a] text-3xl">check_circle</span>`,
    numBg: 'bg-[#dcfce7] text-[#16a34a]',
    label: 'text-[#15803d]',
    title: 'text-[#166534]',
  },
  progress: {
    card: 'group relative bg-surface-container-lowest rounded-xl p-6 transition-all hover:bg-surface-container-low cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline-variant/30 shadow-sm hover:border-primary/50 gap-4',
    numBg: 'bg-surface-container-high text-on-surface-variant group-hover:bg-primary-container group-hover:text-primary transition-colors',
    label: 'text-on-surface-variant',
    title: 'text-on-surface',
  },
  new: {
    card: 'group relative bg-surface-container-lowest rounded-xl p-6 transition-all hover:bg-surface-container-low cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between border border-outline-variant/30 shadow-sm hover:border-primary/50 gap-4',
    numBg: 'bg-surface-container-highest text-on-surface-variant group-hover:text-primary transition-colors',
    label: 'text-on-surface-variant',
    title: 'text-on-surface',
  },
};

const LESSON_THEMES = {
  mastered: {
    classes: 'bg-[#fefce8] border-[#fef08a] hover:bg-[#fef9c3] hover:border-[#ca8a04]',
    bar: 'bg-[#ca8a04]',
    icon: `<span class="material-symbols-outlined text-[#ca8a04] text-3xl hidden sm:block">workspace_premium</span>`,
    examIcon: `<span class="material-symbols-outlined text-[#ca8a04] text-2xl">workspace_premium</span>`,
    title: 'text-[#854d0e]',
  },
  completed: {
    classes: 'bg-[#f0fdf4] border-[#bbf7d0] hover:bg-[#dcfce7] hover:border-[#16a34a]',
    bar: 'bg-[#16a34a]',
    icon: `<span class="material-symbols-outlined text-[#16a34a] text-3xl hidden sm:block">check_circle</span>`,
    examIcon: `<span class="material-symbols-outlined text-[#16a34a] text-2xl">workspace_premium</span>`,
    title: 'text-[#166534]',
  },
  new: {
    classes: 'border-outline-variant/50 hover:bg-surface-container-low hover:border-primary/50',
    bar: 'bg-primary opacity-0 group-hover:opacity-100 transition-opacity',
    icon: `<span class="material-symbols-outlined text-primary text-3xl opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">arrow_forward</span>`,
    examIcon: `<span class="material-symbols-outlined text-on-surface-variant text-2xl group-hover:text-primary transition-colors">workspace_premium</span>`,
    title: 'text-on-surface group-hover:text-primary transition-colors',
  },
};

// ========================
// STATUS HELPERS
// ========================

function getTopicStatus(topic) {
  const examLesson = topic.lessons.find(l => l.exam);
  const examCompletions = examLesson ? getCompletionCount(examLesson.id) : 0;
  if (examCompletions >= 5) return 'mastered';

  const total = topic.lessons.length;
  const completed = topic.lessons.filter(l => getCompletionCount(l.id) >= 1).length;
  if (total > 0 && completed === total) return 'completed';

  const started = topic.lessons.filter(l => getCompletionCount(l.id) > 0).length;
  if (started > 0) return 'progress';

  return 'new';
}

function getLessonStatus(lesson) {
  const count = getCompletionCount(lesson.id);
  if (count >= 3) return 'mastered';
  if (count >= 1) return 'completed';
  return 'new';
}

// ========================
// RENDER FUNCTIONS
// ========================

/**
 * Render the main topics dashboard.
 */
export function renderDashboard(elements, topics, srs, phraseBank, onTopicClick, onReviewClick) {
  const { topicsContainer } = elements;

  showOnly(elements, 'dashboard');
  topicsContainer.innerHTML = '';

  // Daily Review Hero Card
  const reviewSection = document.getElementById('reviewSection');
  const dueCountText = document.getElementById('dueCountText');
  const startReviewBtn = document.getElementById('startReviewBtn');
  const dueCount = srs.getDueCount(phraseBank);

  reviewSection.style.display = dueCount > 0 ? 'block' : 'none';
  if (dueCount > 0) {
    dueCountText.textContent = `${dueCount} ready for review. Consistent practice builds lasting fluency.`;
    startReviewBtn.onclick = onReviewClick;
  }

  topics.forEach((topic, index) => {
    const weekNumber = index + 1;
    const status = getTopicStatus(topic);
    const theme = TOPIC_THEMES[status];

    let cleanTitle = topic.title.replace(/^Week\s*\d+\s*[:-]?\s*/i, '').trim() || topic.title;

    const total = topic.lessons.length;
    const completed = topic.lessons.filter(l => getCompletionCount(l.id) >= 1).length;
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

    const topicBtn = document.createElement('div');
    topicBtn.className = theme.card;

    const leftCol = `
      <div class="flex items-center gap-4 sm:gap-6 pl-${status === 'progress' ? 2 : 4} w-full sm:w-auto">
        <div class="w-12 h-12 rounded-xl ${theme.numBg} hidden sm:flex items-center justify-center flex-shrink-0">
          <span class="font-headline text-xl font-bold">${weekNumber}</span>
        </div>
        <div class="w-full sm:w-auto overflow-hidden">
          <div class="font-label text-xs ${theme.label} tracking-wider uppercase mb-1">Week ${weekNumber}</div>
          <h3 class="font-headline text-2xl ${theme.title} break-words line-clamp-2">${cleanTitle}</h3>
        </div>
      </div>`;

    let rightCol;
    if (status === 'progress') {
      rightCol = `
        <div class="flex items-center gap-4 w-full sm:w-48 pr-2">
          <div class="flex-grow bg-surface-variant rounded-full h-1.5 overflow-hidden">
            <div class="bg-primary h-1.5 rounded-full transition-all duration-300" style="width: ${progressPercent}%"></div>
          </div>
          <span class="font-body text-sm font-medium text-primary min-w-[32px] text-right">${progressPercent}%</span>
        </div>`;
    } else if (status === 'new') {
      rightCol = `
        <div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start opacity-0 group-hover:opacity-100 transition-opacity">
          <span class="font-label text-sm font-bold text-primary tracking-wide hidden sm:block">START</span>
          <span class="material-symbols-outlined text-primary text-3xl sm:hidden">arrow_forward</span>
        </div>`;
    } else {
      rightCol = `<div class="flex items-center gap-3 w-full sm:w-auto pr-2 justify-end sm:justify-start">${theme.badge}</div>`;
    }

    const barHtml = theme.bar
      ? `<div class="absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar} rounded-l-xl"></div>`
      : '';

    topicBtn.innerHTML = barHtml + leftCol + rightCol;
    topicBtn.addEventListener('click', () => onTopicClick(topic));
    topicsContainer.appendChild(topicBtn);
  });
}

/**
 * Render the in-week lessons grid with tabs for Personas.
 */
export function renderLessonsView(elements, topic, onLessonClick, onBackClick) {
  const { lessonsViewTitle, lessonsContainer, backToDashboardBtn } = elements;
  const personTabsContainer = document.getElementById('personTabsContainer');

  showOnly(elements, 'lessons');
  lessonsViewTitle.textContent = topic.title;
  personTabsContainer.innerHTML = '';

  // Fade-in animation via paint-cycle flush
  lessonsContainer.classList.remove('transition-all', 'duration-300', 'opacity-100', 'scale-100');
  lessonsContainer.classList.add('opacity-0', 'scale-95');
  lessonsContainer.innerHTML = '';

  requestAnimationFrame(() => {
    lessonsContainer.classList.remove('opacity-0', 'scale-95');
    lessonsContainer.classList.add('transition-all', 'duration-300', 'opacity-100', 'scale-100');
  });

  // 1. Persona tabs
  const personaMap = {
    'yo': 'Yo',
    'tu': 'Tú',
    'el_ella_usted': 'Él / Ella / Usted',
    'nosotros': 'Nosotros',
    'ellos_ellas_ustedes': 'Ellos / Ustedes',
  };

  const availablePersons = [...new Set(topic.lessons.filter(l => l.person).map(l => l.person))];
  const sortedPersons = Object.keys(personaMap).filter(p => availablePersons.includes(p));

  if (!sortedPersons.includes(activePersonTab) && sortedPersons.length > 0) {
    activePersonTab = sortedPersons[0];
  }

  if (sortedPersons.length > 0) {
    sortedPersons.forEach(pId => {
      const isActive = activePersonTab === pId;
      const tabBtn = document.createElement('button');
      tabBtn.className = isActive
        ? 'px-6 py-2.5 rounded-full font-label font-bold tracking-wide transition-all bg-primary text-on-primary shadow-md cursor-pointer whitespace-nowrap outline-none'
        : 'px-6 py-2.5 rounded-full font-label font-bold tracking-wide transition-all bg-surface-container-low text-on-surface-variant hover:bg-surface-variant cursor-pointer whitespace-nowrap outline-none';
      tabBtn.textContent = personaMap[pId];
      tabBtn.onclick = () => {
        activePersonTab = pId;
        renderLessonsView(elements, topic, onLessonClick, onBackClick);
      };
      personTabsContainer.appendChild(tabBtn);
    });
  }

  // 2. Lessons (filtered by tab or exam)
  const baseClasses = 'w-full p-5 rounded-xl transition-all cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-between border relative overflow-hidden group shadow-sm bg-surface-container-lowest';

  topic.lessons
    .filter(l => l.exam || l.person === activePersonTab)
    .forEach(lesson => {
      const status = getLessonStatus(lesson);
      const theme = LESSON_THEMES[status];
      const examMt = lesson.exam ? ' mt-8' : '';

      const lessonBtn = document.createElement('button');
      lessonBtn.className = `${baseClasses} ${theme.classes}${examMt}`;

      const titleHtml = `<h3 class="font-headline text-xl font-bold ${theme.title}">${lesson.title}</h3>`;
      const barHtml = `<div class="absolute left-0 top-0 bottom-0 w-1.5 ${theme.bar} rounded-l-xl"></div>`;

      if (lesson.exam) {
        lessonBtn.innerHTML = `
          ${barHtml}
          <div class="flex items-center gap-4 pl-2 sm:pl-4 w-full justify-between">
            <div class="flex items-center gap-3">
              ${theme.examIcon}
              ${titleHtml}
            </div>
            ${theme.icon}
          </div>`;
      } else {
        lessonBtn.innerHTML = `
          ${barHtml}
          <div class="flex items-center gap-4 pl-4 w-full justify-between">
            ${titleHtml}
            ${theme.icon}
          </div>`;
      }

      lessonBtn.addEventListener('click', () => onLessonClick(lesson));
      lessonsContainer.appendChild(lessonBtn);
    });

  backToDashboardBtn.onclick = onBackClick;
}

/**
 * Show only the specified view, hide all others.
 */
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
}
