// ========================
// DATA LOADER
// ========================
// Assembles all content from ES module data files.
// Returns { sentences, theory, words } structure.
// Pure logic — no DOM.

import week1Data from '../../data/sentences/week_1.js';
import week2Data from '../../data/sentences/week_2.js';
import week3Data from '../../data/sentences/week_3.js';
import week4Data from '../../data/sentences/week_4.js';
import week5Data from '../../data/sentences/week_5.js';
import week6Data from '../../data/sentences/week_6.js';
import week7Data from '../../data/sentences/week7.js';

import theoryVerbs from '../../data/theory/verbs_and_irregulars.js';
import theoryIrregularFull from '../../data/theory/verbs_irregular_full.js';
import theoryReflexiveSpecial from '../../data/theory/verbs_reflexive_special.js';
import theoryDemonstratives from '../../data/theory/demonstrative_pronouns.js';
import theoryBridge from '../../data/theory/the_bridge.js';
import theoryCatalan from '../../data/theory/catalan_vs_castellano.js';

import wordsNumbers from '../../data/words/numbers.js';
import wordsTime from '../../data/words/time_calendar.js';
import wordsWeather from '../../data/words/weather.js';
import wordsColors from '../../data/words/colors.js';
import wordsQuestionWords from '../../data/words/question_words.js';

import readAloudData from '../../data/read_aloud.js';

import { tokenize } from './tokenizer.js';

/**
 * Load all content and return the three-pillar data structure.
 * @returns {{ sentences: Array, theory: Array, words: Array }}
 */
export function loadAllData() {
  const sentences = hydrateSentenceTopics([week1Data, week2Data, week3Data, week4Data, week5Data, week6Data, week7Data]);
  const theory = [theoryVerbs, theoryIrregularFull, theoryReflexiveSpecial, theoryDemonstratives, theoryBridge, theoryCatalan];
  const words = hydrateWordTopics([wordsNumbers, wordsTime, wordsWeather, wordsColors, wordsQuestionWords]);

  return { sentences, theory, words, readAloud: readAloudData };
}

/**
 * Legacy alias — returns just the sentence topics.
 * @returns {Array} topics
 * @deprecated Use loadAllData().sentences instead.
 */
export function loadAllTopics() {
  return loadAllData().sentences;
}

/**
 * Hydrate sentence topics: generate tokens and meta IDs.
 */
function hydrateSentenceTopics(topics) {
  for (const topic of topics) {
    topic.type = 'sentences';
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      lesson.phrases.forEach((phrase, i) => {
        phrase.tokens = tokenize(phrase.es);
        phrase.meta = { id: `${lesson.id}_p${i}` };
      });
    }
  }
  return topics;
}

/**
 * Hydrate word topics: generate meta IDs for SRS tracking.
 * Words don't need tokenization — single-word items.
 */
function hydrateWordTopics(topics) {
  for (const topic of topics) {
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      const items = lesson.words || [];
      items.forEach((word, i) => {
        word.meta = { id: `${lesson.id}_w${i}` };
      });
    }
  }
  return topics;
}

/**
 * Build a flat phrase lookup table: { [meta.id]: phraseObject }
 * Skips legacy topics and exam lessons.
 * @param {Array} topics - sentence topics
 * @returns {Object}
 */
export function buildPhraseBank(topics) {
  const bank = {};
  for (const topic of topics) {
    if (topic.legacy) continue;
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      for (const phrase of lesson.phrases) {
        bank[phrase.meta.id] = phrase;
      }
    }
  }
  return bank;
}

/**
 * Build a flat word lookup table: { [meta.id]: wordObject }
 * Skips exam lessons.
 * @param {Array} wordTopics
 * @returns {Object}
 */
export function buildWordBank(wordTopics) {
  const bank = {};
  for (const topic of wordTopics) {
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      for (const word of (lesson.words || [])) {
        bank[word.meta.id] = word;
      }
    }
  }
  return bank;
}
