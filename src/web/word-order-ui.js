// ========================
// WORD-ORDER PUZZLE DRILL UI
// ========================
// Browser-only DOM layer for the word-order puzzle mode.
// Connects core/word-order.js to the browser DOM.

import { createWordOrderEngine } from '../core/word-order.js';
import { getPromptLang } from './speech.js';
import { showOnly } from './dashboard.js';
import { incrementCompletion, getCompletionCount } from './storage.js';
import { XP_REWARDS } from '../core/gamification.js';
import { launchConfetti, renderEndScreenXP, showLevelUpNotification, celebrateStreakMilestone } from './gamification-ui.js';
import { EXAM_MASTERED_THRESHOLD, LESSON_MASTERED_THRESHOLD } from './dashboard.js';

/**
 * Start a Word-Order Puzzle drill session.
 *
 * @param {Object}  elements     - DOM refs (same as startDrill)
 * @param {Array}   phrases      - Phrase objects for this drill
 * @param {Object}  topic        - Active topic object
 * @param {Object}  lesson       - Active lesson object
 * @param {Object}  srs          - SRS engine instance
 * @param {Object}  gamification - Gamification engine (or null)
 * @param {Function} onQuit      - Called when user quits / returns
 */
export function startWordOrderDrill(elements, phrases, topic, lesson, srs, gamification, onQuit) {
  showOnly(elements, 'drill');

  // Hide type-drill specific elements
  const typeInputArea = document.getElementById('typeInputArea');
  if (typeInputArea) typeInputArea.classList.add('hidden');
  elements.revealAnswerBtn.classList.add('hidden');
  elements.ghostText.parentElement.classList.add('hidden');

  // Hide MC container if visible
  const mcContainer = document.getElementById('mcOptionsContainer');
  if (mcContainer) mcContainer.classList.add('hidden');

  // Show word-order container
  const woContainer = document.getElementById('wordOrderContainer');
  if (woContainer) woContainer.classList.remove('hidden');

  const engine = createWordOrderEngine({
    phrases,
    srs,
    gamification,
    onCorrect: null,
    onWrong: null,
    onComplete: null,
  });

  engine.start();

  const lang = getPromptLang();

  // State for the current puzzle
  let currentPuzzle = null;
  let placedWords = [];
  let availableWords = [];

  function renderPuzzle() {
    currentPuzzle = engine.getCurrentPuzzle();
    if (!currentPuzzle) {
      showEndScreen();
      return;
    }

    placedWords = [];
    availableWords = [...currentPuzzle.shuffledWords];

    // Update progress counter
    elements.streakCounter.textContent = `${engine.getProgress() + 1} / ${engine.getTotal()}`;

    // Show prompt
    const promptText = lang === 'uk' ? currentPuzzle.promptUk : currentPuzzle.promptRu;
    elements.russianPrompt.textContent = promptText;

    renderWordAreas();
  }

  function renderWordAreas() {
    const answerArea = document.getElementById('woAnswerArea');
    const poolArea = document.getElementById('woPoolArea');
    const checkBtn = document.getElementById('woCheckBtn');

    if (!answerArea || !poolArea || !checkBtn) return;

    // Render placed words (answer area)
    answerArea.innerHTML = '';
    if (placedWords.length === 0) {
      answerArea.innerHTML = '<span class="text-on-surface-variant/40 dark:text-stone-600 font-body text-sm italic select-none">Tap words below to build your answer</span>';
    } else {
      placedWords.forEach((word, idx) => {
        const pill = document.createElement('button');
        pill.className = 'px-4 py-2 rounded-full bg-primary/10 dark:bg-emerald-600/20 border border-primary/30 dark:border-emerald-500/30 text-primary dark:text-emerald-400 font-body text-base font-medium cursor-pointer hover:bg-primary/20 dark:hover:bg-emerald-600/30 transition-all duration-150 focus:outline-none';
        pill.textContent = word;
        pill.addEventListener('click', () => {
          // Return word to pool
          availableWords.push(placedWords.splice(idx, 1)[0]);
          renderWordAreas();
        });
        answerArea.appendChild(pill);
      });
    }

    // Render available words (pool area)
    poolArea.innerHTML = '';
    availableWords.forEach((word, idx) => {
      const pill = document.createElement('button');
      pill.className = 'px-4 py-2 rounded-full bg-surface-container dark:bg-stone-800 border border-outline-variant/30 dark:border-stone-700 text-on-surface dark:text-stone-200 font-body text-base font-medium cursor-pointer hover:bg-surface-variant dark:hover:bg-stone-750 hover:border-primary/50 dark:hover:border-emerald-500/50 transition-all duration-150 focus:outline-none';
      pill.textContent = word;
      pill.addEventListener('click', () => {
        // Move word to answer area
        placedWords.push(availableWords.splice(idx, 1)[0]);
        renderWordAreas();
      });
      poolArea.appendChild(pill);
    });

    // Check button state
    checkBtn.disabled = placedWords.length === 0;
    checkBtn.className = placedWords.length > 0
      ? 'w-full max-w-sm px-6 py-3 rounded-xl font-label font-bold text-base uppercase tracking-wider bg-primary dark:bg-emerald-600 text-on-primary shadow-sm hover:opacity-90 dark:hover:bg-emerald-500 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500'
      : 'w-full max-w-sm px-6 py-3 rounded-xl font-label font-bold text-base uppercase tracking-wider bg-surface-variant dark:bg-stone-800 text-on-surface-variant/50 dark:text-stone-600 cursor-not-allowed transition-all duration-200';

    // Wire check button
    checkBtn.onclick = () => handleCheck();
  }

  function handleCheck() {
    if (!currentPuzzle || placedWords.length === 0) return;

    const result = engine.submitOrder(placedWords);
    const answerArea = document.getElementById('woAnswerArea');
    const poolArea = document.getElementById('woPoolArea');
    const checkBtn = document.getElementById('woCheckBtn');

    // Disable interactions
    if (poolArea) poolArea.style.pointerEvents = 'none';
    if (checkBtn) checkBtn.style.pointerEvents = 'none';

    if (result.correct) {
      // Green flash on answer area
      if (answerArea) {
        answerArea.classList.add('border-[#16a34a]', 'dark:border-emerald-500', 'bg-[#f0fdf4]', 'dark:bg-emerald-950/20');
      }
    } else {
      // Red flash on answer area
      if (answerArea) {
        answerArea.classList.add('border-[#dc2626]', 'dark:border-red-500', 'bg-[#fef2f2]', 'dark:bg-red-950/20');
      }
      // Show correct order below
      if (poolArea) {
        poolArea.innerHTML = `<div class="w-full text-center font-body text-sm text-[#16a34a] dark:text-emerald-400 font-medium py-2">
          <span class="text-on-surface-variant dark:text-stone-400">Correct:</span> ${result.correctAnswer}
        </div>`;
      }
    }

    // Auto-advance after 1200ms (slightly longer to read correct answer)
    setTimeout(() => {
      // Reset styling
      if (answerArea) {
        answerArea.classList.remove(
          'border-[#16a34a]', 'dark:border-emerald-500', 'bg-[#f0fdf4]', 'dark:bg-emerald-950/20',
          'border-[#dc2626]', 'dark:border-red-500', 'bg-[#fef2f2]', 'dark:bg-red-950/20'
        );
      }
      if (poolArea) poolArea.style.pointerEvents = '';
      if (checkBtn) checkBtn.style.pointerEvents = '';

      if (engine.isFinished()) {
        showEndScreen();
      } else {
        renderPuzzle();
      }
    }, 1200);
  }

  function showEndScreen() {
    // Hide word-order container
    if (woContainer) woContainer.classList.add('hidden');

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
    let subtitle = 'Word-Order Puzzle Complete';
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
          subtitle = 'Word-Order Mastery Achieved!';
          icon = 'workspace_premium';
          iconColorClass = 'bg-[#fefce8] dark:bg-amber-950/20 text-[#ca8a04] dark:text-amber-400 border-[#fef08a] dark:border-yellow-600/30';
        }
      } else {
        if (newCount >= LESSON_MASTERED_THRESHOLD) {
          title = 'Lesson Mastered!';
          subtitle = 'Word-Order Pattern Complete!';
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
      startWordOrderDrill(elements, phrases, topic, lesson, srs, gamification, onQuit);
    };
    elements.dashboardReturnBtn.onclick = onQuit;
  }

  // Quit button
  elements.quitDrillBtn.onclick = () => {
    if (woContainer) woContainer.classList.add('hidden');
    if (typeInputArea) typeInputArea.classList.remove('hidden');
    elements.ghostText.parentElement.classList.remove('hidden');
    onQuit();
  };

  renderPuzzle();
}
