// ========================
// DRILL UI (DOM + Input + End Screen)
// ========================
// Connects core/engine.js to the browser DOM.
// Supports Unified Dynamic Game Modes (Type, MC, Word Order) seamlessly.

import { COLOR_MAP, DRILL_MODE } from '../core/constants.js';
import { createDrillEngine } from '../core/engine.js';
import { SpeechRecognitionService } from '../core/speech-recognition.js';
import { cancelSpeech, speakPrompt, speakAnswer, getPromptLang, speakSlowly } from './speech.js';
import { showOnly, EXAM_MASTERED_THRESHOLD, LESSON_MASTERED_THRESHOLD } from './dashboard.js';
import { incrementCompletion, getCompletionCount } from './storage.js';
import { XP_REWARDS } from '../core/gamification.js';
import { launchConfetti, renderEndScreenXP, showLevelUpNotification, celebrateStreakMilestone } from './gamification-ui.js';

let activeEngine = null;
let isHandlingFeedback = false;
let boundKeydownHandler = null;
let boundVisibilityHandler = null;
let speechService = null;

function cleanWord(word) {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,;:"'!?¿¡-]/g, '').toLowerCase().trim();
}

export function startDrill(elements, phrases, topic, lesson, isExam, isReview, srs, onQuit, isTabExam = false, mode = DRILL_MODE.SENTENCE, gamification = null) {
  const {
    drillView, lessonsView, endScreen, dashboardView,
    russianPrompt, ghostText,
    fakeInput, inputField, streakCounter,
    revealAnswerBtn, quitDrillBtn,
    restartBtn, dashboardReturnBtn,
  } = elements;

  const typeInputArea = document.getElementById('typeInputArea');
  const mcContainer = document.getElementById('mcOptionsContainer');
  const woContainer = document.getElementById('wordOrderContainer');
  
  const feedbackBar = document.getElementById('feedbackBar');
  const feedbackBarTitle = document.getElementById('feedbackBarTitle');
  const feedbackBarSubtitle = document.getElementById('feedbackBarSubtitle');
  const feedbackBarIcon = document.getElementById('feedbackBarIcon');
  const feedbackBarIconBox = document.getElementById('feedbackBarIconBox');
  const feedbackBarBtn = document.getElementById('feedbackBarBtn');

  const isWordMode = mode === DRILL_MODE.WORD;

  showOnly(elements, 'drill');
  isHandlingFeedback = false;

  function showFeedback(isCorrect, correctAnswerText, onCompleteCallback) {
    function triggerHaptic(type) {
      if (!('vibrate' in navigator)) return;
      try {
        const hapticsEnabled = JSON.parse(localStorage.getItem('anchor_haptics')) !== false;
        if (!hapticsEnabled) return;
        if (type === 'success') {
          navigator.vibrate([10, 30, 10]); // light double tap
        } else if (type === 'error') {
          navigator.vibrate([50, 50, 50]); // heavier buzz
        }
      } catch (e) {}
    }

    isHandlingFeedback = true;
    feedbackBar.classList.remove('hidden');
    void feedbackBar.offsetWidth; // force reflow
    feedbackBar.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    feedbackBar.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');

    triggerHaptic(isCorrect ? 'success' : 'error');

    const handleContinue = () => {
      feedbackBar.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
      feedbackBar.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      isHandlingFeedback = false;
      onCompleteCallback();
    };

    if (isCorrect) {
      feedbackBar.className = 'absolute bottom-0 inset-x-0 w-full z-50 p-6 transition-transform duration-300 bg-[#f0fdf4] dark:bg-emerald-950 border-t border-[#bbf7d0] dark:border-emerald-800 shadow-[0_-10px_40px_rgba(22,163,74,0.15)] dark:shadow-[0_-10px_40px_rgba(52,211,153,0.15)]';
      feedbackBarIconBox.className = 'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white dark:bg-emerald-900 text-[#16a34a] dark:text-emerald-400 shadow-sm';
      feedbackBarIcon.textContent = 'check';
      feedbackBarTitle.className = 'font-headline text-xl font-bold text-[#15803d] dark:text-emerald-300';
      feedbackBarTitle.textContent = 'Perfect!';
      feedbackBarSubtitle.className = 'font-body text-sm text-[#166534] dark:text-emerald-400';
      
      const state = activeEngine.getState();
      if (state.interactionMode === 'LISTENING') {
        const lang = getPromptLang();
        feedbackBarSubtitle.textContent = lang === 'uk' ? state.currentPhrase.uk : state.currentPhrase.ru;
      } else {
        feedbackBarSubtitle.textContent = 'Repeating aloud...';
      }
      
      feedbackBarBtn.className = 'w-full sm:w-auto px-8 py-3 rounded-xl font-label font-bold uppercase tracking-wider text-sm transition-all duration-200 bg-[#16a34a] dark:bg-emerald-600 text-white shadow-sm hover:opacity-90 hidden';
      
      const replayBtn = document.getElementById('feedbackBarReplayBtn');
      if (replayBtn) replayBtn.classList.add('hidden');
      
      speakAnswer(correctAnswerText, () => {
        setTimeout(handleContinue, 500);
      });
    } else {
      feedbackBar.className = 'absolute bottom-0 inset-x-0 w-full z-50 p-6 transition-transform duration-300 bg-[#fef2f2] dark:bg-red-950 border-t border-[#fecaca] dark:border-red-900 shadow-[0_-10px_40px_rgba(220,38,38,0.15)] dark:shadow-[0_-10px_40px_rgba(248,113,113,0.15)]';
      feedbackBarIconBox.className = 'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white dark:bg-red-900 text-[#dc2626] dark:text-red-400 shadow-sm';
      feedbackBarIcon.textContent = 'close';
      feedbackBarTitle.className = 'font-headline text-xl font-bold text-[#b91c1c] dark:text-red-300';
      feedbackBarTitle.textContent = 'Correct solution:';
      feedbackBarSubtitle.className = 'font-body text-sm text-[#991b1b] dark:text-red-400 font-bold mt-1 text-lg flex flex-wrap gap-1';
      feedbackBarSubtitle.innerHTML = '';
      correctAnswerText.split(' ').forEach(word => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'cursor-pointer hover:text-[#dc2626] dark:hover:text-red-300 border-b border-transparent hover:border-current transition-colors';
        span.onclick = (e) => {
          e.stopPropagation();
          speakSlowly(word);
        };
        feedbackBarSubtitle.appendChild(span);
      });

      feedbackBarBtn.className = 'w-full sm:w-auto px-8 py-3 rounded-xl font-label font-bold uppercase tracking-wider text-sm transition-all duration-200 bg-[#dc2626] dark:bg-red-600 text-white shadow-sm hover:opacity-90 block';
      
      const replayBtn = document.getElementById('feedbackBarReplayBtn');
      if (replayBtn) {
        replayBtn.classList.remove('hidden');
        replayBtn.onclick = () => {
          speakAnswer(correctAnswerText, () => {});
        };
      }
      
      // Allow enter key or click
      const enterHandler = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          document.removeEventListener('keydown', enterHandler);
          handleContinue();
        }
      };
      document.addEventListener('keydown', enterHandler);

      feedbackBarBtn.onclick = () => {
        document.removeEventListener('keydown', enterHandler);
        handleContinue();
      };
    }
  }

  activeEngine = createDrillEngine({
    phrases,
    isExam,
    isTabExam,
    isReview,
    srs,
    mode,
    callbacks: {
      onStreakUpdate(streak, target) {
        streakCounter.textContent = `${streak} / ${target}`;
      },
      onRevealUpdate(streak, target) {
        streakCounter.textContent = `${streak} / ${target}`;
      },
      onNextPhrase({ phrase, isCopyStage, interactionMode, questionData, streak, targetStreak }) {
        cancelSpeech();

        const lang = getPromptLang();
        const promptText = lang === 'uk' ? phrase.uk : phrase.ru;
        russianPrompt.textContent = promptText;
        streakCounter.textContent = `${streak} / ${targetStreak}`;

        // Reset containers
        typeInputArea.classList.add('hidden');
        mcContainer.classList.add('hidden');
        woContainer.classList.add('hidden');
        const speechContainer = document.getElementById('speechContainer');
        if (speechContainer) speechContainer.classList.add('hidden');
        revealAnswerBtn.classList.add('hidden');
        ghostText.parentElement.classList.add('hidden');
        
        feedbackBar.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        feedbackBar.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
        
        // Setup correct interaction mode
        if (interactionMode === 'TYPE' || interactionMode === 'LISTENING') {
          typeInputArea.classList.remove('hidden');
          
          if (interactionMode === 'TYPE') {
            ghostText.parentElement.classList.remove('hidden');
            ghostText.innerHTML = '';
            ghostText.classList.remove('pointer-events-none');
            phrase.es.split(' ').forEach((word, idx, arr) => {
              const span = document.createElement('span');
              span.textContent = word;
              span.className = 'cursor-pointer hover:text-primary dark:hover:text-emerald-400 transition-colors pointer-events-auto';
              span.onclick = (e) => {
                e.stopPropagation();
                speakSlowly(word);
              };
              ghostText.appendChild(span);
              if (idx < arr.length - 1) {
                ghostText.appendChild(document.createTextNode(' '));
              }
            });
          } else {
            // LISTENING mode
            ghostText.parentElement.classList.add('hidden');
            russianPrompt.innerHTML = `
              <div class="flex flex-col items-center justify-center gap-3 text-primary dark:text-emerald-400">
                <span class="material-symbols-outlined text-5xl">headphones</span>
                <span class="font-bold text-xl">🎧 Dictation Mode</span>
                <span class="text-sm uppercase tracking-wider font-medium text-on-surface-variant dark:text-stone-400">Listen to the audio and type what you hear</span>
                <div class="flex gap-4 mt-2">
                  <button id="listeningAudioBtn" class="flex items-center justify-center gap-2 bg-primary dark:bg-emerald-600 text-on-primary font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity min-h-[48px] shadow-md">
                    <span class="material-symbols-outlined">play_arrow</span> Play Normal
                  </button>
                  <button id="listeningSlowBtn" class="flex items-center justify-center gap-2 bg-surface-variant dark:bg-stone-800 text-on-surface-variant font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity min-h-[48px] border border-outline-variant/30">
                    <span class="material-symbols-outlined">speed</span> Play Slow
                  </button>
                </div>
              </div>
            `;
            setTimeout(() => {
              const btn = document.getElementById('listeningAudioBtn');
              if (btn) btn.onclick = () => speakAnswer(phrase.es, () => {});
              
              const slowBtn = document.getElementById('listeningSlowBtn');
              if (slowBtn) slowBtn.onclick = () => speakSlowly(phrase.es);
            }, 0);
          }
          
          inputField.value = '';
          fakeInput.innerHTML = '';
          inputField.disabled = false;
          inputField.focus();

          if (isCopyStage && interactionMode === 'TYPE') {
            ghostText.style.transition = '';
            ghostText.classList.remove('opacity-0');
          } else if (interactionMode === 'TYPE') {
            ghostText.style.transition = '';
            ghostText.classList.add('opacity-0');
          }
        } else if (interactionMode === 'MC') {
          mcContainer.classList.remove('hidden');
          renderMC(mcContainer, questionData, phrase);
        } else if (interactionMode === 'WORD_ORDER') {
          woContainer.classList.remove('hidden');
          renderWO(woContainer, questionData, phrase);
        } else if (interactionMode === 'SPEECH') {
          const speechContainer = document.getElementById('speechContainer');
          const speechResultArea = document.getElementById('speechResultArea');
          const speechMicBtn = document.getElementById('speechMicBtn');
          const speechRetryBtn = document.getElementById('speechRetryBtn');
          
          speechContainer.classList.remove('hidden');
          ghostText.parentElement.classList.remove('hidden');
          ghostText.classList.remove('opacity-0');
          ghostText.textContent = phrase.es;
          
          speechResultArea.innerHTML = '<span class="text-on-surface-variant/40 dark:text-stone-600 font-body text-sm italic select-none">Tap the mic and speak the phrase aloud</span>';
          speechMicBtn.classList.remove('hidden', 'bg-red-500', 'animate-pulse');
          speechMicBtn.classList.add('bg-primary', 'dark:bg-emerald-600');
          speechRetryBtn.classList.add('hidden');
          
          if (!speechService) {
            speechService = new SpeechRecognitionService({
              onResult: (transcript) => handleSpeechResult(transcript, phrase.es, speechResultArea, speechMicBtn, speechRetryBtn),
              onError: (err) => {
                 speechMicBtn.classList.remove('bg-red-500', 'animate-pulse');
                 speechMicBtn.classList.add('bg-primary', 'dark:bg-emerald-600');
              },
              onEnd: () => {
                 speechMicBtn.classList.remove('bg-red-500', 'animate-pulse');
                 speechMicBtn.classList.add('bg-primary', 'dark:bg-emerald-600');
              }
            });
          } else {
            speechService.onResult = (transcript) => handleSpeechResult(transcript, phrase.es, speechResultArea, speechMicBtn, speechRetryBtn);
          }
          
          speechMicBtn.onclick = () => {
            if (speechService.isRecording) {
               speechService.stop();
            } else {
               speechService.start();
               speechMicBtn.classList.remove('bg-primary', 'dark:bg-emerald-600');
               speechMicBtn.classList.add('bg-red-500', 'animate-pulse');
            }
          };
          
          speechRetryBtn.onclick = () => {
             speechResultArea.innerHTML = '<span class="text-on-surface-variant/40 dark:text-stone-600 font-body text-sm italic select-none">Tap the mic and speak the phrase aloud</span>';
             speechRetryBtn.classList.add('hidden');
             speechMicBtn.classList.remove('hidden');
          };
        }

        if (interactionMode === 'LISTENING') {
          speakAnswer(phrase.es, () => {});
        } else {
          speakPrompt(promptText);
        }
      },

      onCorrectAnswer(phrase, done) {
        // Handled by local showFeedback logic
        done();
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

        if (gamification) {
          const streakResult = gamification.recordActivity();
          let xpAmount = XP_REWARDS.lesson;
          if (isExam) xpAmount = XP_REWARDS.exam;
          else if (isReview) xpAmount = XP_REWARDS.review;

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
      },
    },
  });

  // Type Mode Input Handlers
  inputField.oninput = () => {
    const state = activeEngine.getState();
    if (state.interactionMode !== 'TYPE' && state.interactionMode !== 'LISTENING') return;

    if (isWordMode) {
      fakeInput.innerHTML = `<span class="text-primary dark:text-emerald-400 transition-colors duration-300">${inputField.value}</span>`;
    } else {
      renderFakeInput(fakeInput, inputField.value, state.currentPhrase);
    }
    fakeInput.scrollLeft = inputField.scrollLeft;

    if (isHandlingFeedback) return;

    const { correct } = activeEngine.checkAnswer(inputField.value, false);
    if (correct) {
      inputField.disabled = true;
      showFeedback(true, state.currentPhrase.es, () => {
        activeEngine.handleCorrect();
      });
    }
  };

        inputField.onkeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isHandlingFeedback || inputField.value.trim() === '') return;
      
      const state = activeEngine.getState();
      if (state.interactionMode !== 'TYPE' && state.interactionMode !== 'LISTENING') return;

      const { correct, typo } = activeEngine.checkAnswer(inputField.value, true);
      inputField.disabled = true;
      
      if (correct) {
        // If typo is true, we could optionally show a warning, but for now we just accept it
        if (typo && !isWordMode) {
          fakeInput.innerHTML = `<span class="text-[#ca8a04] dark:text-amber-400 transition-colors duration-300">${state.currentPhrase.es}</span>`;
        }
        showFeedback(true, state.currentPhrase.es, () => {
          activeEngine.handleCorrect();
        });
      } else {
        activeEngine.handleWrong();
        showFeedback(false, state.currentPhrase.es, () => {
          activeEngine.nextPhraseAfterWrong();
        });
      }
    }
  };

  inputField.onscroll = () => {
    fakeInput.scrollLeft = inputField.scrollLeft;
  };

  // Reveal Answer (Sad Path trigger)
  revealAnswerBtn.onclick = () => {
    if (isHandlingFeedback) return;
    inputField.disabled = true;
    revealAnswerBtn.classList.add('hidden');
    
    const state = activeEngine.getState();
    activeEngine.handleWrong(); 
    
    showFeedback(false, state.currentPhrase.es, () => {
      activeEngine.nextPhraseAfterWrong();
    });
  };

  // MC Mode Renderer
  function renderMC(container, questionData, phrase) {
    container.innerHTML = '';
    questionData.options.forEach((option, idx) => {
      const btn = document.createElement('button');
      btn.className = 'w-full p-4 rounded-xl font-body text-lg text-left border-2 border-outline-variant/30 dark:border-stone-700 bg-surface-container-lowest dark:bg-stone-850 text-on-surface dark:text-stone-100 hover:border-primary/50 dark:hover:border-emerald-500/50 hover:bg-surface-container-low dark:hover:bg-stone-800 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-emerald-500';
      btn.textContent = option;
      btn.addEventListener('click', () => {
        if (isHandlingFeedback) return;
        
        const result = activeEngine.submitMCAnswer(idx);
        
        // Disable buttons
        container.querySelectorAll('button').forEach(b => b.style.pointerEvents = 'none');
        
        if (result.correct) {
          btn.classList.add('border-[#16a34a]', 'dark:border-emerald-500', 'bg-[#f0fdf4]', 'dark:bg-emerald-950/30', 'text-[#16a34a]', 'dark:text-emerald-400');
          if (gamification) gamification.addXP(XP_REWARDS.mcCorrect);
          
          showFeedback(true, phrase.es, () => {
            activeEngine.handleCorrect();
          });
        } else {
          btn.classList.add('border-[#dc2626]', 'dark:border-red-500', 'bg-[#fef2f2]', 'dark:bg-red-950/30', 'text-[#dc2626]', 'dark:text-red-400');
          activeEngine.handleWrong();
          showFeedback(false, phrase.es, () => {
            activeEngine.nextPhraseAfterWrong();
          });
        }
      });
      container.appendChild(btn);
    });
  }

  // Word Order Mode Renderer
  function renderWO(container, questionData, phrase) {
    const answerArea = document.getElementById('woAnswerArea');
    const poolArea = document.getElementById('woPoolArea');
    const checkBtn = document.getElementById('woCheckBtn');

    let placedWords = [];
    let availableWords = [...questionData.shuffledWords];

    function renderAreas() {
      answerArea.innerHTML = '';
      if (placedWords.length === 0) {
        answerArea.innerHTML = '<span class="text-on-surface-variant/40 dark:text-stone-600 font-body text-sm italic select-none">Tap words below to build your answer</span>';
      } else {
        placedWords.forEach((word, idx) => {
          const pill = document.createElement('button');
          pill.className = 'px-4 py-2 rounded-full bg-primary/10 dark:bg-emerald-600/20 border border-primary/30 dark:border-emerald-500/30 text-primary dark:text-emerald-400 font-body text-base font-medium cursor-pointer hover:bg-primary/20 dark:hover:bg-emerald-600/30 transition-all duration-150 focus:outline-none';
          pill.textContent = word;
          pill.onclick = () => {
            if (isHandlingFeedback) return;
            availableWords.push(placedWords.splice(idx, 1)[0]);
            renderAreas();
          };
          answerArea.appendChild(pill);
        });
      }

      poolArea.innerHTML = '';
      availableWords.forEach((word, idx) => {
        const pill = document.createElement('button');
        pill.className = 'px-4 py-2 rounded-full bg-surface-container dark:bg-stone-800 border border-outline-variant/30 dark:border-stone-700 text-on-surface dark:text-stone-200 font-body text-base font-medium cursor-pointer hover:bg-surface-variant dark:hover:bg-stone-750 hover:border-primary/50 dark:hover:border-emerald-500/50 transition-all duration-150 focus:outline-none';
        pill.textContent = word;
        pill.onclick = () => {
          if (isHandlingFeedback) return;
          placedWords.push(availableWords.splice(idx, 1)[0]);
          renderAreas();
        };
        poolArea.appendChild(pill);
      });

      checkBtn.disabled = placedWords.length === 0;
      checkBtn.className = placedWords.length > 0
        ? 'w-full max-w-sm px-6 py-3 rounded-xl font-label font-bold text-base uppercase tracking-wider bg-primary dark:bg-emerald-600 text-on-primary shadow-sm hover:opacity-90 dark:hover:bg-emerald-500 transition-all duration-200 cursor-pointer focus:outline-none'
        : 'w-full max-w-sm px-6 py-3 rounded-xl font-label font-bold text-base uppercase tracking-wider bg-surface-variant dark:bg-stone-800 text-on-surface-variant/50 dark:text-stone-600 cursor-not-allowed transition-all duration-200';
    }

    checkBtn.onclick = () => {
      if (isHandlingFeedback || placedWords.length === 0) return;
      const result = activeEngine.submitWOAnswer(placedWords);
      
      poolArea.style.pointerEvents = 'none';
      checkBtn.style.pointerEvents = 'none';

      if (result.correct) {
        answerArea.classList.add('border-[#16a34a]', 'dark:border-emerald-500', 'bg-[#f0fdf4]', 'dark:bg-emerald-950/20');
        if (gamification) gamification.addXP(XP_REWARDS.wordOrderCorrect);
        
        showFeedback(true, phrase.es, () => {
          answerArea.classList.remove('border-[#16a34a]', 'dark:border-emerald-500', 'bg-[#f0fdf4]', 'dark:bg-emerald-950/20');
          poolArea.style.pointerEvents = '';
          checkBtn.style.pointerEvents = '';
          activeEngine.handleCorrect();
        });
      } else {
        answerArea.classList.add('border-[#dc2626]', 'dark:border-red-500', 'bg-[#fef2f2]', 'dark:bg-red-950/20');
        activeEngine.handleWrong();
        showFeedback(false, phrase.es, () => {
          answerArea.classList.remove('border-[#dc2626]', 'dark:border-red-500', 'bg-[#fef2f2]', 'dark:bg-red-950/20');
          poolArea.style.pointerEvents = '';
          checkBtn.style.pointerEvents = '';
          activeEngine.nextPhraseAfterWrong();
        });
      }
    };

    renderAreas();
  }

  // Quit and End Handlers
  quitDrillBtn.onclick = () => {
    feedbackBar.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    feedbackBar.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    onQuit();
  };
  restartBtn.onclick = () => {
    startDrill(elements, phrases, topic, lesson, isExam, isReview, srs, onQuit, isTabExam, mode, gamification);
  };
  dashboardReturnBtn.onclick = () => {
    onQuit();
  };

  activeEngine.start();
}

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

function handleSpeechResult(transcript, targetPhraseEs, speechResultArea, speechMicBtn, speechRetryBtn) {
   const targetWords = targetPhraseEs.split(' ').map(cleanWord);
   const spokenWords = transcript.split(' ').map(cleanWord);
   
   speechResultArea.innerHTML = '';
   let allCorrect = true;
   
   targetPhraseEs.split(' ').forEach((origWord, idx) => {
     const tClean = targetWords[idx];
     const span = document.createElement('span');
     span.textContent = origWord;
     span.className = 'text-xl font-bold px-1 ';
     
     if (spokenWords.includes(tClean)) {
       span.classList.add('text-[#16a34a]', 'dark:text-emerald-400');
     } else {
       span.classList.add('text-[#dc2626]', 'dark:text-red-500');
       allCorrect = false;
     }
     speechResultArea.appendChild(span);
   });
   
   speechMicBtn.classList.add('hidden');
   if (speechService && speechService.isRecording) {
     speechService.stop();
   }
   
   if (allCorrect) {
     speechRetryBtn.classList.add('hidden');
     setTimeout(() => {
       if (activeEngine) activeEngine.handleCorrect();
     }, 1000);
   } else {
     speechRetryBtn.classList.remove('hidden');
   }
}
