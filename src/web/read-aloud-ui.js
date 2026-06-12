// ========================
// READ ALOUD UI
// ========================
// Renders the list of texts and the active reading view with gamification.

import { SpeechRecognitionService } from '../core/speech-recognition.js';
import { updateGamificationDisplay } from './gamification-ui.js';

let activeParagraph = null;
let wordObjects = [];
let lastMatchedTranscriptIndex = -1;
let prevSpokenWords = [];
let speechService = null;
let currentGamification = null;
let activeContainer = null;
let onBackCallback = null;

// Clean text for comparison (remove punctuation, lower case, strip accents)
function cleanWord(word) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,;:"'!?¿¡-]/g, '').toLowerCase().trim();
}

export function renderReadAloudList(container, readAloudData, gamification) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-headline text-2xl font-bold text-on-surface dark:text-stone-100">Read Aloud</h2>
      <p class="font-body text-base text-on-surface-variant dark:text-stone-400 mt-1">
        Practice your pronunciation. Read the text aloud, skip difficult words if you need to, and earn XP!
      </p>
    </div>
    <div class="flex flex-col gap-4" id="readAloudListContainer"></div>
  `;

  const listContainer = container.querySelector('#readAloudListContainer');

  readAloudData.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'group bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 cursor-pointer border border-outline-variant/30 dark:border-stone-800 shadow-sm hover:border-primary/50 dark:hover:border-emerald-500/50 transition-colors duration-300';
    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-headline text-xl font-bold text-on-surface dark:text-stone-100">${item.title}</h3>
        <span class="font-label text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-surface-variant dark:bg-stone-800 text-on-surface-variant dark:text-stone-400">${item.difficulty}</span>
      </div>
      <p class="font-body text-sm text-on-surface-variant dark:text-stone-400 line-clamp-2">${item.text}</p>
    `;
    card.onclick = () => startReadAloud(container, item, gamification, () => renderReadAloudList(container, readAloudData, gamification));
    listContainer.appendChild(card);
  });

  // Custom Text Card
  const customCard = document.createElement('div');
  customCard.className = 'group bg-surface-container-highest dark:bg-stone-800 rounded-xl p-6 border border-dashed border-outline-variant/50 dark:border-stone-700 shadow-sm transition-colors duration-300 mt-4';
  customCard.innerHTML = `
    <h3 class="font-headline text-xl font-bold text-on-surface dark:text-stone-100 mb-2 flex items-center gap-2">
      <span class="material-symbols-outlined text-primary dark:text-emerald-400">edit_document</span> Custom Text
    </h3>
    <p class="font-body text-sm text-on-surface-variant dark:text-stone-400 mb-4">Paste any Spanish text here to practice reading it.</p>
    <textarea id="raCustomInput" class="w-full h-32 p-4 rounded-xl bg-surface-container-lowest dark:bg-stone-900 border border-outline-variant/30 dark:border-stone-700 text-on-surface dark:text-stone-200 font-body text-base resize-y mb-4 focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500 outline-none transition-all" placeholder="Escribe o pega texto en español aquí..."></textarea>
    <button id="raCustomStartBtn" class="bg-primary dark:bg-emerald-600 text-on-primary px-6 py-2.5 rounded-xl font-label font-bold tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2 w-full sm:w-auto">
      Start Practice
    </button>
  `;
  listContainer.appendChild(customCard);

  const customBtn = customCard.querySelector('#raCustomStartBtn');
  const customInput = customCard.querySelector('#raCustomInput');
  customBtn.onclick = () => {
    const text = customInput.value.trim();
    if (!text) return;
    const customItem = {
      id: 'custom',
      title: 'Custom Text',
      difficulty: 'Custom',
      text: text
    };
    startReadAloud(container, customItem, gamification, () => renderReadAloudList(container, readAloudData, gamification));
  };
}

