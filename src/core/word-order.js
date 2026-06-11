// ========================
// WORD-ORDER PUZZLE ENGINE
// ========================
// Pure logic — no DOM, no browser APIs.
// Splits Spanish phrases into shuffled words for reordering puzzles.

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
 * Check if two arrays have identical elements in the same order.
 * @param {string[]} a
 * @param {string[]} b
 * @returns {boolean}
 */
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Create a Word-Order Puzzle drill engine.
 *
 * @param {Object} options
 * @param {Array}   options.phrases       - Array of phrase objects (hydrated with .meta.id, .es, .ru, .uk)
 * @param {Object}  options.srs           - SRS engine instance (from createSRS)
 * @param {Object}  [options.gamification] - Gamification engine (optional)
 * @param {Function} [options.onCorrect]  - Called after correct answer with (phrase)
 * @param {Function} [options.onWrong]    - Called after wrong answer with (phrase)
 * @param {Function} [options.onComplete] - Called when all phrases answered
 * @returns {Object} Word-Order Engine API
 */
export function createWordOrderEngine({ phrases, srs, gamification, onCorrect, onWrong, onComplete }) {
  let queue = [];
  let currentIndex = 0;
  let score = { correct: 0, wrong: 0 };
  let finished = false;

  /**
   * Split the Spanish text into words and shuffle them.
   * Re-shuffles if the shuffled order matches the correct order.
   * @param {string} esText
   * @returns {{ shuffledWords: string[], correctOrder: string[] }}
   */
  function splitAndShuffle(esText) {
    const correctOrder = esText.split(' ');
    const shuffledWords = [...correctOrder];

    // Shuffle, re-shuffle if it matches correct order (up to 10 attempts)
    let attempts = 0;
    do {
      shuffle(shuffledWords);
      attempts++;
    } while (arraysEqual(shuffledWords, correctOrder) && attempts < 10 && correctOrder.length > 1);

    return { shuffledWords, correctOrder };
  }

  return {
    /**
     * Start (or restart) the word-order drill.
     */
    start() {
      queue = shuffle([...phrases]);
      currentIndex = 0;
      score = { correct: 0, wrong: 0 };
      finished = false;
    },

    /**
     * Get the current puzzle.
     * @returns {{ prompt: string, promptRu: string, promptUk: string, shuffledWords: string[], correctOrder: string[], phrase: Object } | null}
     */
    getCurrentPuzzle() {
      if (finished || currentIndex >= queue.length) return null;

      const phrase = queue[currentIndex];
      const { shuffledWords, correctOrder } = splitAndShuffle(phrase.es);

      return {
        prompt: phrase.ru,
        promptRu: phrase.ru,
        promptUk: phrase.uk,
        shuffledWords,
        correctOrder,
        phrase,
      };
    },

    /**
     * Submit ordered words for the current puzzle.
     * @param {string[]} orderedWords - the user's word arrangement
     * @returns {{ correct: boolean, correctAnswer: string, phrase: Object }}
     */
    submitOrder(orderedWords) {
      if (finished || currentIndex >= queue.length) {
        return { correct: false, correctAnswer: '', phrase: null };
      }

      const phrase = queue[currentIndex];
      const correctOrder = phrase.es.split(' ');
      const correct = arraysEqual(orderedWords, correctOrder);

      if (correct) {
        score.correct++;
        // SRS: promote on correct
        if (phrase.meta && phrase.meta.id) {
          srs.promote(phrase.meta.id);
        }
        // Gamification: award XP per correct word-order answer
        if (gamification) {
          gamification.addXP(XP_REWARDS.wordOrderCorrect);
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
     * Get total number of puzzles.
     * @returns {number}
     */
    getTotal() {
      return queue.length;
    },

    /**
     * Get current progress (0-indexed puzzle number).
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
