// ========================
// DRILL STATE MACHINE
// ========================
// Pure logic — no DOM, no browser APIs.
// Supports unified game modes for sentence drills.

import { STREAK_TARGETS, COPY_STAGE_THRESHOLDS, DRILL_MODE } from './constants.js';

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

export function createDrillEngine(options) {
  const { phrases, isExam, isTabExam, isReview, srs, callbacks, mode = DRILL_MODE.SENTENCE, disableSpeech = false } = options;

  const isWordMode = mode === DRILL_MODE.WORD;

  let streak = 0;
  let targetStreak;

  if (isWordMode) {
    targetStreak = isExam ? STREAK_TARGETS.wordExam : (isReview ? Math.min(phrases.length, STREAK_TARGETS.word) : STREAK_TARGETS.word);
  } else {
    targetStreak = isTabExam ? STREAK_TARGETS.tabExam : isExam ? STREAK_TARGETS.exam : (isReview ? Math.min(phrases.length, STREAK_TARGETS.regular) : STREAK_TARGETS.regular);
  }

  const initialTargetStreak = targetStreak;
  let failedPhrases = [];
  let drawingDeck = [];
  let currentPhrase = null;
  let currentInteractionMode = 'TYPE'; // 'TYPE', 'MC', 'WORD_ORDER'
  let currentQuestionData = null; 

  const copyThreshold = isWordMode ? COPY_STAGE_THRESHOLDS.word : COPY_STAGE_THRESHOLDS.sentence;

  function getStage() {
    return !isExam && streak < copyThreshold;
  }

  function pickNextPhrase() {
    if (streak >= initialTargetStreak && failedPhrases.length > 0) {
      currentPhrase = failedPhrases.shift();
    } else {
      if (drawingDeck.length === 0) {
        drawingDeck = [...phrases].sort(() => Math.random() - 0.5);
      }
      currentPhrase = drawingDeck.pop();
    }
    prepareInteractionMode();
  }

  function prepareInteractionMode() {
    if (isWordMode) {
      currentInteractionMode = 'TYPE';
      currentQuestionData = null;
      return;
    }

    const isCopyStage = getStage();
    if (isCopyStage) {
      const hasSpeechAPI = (typeof window !== 'undefined') && (('webkitSpeechRecognition' in window) || ('SpeechRecognition' in window));
      if (!disableSpeech && hasSpeechAPI && Math.random() < 0.3) {
        currentInteractionMode = 'SPEECH';
      } else {
        currentInteractionMode = 'TYPE';
      }
      currentQuestionData = null;
      return;
    }

    // Recall Stage: Mix of typing, multiple choice, word order, and listening
    const rand = Math.random();
    if (rand < 0.15) {
      currentInteractionMode = 'LISTENING';
      currentQuestionData = null;
    } else if (rand < 0.35) {
      currentInteractionMode = 'WORD_ORDER';
      currentQuestionData = generateWOData(currentPhrase);
    } else if (rand < 0.5) {
      currentInteractionMode = 'MC';
      currentQuestionData = generateMCData(currentPhrase);
    } else {
      currentInteractionMode = 'TYPE';
      currentQuestionData = null;
    }
  }

  function generateMCData(correctPhrase) {
    const candidates = phrases.filter(p => p.es !== correctPhrase.es).map(p => p.es);
    const unique = [...new Set(candidates)];
    shuffle(unique);
    const distractors = unique.slice(0, 3);
    while (distractors.length < 3) {
      if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        if (distractors.length === 0 || distractors[distractors.length - 1] !== pick) {
          distractors.push(pick);
        } else {
          distractors.push(pick);
        }
      } else {
        distractors.push(correctPhrase.es + '?');
      }
    }
    const options = [correctPhrase.es, ...distractors];
    shuffle(options);
    return {
      options,
      correctIndex: options.indexOf(correctPhrase.es)
    };
  }

  function generateWOData(correctPhrase) {
    const correctOrder = correctPhrase.es.split(' ');
    
    // Build a pool of distractors from all phrases
    const allWords = [];
    phrases.forEach(p => {
      if (p.es !== correctPhrase.es) {
        allWords.push(...p.es.split(' '));
      }
    });
    
    // Pick 2 random distractors
    const extraWords = [];
    for (let i = 0; i < 2; i++) {
      if (allWords.length > 0) {
        const randWord = allWords[Math.floor(Math.random() * allWords.length)];
        extraWords.push(randWord);
      }
    }

    const shuffledWords = [...correctOrder, ...extraWords];
    let attempts = 0;
    do {
      shuffle(shuffledWords);
      attempts++;
    } while (arraysEqual(shuffledWords, correctOrder) && attempts < 10);
    
    return {
      shuffledWords,
      correctOrder
    };
  }

  return {
    start() {
      streak = 0;
      failedPhrases = [];
      drawingDeck = [];
      pickNextPhrase();
      callbacks.onStreakUpdate(streak, targetStreak);
      callbacks.onNextPhrase({
        phrase: currentPhrase,
        isCopyStage: getStage(),
        interactionMode: currentInteractionMode,
        questionData: currentQuestionData,
        streak,
        targetStreak,
      });
    },

    checkAnswer(userInput, isSubmit = false) {
      const cleanInput = userInput.replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
      const cleanTarget = currentPhrase.es.replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim().toLowerCase();
      
      const exactMatch = cleanInput === cleanTarget;
      if (exactMatch) return { correct: true, phrase: currentPhrase, exact: true };
      
      if (isSubmit) {
        const superCleanInput = cleanInput.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const superCleanTarget = cleanTarget.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        const dist = levenshtein(superCleanInput, superCleanTarget);
        const threshold = Math.max(1, Math.floor(superCleanTarget.length / 6));
        
        if (dist <= threshold) {
          return { correct: true, phrase: currentPhrase, exact: false, typo: true };
        }
      }
      
      return { correct: false, phrase: currentPhrase };
    },

    submitMCAnswer(selectedIndex) {
      const correct = selectedIndex === currentQuestionData.correctIndex;
      return { correct, correctAnswer: currentPhrase.es, phrase: currentPhrase };
    },

    submitWOAnswer(orderedWords) {
      const correct = arraysEqual(orderedWords, currentQuestionData.correctOrder);
      return { correct, correctAnswer: currentPhrase.es, phrase: currentPhrase };
    },

    handleCorrect() {
      if (currentPhrase.meta && currentPhrase.meta.id) {
        if (isReview) {
          srs.promote(currentPhrase.meta.id);
        } else {
          srs.registerNew(currentPhrase.meta.id);
        }
      }

      streak++;
      callbacks.onStreakUpdate(streak, targetStreak);

      callbacks.onCorrectAnswer(currentPhrase, () => {
        if (streak >= targetStreak) {
          callbacks.onComplete();
        } else {
          pickNextPhrase();
          callbacks.onNextPhrase({
            phrase: currentPhrase,
            isCopyStage: getStage(),
            interactionMode: currentInteractionMode,
            questionData: currentQuestionData,
            streak,
            targetStreak,
          });
        }
      });
    },

    handleWrong() {
      targetStreak++;
      failedPhrases.push(currentPhrase);

      if (currentPhrase.meta && currentPhrase.meta.id) {
        srs.demote(currentPhrase.meta.id);
      }

      callbacks.onRevealUpdate(streak, targetStreak);
    },

    nextPhraseAfterWrong() {
      pickNextPhrase();
      callbacks.onNextPhrase({
        phrase: currentPhrase,
        isCopyStage: getStage(),
        interactionMode: currentInteractionMode,
        questionData: currentQuestionData,
        streak,
        targetStreak,
      });
    },

    setInteractionMode(mode) {
      currentInteractionMode = mode;
    },

    getState() {
      return {
        currentPhrase,
        interactionMode: currentInteractionMode,
        questionData: currentQuestionData,
        streak,
        targetStreak,
        initialTargetStreak,
        isCopyStage: getStage(),
        isExam,
        isReview,
        mode,
      };
    },
  };
}
