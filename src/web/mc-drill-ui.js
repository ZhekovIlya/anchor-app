// ========================
// MULTIPLE CHOICE DRILL UI
// ========================
// Browser-only DOM layer for the MC drill mode.
// Connects core/multiple-choice.js to the browser DOM.

import { createMCEngine } from '../core/multiple-choice.js';
import { getPromptLang } from './speech.js';
import { showOnly } from './dashboard.js';
import { incrementCompletion, getCompletionCount } from './storage.js';
import { XP_REWARDS } from '../core/gamification.js';
import { launchConfetti, renderEndScreenXP, showLevelUpNotification, celebrateStreakMilestone } from './gamification-ui.js';
import { EXAM_MASTERED_THRESHOLD, LESSON_MASTERED_THRESHOLD } from './dashboard.js';

/**
 * Start a Multiple Choice drill session.
 *
 * @param {Object}  elements     - DOM refs (same as startDrill)
 * @param {Array}   phrases      - Phrase objects for this drill
 * @param {Object}  topic        - Active topic object
 * @param {Object}  lesson       - Active lesson object
 * @param {Object}  srs          - SRS engine instance
 * @param {Object}  gamification - Gamification engine (or null)
 * @param {Function} onQuit      - Called when user quits / returns
 */
export function startMCDrill(elements, phrases, topic, lesson, srs, gamification, onQuit) {
  showOnly(elements, 'drill');

  // Hide type-drill specific elements
  const typeInputArea = document.getElementById('typeInputArea');
  if (typeInputArea) typeInputArea.classList.add('hidden');
  elements.revealAnswerBtn.classList.add('hidden');
  elements.ghostText.parentElement.classList.add('hidden');

  // Show MC container
  const mcContainer = document.getElementById('mcOptionsContainer');
  if (mcContainer) mcContainer.classList.remove('hidden');

  // Hide word-order container if visible
  const woContainer = document.getElementById('wordOrderContainer');
  if (woContainer) woContainer.classList.add('hidden');

  const engine = createMCEngine({
    phrases,
    srs,
    gamification,
    onCorrect: null,
    onWrong: null,
    onComplete: null,
  });

  engine.start();

  const lang = getPromptLang();

  function renderQuestion() {
    const question = engine.getCurrentQuestion();
    if (!question) {
      showEndScreen();
      return;
    }

    // Update progress counter
    elements.streakCounter.textContent = `${engine.getProgress() + 1} / ${engine.getTotal()}`;

    // Show prompt in the selected language
    const promptText = lang === 'uk' ? question.promptUk : question.promptRu;
    elements.russianPrompt.textContent = promptText;

    // Render 4 option buttons
    mcContainer.innerHTML = '';
    question.options.forEach((option, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full p-4 rounded-xl font-body text-lg text-left border-2 border-outline-variant/30 dark:border-stone-700 bg-surface-container-lowest dark:bg-stone-850 text-on-surface dark:text-stone-100 hover:border-primary/50 dark:hover:border-emerald-500/50 hover:bg-surface-container-low dark:hover:bg-stone-800 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500';
      btn.textContent = option;
      btn.addEventListener('click', () => handleAnswer(idx, question));
      mcContainer.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex, question) {
    const result = engine.submitAnswer(selectedIndex);
    const buttons = mcContainer.querySelectorAll('button');

    // Disable all buttons
    buttons.forEach(btn => {
      btn.style.pointerEvents = 'none';
    });

    // Highlight correct answer green
    buttons[question.correctIndex].className = 'w-full p-4 rounded-xl font-body text-lg text-left border-2 border-[#16a34a] dark:border-emerald-500 bg-[#f0fdf4] dark:bg-emerald-950/30 text-[#16a34a] dark:text-emerald-400 font-bold transition-all duration-200';

    // If wrong, highlight the selected answer red
    if (!result.correct) {
      buttons[selectedIndex].className = 'w-full p-4 rounded-xl font-body text-lg text-left border-2 border-[#dc2626] dark:border-red-500 bg-[#fef2f2] dark:bg-red-950/30 text-[#dc2626] dark:text-red-400 font-bold transition-all duration-200';
    }

    // Auto-advance after 800ms
    setTimeout(() => {
      if (engine.isFinished()) {
        showEndScreen();
      } else {
        renderQuestion();
      }
    }, 800);
  }

  function showEndScreen() {
    // Hide MC container
    if (mcContainer) mcContainer.classList.add('hidden');

    // Restore hidden elements for future type drills
    if (typeInputArea) typeInputArea.classList.remove('hidden');
    elements.ghostText.parentElement.classList.remove('hidden');

    showOnly(elements, 'end');

    const score = engine.getScore();
    const isExam = !!lesson.exam;
    const previousCount = getCompletionCount(lesson.id);
    incrementCompletion(lesson.id);
    const newCount = previousCount + 1;

    elements.endScreenProgressContainer.classList.add('hidden', 'opacity-0');
    elements.endScreenIconBox.className = 'w-20 h-20 flex items-center justify-center rounded-full mb-4 shadow-sm border transition-colors transition-transform scale-100';

    let title = `${score.correct} / ${score.correct + score.wrong} Correct!`;
    let subtitle = 'Multiple Choice Drill Complete';
    let icon = 'check_circle';
    let iconColorClass = 'bg-[#f0fdf4] dark:bg-emerald-950/20 text-[#16a34a] dark:text-emerald-400 border-[#bbf7d0] dark:border-emerald-600/30';

    if (previousCount === 0) {
      subtitle = 'First completion! Week progress updated.';
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
          subtitle = 'MC Mastery Achieved!';
          icon = 'workspace_premium';
          iconColorClass = 'bg-[#fefce8] dark:bg-amber-950/20 text-[#ca8a04] dark:text-amber-400 border-[#fef08a] dark:border-yellow-600/30';
        }
      } else {
        if (newCount >= LESSON_MASTERED_THRESHOLD) {
          title = 'Lesson Mastered!';
          subtitle = 'MC Pattern Complete!';
          icon = 'workspace_premium';
          iconColorClass = 'bg-[#fefce8] dark:bg-amber-950/20 text-[#ca8a04] dark:text-amber-400 border-[#fef08a] dark:border-yellow-600/30';
        }
      }
    }

    elements.endScreenTitle.textContent = title;
    elements.endScreenSubtitle.textContent = subtitle;
    elements.endScreenIcon.textContent = icon;
    elements.endScreenIconBox.className += ` ${iconColorClass}`;

    // Gamification wiring
    if (gamification) {
      const streakResult = gamification.recordActivity();
      const xpAmount = XP_REWARDS.lesson;
      const xpResult = gamification.addXP(xpAmount);
      renderEndScreenXP(xpAmount, xpResult.totalXP, xpResult.levelName);

      if (previousCount === 0) {
        const confettiContainer = document.getElementById('confettiContainer');
        if (confettiContainer) launchConfetti(confettiContainer);
      }
      if (xpResult.leveledUp) showLevelUpNotification(xpResult.levelName);
      if (streakResult.milestone) celebrateStreakMilestone(streakResult.milestone);
    } else {
      const xpContainer = document.getElementById('endScreenXPContainer');
      if (xpContainer) xpContainer.classList.add('hidden');
    }

    // End screen buttons
    elements.restartBtn.onclick = () => {
      startMCDrill(elements, phrases, topic, lesson, srs, gamification, onQuit);
    };
    elements.dashboardReturnBtn.onclick = onQuit;
  }

  // Quit button
  elements.quitDrillBtn.onclick = () => {
    // Cleanup MC container
    if (mcContainer) mcContainer.classList.add('hidden');
    if (typeInputArea) typeInputArea.classList.remove('hidden');
    elements.ghostText.parentElement.classList.remove('hidden');
    onQuit();
  };

  renderQuestion();
}
