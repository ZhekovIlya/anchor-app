// ========================
// DATA LOADER
// ========================
// Assembles topics array from ES module data files.
// Builds global phrase bank for SRS lookups.
// Pure logic — no DOM.

import week1Data from '../../data/week_1.js';
import week2Data from '../../data/week_2.js';
import week3Data from '../../data/week_3.js';
import week4Data from '../../data/week_4.js';
import topicsCoreData from '../../data/topics_core.js';

import { tokenize } from './tokenizer.js';

/**
 * Load all topic modules, hydrate tokens and meta IDs, and return the assembled topics array.
 * @returns {Array} topics
 */
export function loadAllTopics() {
  const topics = [week1Data, week2Data, week3Data, week4Data];

  // Hydrate tokens + auto-generate meta.id at load time
  for (const topic of topics) {
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
 * Build a flat phrase lookup table: { [meta.id]: phraseObject }
 * Skips legacy topics and exam lessons.
 * @param {Array} topics
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
