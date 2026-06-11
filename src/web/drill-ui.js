// ========================
// DRILL UI (DOM + Input + End Screen)
// ========================
// Connects core/engine.js to the browser DOM.
// Supports sentence mode (colored tokens) and word mode (plain text).

import { COLOR_MAP, DRILL_MODE } from '../core/constants.js';
import { createDrillEngine } from '../core/engine.js';
import { cancelSpeech, speakPrompt, speakAnswer, getPromptLang } from './speech.js';
import { showOnly, calcProgressPercent, EXAM_MASTERED_THRESHOLD, LESSON_MASTERED_THRESHOLD } from './dashboard.js';
import { incrementCompletion, getCompletionCount } from './storage.js';
import { XP_REWARDS } from '../core/gamification.js';
import { launchConfetti, animateXPGain, showLevelUpNotification, celebrateStreakMilestone, renderEndScreenXP } from './gamification-ui.js';

let activeEngine = null;
let isHandlingCorrect = false;

/**
 * Start a drill session and wire the engine to the DOM.
 *
 * @param {Object}  elements  - DOM refs
 * @param {Array}   phrases   - Phrase/word objects for this drill
 * @param {Object}  topic     - Active topic object
 * @param {Object}  lesson    - Active lesson object
 * @param {boolean} isExam    - Is this a final exam?
 * @param {boolean} isReview  - Is this a daily review?
 * @param {Object}  srs       - SRS engine instance
 * @param {Function} onQuit   - Called when user quits / returns
 * @param {boolean} isTabExam - Is this a tab-scoped exam?
 * @param {string}  mode      - 'sentence' or 'word'
 */
