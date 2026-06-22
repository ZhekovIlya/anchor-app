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
