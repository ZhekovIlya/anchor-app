// ========================
// AUDITION UI
// ========================
// Renders the Auditions tab, integrating 80/20 vocabulary decay and STT evaluation.

import { SpeechRecognitionService } from '../core/speech-recognition.js';
import { updateGamificationDisplay } from './gamification-ui.js';
import { speakAnswer } from './speech.js';
import { localStorageAdapter } from './storage.js';

// --- VOCABULARY DB & 80/20 SLIDING WINDOW DECAY ---
const vocabularyDB = {
    1: [
        { phrase: "Hola, ¿cómo estás?", target: "hola", lang: "es-ES" },
        { phrase: "Gracias por tu ayuda.", target: "gracias", lang: "es-ES" },
        { phrase: "Adiós, nos vemos.", target: "adiós", lang: "es-ES" },
        { phrase: "Por favor, siéntate.", target: "favor", lang: "es-ES" },
        { phrase: "Lo siento mucho.", target: "siento", lang: "es-ES" },
        { phrase: "Sí, claro.", target: "sí", lang: "es-ES" },
        { phrase: "No, nunca.", target: "no", lang: "es-ES" },
        { phrase: "Bien, gracias.", target: "bien", lang: "es-ES" },
        { phrase: "Mal, me duele.", target: "mal", lang: "es-ES" },
        { phrase: "Quizás mañana.", target: "quizás", lang: "es-ES" }
    ],
    2: [
        { phrase: "Buenos días a todos.", target: "días", lang: "es-ES" },
        { phrase: "Buenas tardes.", target: "tardes", lang: "es-ES" },
        { phrase: "Buenas noches.", target: "noches", lang: "es-ES" },
        { phrase: "Hasta luego.", target: "luego", lang: "es-ES" },
        { phrase: "Hasta pronto.", target: "pronto", lang: "es-ES" },
        { phrase: "Nos vemos mañana.", target: "mañana", lang: "es-ES" },
        { phrase: "Buen fin de semana.", target: "semana", lang: "es-ES" },
        { phrase: "Feliz cumpleaños.", target: "feliz", lang: "es-ES" },
        { phrase: "Buena suerte.", target: "suerte", lang: "es-ES" },
        { phrase: "Buen provecho.", target: "provecho", lang: "es-ES" }
    ],
    3: [
        { phrase: "¿Cómo te llamas?", target: "llamas", lang: "es-ES" },
        { phrase: "Me llamo Juan.", target: "llamo", lang: "es-ES" },
        { phrase: "Mucho gusto.", target: "gusto", lang: "es-ES" },
        { phrase: "Encantado de conocerte.", target: "encantado", lang: "es-ES" },
        { phrase: "¿De dónde eres?", target: "dónde", lang: "es-ES" },
        { phrase: "Soy de España.", target: "soy", lang: "es-ES" },
        { phrase: "¿Cuántos años tienes?", target: "años", lang: "es-ES" },
        { phrase: "Tengo veinte años.", target: "tengo", lang: "es-ES" },
        { phrase: "¿Dónde vives?", target: "vives", lang: "es-ES" },
        { phrase: "Vivo en Madrid.", target: "vivo", lang: "es-ES" }
    ],
    4: [
        { phrase: "¿Qué hora es?", target: "hora", lang: "es-ES" },
        { phrase: "Son las dos.", target: "son", lang: "es-ES" },
        { phrase: "Es la una.", target: "es", lang: "es-ES" },
        { phrase: "¿A qué hora?", target: "qué", lang: "es-ES" },
        { phrase: "Hoy es lunes.", target: "lunes", lang: "es-ES" },
        { phrase: "Ayer fue domingo.", target: "ayer", lang: "es-ES" },
        { phrase: "Mañana es martes.", target: "martes", lang: "es-ES" },
        { phrase: "El próximo mes.", target: "mes", lang: "es-ES" },
        { phrase: "El año pasado.", target: "año", lang: "es-ES" },
        { phrase: "Este fin de semana.", target: "este", lang: "es-ES" }
    ]
};