export function startDrill(elements, phrases, topic, lesson, isExam, isReview, srs, onQuit, isTabExam = false, mode = DRILL_MODE.SENTENCE, gamification = null) {
  const {
    drillView, lessonsView, endScreen, dashboardView,
    russianPrompt, ghostText,
    fakeInput, inputField, streakCounter,
    revealAnswerBtn, quitDrillBtn,
    successLoader,
    restartBtn, dashboardReturnBtn,
  } = elements;

  const isWordMode = mode === DRILL_MODE.WORD;

  showOnly(elements, 'drill');
  isHandlingCorrect = false;

  activeEngine = createDrillEngine({
    phrases,
    isExam,
    isTabExam,
    isReview,
    srs,
    mode,
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
          subtitle = isWordMode ? 'Vocabulary progress updated.' : 'Week progress updated.';
          icon = 'check_circle';
          iconColorClass = 'bg-[#f0fdf4] dark:bg-emerald-950/20 text-[#16a34a] dark:text-emerald-400 border-[#bbf7d0] dark:border-emerald-600/30';

          if (topic) {
            elements.endScreenProgressContainer.classList.remove('hidden');
            const total = topic.lessons.length;
            const totalCompletionsRaw = topic.lessons.filter(l => getCompletionCount(l.id) >= 1).length;
            const newPctObj = total > 0 ? Math.round((totalCompletionsRaw / total) * 100) : 0;
            const oldPctObj = total > 0 ? Math.round(((totalCompletionsRaw - 1) / total) * 100) : 0;

            elements.endScreenProgressBar.style.width = `${Math.max(0, oldPctObj)}%`;
            elements.endScreenProgressLabel.textContent = `${newPctObj}%`;

            if (newPctObj === 100) {
              elements.endScreenProgressBar.className = 'bg-[#16a34a] dark:bg-emerald-600 h-full rounded-full transition-all duration-1000 ease-out';
              elements.endScreenProgressLabel.className = 'font-mono text-lg font-bold text-[#16a34a] dark:text-emerald-400';
            } else {
              elements.endScreenProgressBar.className = 'bg-primary dark:bg-emerald-600 h-full rounded-full transition-all duration-1000 ease-out';
              elements.endScreenProgressLabel.className = 'font-mono text-lg font-bold text-primary dark:text-emerald-400';
            }

            requestAnimationFrame(() => {
              elements.endScreenProgressContainer.classList.remove('opacity-0');
              elements.endScreenProgressBar.style.width = `${newPctObj}%`;
            });
          }
        } else {
          if (isExam) {
            if (newCount >= EXAM_MASTERED_THRESHOLD) {
              title = 'Exam Mastered!';
              subtitle = isWordMode ? 'Topic Mastered!' : 'Week Mastered!';
              icon = 'workspace_premium';
              iconColorClass = 'bg-[#fefce8] dark:bg-amber-950/20 text-[#ca8a04] dark:text-amber-400 border-[#fef08a] dark:border-yellow-600/30';
            } else {
              title = 'Exam Practiced!';
              subtitle = `You need ${EXAM_MASTERED_THRESHOLD - newCount} more completions to master the exam.`;
              icon = 'school';
              iconColorClass = 'bg-surface-container-high dark:bg-stone-800 text-on-surface-variant dark:text-stone-300 border-outline-variant/30 dark:border-stone-700/30';
            }
          } else {
            if (newCount >= LESSON_MASTERED_THRESHOLD) {
              title = 'Lesson Mastered!';
              subtitle = isWordMode ? 'Vocabulary Locked In!' : 'Iron-Clad Grammar Complete.';
              icon = 'workspace_premium';
              iconColorClass = 'bg-[#fefce8] dark:bg-amber-950/20 text-[#ca8a04] dark:text-amber-400 border-[#fef08a] dark:border-yellow-600/30';
            } else {
              title = 'Lesson Practiced!';
              subtitle = `Great! You need ${LESSON_MASTERED_THRESHOLD - newCount} more completions to master this lesson.`;
              icon = 'sync';
              iconColorClass = 'bg-primary-container dark:bg-emerald-900/20 text-primary dark:text-emerald-400 border-primary/30 dark:border-emerald-600/30';
            }
          }
        }

        elements.endScreenTitle.textContent = title;
        elements.endScreenSubtitle.textContent = subtitle;
        elements.endScreenIcon.textContent = icon;
        elements.endScreenIconBox.className += ` ${iconColorClass}`;

        // === Gamification wiring ===
        if (gamification) {
          // Record daily activity and check streak
          const streakResult = gamification.recordActivity();

          // Determine XP reward based on drill type
          let xpAmount = XP_REWARDS.lesson;
          if (isExam) xpAmount = XP_REWARDS.exam;
          else if (isReview) xpAmount = XP_REWARDS.review;

          // Add XP
          const xpResult = gamification.addXP(xpAmount);

          // Show XP on end screen
          renderEndScreenXP(xpAmount, xpResult.totalXP, xpResult.levelName);

          // Launch confetti for first completion
          if (previousCount === 0) {
            const confettiContainer = document.getElementById('confettiContainer');
            if (confettiContainer) launchConfetti(confettiContainer);
          }

          // Check for level-up
          if (xpResult.leveledUp) {
            showLevelUpNotification(xpResult.levelName);
          }

          // Check for streak milestone
          if (streakResult.milestone) {
            celebrateStreakMilestone(streakResult.milestone);
          }
        } else {
          // Hide XP container when gamification is not available
          const xpContainer = document.getElementById('endScreenXPContainer');
          if (xpContainer) xpContainer.classList.add('hidden');
        }
      },
    },
  });

  // Wire input events
  inputField.oninput = () => {
    const state = activeEngine.getState();
    if (isWordMode) {
      renderWordInput(fakeInput, inputField.value);
    } else {
      renderFakeInput(fakeInput, inputField.value, state.currentPhrase);
    }
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
    void ghostText.offsetHeight;
    ghostText.classList.remove('opacity-0');
    ghostText.classList.add('opacity-30');
    revealAnswerBtn.classList.add('hidden');
    inputField.focus();
  };

  // Quit drill
  quitDrillBtn.onclick = onQuit;

  // End screen buttons
  restartBtn.onclick = () => {
    startDrill(elements, phrases, topic, lesson, isExam, isReview, srs, onQuit, isTabExam, mode, gamification);
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
 * Render the color-coded fake input overlay (sentence mode).
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

/**
 * Render plain text input overlay (word mode — no tokenizer).
 */
function renderWordInput(fakeInputEl, userInput) {
  fakeInputEl.innerHTML = `<span class="text-primary dark:text-emerald-400 transition-colors duration-300">${userInput}</span>`;
}
