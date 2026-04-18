// ========================
// DATA LOADER
// ========================
// Assembles topics array from ES module data files.
// Builds global phrase bank for SRS lookups.
// Pure logic — no DOM.

import week1Data from '../../data/week_1.js';
import week2Data from '../../data/week_2.js';
import week3Data from '../../data/week_3.js';
import topicsCoreData from '../../data/topics_core.js';

/**
 * Load all topic modules and return the assembled topics array.
 * @returns {Array} topics
 */
export function loadAllTopics() {
  return [week1Data, week2Data, week3Data, topicsCoreData];
}

/**
 * Build a flat phrase lookup table: { [meta.id]: phraseObject }
 * Skips legacy topics and exam lessons.
 * @param {Array} topics
 * @returns {Object}
 */
export function buildPhraseBank(topics) {
  const bank = {};
  topics.forEach(topic => {
    if (topic.legacy) return;
    topic.lessons.forEach(lesson => {
      if (lesson.exam) return;
      (lesson.phrases || []).forEach(phrase => {
        if (phrase.meta && phrase.meta.id) {
          bank[phrase.meta.id] = phrase;
        }
      });
    });
  });
  return bank;
}
