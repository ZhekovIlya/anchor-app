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

export function renderReadAloudList(container, readAloudData, gamification, phraseBank, onStartReading, onSavedWordsDrillClick) {
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

  // Hardcoded Data Cards
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
    card.onclick = () => startReadAloud(container, item, gamification, phraseBank, () => renderReadAloudList(container, readAloudData, gamification, phraseBank, onStartReading, onSavedWordsDrillClick));
    listContainer.appendChild(card);
  });

  // Saved Words Practice Card
  const savedWords = localStorageAdapter.load('anchor_saved_words') || [];
  if (savedWords.length > 0) {
    const practiceCard = document.createElement('div');
    practiceCard.className = 'group bg-gradient-to-r from-primary/10 to-surface-container-lowest dark:from-emerald-900/20 dark:to-stone-850 rounded-xl p-6 cursor-pointer border border-primary/30 dark:border-emerald-500/30 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden mt-4';
    practiceCard.innerHTML = `
      <div class="flex justify-between items-center mb-2 relative z-10">
        <h3 class="font-headline text-xl font-bold text-primary dark:text-emerald-400 flex items-center gap-2">
          <span class="material-symbols-outlined">school</span> Practice Saved Words
        </h3>
        <span class="font-label text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md bg-primary dark:bg-emerald-600 text-on-primary shadow-sm">${savedWords.length} Words</span>
      </div>
      <p class="font-body text-sm text-on-surface-variant dark:text-stone-400 mb-4 relative z-10">
        You have saved ${savedWords.length} words from your reading sessions. Click to practice them in a Word Drill!
      </p>
    `;
    practiceCard.onclick = () => {
      if (onSavedWordsDrillClick) onSavedWordsDrillClick(savedWords);
    };
    listContainer.appendChild(practiceCard);
  }
}

