import { describe, test } from 'node:test';
import assert from 'node:assert';
import {
  THEORY_CATEGORIES,
  POPULAR_TAGS,
  getAllTheoryTopics,
  getTheoryTopicById,
  getGroupedTheoryCatalog,
  getTheoryByTag,
  searchTheoryTopics
} from '../src/core/theory-registry.js';

describe('Theory Registry validation', () => {
  test('registers exactly 30 unique theory topics', () => {
    const topics = getAllTheoryTopics();
    assert.strictEqual(topics.length, 30, 'Expected exactly 30 theory modules');
    
    const ids = new Set(topics.map(t => t.id));
    assert.strictEqual(ids.size, 30, 'Topic IDs must all be unique');
  });

  test('every topic belongs to a valid category in THEORY_CATEGORIES', () => {
    const categoryIds = new Set(THEORY_CATEGORIES.map(c => c.id));
    const topics = getAllTheoryTopics();

    for (const topic of topics) {
      assert.ok(
        categoryIds.has(topic.category),
        `Topic ${topic.id} has invalid category "${topic.category}"`
      );
      assert.ok(topic.title && typeof topic.title === 'string', `Topic ${topic.id} missing string title`);
      assert.ok(topic.icon && typeof topic.icon === 'string', `Topic ${topic.id} missing icon`);
      assert.ok(Array.isArray(topic.tags) && topic.tags.length > 0, `Topic ${topic.id} missing tags`);
      assert.ok(Array.isArray(topic.sections) && topic.sections.length > 0, `Topic ${topic.id} missing sections`);
    }
  });

  test('getGroupedTheoryCatalog groups topics across all 6 categories', () => {
    const grouped = getGroupedTheoryCatalog();
    assert.strictEqual(grouped.length, 6);
    
    const totalGrouped = grouped.reduce((sum, g) => sum + g.topics.length, 0);
    assert.strictEqual(totalGrouped, 30, 'Grouped total must equal 30 topics');
  });

  test('getTheoryTopicById resolves by direct ID and sourceId', () => {
    const topicById = getTheoryTopicById('week_1_theory');
    assert.ok(topicById, 'Should find week_1_theory by id');
    assert.strictEqual(topicById.category, 'fundamentos');

    const topicBySourceId = getTheoryTopicById('week_1');
    assert.ok(topicBySourceId, 'Should find week_1_theory by sourceId week_1');
    assert.strictEqual(topicBySourceId.id, 'week_1_theory');

    const wordTopic = getTheoryTopicById('words_gustos');
    assert.ok(wordTopic, 'Should find word topic theory by sourceId words_gustos');
    assert.strictEqual(wordTopic.category, 'reflexivos');
  });

  test('getTheoryByTag correctly filters by tag', () => {
    const pastTopics = getTheoryByTag('pasado');
    assert.ok(pastTopics.length >= 5, 'Expected at least 5 past tense topics');
    for (const topic of pastTopics) {
      assert.ok(
        topic.tags.includes('pasado') || topic.category === 'pasado',
        `Topic ${topic.id} does not match tag 'pasado'`
      );
    }
  });

  test('searchTheoryTopics performs query searching', () => {
    const preteritoMatches = searchTheoryTopics('pretérito');
    assert.ok(preteritoMatches.length >= 3, 'Should find preterito topics');

    const emptyMatches = searchTheoryTopics('nonexistent_word_xyz_123');
    assert.strictEqual(emptyMatches.length, 0);

    const allMatches = searchTheoryTopics('');
    assert.strictEqual(allMatches.length, 30);
  });
});
