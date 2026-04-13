// ========================
// DASHBOARD + LESSONS VIEW
// ========================
// DOM rendering for the topics dashboard and in-week lessons grid.

import { getCompletionCount } from './storage.js';

/**
 * Render the main topics dashboard.
 * @param {Object} elements - DOM element refs
 * @param {Array}  topics   - All topic data
 * @param {Object} srs      - SRS engine instance
 * @param {Object} phraseBank - Global phrase bank for SRS due count
 * @param {Function} onTopicClick  - Called with (topic) when a topic card is clicked
 * @param {Function} onReviewClick - Called when Daily Review is clicked
 */
export function renderDashboard(elements, topics, srs, phraseBank, onTopicClick, onReviewClick) {
  const { dashboardView, topicsContainer, lessonsView, drillView, endScreen } = elements;

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
 * Render the in-week lessons grid (5 columns).
 * @param {Object}   elements       - DOM element refs
 * @param {Object}   topic          - The active topic
 * @param {Function} onLessonClick  - Called with (lesson) when a lesson card is clicked
 * @param {Function} onBackClick    - Called when "Back to Topics" is clicked
 */
export function renderLessonsView(elements, topic, onLessonClick, onBackClick) {
  const { lessonsViewTitle, lessonsContainer, backToDashboardBtn } = elements;

  showOnly(elements, 'lessons');

  lessonsViewTitle.textContent = topic.title;
  lessonsContainer.innerHTML = '';

  topic.lessons.forEach(lesson => {
    const timesFinished = getCompletionCount(lesson.id);
    const lessonBtn = document.createElement('button');

    const baseClasses = 'text-left p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-1 cursor-pointer';
    
    if (timesFinished > 0) {
      lessonBtn.className = `${baseClasses} bg-green-100 border-2 border-green-300 hover:border-green-400`;
      if (lesson.exam) lessonBtn.classList.add('col-span-1', 'md:col-span-5');
    } else if (lesson.exam) {
      lessonBtn.className = `${baseClasses} bg-yellow-50 border-2 border-yellow-400 hover:border-yellow-500 col-span-1 md:col-span-5`;
    } else {
      lessonBtn.className = `${baseClasses} bg-white border border-gray-100 hover:border-blue-400`;
    }

    const lessonTitle = document.createElement('span');
    if (timesFinished > 0) {
      lessonTitle.className = 'text-xl font-bold text-green-800';
    } else if (lesson.exam) {
      lessonTitle.className = 'text-lg font-bold text-yellow-700';
    } else {
      lessonTitle.className = 'text-lg font-semibold text-gray-700';
    }
    lessonTitle.textContent = lesson.title;
    lessonBtn.appendChild(lessonTitle);

    const phraseCount = document.createElement('span');
    phraseCount.className = timesFinished > 0 ? 'text-sm text-green-700 flex items-center gap-2 mt-1' : 'text-sm text-gray-400';

    let phraseTotal = lesson.exam
      ? topic.lessons.filter(l => !l.exam).reduce((sum, l) => sum + l.phrases.length, 0)
      : lesson.phrases.length;
    let subtitle = `${phraseTotal} phrases` + (lesson.exam ? ' • Streak: 50' : '');
    
    if (timesFinished > 0) {
      phraseCount.innerHTML = `<span>${subtitle}</span> <span class="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-200">✓ Completed ${timesFinished} time${timesFinished > 1 ? 's' : ''}</span>`;
    } else {
      phraseCount.textContent = subtitle;
    }

    lessonBtn.appendChild(phraseCount);
    lessonBtn.addEventListener('click', () => onLessonClick(lesson));
    lessonsContainer.appendChild(lessonBtn);
  });

  // Rebind back button
  backToDashboardBtn.onclick = onBackClick;
}

/**
 * Show only the specified view, hide all others.
 * @param {Object} elements - DOM element refs
 * @param {'dashboard'|'lessons'|'drill'|'end'} viewName
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
