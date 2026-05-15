// ========================
// DRILL STATE MACHINE
// ========================
// Pure logic — no DOM, no browser APIs.
// Supports two modes: 'sentence' and 'word'.

import { STREAK_TARGETS, COPY_STAGE_THRESHOLDS, DRILL_MODE } from './constants.js';

/**
 * Create a drill engine instance.
 *
 * @param {Object} options
 * @param {Array}   options.phrases       - Array of phrase/word objects for this drill
 * @param {boolean} options.isExam        - Whether this is a final exam lesson
 * @param {boolean} options.isTabExam     - Whether this is a tab-scoped exam
 * @param {boolean} options.isReview      - Whether this is a daily SRS review
 * @param {string}  options.mode          - 'sentence' or 'word' (from DRILL_MODE)
 * @param {Object}  options.srs           - SRS engine instance (from createSRS)
 * @param {Object}  options.callbacks     - UI callbacks
 */
export function createDrillEngine(options) {
  const { phrases, isExam, isTabExam, isReview, srs, callbacks, mode = DRILL_MODE.SENTENCE } = options;

  const isWordMode = mode === DRILL_MODE.WORD;

  let streak = 0;
  let targetStreak;

  if (isWordMode) {
    targetStreak = isExam
      ? STREAK_TARGETS.wordExam
      : (isReview ? Math.min(phrases.length, STREAK_TARGETS.word) : STREAK_TARGETS.word);
  } else {
    targetStreak = isTabExam
      ? STREAK_TARGETS.tabExam
      : isExam
        ? STREAK_TARGETS.exam
        : (isReview ? Math.min(phrases.length, STREAK_TARGETS.regular) : STREAK_TARGETS.regular);
  }

  const initialTargetStreak = targetStreak;
  let failedPhrases = [];
  let drawingDeck = [];
  let currentPhrase = null;

  const copyThreshold = isWordMode
    ? COPY_STAGE_THRESHOLDS.word
    : COPY_STAGE_THRESHOLDS.sentence;

  function pickNextPhrase() {
    if (streak >= initialTargetStreak && failedPhrases.length > 0) {
      currentPhrase = failedPhrases.shift();
    } else {
      if (drawingDeck.length === 0) {
        drawingDeck = [...phrases].sort(() => Math.random() - 0.5);
      }
      currentPhrase = drawingDeck.pop();
    }
  }

  function getStage() {
    return !isExam && streak < copyThreshold;
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
        streak,
        targetStreak,
      });
    },

    checkAnswer(userInput) {
      const correct = userInput.trim().toLowerCase() === currentPhrase.es.toLowerCase();
      return { correct, phrase: currentPhrase };
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
            streak,
            targetStreak,
          });
        }
      });
    },

    revealAnswer() {
      targetStreak++;
      failedPhrases.push(currentPhrase);

      if (currentPhrase.meta && currentPhrase.meta.id) {
        srs.demote(currentPhrase.meta.id);
      }

      callbacks.onRevealUpdate(streak, targetStreak);
    },

    getState() {
      return {
        currentPhrase,
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