export function startReadAloud(container, item, gamification, onBack, customText = null) {
  activeParagraph = item;
  currentGamification = gamification;
  activeContainer = container;
  onBackCallback = onBack;
  
  const textToRead = customText || item.text;
  
  wordObjects = textToRead.split(/\s+/).map((w, index) => ({
    id: index,
    original: w,
    clean: cleanWord(w),
    isRead: false
  }));
  
  lastMatchedTranscriptIndex = -1;
  prevSpokenWords = [];

  renderReadingView();
}

function renderReadingView() {
  const progressPercent = 0;
  
  activeContainer.innerHTML = `
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 pb-4 border-b border-surface-container-highest dark:border-stone-800">
      <div class="flex items-center gap-4">
        <button id="raBackBtn" class="p-2 hover:bg-surface-container-low dark:hover:bg-stone-800 rounded-full transition-colors duration-300 flex items-center justify-center text-on-surface-variant dark:text-stone-300">
          <span class="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 class="font-headline text-xl font-bold text-on-surface dark:text-stone-100">${activeParagraph.title}</h2>
      </div>
      <button id="raFinishHeaderBtn" class="font-label text-sm font-bold text-primary dark:text-emerald-400 uppercase tracking-wide hover:opacity-80 transition-opacity">
        Finish
      </button>
    </div>

    <!-- Progress Bar -->
    <div class="mb-8 px-2">
      <div class="flex justify-between font-label text-xs font-bold text-on-surface-variant dark:text-stone-400 mb-1 uppercase tracking-wide">
        <span>Accuracy</span>
        <span id="raProgressText">0%</span>
      </div>
      <div class="w-full h-2 bg-surface-variant dark:bg-stone-800 rounded-full overflow-hidden">
        <div id="raProgressBar" class="h-full bg-primary dark:bg-emerald-500 transition-all duration-300" style="width: 0%"></div>
      </div>
    </div>

    <!-- Text Container -->
    <div id="raTextContainer" class="font-body text-2xl md:text-3xl leading-relaxed text-on-surface-variant dark:text-stone-400 mb-8 p-6 bg-surface-container-lowest dark:bg-stone-850 rounded-xl border border-outline-variant/20 dark:border-stone-800">
    </div>

    <!-- Controls -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <button id="raStartBtn" class="bg-primary dark:bg-emerald-600 text-on-primary px-8 py-3 rounded-xl font-label font-bold text-lg hover:opacity-90 transition-all shadow-sm flex items-center gap-2">
        <span class="material-symbols-outlined">mic</span> Start Recording
      </button>
      <button id="raMockBtn" class="bg-surface-variant dark:bg-stone-800 text-on-surface dark:text-stone-200 px-6 py-3 rounded-xl font-label font-bold text-lg hover:bg-surface-container-high transition-all shadow-sm flex items-center gap-2">
        <span class="material-symbols-outlined">bug_report</span> Mock Speech
      </button>
    </div>
    
    <div id="raStatus" class="mt-4 text-center font-label text-sm text-on-surface-variant dark:text-stone-400 hidden">
      Listening... Speak clearly. You can skip words and return to them.
    </div>

    <!-- Victory Modal Overlay -->
    <div id="raVictoryModal" class="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm hidden z-50 flex items-center justify-center p-4 opacity-0 transition-opacity duration-300">
      <div class="bg-surface-container-lowest dark:bg-stone-900 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-outline-variant/20 dark:border-stone-800 scale-95 transition-transform duration-300 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent dark:from-emerald-500/10 pointer-events-none"></div>
        <div class="w-20 h-20 rounded-full bg-primary/20 dark:bg-emerald-900/40 text-primary dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border-4 border-surface-container-lowest dark:border-stone-900">
          <span class="material-symbols-outlined text-4xl" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
        </div>
        <h3 class="font-headline text-3xl font-bold text-on-surface dark:text-stone-100 mb-1">Great Job!</h3>
        <p id="raVictoryScore" class="font-body text-lg text-primary dark:text-emerald-400 font-medium mb-4">You hit 95% accuracy.</p>
        
        <div class="flex justify-center gap-2 mb-6">
          <div class="bg-surface-variant dark:bg-stone-800 px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-outline-variant/30 dark:border-stone-700">
            <span class="material-symbols-outlined text-amber-500 text-sm" style="font-variation-settings: 'FILL' 1;">local_fire_department</span>
            <span id="raVictoryXp" class="font-label text-sm font-bold text-on-surface dark:text-stone-200">+15 XP</span>
          </div>
        </div>

        <div id="raMissedWordsSection" class="hidden mb-6 text-left bg-surface-container-low dark:bg-stone-850 p-4 rounded-xl border border-outline-variant/50 dark:border-stone-800">
          <p class="font-label text-xs font-bold text-on-surface-variant dark:text-stone-400 uppercase tracking-wide mb-2">Missed Words</p>
          <p id="raMissedWordsText" class="font-body text-sm text-on-surface dark:text-stone-200 line-clamp-3"></p>
        </div>

        <div class="flex flex-col gap-3">
          <button id="raPracticeMissedBtn" class="hidden w-full bg-surface-variant dark:bg-stone-800 text-on-surface dark:text-stone-100 px-4 py-3 rounded-xl font-label font-bold hover:bg-surface-container-highest dark:hover:bg-stone-700 transition-colors shadow-sm">
            Practice Missed Words
          </button>
          <button id="raCompleteBtn" class="w-full bg-primary dark:bg-emerald-600 text-on-primary px-4 py-3 rounded-xl font-label font-bold hover:opacity-90 transition-opacity shadow-md">
            Done
          </button>
        </div>
      </div>
    </div>
  `;

  const textContainer = activeContainer.querySelector('#raTextContainer');
  textContainer.innerHTML = wordObjects.map(wo => `<span id="ra-word-${wo.id}" class="transition-colors duration-300 ${wo.isRead ? 'text-primary dark:text-emerald-400 font-bold' : ''}">${wo.original}</span>`).join(' ');

  // Cleanup when container is removed from DOM
  const observer = new MutationObserver(() => {
    if (!document.body.contains(textContainer)) {
      if (speechService) speechService.stop();
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  const backBtn = activeContainer.querySelector('#raBackBtn');
  const startBtn = activeContainer.querySelector('#raStartBtn');
  const mockBtn = activeContainer.querySelector('#raMockBtn');
  const finishHeaderBtn = activeContainer.querySelector('#raFinishHeaderBtn');
  const statusEl = activeContainer.querySelector('#raStatus');

  speechService = new SpeechRecognitionService({
    onResult: (transcript) => handleTranscript(transcript),
    onError: (err) => {
      statusEl.textContent = "Error: " + err;
      statusEl.classList.add('text-error', 'dark:text-red-400');
    },
    onEnd: () => {
      statusEl.classList.add('hidden');
      startBtn.disabled = false;
      startBtn.innerHTML = `<span class="material-symbols-outlined">mic</span> Start Recording`;
    }
  });

  backBtn.onclick = () => {
    speechService.stop();
    onBackCallback();
  };
  
  finishHeaderBtn.onclick = () => {
    finishReading();
  };

  startBtn.onclick = () => {
    if (speechService.isRecording) {
      speechService.stop();
    } else {
      speechService.start(false);
      startBtn.disabled = true;
      startBtn.innerHTML = `<span class="material-symbols-outlined animate-pulse">mic</span> Recording...`;
      statusEl.classList.remove('hidden');
      statusEl.classList.remove('text-error', 'dark:text-red-400');
      statusEl.textContent = "Listening... Speak clearly. You can skip words.";
    }
  };

  mockBtn.onclick = () => {
    if (!speechService.isRecording) {
      speechService.start(true);
      startBtn.disabled = true;
      startBtn.innerHTML = `<span class="material-symbols-outlined">mic</span> Mock Mode Active`;
      statusEl.classList.remove('hidden');
      statusEl.textContent = "Mock Speech Mode. Simulating next word...";
    }
    
    // Simulate speaking the first unread word
    const nextUnread = wordObjects.find(wo => !wo.isRead);
    if (nextUnread) {
      speechService.simulateSpeech(nextUnread.clean);
    }
  };
  
  updateProgressBar();
}

function handleTranscript(transcript) {
  if (!transcript) return;
  
  const spokenWords = transcript.split(/\s+/).map(cleanWord);
  
  if (spokenWords.length < prevSpokenWords.length || (spokenWords.length > 0 && prevSpokenWords.length > 0 && spokenWords[0] !== prevSpokenWords[0])) {
    lastMatchedTranscriptIndex = -1;
  }
  prevSpokenWords = spokenWords;
  
  for (let t = lastMatchedTranscriptIndex + 1; t < spokenWords.length; t++) {
    const spoken = spokenWords[t];
    
    // Non-linear matching: find the FIRST unread word in the entire text that matches
    const matchIndex = wordObjects.findIndex(wo => !wo.isRead && wo.clean === spoken);
    
    if (matchIndex !== -1) {
      wordObjects[matchIndex].isRead = true;
      const wordEl = document.getElementById(`ra-word-${wordObjects[matchIndex].id}`);
      if (wordEl) {
        wordEl.classList.add('text-primary', 'dark:text-emerald-400', 'font-bold');
      }
      lastMatchedTranscriptIndex = t;
    }
  }

  updateProgressBar();

  if (wordObjects.every(wo => wo.isRead)) {
    finishReading();
  }
}

function updateProgressBar() {
  const readCount = wordObjects.filter(wo => wo.isRead).length;
  const totalCount = wordObjects.length;
  const percent = totalCount === 0 ? 0 : Math.round((readCount / totalCount) * 100);
  
  const progressBar = document.getElementById('raProgressBar');
  const progressText = document.getElementById('raProgressText');
  
  if (progressBar && progressText) {
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${percent}%`;
  }
}

function finishReading() {
  if (speechService) speechService.stop();
  
  const readCount = wordObjects.filter(wo => wo.isRead).length;
  const totalCount = wordObjects.length;
  const accuracy = totalCount === 0 ? 0 : Math.round((readCount / totalCount) * 100);
  
  // Award XP
  const xpAwarded = Math.max(5, Math.round((readCount / 2))); // 1 XP per 2 words, min 5
  if (currentGamification) {
    currentGamification.addXP(xpAwarded);
    updateGamificationDisplay(currentGamification.getStats());
  }
  
  // Show Modal
  const modal = document.getElementById('raVictoryModal');
  const modalInner = modal.querySelector('div');
  const scoreEl = document.getElementById('raVictoryScore');
  const xpEl = document.getElementById('raVictoryXp');
  const missedSection = document.getElementById('raMissedWordsSection');
  const missedTextEl = document.getElementById('raMissedWordsText');
  const practiceBtn = document.getElementById('raPracticeMissedBtn');
  const completeBtn = document.getElementById('raCompleteBtn');
  
  scoreEl.textContent = `You hit ${accuracy}% accuracy.`;
  xpEl.textContent = `+${xpAwarded} XP`;
  
  const unreadWords = wordObjects.filter(wo => !wo.isRead).map(wo => wo.original);
  
  if (unreadWords.length > 0) {
    missedSection.classList.remove('hidden');
    missedTextEl.textContent = unreadWords.join(' ');
    practiceBtn.classList.remove('hidden');
    
    practiceBtn.onclick = () => {
      // Start a new read aloud session with ONLY the missed words
      modal.classList.add('opacity-0');
      setTimeout(() => {
        startReadAloud(activeContainer, activeParagraph, currentGamification, onBackCallback, unreadWords.join(' '));
      }, 300);
    };
  } else {
    missedSection.classList.add('hidden');
    practiceBtn.classList.add('hidden');
  }
  
  completeBtn.onclick = () => {
    modal.classList.add('opacity-0');
    setTimeout(() => {
      onBackCallback();
    }, 300);
  };
  
  // Animate in
  modal.classList.remove('hidden');
  // force reflow
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  modalInner.classList.remove('scale-95');
  modalInner.classList.add('scale-100');
}
