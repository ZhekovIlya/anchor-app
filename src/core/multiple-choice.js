// ========================
// MULTIPLE CHOICE DRILL ENGINE
// ========================
// Pure logic — no DOM, no browser APIs.
// Generates MC questions from phrase arrays with distractor selection.

import { XP_REWARDS } from './gamification.js';

/**
 * Fisher-Yates shuffle (in-place).
 * @param {Array} arr
 * @returns {Array} the same array, shuffled
 */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Create a Multiple Choice drill engine.
 *
 * @param {Object} options
 * @param {Array}   options.phrases      - Array of phrase objects (hydrated with .meta.id, .es, .ru, .uk)
 * @param {Object}  options.srs          - SRS engine instance (from createSRS)
 * @param {Object}  [options.gamification] - Gamification engine (optional)
 * @param {Function} [options.onCorrect] - Called after correct answer with (phrase)
 * @param {Function} [options.onWrong]   - Called after wrong answer with (phrase)
 * @param {Function} [options.onComplete] - Called when all phrases answered
 * @returns {Object} MC Engine API
 */
export function createMCEngine({ phrases, srs, gamification, onCorrect, onWrong, onComplete }) {
  let queue = [];
  let currentIndex = 0;
  let score = { correct: 0, wrong: 0 };
  let finished = false;

  /**
   * Generate 3 distractor options from other phrases in the pool.
   * @param {Object} correctPhrase - the correct phrase
   * @returns {string[]} array of 3 distractor `.es` strings
   */
  function generateDistractors(correctPhrase) {
    // Collect all unique .es values that are not the correct answer
    const candidates = phrases
      .filter(p => p.es !== correctPhrase.es)
      .map(p => p.es);

    // Deduplicate
    const unique = [...new Set(candidates)];

    // Shuffle and take up to 3
    shuffle(unique);
    const distractors = unique.slice(0, 3);

    // If not enough unique distractors (< 3), pad with duplicates from candidates
    while (distractors.length < 3) {
      // Use original candidates array (may have duplicates), pick a random one
      if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        // Avoid identical consecutive duplicates at least
        if (distractors.length === 0 || distractors[distractors.length - 1] !== pick) {
          distractors.push(pick);
        } else {
          // Just push to fill even if duplicate
          distractors.push(pick);
        }
      } else {
        // Edge case: only 1 phrase total — use the phrase itself with a marker
        // This should never happen in practice (lessons have 6 phrases)
        distractors.push(correctPhrase.es + '?');
      }
    }

    return distractors;
  }

  return {
    /**
     * Start (or restart) the MC drill.
     */
    start() {
      queue = shuffle([...phrases]);
      currentIndex = 0;
      score = { correct: 0, wrong: 0 };
      finished = false;
    },

    /**
     * Get the current MC question.
     * @returns {{ prompt: string, promptLang: { ru: string, uk: string }, options: string[], correctIndex: number, phrase: Object } | null}
     */
    getCurrentQuestion() {
      if (finished || currentIndex >= queue.length) return null;

      const phrase = queue[currentIndex];
      const distractors = generateDistractors(phrase);

      // Build options array: correct + 3 distractors
      const options = [phrase.es, ...distractors];
      shuffle(options);

      const correctIndex = options.indexOf(phrase.es);

      return {
        prompt: phrase.ru, // UI will pick ru or uk based on getPromptLang()
        promptRu: phrase.ru,
        promptUk: phrase.uk,
        options,
        correctIndex,
        phrase,
      };
    },

    /**
     * Submit an answer by option index.
     * @param {number} index - selected option index (0–3)
     * @returns {{ correct: boolean, correctAnswer: string, phrase: Object }}
     */
    submitAnswer(index) {
      if (finished || currentIndex >= queue.length) {
        return { correct: false, correctAnswer: '', phrase: null };
      }

      const phrase = queue[currentIndex];
      const question = this.getCurrentQuestion();
      const correct = index === question.correctIndex;

      if (correct) {
        score.correct++;
        // SRS: promote on correct
        if (phrase.meta && phrase.meta.id) {
          srs.promote(phrase.meta.id);
        }
        // Gamification: award XP per correct MC answer
        if (gamification) {
          gamification.addXP(XP_REWARDS.mcCorrect);
        }
        if (onCorrect) onCorrect(phrase);
      } else {
        score.wrong++;
        // SRS: demote on wrong
        if (phrase.meta && phrase.meta.id) {
          srs.demote(phrase.meta.id);
        }
        if (onWrong) onWrong(phrase);
      }

      currentIndex++;

      // Check completion
      if (currentIndex >= queue.length) {
        finished = true;
        if (onComplete) onComplete();
      }

      return {
        correct,
        correctAnswer: phrase.es,
        phrase,
      };
    },

    /**
     * Get the current score.
     * @returns {{ correct: number, wrong: number }}
     */
    getScore() {
      return { ...score };
    },

    /**
     * Get total number of questions.
     * @returns {number}
     */
    getTotal() {
      return queue.length;
    },

    /**
     * Get current progress (0-indexed question number).
     * @returns {number}
     */
    getProgress() {
      return currentIndex;
    },

    /**
     * Check if the drill is finished.
     * @returns {boolean}
     */
    isFinished() {
      return finished;
    },
  };
}
