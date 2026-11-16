// ========================
// REELS QUEUE
// ========================
// Pure logic — no DOM, no browser APIs.
// Decides which words a Telegram reels session shows, using the app's own word
// ids and SRS pool: due reviews first (mistakes first, then most overdue), then
// new words in curriculum order.

/**
 * Flat, ordered index of every drillable word (exam lessons skipped).
 * @param {Array} wordTopics - loadAllData().words (hydrated: word.meta.id set)
 * @returns {{ order: string[], byId: Object }} byId[id] = { id, es, ru, uk, topicId, topicTitle, lessonId, lessonTitle }
 */
export function buildWordIndex(wordTopics) {
  const order = [];
  const byId = {};
  for (const topic of wordTopics) {
    for (const lesson of topic.lessons) {
      if (lesson.exam) continue;
      for (const word of lesson.words || []) {
        const id = word.meta && word.meta.id;
        if (!id || byId[id]) continue;
        byId[id] = {
          id,
          es: word.es,
          ru: word.ru,
          uk: word.uk,
          topicId: topic.id,
          topicTitle: topic.title,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
        };
        order.push(id);
      }
    }
  }
  return { order, byId };
}

/**
 * Pick the cards for one session.
 * @param {Object} params
 * @param {Object} params.index - from buildWordIndex
 * @param {Object} params.srsWords - SRS pool { [id]: { bucket, dueDate, isMistake } }
 * @param {number} params.now - current time (ms)
 * @param {number} [params.size=12] - cards per session
 * @param {string|null} [params.topicId] - only words from this topic
 * @returns {Array<{ id: string, isNew: boolean }>}
 */
export function buildReelsQueue({ index, srsWords, now, size = 12, topicId = null }) {
  const inScope = (id) => !topicId || index.byId[id].topicId === topicId;
  // Array#sort is stable, so ties keep curriculum order
  const due = index.order
    .filter((id) => inScope(id) && srsWords[id] && srsWords[id].dueDate <= now)
    .sort((a, b) => (Number(Boolean(srsWords[b].isMistake)) - Number(Boolean(srsWords[a].isMistake)))
      || (srsWords[a].dueDate - srsWords[b].dueDate));
  const fresh = index.order.filter((id) => inScope(id) && !srsWords[id]);
  return [
    ...due.slice(0, size).map((id) => ({ id, isNew: false })),
    ...fresh.slice(0, Math.max(0, size - due.length)).map((id) => ({ id, isNew: true })),
  ];
}

/**
 * Put a missed card back into the queue so it comes round again `gap` cards
 * later (or at the end), at most `maxRepeats` times per word per session.
 * @param {Array} queue - session queue
 * @param {number} position - index of the missed card
 * @returns {Array} new queue (input untouched)
 */
export function requeueMissed(queue, position, { gap = 3, maxRepeats = 2 } = {}) {
  const item = queue[position];
  if (!item) return queue;
  const repeats = queue.filter((card) => card.id === item.id).length - 1;
  if (repeats >= maxRepeats) return queue;
  const next = [...queue];
  next.splice(Math.min(position + gap, next.length), 0, { id: item.id, isNew: false });
  return next;
}

/**
 * Per-topic word counts for /topics and /progress.
 * @returns {Array<{ topicId, title, total, seen, mastered, due }>} in curriculum order
 */
export function topicProgress(index, srsWords, now, masteredBucket = 3) {
  const rows = new Map();
  for (const id of index.order) {
    const word = index.byId[id];
    if (!rows.has(word.topicId)) {
      rows.set(word.topicId, { topicId: word.topicId, title: word.topicTitle, total: 0, seen: 0, mastered: 0, due: 0 });
    }
    const row = rows.get(word.topicId);
    const entry = srsWords[id];
    row.total++;
    if (!entry) continue;
    row.seen++;
    if (entry.bucket >= masteredBucket) row.mastered++;
    if (entry.dueDate <= now) row.due++;
  }
  return [...rows.values()];
}
