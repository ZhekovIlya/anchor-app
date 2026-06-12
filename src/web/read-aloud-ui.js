// ========================
// READ ALOUD UI
// ========================
// Renders the list of texts and the active reading view with gamification.

import { SpeechRecognitionService } from '../core/speech-recognition.js';
import { updateGamificationDisplay } from './gamification-ui.js';
import { speakAnswer, getPromptLang } from './speech.js';
import { localStorageAdapter } from './storage.js';

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

export function renderReadAloudList(container, readAloudData, gamification, onStartReading) {
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

  // Load read progress from storage
  const history = localStorageAdapter.load('anchor_read_progress') || {};

  // Hardcoded Data Cards
  readAloudData.forEach((item) => {
    const itemHistory = history[item.id] || { maxScore: 0, perfectCount: 0 };
    let badgeHtml = '';
    
    if (itemHistory.perfectCount >= 5) {
      badgeHtml = `
        <div class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#fef08a] dark:bg-yellow-600/30 text-[#ca8a04] dark:text-amber-400 mt-2 w-fit">
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Mastered</span>
          <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
        </div>
      `;
    } else if (itemHistory.maxScore >= 90) {
      badgeHtml = `
        <div class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#dcfce7] dark:bg-emerald-600/30 text-[#16a34a] dark:text-emerald-400 mt-2 w-fit">
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Completed</span>
          <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
        </div>
      `;
    }

    const card = document.createElement('div');
    card.className = 'group bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 cursor-pointer border border-outline-variant/30 dark:border-stone-800 shadow-sm hover:border-primary/50 dark:hover:border-emerald-500/50 transition-colors duration-300';
    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h3 class="font-headline text-xl font-bold text-on-surface dark:text-stone-100">${item.title}</h3>
        <span class="font-label text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-surface-variant dark:bg-stone-800 text-on-surface-variant dark:text-stone-400">${item.difficulty}</span>
      </div>
      <p class="font-body text-sm text-on-surface-variant dark:text-stone-400 line-clamp-2">${item.text}</p>
      ${badgeHtml}
    `;
    card.onclick = () => startReadAloud(container, item, gamification, () => renderReadAloudList(container, readAloudData, gamification, onStartReading));
    listContainer.appendChild(card);
  });
}

export function startReadAloud(container, item, gamification, onBack, customText = null) {
  activeParagraph = item;
  currentGamification = gamification;
  activeContainer = container;
  onBackCallback = onBack;
  
  wordObjects = [];
  const rawText = customText ? customText : item.text;
  const rawWords = rawText.split(/\s+/);
  
  let pIdx = 0;
  
  for (let i = 0; i < rawWords.length; i++) {
    const original = rawWords[i];
    const clean = cleanWord(original);
    
    const wo = {
      id: i,
      original: original,
      clean: clean,
      isRead: false,
      phraseIndex: pIdx,
      wordCount: 1
    };
    
    if (original.match(/[.!?]+$/)) pIdx++;
    
    wordObjects.push(wo);
  }
  
  lastMatchedTranscriptIndex = -1;
  prevSpokenWords = [];

  renderReadingView();
}

function renderReadingView() {
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
    <div id="raTextContainer" class="font-body text-2xl md:text-3xl leading-relaxed text-on-surface-variant dark:text-stone-400 mb-8 p-6 bg-surface-container-lowest dark:bg-stone-850 rounded-xl border border-outline-variant/20 dark:border-stone-800 transition-all relative z-10">
    </div>

    <!-- Controls -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16">
      <button id="raStartBtn" class="bg-primary dark:bg-emerald-600 text-on-primary px-8 py-3 rounded-xl font-label font-bold text-lg hover:opacity-90 transition-all shadow-sm flex items-center gap-2">
        <span class="material-symbols-outlined">mic</span> Start Recording
      </button>
      <button id="raSkipBtn" class="bg-amber-500 text-white px-6 py-3 rounded-xl font-label font-bold text-lg hover:bg-amber-600 transition-all shadow-sm flex items-center gap-2 hidden">
        <span class="material-symbols-outlined">skip_next</span> Skip Word
      </button>
      <button id="raMockBtn" class="bg-surface-variant dark:bg-stone-800 text-on-surface dark:text-stone-200 px-6 py-3 rounded-xl font-label font-bold text-lg hover:bg-surface-container-high transition-all shadow-sm flex items-center gap-2">
        <span class="material-symbols-outlined">bug_report</span> Mock Speech
      </button>
    </div>
    
    <div id="raStatus" class="mt-4 text-center font-label text-sm text-on-surface-variant dark:text-stone-400 hidden">
      Listening... Speak clearly. You can skip words and return to them.
    </div>

    <!-- Victory Modal Overlay -->
    <div id="raVictoryModal" class="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
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

        <div class="flex flex-col gap-3 relative z-10">
          <button id="raCompleteBtn" class="w-full bg-primary dark:bg-emerald-600 text-on-primary px-4 py-3 rounded-xl font-label font-bold hover:opacity-90 transition-opacity shadow-md">
            Done
          </button>
        </div>
      </div>
    </div>
  `;

  const textContainer = activeContainer.querySelector('#raTextContainer');
  textContainer.innerHTML = wordObjects.map(wo => `<span id="ra-word-${wo.id}" class="transition-all duration-500 cursor-pointer hover:underline p-0.5 rounded inline-block select-text relative">${wo.original}</span>`).join(' ');
  updateFocusVisuals();

  textContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN' && e.target.id.startsWith('ra-word-')) {
      const wordId = parseInt(e.target.id.replace('ra-word-', ''));
      const wo = wordObjects.find(w => w.id === wordId);
      if (wo) {
        // Speak just the clean version or original without punctuation
        const textToSpeak = wo.original.replace(/[.,;:"'!?¿¡-]/g, '');
        speakAnswer(textToSpeak, () => {});
      }
    }
  });

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
      activeContainer.querySelector('#raSkipBtn').classList.add('hidden');
    }
  });

  backBtn.onclick = () => {
    speechService.stop();
    onBackCallback();
  };
  
  finishHeaderBtn.onclick = () => {
    finishReading();
  };

  const skipBtn = activeContainer.querySelector('#raSkipBtn');
  
  skipBtn.onclick = () => {
    const nextUnread = wordObjects.find(wo => !wo.isRead);
    if (nextUnread) {
      nextUnread.isRead = true;
      updateFocusVisuals();
      updateProgressBar();
      if (wordObjects.every(wo => wo.isRead)) finishReading();
    }
  };

  startBtn.onclick = () => {
    if (speechService.isRecording) {
      speechService.stop();
      skipBtn.classList.add('hidden');
    } else {
      speechService.start(false);
      startBtn.disabled = true;
      startBtn.innerHTML = `<span class="material-symbols-outlined animate-pulse">mic</span> Recording...`;
      statusEl.classList.remove('hidden');
      statusEl.classList.remove('text-error', 'dark:text-red-400');
      statusEl.textContent = "Listening... Speak clearly. Skip words you don't know.";
      skipBtn.classList.remove('hidden');
    }
  };

  mockBtn.onclick = () => {
    if (!speechService.isRecording) {
      speechService.start(true);
      startBtn.disabled = true;
      startBtn.innerHTML = `<span class="material-symbols-outlined">mic</span> Mock Mode Active`;
      statusEl.classList.remove('hidden');
      statusEl.textContent = "Mock Speech Mode. Simulating next word...";
      skipBtn.classList.remove('hidden');
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
    const nextUnreadIndex = wordObjects.findIndex(wo => !wo.isRead);
    if (nextUnreadIndex === -1) break; // All done
    
    const targetWord = wordObjects[nextUnreadIndex];
    const targetCleanWords = targetWord.clean.split(' ');
    
    let match = true;
    for (let j = 0; j < targetCleanWords.length; j++) {
      if (t + j >= spokenWords.length || spokenWords[t + j] !== targetCleanWords[j]) {
        match = false;
        break;
      }
    }
    
    if (match) {
      targetWord.isRead = true;
      lastMatchedTranscriptIndex = t + targetCleanWords.length - 1;
      t = lastMatchedTranscriptIndex; // advance
    }
  }

  updateFocusVisuals();

  if (wordObjects.every(wo => wo.isRead)) {
    finishReading();
  }
}

