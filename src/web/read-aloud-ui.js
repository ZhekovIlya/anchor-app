// ========================
// READ ALOUD UI
// ========================
// Renders the list of texts and the active reading view.

import { SpeechRecognitionService } from '../core/speech-recognition.js';

let activeParagraph = null;
let words = [];
let currentIndex = 0;
let speechService = null;

// Clean text for comparison (remove punctuation, lower case)
function cleanWord(word) {
  return word.replace(/[.,¡!¿?]/g, '').toLowerCase().trim();
}

export function renderReadAloudList(container, readAloudData, onStartReading) {
  container.innerHTML = `
    <div class="mb-4">
      <h2 class="font-headline text-2xl font-bold text-on-surface dark:text-stone-100">Read Aloud</h2>
      <p class="font-body text-base text-on-surface-variant dark:text-stone-400 mt-1">
        Practice your pronunciation. Read the text aloud and correctly pronounced words will be highlighted.
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
    card.onclick = () => onStartReading(item);
    listContainer.appendChild(card);
  });
}

export function startReadAloud(container, item, onBack) {
  activeParagraph = item;
  words = item.text.split(/\s+/);
  currentIndex = 0;

  container.innerHTML = `
    <div class="flex items-center gap-4 mb-8 pb-4 border-b border-surface-container-highest dark:border-stone-800">
      <button id="raBackBtn" class="p-2 hover:bg-surface-container-low dark:hover:bg-stone-800 rounded-full transition-colors duration-300 flex items-center justify-center text-on-surface-variant dark:text-stone-300">
        <span class="material-symbols-outlined">arrow_back</span>
      </button>
      <h2 class="font-headline text-2xl font-bold text-on-surface dark:text-stone-100">${item.title}</h2>
    </div>

    <div id="raTextContainer" class="font-body text-2xl md:text-3xl leading-relaxed text-on-surface-variant dark:text-stone-400 mb-8 p-6 bg-surface-container-lowest dark:bg-stone-850 rounded-xl border border-outline-variant/20 dark:border-stone-800">
    </div>

    <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
      <button id="raStartBtn" class="bg-primary dark:bg-emerald-600 text-on-primary px-8 py-3 rounded-xl font-label font-bold text-lg hover:opacity-90 transition-all shadow-sm flex items-center gap-2">
        <span class="material-symbols-outlined">mic</span> Start Recording
      </button>
      <button id="raMockBtn" class="bg-surface-variant dark:bg-stone-800 text-on-surface dark:text-stone-200 px-6 py-3 rounded-xl font-label font-bold text-lg hover:bg-surface-container-high transition-all shadow-sm flex items-center gap-2">
        <span class="material-symbols-outlined">bug_report</span> Mock Speech
      </button>
    </div>
    
    <div id="raStatus" class="mt-4 text-center font-label text-sm text-on-surface-variant dark:text-stone-400 hidden">
      Listening... Speak clearly.
    </div>
  `;

  const textContainer = container.querySelector('#raTextContainer');
  textContainer.innerHTML = words.map((w, i) => `<span id="ra-word-${i}" class="transition-colors duration-300">${w}</span>`).join(' ');

  const backBtn = container.querySelector('#raBackBtn');
  const startBtn = container.querySelector('#raStartBtn');
  const mockBtn = container.querySelector('#raMockBtn');
  const statusEl = container.querySelector('#raStatus');

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
    onBack();
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
      statusEl.textContent = "Listening... Speak clearly.";
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
    
    // Simulate speaking the next expected word correctly
    if (currentIndex < words.length) {
      const nextWord = cleanWord(words[currentIndex]);
      speechService.simulateSpeech(nextWord);
    }
  };
}

function handleTranscript(transcript) {
  if (!transcript) return;
  
  const spokenWords = transcript.split(/\s+/).map(cleanWord);
  
  // Try to match spoken words against upcoming expected words
  spokenWords.forEach(spoken => {
    // Look ahead a little bit to allow skipping a missed word
    for (let i = currentIndex; i < Math.min(currentIndex + 3, words.length); i++) {
      const expected = cleanWord(words[i]);
      if (spoken === expected) {
        // Mark all up to i as missed/skipped (optional, but let's just mark i as correct and move on)
        // Mark current correctly
        const wordEl = document.getElementById(`ra-word-${i}`);
        if (wordEl) {
          wordEl.classList.add('text-primary', 'dark:text-emerald-400', 'font-bold');
        }
        currentIndex = i + 1;
        break;
      }
    }
  });

  // If completed
  if (currentIndex >= words.length) {
    const statusEl = document.getElementById('raStatus');
    if (statusEl) {
      statusEl.textContent = "Great job! You completed the text.";
      statusEl.classList.add('text-primary', 'dark:text-emerald-400');
    }
    if (speechService) speechService.stop();
  }
}
