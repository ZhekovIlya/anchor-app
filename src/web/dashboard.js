// ========================
// DASHBOARD + LESSONS VIEW
// ========================
// DOM rendering for the topics dashboard and in-week lessons grid.

import { getCompletionCount } from './storage.js';

let activePersonTab = 'yo';

/**
 * Render the main topics dashboard.
 */
export function renderDashboard(elements, topics, srs, phraseBank, onTopicClick, onReviewClick) {
  const { elements: elRefs, topicsContainer } = elements;
  
  showOnly(elements, 'dashboard');
  topicsContainer.innerHTML = '';

  // Daily Review Card
  const dueCount = srs.getDueCount(phraseBank);
  if (dueCount > 0) {
    const reviewBtn = document.createElement('button');
    reviewBtn.className = 'text-left bg-purple-50 border-2 border-purple-400 hover:border-purple-500 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col gap-2 cursor-pointer w-full';

    const reviewTitle = document.createElement('h2');
    reviewTitle.className = 'text-2xl font-bold text-purple-700';
    reviewTitle.textContent = '📖 Daily Review';
    reviewBtn.appendChild(reviewTitle);

    const reviewDesc = document.createElement('p');
    reviewDesc.className = 'text-purple-500 font-medium';
    reviewDesc.textContent = `${dueCount} phrases due for review`;
    reviewBtn.appendChild(reviewDesc);

    reviewBtn.addEventListener('click', onReviewClick);
    topicsContainer.appendChild(reviewBtn);
  }

  // Topic cards
  topics.forEach(topic => {
    const topicBtn = document.createElement('button');
    topicBtn.className = 'text-left bg-white border border-gray-200 hover:border-blue-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2 cursor-pointer';

    const titleEl = document.createElement('h2');
    titleEl.className = 'text-2xl font-bold text-gray-800';
    titleEl.textContent = topic.title;
    topicBtn.appendChild(titleEl);

    if (topic.description) {
      const descEl = document.createElement('p');
      descEl.className = 'text-gray-500';
      descEl.textContent = topic.description;
      topicBtn.appendChild(descEl);
    }

    topicBtn.addEventListener('click', () => onTopicClick(topic));
    topicsContainer.appendChild(topicBtn);
  });
}

/**
 * Render the in-week lessons grid with tabs for Personas.
 */
export function renderLessonsView(elements, topic, onLessonClick, onBackClick) {
  const { lessonsViewTitle, lessonsContainer, backToDashboardBtn } = elements;

  showOnly(elements, 'lessons');
  lessonsViewTitle.textContent = topic.title;
  lessonsContainer.innerHTML = '';

  // 1. Identify valid persona tabs
  const personaMap = {
    'yo': 'Yo',
    'tu': 'Tú',
    'el_ella_usted': 'Él / Ella / Usted',
    'nosotros': 'Nosotros',
    'ellos_ellas_ustedes': 'Ellos / Ustedes'
  };

  const availablePersons = [...new Set(topic.lessons.filter(l => l.person).map(l => l.person))];
  const sortedPersons = Object.keys(personaMap).filter(p => availablePersons.includes(p));

  // Ensure active tab is valid for this topic
  if (!sortedPersons.includes(activePersonTab) && sortedPersons.length > 0) {
    activePersonTab = sortedPersons[0];
  }

  // 2. Render Tab Bar if person tags exist
  if (sortedPersons.length > 0) {
    const tabBar = document.createElement('div');
    tabBar.className = 'col-span-1 md:col-span-5 flex flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4';
    
    sortedPersons.forEach(pId => {
      const tabBtn = document.createElement('button');
      const isActive = activePersonTab === pId;
      
      tabBtn.className = `px-6 py-2 rounded-full font-bold transition-all cursor-pointer ${
        isActive 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`;
      tabBtn.textContent = personaMap[pId];
      tabBtn.onclick = () => {
        activePersonTab = pId;
        renderLessonsView(elements, topic, onLessonClick, onBackClick);
      };
      tabBar.appendChild(tabBtn);
    });
    
    lessonsContainer.appendChild(tabBar);
  }

  // 3. Render Lessons (Filtered by Tab or Exam)
  const filteredLessons = topic.lessons.filter(l => l.exam || l.person === activePersonTab);

  filteredLessons.forEach(lesson => {
    const timesFinished = getCompletionCount(lesson.id);
    const lessonBtn = document.createElement('button');

    const baseClasses = 'text-left p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col gap-2 cursor-pointer border';
    
    if (timesFinished > 0) {
      lessonBtn.className = `${baseClasses} bg-green-50 border-green-200 hover:border-green-300`;
      if (lesson.exam) lessonBtn.classList.add('col-span-1', 'md:col-span-5', 'mt-8', 'bg-gradient-to-r', 'from-yellow-50', 'to-orange-50', 'border-yellow-200');
    } else if (lesson.exam) {
      lessonBtn.className = `${baseClasses} bg-white border-dashed border-gray-300 hover:border-yellow-400 col-span-1 md:col-span-5 mt-8 opacity-75`;
    } else {
      lessonBtn.className = `${baseClasses} bg-white border-gray-100 hover:border-blue-300`;
    }

    const lessonTitle = document.createElement('span');
    if (timesFinished > 0) {
      lessonTitle.className = 'text-xl font-bold text-green-900';
    } else if (lesson.exam) {
      lessonTitle.className = 'text-xl font-bold text-gray-500';
    } else {
      lessonTitle.className = 'text-xl font-bold text-gray-800';
    }
    lessonTitle.textContent = lesson.title;
    lessonBtn.appendChild(lessonTitle);

    const phraseCount = document.createElement('div');
    phraseCount.className = 'flex flex-wrap items-center gap-2 mt-1';

    let phraseTotal = lesson.exam
      ? topic.lessons.filter(l => !l.exam).reduce((sum, l) => sum + l.phrases.length, 0)
      : lesson.phrases.length;
    
    const countPill = document.createElement('span');
    countPill.className = 'text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full';
    countPill.textContent = `${phraseTotal} phrases` + (lesson.exam ? ' • 🏆 Exam' : '');
    phraseCount.appendChild(countPill);

    if (timesFinished > 0) {
      const completionPill = document.createElement('span');
      completionPill.className = 'bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full border border-green-200';
      completionPill.textContent = `Completed ${timesFinished} time${timesFinished > 1 ? 's' : ''}`;
      phraseCount.appendChild(completionPill);
    }

    lessonBtn.appendChild(phraseCount);
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
    if (name === viewName) {
      el.classList.remove('hidden');
      el.style.display = 'flex';
    } else {
      el.classList.add('hidden');
      el.style.display = 'none';
    }
  }
}