function updateFocusVisuals() {
  if (wordObjects.length === 0) return;
  const firstUnread = wordObjects.find(wo => !wo.isRead);
  const activePhraseIndex = firstUnread ? firstUnread.phraseIndex : wordObjects[wordObjects.length - 1].phraseIndex;
  
  wordObjects.forEach(wo => {
    const el = document.getElementById(`ra-word-${wo.id}`);
    if (!el) return;
    
    if (wo.phraseIndex < activePhraseIndex) {
      el.className = `transition-all duration-500 cursor-pointer hover:underline p-0.5 rounded inline-block select-text relative ${wo.isRead ? 'text-primary dark:text-emerald-400 font-bold' : 'text-on-surface-variant dark:text-stone-400'}`;
    } else if (wo.phraseIndex === activePhraseIndex) {
      el.className = `transition-all duration-500 cursor-pointer hover:underline p-0.5 rounded inline-block select-text relative ${wo.isRead ? 'text-primary dark:text-emerald-400 font-bold' : 'text-on-surface dark:text-stone-100'}`;
    } else {
      el.className = `transition-all duration-500 cursor-pointer hover:underline p-0.5 rounded inline-block select-text relative text-on-surface-variant dark:text-stone-400`;
    }
  });
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
  if (speechService) {
    try {
      speechService.stop();
    } catch(e) {
      // Ignore
    }
  }

  const readCount = wordObjects.filter(wo => wo.isRead).length;
  const totalCount = wordObjects.length;
  const accuracy = totalCount === 0 ? 0 : Math.round((readCount / totalCount) * 100);
  
  // Award XP
  const xpAwarded = readCount === 0 ? 0 : Math.max(5, Math.round((readCount / 2))); // 1 XP per 2 words, min 5 if > 0
  if (currentGamification) {
    currentGamification.addXP(xpAwarded);
    updateGamificationDisplay(currentGamification.getStats());
  }
  
  // Save Progress
  const history = localStorageAdapter.load('anchor_read_progress') || {};
  if (!history[activeParagraph.id]) history[activeParagraph.id] = { maxScore: 0, perfectCount: 0 };
  
  const textHist = history[activeParagraph.id];
  if (accuracy > textHist.maxScore) {
    textHist.maxScore = accuracy;
  }
  if (accuracy === 100) {
    textHist.perfectCount++;
  }
  localStorageAdapter.save('anchor_read_progress', history);
  
  // Show Modal
  const modal = document.getElementById('raVictoryModal');
  const modalInner = modal.querySelector('div');
  const titleEl = modal.querySelector('h3');
  const scoreEl = document.getElementById('raVictoryScore');
  const xpEl = document.getElementById('raVictoryXp');
  const completeBtn = document.getElementById('raCompleteBtn');
  
  if (accuracy >= 90) {
    titleEl.textContent = 'Great Job!';
    titleEl.className = 'font-headline text-3xl font-bold text-primary dark:text-emerald-400 mb-1';
  } else if (accuracy >= 60) {
    titleEl.textContent = 'Good Practice!';
    titleEl.className = 'font-headline text-3xl font-bold text-on-surface dark:text-stone-100 mb-1';
  } else {
    titleEl.textContent = 'Keep Trying!';
    titleEl.className = 'font-headline text-3xl font-bold text-amber-500 dark:text-amber-400 mb-1';
  }
  
  scoreEl.textContent = `You hit ${accuracy}% accuracy.`;
  xpEl.textContent = `+${xpAwarded} XP`;
  
  completeBtn.onclick = () => {
    modal.classList.add('opacity-0');
    modal.classList.add('pointer-events-none');
    setTimeout(() => {
      onBackCallback();
    }, 300);
  };
  
  // Animate in using pointer-events-none removal instead of toggling display
  modal.classList.remove('pointer-events-none');
  // force reflow
  void modal.offsetWidth;
  modal.classList.remove('opacity-0');
  modalInner.classList.remove('scale-95');
  modalInner.classList.add('scale-100');
}
