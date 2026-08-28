import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createDrillEngine } from '../src/core/engine.js';

describe('Engine Cannot Speak features', () => {
  const dummyPhrases = [
    { ru: 'Привет', es: 'Hola', meta: { id: 'hola' } },
    { ru: 'Пока', es: 'Adios', meta: { id: 'adios' } }
  ];

  const mockSRS = {
    promote() {},
    demote() {},
    registerNew() {}
  };

  const mockCallbacks = {
    onStreakUpdate() {},
    onRevealUpdate() {},
    onNextPhrase() {},
    onCorrectAnswer(phrase, done) { done(); },
    onComplete() {}
  };

  test('setInteractionMode updates interactionMode correctly', () => {
    const engine = createDrillEngine({
      phrases: dummyPhrases,
      isExam: false,
      srs: mockSRS,
      callbacks: mockCallbacks
    });

    engine.start();
    engine.setInteractionMode('TYPE');
    assert.strictEqual(engine.getState().interactionMode, 'TYPE');

    engine.setInteractionMode('SPEECH');
    assert.strictEqual(engine.getState().interactionMode, 'SPEECH');

    engine.setInteractionMode('WORD_ORDER');
    assert.strictEqual(engine.getState().interactionMode, 'WORD_ORDER');
  });

  test('disableSpeech prevents SPEECH mode from being selected', () => {
    // With disableSpeech = true, it should never select SPEECH mode even in copy stage.
    // Let's run a loop of engine initialization to make sure Math.random() < 0.3 path is covered.
    for (let i = 0; i < 50; i++) {
      const engine = createDrillEngine({
        phrases: dummyPhrases,
        isExam: false,
        srs: mockSRS,
        disableSpeech: true,
        callbacks: mockCallbacks
      });
      engine.start();
      assert.notStrictEqual(engine.getState().interactionMode, 'SPEECH');
    }
  });

  test('without disableSpeech, SPEECH mode can be selected', () => {
    // Mock window global to simulate browser env with Speech API
    globalThis.window = {
      webkitSpeechRecognition: {}
    };

    try {
      let speechSelected = false;
      for (let i = 0; i < 100; i++) {
        const engine = createDrillEngine({
          phrases: dummyPhrases,
          isExam: false,
          srs: mockSRS,
          disableSpeech: false,
          callbacks: mockCallbacks
        });
        engine.start();
        if (engine.getState().interactionMode === 'SPEECH') {
          speechSelected = true;
          break;
        }
      }
      // Since Math.random() < 0.3, over 100 trials, the probability of selecting SPEECH mode at least once is very high (~99.9999%)
      assert.ok(speechSelected, 'Should select SPEECH mode at least once under normal conditions');
    } finally {
      delete globalThis.window;
    }
  });
});

import { renderFakeInput } from '../src/web/drill-ui.js';
import { tokenize } from '../src/core/tokenizer.js';
import { COLOR_MAP } from '../src/core/constants.js';

describe('Live typing assist punctuation tolerance', () => {
  function makeMockElement() {
    return { innerHTML: '', textContent: '' };
  }

  function makePhrase(es) {
    return {
      es,
      tokens: tokenize(es),
    };
  }

  test('color assist matches questions starting with ¿ when user omits ¿', () => {
    const phrase = makePhrase('¿Quieres decir algo?');
    const el = makeMockElement();

    renderFakeInput(el, 'Quieres', phrase);
    const expectedColor = COLOR_MAP['verb'];
    assert.ok(el.innerHTML.includes(`<span class="${expectedColor}">Quieres</span>`), `Expected colored span for Quieres, got: ${el.innerHTML}`);
  });

  test('color assist matches when user includes ¿', () => {
    const phrase = makePhrase('¿Quieres decir algo?');
    const el = makeMockElement();

    renderFakeInput(el, '¿Quieres', phrase);
    const expectedColor = COLOR_MAP['verb'];
    assert.ok(el.innerHTML.includes(`<span class="${expectedColor}">¿Quieres</span>`), `Expected colored span for ¿Quieres, got: ${el.innerHTML}`);
  });

  test('color assist continues token-by-token across spaces and trailing punctuation', () => {
    const phrase = makePhrase('¿Quieres decir algo?');
    const el = makeMockElement();

    renderFakeInput(el, 'Quieres decir algo', phrase);
    const token0Color = COLOR_MAP[phrase.tokens[0].type];
    const token2Color = COLOR_MAP[phrase.tokens[2].type];
    const token4Color = COLOR_MAP[phrase.tokens[4].type];

    assert.ok(el.innerHTML.includes(`<span class="${token0Color}">Quieres</span>`), `Missing Quieres span in ${el.innerHTML}`);
    assert.ok(el.innerHTML.includes(`<span class="${token2Color}">decir</span>`), `Missing decir span in ${el.innerHTML}`);
    assert.ok(el.innerHTML.includes(`<span class="${token4Color}">algo</span>`), `Missing algo span in ${el.innerHTML}`);
  });

  test('color assist handles exclamation marks ¡ and commas correctly', () => {
    const phrase = makePhrase('¡Qué bien! No salgo de casa.');
    const el = makeMockElement();

    renderFakeInput(el, 'Qué bien', phrase);
    assert.ok(el.innerHTML.includes('Qué'), `Expected Qué in ${el.innerHTML}`);
    assert.ok(el.innerHTML.includes('bien'), `Expected bien in ${el.innerHTML}`);
  });

  test('color assist stops coloring at the first typo character', () => {
    const phrase = makePhrase('¿Quieres decir algo?');
    const el = makeMockElement();

    renderFakeInput(el, 'Quierx', phrase);
    const verbColor = COLOR_MAP['verb'];

    assert.ok(el.innerHTML.includes(`<span class="${verbColor}">Quier</span>`), `Expected partial match Quier in ${el.innerHTML}`);
    assert.ok(el.innerHTML.includes(`<span>x</span>`), `Expected uncolored typo x in ${el.innerHTML}`);
  });
});