export function startReadAloud(container, item, gamification, phraseBank, onBack, customText = null) {
  activeParagraph = item;
  currentGamification = gamification;
  activeContainer = container;
  onBackCallback = onBack;
  
  const vocabLookup = {};
  if (item.vocabulary) {
    Object.keys(item.vocabulary).forEach(k => {
      vocabLookup[cleanWord(k)] = item.vocabulary[k];
      vocabLookup[k] = item.vocabulary[k];
    });
  }
  item.vocabularyLookup = vocabLookup;
  
  let maxPhraseLength = 1;
  Object.keys(vocabLookup).forEach(k => {
    const len = k.split(' ').length;
    if (len > maxPhraseLength) maxPhraseLength = len;
  });
  
  wordObjects = [];
  const rawText = customText ? customText : item.text;
  const rawWords = rawText.split(/\s+/);
  
  let pIdx = 0;
  let i = 0;
  let wordId = 0;
  
  while (i < rawWords.length) {
    let matchedLength = 1;
    let combinedOriginal = rawWords[i];
    let combinedClean = cleanWord(rawWords[i]);
    
    for (let len = maxPhraseLength; len > 1; len--) {
      if (i + len <= rawWords.length) {
        const slice = rawWords.slice(i, i + len);
        const testClean = slice.map(cleanWord).join(' ');
        if (item.vocabularyLookup[testClean]) {
          matchedLength = len;
          combinedOriginal = slice.join(' ');
          combinedClean = testClean;
          break;
        }
      }
    }
    
    const wo = {
      id: wordId++,
      original: combinedOriginal,
      clean: combinedClean,
      isRead: false,
      phraseIndex: pIdx,
      wordCount: matchedLength
    };
    
    if (rawWords[i + matchedLength - 1].match(/[.!?]+$/)) pIdx++;
    
    wordObjects.push(wo);
    i += matchedLength;
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

        <div id="raMissedWordsSection" class="hidden mb-6 text-left bg-surface-container-low dark:bg-stone-850 p-4 rounded-xl border border-outline-variant/50 dark:border-stone-800">
          <p class="font-label text-xs font-bold text-on-surface-variant dark:text-stone-400 uppercase tracking-wide mb-2">Missed Words</p>
          <p id="raMissedWordsText" class="font-body text-sm text-on-surface dark:text-stone-200 line-clamp-3"></p>
        </div>

        <div class="flex flex-col gap-3 relative z-10">
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
  textContainer.innerHTML = wordObjects.map(wo => `<span id="ra-word-${wo.id}" class="transition-all duration-500 cursor-pointer hover:underline p-0.5 rounded inline-block select-text relative">${wo.original}</span>`).join(' ');
  updateFocusVisuals();

  let activeTooltip = null;

  textContainer.addEventListener('click', (e) => {
    if (activeTooltip) {
      activeTooltip.remove();
      activeTooltip = null;
    }

    if (e.target.tagName === 'SPAN' && e.target.id.startsWith('ra-word-')) {
      const wordId = parseInt(e.target.id.replace('ra-word-', ''));
      const wo = wordObjects.find(w => w.id === wordId);
      if (wo) {
        // Speak just the clean version or original without punctuation
        const textToSpeak = wo.original.replace(/[.,;:"'!?¿¡-]/g, '');
        speakAnswer(textToSpeak, () => {});

        // Find translation
        let trans = null;
        if (activeParagraph.vocabularyLookup) {
          trans = activeParagraph.vocabularyLookup[wo.clean];
        }
        
        if (trans) {
          // Create tooltip
          const tooltip = document.createElement('div');
          tooltip.className = 'absolute z-50 bg-surface-container-highest dark:bg-stone-800 rounded-xl shadow-xl border border-outline-variant/30 dark:border-stone-700 p-3 flex flex-col gap-2 min-w-[160px] animate-in fade-in zoom-in duration-200 cursor-default';
          
          tooltip.innerHTML = `
            <div class="flex justify-between items-start gap-4">
              <div>
                <p class="font-headline text-base font-bold text-on-surface dark:text-stone-100">${textToSpeak}</p>
                <p class="font-body text-sm text-primary dark:text-emerald-400">${trans}</p>
              </div>
              <button class="ra-tooltip-close p-1 -mr-2 -mt-2 text-on-surface-variant hover:text-on-surface dark:text-stone-400 dark:hover:text-stone-200">
                <span class="material-symbols-outlined text-sm">close</span>
              </button>
            </div>
            <button class="ra-tooltip-add w-full mt-1 bg-surface-variant dark:bg-stone-700 hover:bg-primary hover:text-on-primary dark:hover:bg-emerald-600 dark:text-stone-200 text-xs font-label font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-sm">add</span> Add to Vocab
            </button>
          `;
          
          textContainer.appendChild(tooltip);
          activeTooltip = tooltip;
          
          // Positioning inside textContainer
          const rect = e.target.getBoundingClientRect();
          const containerRect = textContainer.getBoundingClientRect();
          
          tooltip.style.top = `${rect.bottom - containerRect.top + textContainer.scrollTop + 8}px`;
          
          let leftPos = rect.left - containerRect.left + (rect.width / 2) - (160 / 2); // approximate tooltip width
          // clamp to edges
          if (leftPos < 0) leftPos = 0;
          if (leftPos + 160 > containerRect.width) leftPos = containerRect.width - 160;
          
          tooltip.style.left = `${leftPos}px`;
          
          tooltip.querySelector('.ra-tooltip-close').onclick = (ev) => {
            ev.stopPropagation();
            tooltip.remove();
            activeTooltip = null;
          };
          
          const addBtn = tooltip.querySelector('.ra-tooltip-add');
          addBtn.onclick = (ev) => {
            ev.stopPropagation();
            const saved = localStorageAdapter.load('anchor_saved_words') || [];
            if (!saved.find(sw => sw.es === wo.clean)) {
              saved.push({ es: wo.clean, prompt: trans });
              localStorageAdapter.save('anchor_saved_words', saved);
            }
            addBtn.innerHTML = `<span class="material-symbols-outlined text-sm">check</span> Added!`;
            addBtn.className = 'ra-tooltip-add w-full mt-1 bg-primary text-on-primary dark:bg-emerald-600 text-xs font-label font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors';
            setTimeout(() => { if (activeTooltip === tooltip) { tooltip.remove(); activeTooltip = null; } }, 1500);
          };
        }
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
      modal.classList.add('pointer-events-none');
      setTimeout(() => {
        startReadAloud(activeContainer, activeParagraph, currentGamification, null, onBackCallback, unreadWords.join(' '));
      }, 300);
    };
  } else {
    missedSection.classList.add('hidden');
    practiceBtn.classList.add('hidden');
  }
  
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
