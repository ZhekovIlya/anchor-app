// ========================
// CURRICULUM AUDIT
// ========================
// Read-only report on the curriculum data the app actually loads.
//   node scripts/audit-data.js            full report
//   node scripts/audit-data.js --unknown  every word missing from data/vocabulary.js,
//                                         with an example sentence (for classifying)
// Exit code is always 0: this is a report, the tests are the gate.

import { loadAllData, buildPhraseBank, buildWordBank } from '../src/core/data-loader.js';
import vocabulary from '../data/vocabulary.js';
import * as tokenizer from '../src/core/tokenizer.js';

const normalizeWord = tokenizer.normalizeWord
  || ((word) => word.replace(/[¿?¡!,.:;]/g, '').toLowerCase());

const data = loadAllData();
const activeWeeks = data.sentences.filter((topic) => !topic.legacy);

function collectUnknownWords() {
  const unknown = new Map(); // word → { count, example }
  let tokens = 0;
  for (const topic of activeWeeks) {
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      for (const phrase of lesson.phrases) {
        for (const raw of phrase.es.split(' ')) {
          const word = normalizeWord(raw);
          if (!word) continue;
          tokens++;
          if (vocabulary[word]) continue;
          const entry = unknown.get(word) || { count: 0, example: phrase.es, lessonId: lesson.id };
          entry.count++;
          unknown.set(word, entry);
        }
      }
    }
  }
  return { unknown, tokens };
}

function reportUnknown() {
  const { unknown, tokens } = collectUnknownWords();
  const occurrences = [...unknown.values()].reduce((sum, entry) => sum + entry.count, 0);
  console.log(`${unknown.size} words missing from data/vocabulary.js (${occurrences} of ${tokens} tokens)\n`);
  const rows = [...unknown.entries()].sort((a, b) => b[1].count - a[1].count || a[0].localeCompare(b[0]));
  for (const [word, entry] of rows) {
    console.log(`${word}\t×${entry.count}\t[${entry.lessonId}] ${entry.example}`);
  }
}

function reportStructure() {
  let phrases = 0;
  let missingUk = 0;
  const wrongSize = [];
  const esCount = new Map();

  console.log('SENTENCES');
  for (const topic of data.sentences) {
    const lessons = topic.lessons.filter((lesson) => !lesson.exam);
    for (const lesson of lessons) {
      if (!topic.legacy && lesson.phrases.length !== 6) wrongSize.push(`${lesson.id}:${lesson.phrases.length}`);
      for (const phrase of lesson.phrases) {
        phrases++;
        if (!topic.legacy && !phrase.uk) missingUk++;
        if (!topic.legacy) esCount.set(phrase.es, (esCount.get(phrase.es) || 0) + 1);
      }
    }
    const tabs = (topic.tabs || []).map((tab) => {
      const count = topic.lessons.filter((lesson) => lesson.tab === tab.id && !lesson.exam).length;
      const exam = topic.lessons.some((lesson) => lesson.tab === tab.id && lesson.exam) ? '+exam' : '';
      return `${tab.id}:${count}${exam}`;
    });
    const finalExams = topic.lessons.filter((lesson) => lesson.exam && !lesson.tab).map((lesson) => lesson.id);
    console.log(
      `  ${topic.id.padEnd(18)} ${topic.legacy ? 'LEGACY ' : ''}lessons=${lessons.length} `
      + `theory=${topic.theory ? 'yes' : 'NO'} final=${finalExams.join(',') || 'none'} tabs=[${tabs.join(' ')}]`,
    );
  }

  console.log('\nWORDS');
  let words = 0;
  let wordsMissingUk = 0;
  const wordCount = new Map();
  for (const topic of data.words) {
    const lessons = topic.lessons.filter((lesson) => !lesson.exam);
    for (const lesson of lessons) {
      if ((lesson.words || []).length !== 12) wrongSize.push(`${lesson.id}:${(lesson.words || []).length}`);
      for (const word of lesson.words || []) {
        words++;
        if (!word.uk) wordsMissingUk++;
        wordCount.set(word.es, (wordCount.get(word.es) || 0) + 1);
      }
    }
    console.log(
      `  ${topic.id.padEnd(22)} lessons=${lessons.length} theory=${topic.theory ? 'yes' : 'NO'} `
      + `exam=${topic.lessons.some((lesson) => lesson.exam) ? 'yes' : 'NO'} icon=${topic.icon || 'MISSING'}`,
    );
  }

  const { unknown, tokens } = collectUnknownWords();
  const repeated = (map) => [...map.entries()].filter(([, count]) => count > 1);

  console.log('\nTOTALS');
  console.log(`  phrases: ${phrases} (drillable: ${Object.keys(buildPhraseBank(data.sentences)).length})`);
  console.log(`  words: ${words} (drillable: ${Object.keys(buildWordBank(data.words)).length})`);
  console.log(`  theory topics: ${data.theory.length} · read-aloud texts: ${data.readAloud.length}`);

  console.log('\nCHECKS');
  console.log(`  lessons with the wrong size: ${wrongSize.length ? wrongSize.join(' ') : 'none'}`);
  console.log(`  phrases without uk: ${missingUk} · words without uk: ${wordsMissingUk}`);
  console.log(`  identical es phrases in more than one lesson: ${repeated(esCount).length}`);
  console.log(`  words taught in more than one word lesson: ${repeated(wordCount).map(([word]) => word).join(', ') || 'none'}`);
  console.log(`  words missing from vocabulary.js: ${unknown.size} (of ${tokens} tokens) — run with --unknown to list them`);
}

if (process.argv.includes('--unknown')) {
  reportUnknown();
} else {
  reportStructure();
}
