// ========================
// DRILL UI (DOM + Input + End Screen)
// ========================
// Connects core/engine.js to the browser DOM.

import { COLOR_MAP } from '../core/constants.js';
import { createDrillEngine } from '../core/engine.js';
import { cancelSpeech, speakPrompt, speakAnswer, getPromptLang } from './speech.js';
import { showOnly } from './dashboard.js';
import { incrementCompletion } from './storage.js';

let activeEngine = null;
let isHandlingCorrect = false;

/**
 * Start a drill session and wire the engine to the DOM.
 *
 * @param {Object}  elements  - DOM refs
 * @param {Array}   phrases   - Phrase objects for this drill
 * @param {Object}  lesson    - Active lesson object
 * @param {boolean} isExam    - Is this a final exam?
 * @param {boolean} isReview  - Is this a daily review?
 * @param {Object}  srs       - SRS engine instance
 * @param {Function} onQuit   - Called when user quits / returns
 */
export function startDrill(elements, phrases, lesson, isExam, isReview, srs, onQuit) {
  const {
    drillView, lessonsView, endScreen, dashboardView,
    russianPrompt, ghostText, ghostTextContainer,
    fakeInput, inputField, streakCounter,
    revealAnswerBtn, quitDrillBtn,
    successLoader,
    restartBtn, dashboardReturnBtn,
  } = elements;

  showOnly(elements, 'drill');
  isHandlingCorrect = false;

  activeEngine = createDrillEngine({
    phrases,
    isExam,
    isReview,
    srs,
    callbacks: {
      onNextPhrase({ phrase, isCopyStage }) {
        cancelSpeech();

        const lang = getPromptLang();
        const promptText = phrase[lang] || phrase.ru;
        russianPrompt.textContent = promptText;
        ghostText.textContent = phrase.es;

        if (isCopyStage) {
          ghostText.style.transition = '';
          ghostText.classList.remove('opacity-0');
          ghostText.classList.add('opacity-30');
          revealAnswerBtn.classList.add('hidden');
        } else {
          ghostText.style.transition = 'none';
          ghostText.classList.remove('opacity-30');
          ghostText.classList.add('opacity-0');
          revealAnswerBtn.classList.remove('hidden');
        }

        resetInput(elements);
        speakPrompt(promptText);
      },

      onStreakUpdate(streak, target) {
        streakCounter.textContent = `${streak} / ${target}`;
      },

      onCorrectAnswer(phrase, done) {
        inputField.disabled = true;
        successLoader?.classList.remove('hidden');

        speakAnswer(phrase.es, () => {
          successLoader?.classList.add('hidden');
          inputField.disabled = false;
          inputField.focus();
          isHandlingCorrect = false;
          done();
        });
      },

      onRevealUpdate(streak, target) {
        streakCounter.textContent = `${streak} / ${target}`;
      },

      onComplete() {
        showOnly(elements, 'end');
        incrementCompletion(lesson.id);
      },
    },
  });

  // Wire input events
  inputField.oninput = () => {
    renderFakeInput(fakeInput, inputField.value, activeEngine.getState().currentPhrase);
    fakeInput.scrollLeft = inputField.scrollLeft;

    if (isHandlingCorrect) return;
    const { correct } = activeEngine.checkAnswer(inputField.value);
    if (correct) {
      isHandlingCorrect = true;
      activeEngine.handleCorrect();
    }
  };

  inputField.onscroll = () => {
    fakeInput.scrollLeft = inputField.scrollLeft;
  };

  // Reveal answer
  revealAnswerBtn.onclick = () => {
    activeEngine.revealAnswer();
    ghostText.style.transition = '';
    void ghostText.offsetHeight; // force reflow so transition applies
    ghostText.classList.remove('opacity-0');
    ghostText.classList.add('opacity-30');
    revealAnswerBtn.classList.add('hidden');
    inputField.focus();
  };

  // Quit drill
  quitDrillBtn.onclick = onQuit;

  // End screen buttons
  restartBtn.onclick = () => {
    startDrill(elements, phrases, lesson, isExam, isReview, srs, onQuit);
  };
  dashboardReturnBtn.onclick = onQuit;

  // Start
  activeEngine.start();
  inputField.focus();
}

/**
 * Reset the input field.
 */
function resetInput(elements) {
  elements.inputField.value = '';
  elements.fakeInput.innerHTML = '';
}

/**
 * Render the color-coded fake input overlay.
 */
function renderFakeInput(fakeInputEl, userInput, currentPhrase) {
  let html = '';
  let remainingInput = userInput;

  for (const token of currentPhrase.tokens) {
    if (remainingInput.length === 0) break;

    const lowerRemaining = remainingInput.toLowerCase();
    const lowerToken = token.text.toLowerCase();

    if (lowerRemaining.startsWith(lowerToken)) {
      const typedPortion = remainingInput.substring(0, token.text.length);
      const colorClass = COLOR_MAP[token.type] || '';
      html += `<span class="${colorClass}">${typedPortion}</span>`;
      remainingInput = remainingInput.substring(token.text.length);
    } else {
      html += `<span>${remainingInput}</span>`;
      remainingInput = '';
      break;
    }
  }

  if (remainingInput.length > 0) {
    html += `<span>${remainingInput}</span>`;
  }

  fakeInputEl.innerHTML = html;
}
