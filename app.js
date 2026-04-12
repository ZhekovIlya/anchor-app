// DOM Elements
const dashboardView = document.getElementById('dashboardView');
const topicsContainer = document.getElementById('topicsContainer');
const lessonsView = document.getElementById('lessonsView');
const lessonsContainer = document.getElementById('lessonsContainer');
const lessonsViewTitle = document.getElementById('lessonsViewTitle');
const backToDashboardBtn = document.getElementById('backToDashboardBtn');
const drillView = document.getElementById('drillView');
const endScreen = document.getElementById('endScreen');

const inputField = document.getElementById('strictInput');
const fakeInput = document.getElementById('fakeInput');
const streakCounter = document.getElementById('streakCounter');
const russianPrompt = document.getElementById('russianPrompt');
const ghostText = document.getElementById('ghostText');
const revealAnswerBtn = document.getElementById('revealAnswerBtn');
const quitDrillBtn = document.getElementById('quitDrillBtn');
const restartBtn = document.getElementById('restartBtn');
const dashboardReturnBtn = document.getElementById('dashboardReturnBtn');

// State
let topics = window.AnchorData || [];
let activeTopic = null;
let activeLesson = null;
let currentPhrase = null;
let phrases = [];
let drawingDeck = [];
let streak = 0;
let initialTargetStreak = 0;
let targetStreak = 24;
let failedPhrases = [];

const colorMap = {
  subject: "text-blue-500",
  negation: "text-yellow-500",
  verb: "text-red-500",
  object: "text-green-500",
  space: ""
};

// ========================
// SRS ENGINE (Leitner Buckets)
// ========================

const SRS_KEY = 'srs_data';
const BUCKET_INTERVALS = [
  12 * 60 * 60 * 1000,   // Bucket 0: 12 hours
  24 * 60 * 60 * 1000,   // Bucket 1: 1 day
  3 * 24 * 60 * 60 * 1000, // Bucket 2: 3 days
  7 * 24 * 60 * 60 * 1000, // Bucket 3: 1 week
  14 * 24 * 60 * 60 * 1000 // Bucket 4: 2 weeks
];

let globalPhraseBank = {}; // meta.id -> phrase object
let isReviewMode = false;

function buildGlobalPhraseBank() {
  globalPhraseBank = {};
  topics.forEach(topic => {
    if (topic.legacy) return;
    topic.lessons.forEach(lesson => {
      if (lesson.exam) return;
      lesson.phrases.forEach(phrase => {
        if (phrase.meta && phrase.meta.id) {
          globalPhraseBank[phrase.meta.id] = phrase;
        }
      });
    });
  });
}

function loadSrsData() {
  try {
    return JSON.parse(localStorage.getItem(SRS_KEY) || '{}');
  } catch (e) { return {}; }
}

function saveSrsData(data) {
  localStorage.setItem(SRS_KEY, JSON.stringify(data));
}

function srsPromote(phraseId) {
  const data = loadSrsData();
  const entry = data[phraseId] || { bucket: 0, dueDate: 0 };
  const newBucket = Math.min(entry.bucket + 1, BUCKET_INTERVALS.length - 1);
  data[phraseId] = {
    bucket: newBucket,
    dueDate: Date.now() + BUCKET_INTERVALS[newBucket]
  };
  saveSrsData(data);
}

function srsDemote(phraseId) {
  const data = loadSrsData();
  data[phraseId] = {
    bucket: 0,
    dueDate: Date.now() + BUCKET_INTERVALS[0]
  };
  saveSrsData(data);
}

function srsRegisterNew(phraseId) {
  const data = loadSrsData();
  if (!data[phraseId]) {
    data[phraseId] = {
      bucket: 0,
      dueDate: Date.now() + BUCKET_INTERVALS[1] // due in 1 day
    };
    saveSrsData(data);
  }
}

function getDueReviewPhrases() {
  const data = loadSrsData();
  const now = Date.now();
  const due = [];
  for (const [id, entry] of Object.entries(data)) {
    if (entry.dueDate <= now && globalPhraseBank[id]) {
      due.push(globalPhraseBank[id]);
    }
  }
  return due.sort(() => Math.random() - 0.5);
}

function getDueCount() {
  const data = loadSrsData();
  const now = Date.now();
  let count = 0;
  for (const [id, entry] of Object.entries(data)) {
    if (entry.dueDate <= now && globalPhraseBank[id]) count++;
  }
  return count;
}

// ========================
// DASHBOARD LOGIC
// ========================

