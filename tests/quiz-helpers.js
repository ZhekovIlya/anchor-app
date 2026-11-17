// Shared fixtures for the reels quiz tests. Not a test file itself.

import { buildWordIndex } from '../src/core/reels-queue.js';

/** Deterministic random source in [0, 1). */
export function seededRandom(seed = 1) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

const W = (id, es, ru, uk) => ({ es, ru, uk, meta: { id } });

/** 9 words in two topics; plenty of distractors for every card type. */
export function quizIndex() {
  return buildWordIndex([
    { id: 't1', title: 'Cosas <&>', lessons: [{ id: 'a', title: 'A', words: [
      W('a_w0', 'el camarero', 'официант', 'офіціант'),
      W('a_w1', 'la cuenta', 'счёт', 'рахунок'),
      W('a_w2', 'la mesa', 'стол', 'стіл'),
      W('a_w3', 'el libro', 'книга', 'книжка'),
      W('a_w4', 'la silla', 'стул', 'стілець'),
      W('a_w5', 'rojo', 'красный', 'червоний'),
      W('a_w6', 'azul', 'синий', 'синій'),
    ] }] },
    { id: 't2', title: 'Números', lessons: [{ id: 'b', title: 'B', words: [
      W('b_w0', 'uno', 'один', 'один'),
      W('b_w1', 'soler + infinitivo', 'обычно делать', 'зазвичай робити'),
    ] }] },
  ]);
}

/** callback_data of the button whose label contains `label`. */
export function buttonData(view, label) {
  const found = view.reply_markup.inline_keyboard.flat().find((b) => b.text.includes(label));
  if (!found) throw new Error(`no "${label}" button in: ${view.text}`);
  return found.callback_data;
}

/** Spanish word / translation behind an option button, by its callback_data. */
export function optionLabels(view) {
  return view.reply_markup.inline_keyboard.flat().map((b) => b.text);
}
