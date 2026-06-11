// ========================
// GAMIFICATION UI (DOM + Animations)
// ========================
// Browser-only layer: confetti, XP counters, level-up notifications.
// Uses DOM APIs — must only be imported in web/ context.

import { LEVEL_TIERS, XP_REWARDS } from '../core/gamification.js';

// ========================
// CONFETTI
// ========================

const CONFETTI_COLORS = [
  '#f43f5e', '#3b82f6', '#10b981', '#f59e0b',
  '#8b5cf6', '#ec4899', '#06b6d4', '#ef4444',
];

/**
 * Launch a confetti burst inside a container element.
 * Pure CSS/JS — zero external dependencies.
 * @param {HTMLElement} container - fixed-position confetti container
 */
export function launchConfetti(container) {
  if (!container) return;

  const particleCount = 40;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const el = document.createElement('div');
    const size = Math.random() * 8 + 4; // 4–12px
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const startX = Math.random() * 100; // % across viewport
    const drift = (Math.random() - 0.5) * 200; // horizontal drift px
    const delay = Math.random() * 400; // stagger ms
    const duration = 2000 + Math.random() * 1500; // 2–3.5s fall
    const rotation = Math.random() * 720 - 360;

    el.style.cssText = `
      position: absolute;
      top: -12px;
      left: ${startX}%;
      width: ${size}px;
      height: ${size * 0.6}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      opacity: 1;
      pointer-events: none;
      animation: confettiFall ${duration}ms ${delay}ms ease-in forwards;
      --drift: ${drift}px;
      --rotation: ${rotation}deg;
    `;

    container.appendChild(el);
    particles.push(el);
  }

  // Inject keyframes if not already present
  if (!document.getElementById('confettiKeyframes')) {
    const style = document.createElement('style');
    style.id = 'confettiKeyframes';
    style.textContent = `
      @keyframes confettiFall {
        0% {
          transform: translateY(0) translateX(0) rotate(0deg);
          opacity: 1;
        }
        70% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rotation));
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Clean up particles after animation
  setTimeout(() => {
    for (const p of particles) {
      if (p.parentNode === container) {
        container.removeChild(p);
      }
    }
  }, 4000);
}

// ========================
// ANIMATED XP COUNTER
// ========================

/**
 * Animate a smooth counting effect from startXP to endXP.
 * @param {HTMLElement} element - DOM element to update textContent
 * @param {number} startXP - starting value
 * @param {number} endXP - ending value
 * @param {number} duration - animation duration in ms
 */
export function animateXPGain(element, startXP, endXP, duration = 1000) {
  if (!element) return;

  const diff = endXP - startXP;
  if (diff === 0) {
    element.textContent = `${endXP} XP`;
    return;
  }

  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startXP + diff * eased);

    element.textContent = `${current} XP`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// ========================
// LEVEL-UP NOTIFICATION
// ========================

/**
 * Show a floating level-up notification.
 * Auto-dismisses after ~3 seconds.
 * @param {string} levelName - new level name
 */
export function showLevelUpNotification(levelName) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border';
  notification.style.cssText = `
    background: linear-gradient(135deg, #fef9c3, #fefce8);
    border-color: #fef08a;
    animation: levelUpSlide 0.4s ease-out;
  `;

  notification.innerHTML = `
    <span class="material-symbols-outlined text-3xl" style="color: #ca8a04; font-variation-settings: 'FILL' 1;">military_tech</span>
    <div>
      <div class="font-label text-xs uppercase tracking-widest" style="color: #a16207;">Level Up!</div>
      <div class="font-headline text-xl font-bold" style="color: #854d0e;">${levelName}</div>
    </div>
  `;

  // Inject animation keyframes if not present
  if (!document.getElementById('levelUpKeyframes')) {
    const style = document.createElement('style');
    style.id = 'levelUpKeyframes';
    style.textContent = `
      @keyframes levelUpSlide {
        0% { transform: translateX(-50%) translateY(-30px); opacity: 0; }
        100% { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
      @keyframes levelUpFadeOut {
        0% { transform: translateX(-50%) translateY(0); opacity: 1; }
        100% { transform: translateX(-50%) translateY(-30px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto-dismiss
  setTimeout(() => {
    notification.style.animation = 'levelUpFadeOut 0.3s ease-in forwards';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 350);
  }, 3000);
}

// ========================
// STREAK MILESTONE
// ========================

/**
 * Celebrate a streak milestone with confetti + special message.
 * @param {number} days - milestone day count (7, 14, 30)
 */
export function celebrateStreakMilestone(days) {
  const confettiContainer = document.getElementById('confettiContainer');
  if (confettiContainer) {
    launchConfetti(confettiContainer);
  }

  const messages = {
    7: '🔥 7-Day Streak! ¡Increíble!',
    14: '🌟 14-Day Streak! ¡Fantástico!',
    30: '🏆 30-Day Streak! ¡Legendario!',
  };

  const message = messages[days] || `🔥 ${days}-Day Streak!`;

  const banner = document.createElement('div');
  banner.className = 'fixed top-32 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border';
  banner.style.cssText = `
    background: linear-gradient(135deg, #fef2f2, #fef9c3);
    border-color: #fecaca;
    animation: levelUpSlide 0.4s ease-out;
  `;
  banner.innerHTML = `
    <div class="font-headline text-lg font-bold" style="color: #b91c1c;">${message}</div>
  `;

  // Ensure keyframes exist
  if (!document.getElementById('levelUpKeyframes')) {
    const style = document.createElement('style');
    style.id = 'levelUpKeyframes';
    style.textContent = `
      @keyframes levelUpSlide {
        0% { transform: translateX(-50%) translateY(-30px); opacity: 0; }
        100% { transform: translateX(-50%) translateY(0); opacity: 1; }
      }
      @keyframes levelUpFadeOut {
        0% { transform: translateX(-50%) translateY(0); opacity: 1; }
        100% { transform: translateX(-50%) translateY(-30px); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(banner);

  setTimeout(() => {
    banner.style.animation = 'levelUpFadeOut 0.3s ease-in forwards';
    setTimeout(() => {
      if (banner.parentNode) {
        banner.parentNode.removeChild(banner);
      }
    }, 350);
  }, 3500);
}

// ========================
// DASHBOARD GAMIFICATION DISPLAY
// ========================

/**
 * Update dashboard header with streak, XP, and level info.
 * @param {{ totalXP: number, levelName: string, streak: number, longestStreak: number }} stats
 */
export function updateGamificationDisplay(stats) {
  const streakEl = document.getElementById('gamifStreak');
  const xpEl = document.getElementById('gamifXP');
  const levelEl = document.getElementById('gamifLevel');

  if (streakEl) {
    streakEl.textContent = `🔥 ${stats.streak}`;
    streakEl.title = `Current streak: ${stats.streak} days (longest: ${stats.longestStreak})`;
  }

  if (xpEl) {
    xpEl.textContent = `${stats.totalXP} XP`;
  }

  if (levelEl) {
    levelEl.textContent = stats.levelName;
  }
}

/**
 * Display XP gain info on the end screen.
 * @param {number} xpGained - XP amount earned this session
 * @param {number} totalXP - new total XP
 * @param {string} levelName - current level name
 */
export function renderEndScreenXP(xpGained, totalXP, levelName) {
  const container = document.getElementById('endScreenXPContainer');
  if (!container) return;

  container.classList.remove('hidden');

  const xpValueEl = document.getElementById('endScreenXPValue');
  const levelLabelEl = document.getElementById('endScreenLevelLabel');

  if (levelLabelEl) {
    levelLabelEl.textContent = levelName;
  }

  if (xpValueEl) {
    // Animate from previous XP to new total
    animateXPGain(xpValueEl, totalXP - xpGained, totalXP, 1200);
  }
}
