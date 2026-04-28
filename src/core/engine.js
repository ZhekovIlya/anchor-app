// ========================
// DRILL STATE MACHINE
// ========================
// Pure logic — no DOM, no browser APIs.
// Exposes callbacks for UI adapters (web or bot) to subscribe to.

import { STREAK_TARGETS, COPY_STAGE_THRESHOLD } from './constants.js';

/**
 * Create a drill engine instance.
 *
 * @param {Object} options
 * @param {Array}   options.phrases       - Array of phrase objects for this drill
 * @param {boolean} options.isExam        - Whether this is a final exam lesson
 * @param {boolean} options.isReview      - Whether this is a daily SRS review
 * @param {Object}  options.srs           - SRS engine instance (from createSRS)
 * @param {Object}  options.callbacks     - UI callbacks:
 *   - onNextPhrase({ phrase, isCopyStage, streak, targetStreak })
 *   - onStreakUpdate(streak, targetStreak)
 *   - onCorrectAnswer(phrase, callback)  — call callback() when done (e.g. after TTS)
 *   - onRevealUpdate(streak, targetStreak)
 *   - onComplete()
 */
export function createDrillEngine(options) {
  const { phrases, isExam, isTabExam, isReview, srs, callbacks } = options;

  let streak = 0;
  let targetStreak = isTabExam
    ? STREAK_TARGETS.tabExam
    : isExam
      ? STREAK_TARGETS.exam
      : (isReview ? Math.min(phrases.length, STREAK_TARGETS.regular) : STREAK_TARGETS.regular);
  const initialTargetStreak = targetStreak;
  let failedPhrases = [];
  let drawingDeck = [];
  let currentPhrase = null;

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
    const isCopyStage = !isExam && streak < COPY_STAGE_THRESHOLD;
    return isCopyStage;
  }

  return {
    /**
     * Start the drill — picks the first phrase and notifies UI.
     */
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

    /**
     * Check user input against the current phrase.
     * @param {string} userInput
     * @returns {{ correct: boolean, phrase: Object }}
     */
    checkAnswer(userInput) {
      const correct = userInput.trim().toLowerCase() === currentPhrase.es.toLowerCase();
      return { correct, phrase: currentPhrase };
    },

    /**
     * Handle a correct answer — SRS update, advance streak, trigger TTS callback.
     * The callback's `onCorrectAnswer` MUST call the provided `done()` function
     * when it's finished (e.g. after TTS completes) to advance to next phrase.
     */
    handleCorrect() {
      // SRS tracking
      if (currentPhrase.meta && currentPhrase.meta.id) {
        if (isReview) {
          srs.promote(currentPhrase.meta.id);
        } else {
          srs.registerNew(currentPhrase.meta.id);
        }
      }

      streak++;
      callbacks.onStreakUpdate(streak, targetStreak);

      // UI adapter plays TTS and calls done() when ready
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

    /**
     * Handle reveal answer — penalty, requeue phrase, SRS demote.
     */
    revealAnswer() {
      targetStreak++; // Adds 1 extra phrase to the goal
      failedPhrases.push(currentPhrase);

      if (currentPhrase.meta && currentPhrase.meta.id) {
        srs.demote(currentPhrase.meta.id);
      }

      callbacks.onRevealUpdate(streak, targetStreak);
    },

    /**
     * Get current drill state (for external inspection).
     */
    getState() {
      return {
        currentPhrase,
        streak,
        targetStreak,
        initialTargetStreak,
        isCopyStage: getStage(),
        isExam,
        isReview,
      };
    },
  };
}