function initDashboard() {
  dashboardView.classList.remove('hidden');
  dashboardView.style.display = 'flex';
  lessonsView.classList.add('hidden');
  lessonsView.style.display = 'none';
  drillView.classList.add('hidden');
  drillView.style.display = 'none';
  endScreen.classList.add('hidden');
  endScreen.style.display = 'none';
  isReviewMode = false;

  topicsContainer.innerHTML = '';

  // Daily Review Card
  const dueCount = getDueCount();
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

    reviewBtn.addEventListener('click', startReviewDrill);
    topicsContainer.appendChild(reviewBtn);
  }

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

    topicBtn.addEventListener('click', () => showLessonsView(topic));
    topicsContainer.appendChild(topicBtn);
  });
}

function startReviewDrill() {
  const duePhrases = getDueReviewPhrases();
  if (duePhrases.length === 0) return;

  isReviewMode = true;
  activeTopic = null;
  activeLesson = { id: 'daily_review', title: 'Daily Review', exam: false };
  phrases = duePhrases;

  dashboardView.classList.add('hidden');
  dashboardView.style.display = 'none';
  lessonsView.classList.add('hidden');
  lessonsView.style.display = 'none';
  drillView.classList.remove('hidden');
  drillView.style.display = 'flex';
  endScreen.classList.add('hidden');
  endScreen.style.display = 'none';

  streak = 0;
  targetStreak = Math.min(duePhrases.length, 24);
  initialTargetStreak = targetStreak;
  failedPhrases = [];
  drawingDeck = [];
  updateStreakDisplay();

  nextPhrase();
  inputField.focus();
}

function showLessonsView(topic) {
  activeTopic = topic;
  dashboardView.classList.add('hidden');
  dashboardView.style.display = 'none';
  lessonsView.classList.remove('hidden');
  lessonsView.style.display = 'flex';
  drillView.classList.add('hidden');
  drillView.style.display = 'none';
  endScreen.classList.add('hidden');
  endScreen.style.display = 'none';

  lessonsViewTitle.textContent = topic.title;
  lessonsContainer.innerHTML = '';

  topic.lessons.forEach(lesson => {
    const timesFinished = parseInt(localStorage.getItem(lesson.id) || "0", 10);

    const lessonBtn = document.createElement('button');

    if (lesson.exam) {
      lessonBtn.className = 'text-left bg-yellow-50 border-2 border-yellow-400 hover:border-yellow-500 p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col gap-1 cursor-pointer col-span-1 md:col-span-5';
    } else {
      lessonBtn.className = 'text-left bg-white border border-gray-100 hover:border-blue-400 p-4 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col gap-1 cursor-pointer';
    }

    const lessonTitle = document.createElement('span');
    lessonTitle.className = lesson.exam ? 'text-lg font-bold text-yellow-700' : 'text-lg font-semibold text-gray-700';
    lessonTitle.textContent = lesson.title;
    lessonBtn.appendChild(lessonTitle);

    const phraseCount = document.createElement('span');
    phraseCount.className = 'text-sm text-gray-400';

    let phraseTotal = lesson.exam
      ? topic.lessons.filter(l => !l.exam).reduce((sum, l) => sum + l.phrases.length, 0)
      : lesson.phrases.length;
    let subtitle = `${phraseTotal} phrases` + (lesson.exam ? ' • Streak: 50' : '');
    if (timesFinished > 0) {
      subtitle += ` • Completed: ${timesFinished} times`;
      if (!lesson.exam) lessonBtn.classList.add('border-green-100', 'bg-green-50/30');
    }
    phraseCount.textContent = subtitle;

    lessonBtn.appendChild(phraseCount);

    lessonBtn.addEventListener('click', () => startLesson(lesson));
    lessonsContainer.appendChild(lessonBtn);
  });
}

// ========================
// DRILL LOGIC
// ========================

function startLesson(lesson) {
  activeLesson = lesson;

  // Final Exam: auto-populate from sibling lessons
  if (lesson.exam) {
    const siblingPhrases = [];
    activeTopic.lessons.forEach(l => {
      if (!l.exam && l.phrases) {
        siblingPhrases.push(...l.phrases);
      }
    });
    phrases = siblingPhrases.sort(() => Math.random() - 0.5);
  } else {
    phrases = lesson.phrases;
  }

  lessonsView.classList.add('hidden');
  lessonsView.style.display = 'none';
  drillView.classList.remove('hidden');
  drillView.style.display = 'flex';
  endScreen.classList.add('hidden');
  endScreen.style.display = 'none';

  streak = 0;
  targetStreak = lesson.exam ? 50 : 24;
  initialTargetStreak = targetStreak;
  failedPhrases = [];
  drawingDeck = [];
  updateStreakDisplay();

  nextPhrase();
  inputField.focus();
}

function updateStreakDisplay() {
  streakCounter.textContent = `${streak} / ${targetStreak}`;
}

