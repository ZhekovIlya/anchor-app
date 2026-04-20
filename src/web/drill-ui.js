// ========================
// DRILL UI (DOM + Input + End Screen)
// ========================
// Connects core/engine.js to the browser DOM.

import { COLOR_MAP } from '../core/constants.js';
import { createDrillEngine } from '../core/engine.js';
import { cancelSpeech, speakPrompt, speakAnswer, getPromptLang } from './speech.js';
import { showOnly, calcProgressPercent, EXAM_MASTERED_THRESHOLD, LESSON_MASTERED_THRESHOLD } from './dashboard.js';
import { incrementCompletion, getCompletionCount } from './storage.js';

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
export function startDrill(elements, phrases, topic, lesson, isExam, isReview, srs, onQuit) {
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

        const previousCount = getCompletionCount(lesson.id);
        incrementCompletion(lesson.id);
        const newCount = previousCount + 1;

        elements.endScreenProgressContainer.classList.add('hidden', 'opacity-0');
        elements.endScreenIconBox.className = 'w-20 h-20 flex items-center justify-center rounded-full mb-4 shadow-sm border transition-colors transition-transform scale-100';
        
        let title = '';
        let subtitle = '';
        let icon = '';
        let iconColorClass = '';

        if (previousCount === 0) {
          title = isExam ? 'Exam Completed!' : 'Lesson Completed!';
          subtitle = 'Week progress updated.';
          icon = 'check_circle';
          iconColorClass = 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]';
          
          if (topic) {
            elements.endScreenProgressContainer.classList.remove('hidden');
            const total = topic.lessons.length;
            const totalCompletionsRaw = topic.lessons.filter(l => getCompletionCount(l.id) >= 1).length;
            const newPctObj = total > 0 ? Math.round((totalCompletionsRaw / total) * 100) : 0;
            const oldPctObj = total > 0 ? Math.round(((totalCompletionsRaw - 1) / total) * 100) : 0;
            
            elements.endScreenProgressBar.style.width = `${Math.max(0, oldPctObj)}%`;
            elements.endScreenProgressLabel.textContent = `${newPctObj}%`;
            
            // Allow layout to render before animating target width
            requestAnimationFrame(() => {
              elements.endScreenProgressContainer.classList.remove('opacity-0');
              elements.endScreenProgressBar.style.width = `${newPctObj}%`;
            });
          }
        } else {
          if (isExam) {
            if (newCount >= EXAM_MASTERED_THRESHOLD) {
              title = 'Exam Mastered!';
              subtitle = 'Week Mastered!';
              icon = 'workspace_premium';
              iconColorClass = 'bg-[#fefce8] text-[#ca8a04] border-[#fef08a]';
            } else {
              title = 'Exam Practiced!';
              subtitle = `You need ${EXAM_MASTERED_THRESHOLD - newCount} more completions to master the exam. To master the week, master the exam.`;
              icon = 'school';
              iconColorClass = 'bg-surface-container-high text-on-surface-variant border-outline-variant/30';
            }
          } else {
            if (newCount >= LESSON_MASTERED_THRESHOLD) {
              title = 'Lesson Mastered!';
              subtitle = 'Iron-Clad Grammar Complete.';
              icon = 'workspace_premium';
              iconColorClass = 'bg-[#fefce8] text-[#ca8a04] border-[#fef08a]';
            } else {
              title = 'Lesson Practiced!';
              subtitle = `Great! You need ${LESSON_MASTERED_THRESHOLD - newCount} more completions to master this lesson.`;
              icon = 'sync';
              iconColorClass = 'bg-primary-container text-primary border-primary/30';
            }
          }
        }

        elements.endScreenTitle.textContent = title;
        elements.endScreenSubtitle.textContent = subtitle;
        elements.endScreenIcon.textContent = icon;
        elements.endScreenIconBox.className += ` ${iconColorClass}`;
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
    startDrill(elements, phrases, topic, lesson, isExam, isReview, srs, onQuit);
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