function generateDrillsForWeek(weekNum) {
    const drills = [];
    const getRandom = (arr, count) => [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

    if (weekNum === 1) {
        drills.push(...getRandom(vocabularyDB[1] || [], 10));
    } else if (weekNum === 2) {
        drills.push(...getRandom(vocabularyDB[2] || [], 2));
        drills.push(...getRandom(vocabularyDB[1] || [], 8));
    } else if (weekNum === 3) {
        drills.push(...getRandom(vocabularyDB[3] || [], 2));
        drills.push(...getRandom(vocabularyDB[2] || [], 5));
        drills.push(...getRandom(vocabularyDB[1] || [], 3));
    } else {
        drills.push(...getRandom(vocabularyDB[weekNum] || [], 2));
        drills.push(...getRandom(vocabularyDB[weekNum - 1] || [], 5));
        drills.push(...getRandom(vocabularyDB[weekNum - 2] || [], 2));
        drills.push(...getRandom(vocabularyDB[weekNum - 3] || [], 1));
    }
    
    return getRandom(drills, drills.length);
}

// State
let activeWeek = 0;
let drills = [];
let currentDrillIndex = 0;
let score = 0;
let streak = 0;
let isRecording = false;
let currentGamification = null;
let activeContainer = null;
let onBackCallback = null;
let speechService = null;

function logDebug(msg) {
  console.log(`[Audition Debug] ${msg}`);
  const consoleEl = document.getElementById('audDebugConsole');
  if (!consoleEl) return;
  const time = new Date().toLocaleTimeString();
  const entry = document.createElement('div');
  entry.className = 'font-mono text-[10px] text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 py-1 break-words';
  entry.textContent = `[${time}] ${msg}`;
  consoleEl.appendChild(entry);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

export function renderAuditionsTab(container, gamification, onBack) {
  currentGamification = gamification;
  activeContainer = container;
  onBackCallback = onBack;

  const history = localStorageAdapter.load('anchor_audition_progress') || {};

  container.innerHTML = `
    <div class="mb-6">
      <h2 class="font-headline text-2xl font-bold text-on-surface dark:text-stone-100">Audition Drills</h2>
      <p class="font-body text-base text-on-surface-variant dark:text-stone-400 mt-1">
        Practice your listening and speaking skills. Listen to the phrase, then repeat the target word!
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="auditionWeeksContainer"></div>
  `;

  const weeksContainer = container.querySelector('#auditionWeeksContainer');

  Object.keys(vocabularyDB).forEach(week => {
    const itemHistory = history[week] || { maxScore: 0, perfectCount: 0 };
    let badgeHtml = '';
    
    if (itemHistory.perfectCount >= 1) {
      badgeHtml = `
        <div class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#fef08a] dark:bg-yellow-600/30 text-[#ca8a04] dark:text-amber-400 w-fit shrink-0">
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Mastered</span>
          <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
        </div>
      `;
    } else if (itemHistory.maxScore >= 80) {
      badgeHtml = `
        <div class="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#dcfce7] dark:bg-emerald-600/30 text-[#16a34a] dark:text-emerald-400 w-fit shrink-0">
          <span class="font-label text-[10px] font-bold uppercase tracking-wider">Completed</span>
          <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
        </div>
      `;
    }

    const card = document.createElement('div');
    card.className = 'group relative bg-surface-container-lowest dark:bg-stone-850 rounded-xl p-6 cursor-pointer flex flex-col justify-between border border-outline-variant/30 dark:border-stone-800 shadow-sm hover:border-primary/50 dark:hover:border-emerald-500/50 transition-colors duration-300';
    card.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <div class="w-12 h-12 rounded-xl bg-primary-container dark:bg-emerald-900/40 text-primary dark:text-emerald-400 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
          <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">mic</span>
        </div>
        ${badgeHtml}
      </div>
      <div>
        <div class="font-label text-xs text-on-surface-variant dark:text-stone-400 tracking-wider uppercase mb-1">Week ${week}</div>
        <h3 class="font-headline text-2xl text-on-surface dark:text-stone-100 break-words line-clamp-2">Audition Drill</h3>
      </div>
      <div class="flex items-center gap-3 mt-6 justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
        <span class="font-label text-sm font-bold text-primary dark:text-emerald-400 tracking-wide transition-colors duration-300">START</span>
        <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-3xl transition-colors duration-300">play_arrow</span>
      </div>
    `;
    card.onclick = () => startDrillSession(parseInt(week));
    weeksContainer.appendChild(card);
  });
}

function startDrillSession(week) {
  activeWeek = week;
  drills = generateDrillsForWeek(week);
  currentDrillIndex = 0;
  score = 0;
  streak = 0;

  renderActiveDrillView();
  logDebug(`Started Drill Session for Week ${week}. Total phrases: ${drills.length}`);
  loadDrill();
}

function renderActiveDrillView() {
  activeContainer.innerHTML = `
    <div class="flex flex-col xl:flex-row w-full gap-8">
      
      <!-- Main Drill Area -->
      <div class="flex flex-col items-center flex-grow max-w-2xl mx-auto pt-4 xl:pt-8 w-full">
        <!-- Header -->
        <div class="flex items-center justify-between w-full mb-8">
          <button id="audBackBtn" class="p-2 hover:bg-surface-container-low dark:hover:bg-stone-800 rounded-full transition-colors duration-300 flex items-center justify-center text-on-surface-variant dark:text-stone-300">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <div class="flex items-center gap-6">
             <div class="flex flex-col items-center">
               <span class="font-label text-xs uppercase text-on-surface-variant dark:text-stone-400 tracking-widest">Score</span>
               <span id="audScore" class="font-mono text-2xl font-bold text-on-surface dark:text-stone-100">${score}</span>
             </div>
             <div class="flex flex-col items-center">
               <span class="font-label text-xs uppercase text-on-surface-variant dark:text-stone-400 tracking-widest">Streak</span>
               <span id="audStreak" class="font-mono text-2xl font-bold text-primary dark:text-emerald-400">${streak}</span>
             </div>
          </div>
        </div>
        
        <!-- Drill Content -->
        <div id="drillArea" class="w-full bg-surface-container-lowest dark:bg-stone-850 rounded-3xl border border-outline-variant/30 dark:border-stone-800 p-8 flex flex-col items-center text-center shadow-lg transition-colors duration-500 min-h-[300px] relative overflow-hidden">
          
          <!-- Animated listening wave (visible when recording) -->
          <div id="listeningWave" class="absolute bottom-0 left-0 right-0 h-2 bg-primary dark:bg-emerald-500 opacity-0 transition-opacity duration-300"></div>

          <div class="font-label text-sm text-on-surface-variant dark:text-stone-400 uppercase tracking-widest mb-4">Repeat this word:</div>
          
          <div id="audTargetWord" class="font-body text-5xl font-extrabold text-primary dark:text-emerald-400 mb-8 tracking-tight"></div>
          
          <div id="audFeedback" class="font-body text-lg font-medium min-h-[2rem] transition-colors duration-300 text-on-surface-variant dark:text-stone-400">Playing Audio...</div>
        </div>
        
        <!-- Controls -->
        <div class="mt-8 flex gap-4 w-full justify-center">
          <button id="audListenBtn" class="bg-surface-variant dark:bg-stone-800 text-on-surface dark:text-stone-200 px-6 py-3 rounded-xl font-label font-bold text-lg hover:bg-surface-container-high transition-all shadow-sm flex items-center gap-2">
            <span class="material-symbols-outlined">volume_up</span> Replay
          </button>
          <button id="audRecordBtn" class="bg-surface-variant dark:bg-stone-800 text-on-surface dark:text-stone-200 px-6 py-3 rounded-xl font-label font-bold text-lg hover:bg-surface-container-high transition-all shadow-sm flex items-center gap-3">
            <span class="material-symbols-outlined">mic</span> <span id="audRecordText">Mic</span>
          </button>
        </div>
      </div>

      <!-- Debug Console (Right Panel) -->
      <div class="w-full xl:w-80 border border-outline-variant/30 dark:border-stone-800 bg-surface-container-lowest dark:bg-stone-900 rounded-xl p-4 flex flex-col mt-8 xl:mt-0 xl:min-h-[500px]">
        <h3 class="font-label text-xs uppercase text-on-surface-variant dark:text-stone-500 mb-2 font-bold tracking-widest border-b border-stone-200 dark:border-stone-800 pb-2">STT Debug Logs</h3>
        <div id="audDebugConsole" class="flex flex-col overflow-y-auto flex-grow h-64 xl:h-auto"></div>
      </div>

    </div>
  `;

  activeContainer.querySelector('#audBackBtn').onclick = () => {
    logDebug("User clicked Back.");
    if (speechService) speechService.stop();
    window.speechSynthesis.cancel();
    renderAuditionsTab(activeContainer, currentGamification, onBackCallback);
  };
  
  activeContainer.querySelector('#audListenBtn').onclick = () => {
     logDebug("User clicked Replay Audio.");
     playAudioAndRecord(drills[currentDrillIndex]);
  };
  
  activeContainer.querySelector('#audRecordBtn').onclick = toggleRecording;

  speechService = new SpeechRecognitionService({
    onResult: (transcript) => {
      logDebug(`Result Received: "${transcript}"`);
      handleSpeechResult(transcript);
    },
    onError: (err) => {
      logDebug(`Error Received: "${err}"`);
      // Ignore benign errors. 'no-speech' will automatically trigger onEnd which restarts it.
      if (err === 'no-speech' || err.includes('already started') || err === 'aborted') {
        return;
      }
      const fb = activeContainer.querySelector('#audFeedback');
      if (fb) {
         fb.textContent = `Error: ${err}`;
         fb.classList.add('text-error', 'dark:text-red-400');
      }
      setRecordingState(false);
    },
    onEnd: () => {
      logDebug(`onEnd Triggered. isRecording=${isRecording}`);
      // Graceful degradation, only stop UI if we didn't deliberately keep it open
      // The Web Speech API sometimes auto-stops.
      if (isRecording) {
         logDebug(`Auto-restarting STT because isRecording is true...`);
         try { speechService.start(false); } catch(e) { logDebug(`Restart error: ${e.message}`); }
      } else {
         setRecordingState(false);
      }
    }
  });
}

function loadDrill() {
  if (currentDrillIndex >= drills.length) {
    logDebug("All phrases completed! Rendering completion screen.");
    renderCompletionScreen();
    return;
  }

  const currentDrill = drills[currentDrillIndex];
  logDebug(`Loading Card [${currentDrillIndex + 1}/${drills.length}] Target: "${currentDrill.target}"`);
  
  const targetWordEl = activeContainer.querySelector('#audTargetWord');
  const feedbackEl = activeContainer.querySelector('#audFeedback');
  const drillArea = activeContainer.querySelector('#drillArea');

  if (targetWordEl && feedbackEl && drillArea) {
      targetWordEl.textContent = currentDrill.target;
      feedbackEl.textContent = "Playing Audio...";
      feedbackEl.className = "font-body text-lg font-medium min-h-[2rem] transition-colors duration-300 text-on-surface-variant dark:text-stone-400";
      drillArea.classList.remove('bg-emerald-50', 'dark:bg-emerald-950/30', 'border-emerald-500', 'bg-red-50', 'dark:bg-red-950/30', 'border-red-500');
  }

  // Auto-play audio and auto-start recording
  setTimeout(() => {
     playAudioAndRecord(currentDrill);
  }, 400);
}

function playAudioAndRecord(currentDrill) {
  if (!currentDrill) return;
  logDebug("Starting playAudioAndRecord...");
  
  // Stop recording before audio starts to prevent capturing our own audio
  isRecording = false;
  if (speechService) speechService.stop();
  setRecordingState(false);

  const feedbackEl = activeContainer.querySelector('#audFeedback');
  if (feedbackEl) feedbackEl.textContent = "Playing phrase...";

  // Use the global Spanish voice via speakAnswer
  logDebug(`TTS Speaking: "${currentDrill.phrase}"`);
  speakAnswer(currentDrill.phrase, () => {
    // Audio finished. Now listen.
    logDebug("TTS Finished. Opening Microphone.");
    if (!speechService) return;
    if (speechService.recognition) {
       speechService.recognition.lang = currentDrill.lang;
    }
    isRecording = true;
    try {
        speechService.start(false);
    } catch(e) {
        logDebug(`Start error: ${e.message}`);
    } 
    setRecordingState(true);
  });
}

function toggleRecording() {
  if (!speechService) return;

  logDebug(`Toggle Recording manually clicked. Current state: ${isRecording}`);
  if (isRecording) {
    isRecording = false;
    speechService.stop();
    setRecordingState(false);
  } else {
    isRecording = true;
    try { speechService.start(false); } catch(e) { logDebug(`Toggle start error: ${e.message}`); }
    setRecordingState(true);
  }
}

function setRecordingState(state) {
  isRecording = state;
  const wave = activeContainer.querySelector('#listeningWave');
  const btn = activeContainer.querySelector('#audRecordBtn');
  const text = activeContainer.querySelector('#audRecordText');
  const icon = btn?.querySelector('.material-symbols-outlined');
  const feedback = activeContainer.querySelector('#audFeedback');

  if (state) {
    if (wave) {
        wave.classList.remove('opacity-0');
        wave.classList.add('animate-pulse');
    }
    if (btn) btn.classList.replace('bg-surface-variant', 'bg-error');
    if (btn) btn.classList.replace('dark:bg-stone-800', 'dark:bg-red-600');
    if (btn) btn.classList.replace('text-on-surface', 'text-white');
    if (btn) btn.classList.replace('dark:text-stone-200', 'text-white');
    if (icon) icon.textContent = 'graphic_eq';
    if (text) text.textContent = "Stop";
    if (feedback && feedback.textContent.includes("Playing")) feedback.textContent = "Listening... Speak now!";
  } else {
    if (wave) {
        wave.classList.add('opacity-0');
        wave.classList.remove('animate-pulse');
    }
    if (btn) btn.classList.replace('bg-error', 'bg-surface-variant');
    if (btn) btn.classList.replace('dark:bg-red-600', 'dark:bg-stone-800');
    if (btn) btn.classList.replace('text-white', 'text-on-surface');
    if (btn) btn.classList.replace('text-white', 'dark:text-stone-200');
    if (icon) icon.textContent = 'mic_off';
    if (text) text.textContent = "Record";
    if (feedback && feedback.textContent === "Listening... Speak now!") feedback.textContent = "";
  }
}

function normalizeWord(word) {
  return word.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,!?¡¿]/g, "").trim();
}

function handleSpeechResult(transcript) {
  const currentDrill = drills[currentDrillIndex];
  if (!currentDrill) return;

  const normalizedTranscript = normalizeWord(transcript);
  const target = normalizeWord(currentDrill.target);

  const targetWords = target.split(' ').filter(w => w);
  const spokenWords = normalizedTranscript.split(' ').filter(w => w);
  
  let correctCount = 0;
  targetWords.forEach(w => {
    if (spokenWords.includes(w)) correctCount++;
  });
  
  const accuracy = targetWords.length > 0 ? (correctCount / targetWords.length) : 0;

  logDebug(`Evaluating normalized "${normalizedTranscript}" against target "${target}", accuracy: ${accuracy.toFixed(2)}`);

  // Loose match for a smoother user experience
  if (normalizedTranscript.includes(target) || accuracy >= 0.6) {
    logDebug("Match SUCCESS.");
    handleSuccess(transcript);
  } else {
    logDebug("Match FAILED.");
    handleFailure(transcript);
  }
}

function handleSuccess(transcript) {
  // Stop recording so we can move to next card smoothly
  isRecording = false;
  if (speechService) speechService.stop();
  setRecordingState(false);

  score += 10;
  streak += 1;
  updateStatsUI();

  if (currentGamification) {
      currentGamification.addXP(2); // +2 XP per word
      updateGamificationDisplay(currentGamification.getStats());
  }

  const feedbackEl = activeContainer.querySelector('#audFeedback');
  const drillArea = activeContainer.querySelector('#drillArea');
  
  if (feedbackEl && drillArea) {
      feedbackEl.textContent = `Correct! You said: "${transcript}"`;
      feedbackEl.classList.add('text-primary', 'dark:text-emerald-400');
      drillArea.classList.add('bg-emerald-50', 'dark:bg-emerald-950/30', 'border-emerald-500');
  }

  setTimeout(() => {
    currentDrillIndex++;
    loadDrill();
  }, 1000); // reduced delay for snappier experience
}

function handleFailure(transcript) {
  streak = 0;
  updateStatsUI();

  const feedbackEl = activeContainer.querySelector('#audFeedback');
  const drillArea = activeContainer.querySelector('#drillArea');

  if (feedbackEl && drillArea) {
      feedbackEl.textContent = `Missed it. You said: "${transcript}"`;
      feedbackEl.classList.add('text-error', 'dark:text-red-400');
      drillArea.classList.add('bg-red-50', 'dark:bg-red-950/30', 'border-red-500');
  }

  setTimeout(() => {
      if (drillArea) drillArea.classList.remove('bg-red-50', 'dark:bg-red-950/30', 'border-red-500');
      // We don't advance the drill on failure. Let them try again.
      // The mic should still be open or auto-restarted by onEnd.
      if (!isRecording && speechService) {
         logDebug("Recovering mic after failure...");
         isRecording = true;
         try { speechService.start(false); } catch(e){ logDebug(`Recover start error: ${e.message}`); }
         setRecordingState(true);
      }
  }, 1200);
}

function updateStatsUI() {
  const scoreEl = activeContainer.querySelector('#audScore');
  const streakEl = activeContainer.querySelector('#audStreak');
  if (scoreEl) scoreEl.textContent = score;
  if (streakEl) streakEl.textContent = streak;
}

function renderCompletionScreen() {
    // Save to storage
    const history = localStorageAdapter.load('anchor_audition_progress') || {};
    if (!history[activeWeek]) history[activeWeek] = { maxScore: 0, perfectCount: 0 };
    
    // Calculate accuracy score
    const totalPossibleScore = drills.length * 10;
    const accuracy = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;
    
    if (accuracy > history[activeWeek].maxScore) {
        history[activeWeek].maxScore = accuracy;
    }
    if (accuracy === 100) {
        history[activeWeek].perfectCount += 1;
    }
    localStorageAdapter.save('anchor_audition_progress', history);
    logDebug(`Saved Progress for Week ${activeWeek}: Max Score ${history[activeWeek].maxScore}, Perfects ${history[activeWeek].perfectCount}`);

    activeContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[60vh] gap-6 flex-grow px-6 transition-all duration-300 w-full">
        <div class="w-20 h-20 bg-tertiary-fixed dark:bg-emerald-600/20 text-tertiary dark:text-emerald-400 flex items-center justify-center rounded-full mb-4 shadow-sm border border-tertiary-fixed-dim dark:border-emerald-600/30 transition-all duration-300 scale-100">
          <span class="material-symbols-outlined text-4xl">workspace_premium</span>
        </div>
        <h1 class="text-5xl md:text-6xl font-headline font-extrabold text-on-surface dark:text-stone-100 text-center">Drill Complete!</h1>
        <p class="text-xl md:text-2xl font-body text-on-surface-variant dark:text-stone-400 font-medium text-center mb-4">
          Accuracy: <span class="text-primary dark:text-emerald-400 font-bold">${accuracy}%</span>
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 mt-4">
          <button id="audRestartBtn" class="px-8 py-4 bg-surface-container-high dark:bg-stone-800 text-on-surface dark:text-stone-200 rounded-xl text-xl font-label font-bold hover:bg-surface-variant dark:hover:bg-stone-750 transition-colors duration-300">
            Play Again
          </button>
          <button id="audReturnBtn" class="px-8 py-4 bg-primary dark:bg-emerald-600 text-on-primary rounded-xl text-xl font-label font-bold hover:bg-primary/90 transition-colors duration-300 shadow-md">
            Return to Auditions
          </button>
        </div>
      </div>
    `;

    activeContainer.querySelector('#audRestartBtn').onclick = () => {
        startDrillSession(activeWeek);
    };
    activeContainer.querySelector('#audReturnBtn').onclick = () => {
        renderAuditionsTab(activeContainer, currentGamification, onBackCallback);
    };
}