function nextPhrase() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  if (streak >= initialTargetStreak && failedPhrases.length > 0) {
    currentPhrase = failedPhrases.shift();
  } else {
    if (drawingDeck.length === 0) {
      drawingDeck = [...phrases].sort(() => Math.random() - 0.5);
    }
    currentPhrase = drawingDeck.pop();
  }

  russianPrompt.textContent = currentPhrase.ru;
  ghostText.textContent = currentPhrase.es;

  const isExam = activeLesson && activeLesson.exam;
  const isCopyStage = !isExam && streak < 12;

  if (isCopyStage) {
    ghostText.classList.remove('opacity-0');
    ghostText.classList.add('opacity-100');
    revealAnswerBtn.classList.add('hidden');
  } else {
    ghostText.classList.remove('opacity-100');
    ghostText.classList.add('opacity-0');
    revealAnswerBtn.classList.remove('hidden');
  }

  resetInput();

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(currentPhrase.ru);
    utterance.lang = 'ru-RU';
    window.speechSynthesis.speak(utterance);
  }
}

function resetInput() {
  inputField.value = '';
  renderFakeInput('');
}

function renderFakeInput(userInput) {
  let html = "";
  let remainingInput = userInput;

  for (const token of currentPhrase.tokens) {
    if (remainingInput.length === 0) break;

    const lowerRemaining = remainingInput.toLowerCase();
    const lowerToken = token.text.toLowerCase();

    if (lowerRemaining.startsWith(lowerToken)) {
      const typedPortion = remainingInput.substring(0, token.text.length);
      const colorClass = colorMap[token.type] || "";
      html += `<span class="${colorClass}">${typedPortion}</span>`;
      remainingInput = remainingInput.substring(token.text.length);
    } else {
      html += `<span>${remainingInput}</span>`;
      remainingInput = "";
      break;
    }
  }

  if (remainingInput.length > 0) {
    html += `<span>${remainingInput}</span>`;
  }

  fakeInput.innerHTML = html;
}

inputField.addEventListener('input', (e) => {
  renderFakeInput(inputField.value);

  // Auto-submit on exact match
  if (inputField.value.trim().toLowerCase() === currentPhrase.es.toLowerCase()) {
    setTimeout(handleSuccess, 100);
  }
});

function handleSuccess() {
  inputField.disabled = true;
  const successLoader = document.getElementById('successLoader');
  if (successLoader) {
    successLoader.classList.remove('hidden');
    successLoader.style.display = 'flex';
  }

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentPhrase.es);
    utterance.lang = 'es-ES';
    
    let isFired = false;
    const finish = () => {
      if(!isFired) {
        isFired = true;
        completeSuccess();
      }
    };
    
    utterance.onend = finish;
    utterance.onerror = finish;
    
    // Fallback if events don't fire
    setTimeout(finish, Math.max(2000, currentPhrase.es.length * 100));

    window.speechSynthesis.speak(utterance);
  } else {
    setTimeout(completeSuccess, 1500);
  }
}

function completeSuccess() {
  const successLoader = document.getElementById('successLoader');
  if (successLoader) {
    successLoader.classList.add('hidden');
    successLoader.style.display = 'none';
  }
  inputField.disabled = false;
  inputField.focus();

  // SRS: track progress
  if (currentPhrase.meta && currentPhrase.meta.id) {
    if (isReviewMode) {
      srsPromote(currentPhrase.meta.id);
    } else {
      srsRegisterNew(currentPhrase.meta.id);
    }
  }

  streak++;
  updateStreakDisplay();

  if (streak >= targetStreak) {
    showEndScreen();
  } else {
    nextPhrase();
  }
}

revealAnswerBtn.addEventListener('click', () => {
  targetStreak++;
  failedPhrases.push(currentPhrase);

  // SRS: demote on reveal
  if (currentPhrase.meta && currentPhrase.meta.id) {
    srsDemote(currentPhrase.meta.id);
  }

  ghostText.classList.remove('opacity-0');
  ghostText.classList.add('opacity-100');
  revealAnswerBtn.classList.add('hidden');

  updateStreakDisplay();
  inputField.focus();
});

// ========================
// COMPLETION LOGIC
// ========================

function showEndScreen() {
  drillView.classList.add('hidden');
  drillView.style.display = 'none';
  endScreen.classList.remove('hidden');
  endScreen.style.display = 'flex';

  // Increment completion tally
  let count = parseInt(localStorage.getItem(activeLesson.id) || "0", 10);
  localStorage.setItem(activeLesson.id, count + 1);
}

restartBtn.addEventListener('click', () => {
  if (isReviewMode) startReviewDrill();
  else startLesson(activeLesson);
});
dashboardReturnBtn.addEventListener('click', () => {
  if (isReviewMode || !activeTopic) initDashboard();
  else showLessonsView(activeTopic);
});
quitDrillBtn.addEventListener('click', () => {
  if (isReviewMode || !activeTopic) initDashboard();
  else showLessonsView(activeTopic);
});
backToDashboardBtn.addEventListener('click', initDashboard);

// Start
buildGlobalPhraseBank();
initDashboard();
