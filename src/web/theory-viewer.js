// ========================
// THEORY VIEWER
// ========================
// Renders rich theory articles from section data.
// In-page view with back button navigation.

import { showOnly } from './dashboard.js';

/**
 * Render a theory article in the theory view container.
 * @param {Object}   elements    - DOM refs
 * @param {Object}   topic       - Theory topic data (with sections array)
 * @param {Function} onBack      - Callback to return to previous view
 */
export function renderTheoryArticle(elements, topic, onBack) {
  showOnly(elements, 'theoryArticle');

  const { theoryArticleTitle, theoryArticleContent, backToTheoryBtn } = elements;

  theoryArticleTitle.textContent = topic.title;
  theoryArticleContent.innerHTML = '';

  // Render each section
  for (const section of topic.sections) {
    const el = renderSection(section);
    if (el) theoryArticleContent.appendChild(el);
  }

  backToTheoryBtn.onclick = onBack;
}

/**
 * Render a word-topic theory as an in-page article.
 * Similar to standalone theory but navigates back to word lessons.
 */
export function renderWordTheoryArticle(elements, theory, onBack) {
  showOnly(elements, 'theoryArticle');

  const { theoryArticleTitle, theoryArticleContent, backToTheoryBtn } = elements;

  theoryArticleTitle.textContent = theory.title;
  theoryArticleContent.innerHTML = '';

  for (const section of theory.sections) {
    const el = renderSection(section);
    if (el) theoryArticleContent.appendChild(el);
  }

  backToTheoryBtn.onclick = onBack;
}

function renderSection(section) {
  switch (section.type) {
    case 'heading':
      return createHeading(section.text);
    case 'paragraph':
      return createParagraph(section.text);
    case 'callout':
      return createCallout(section.style, section.text);
    case 'table':
      return createTable(section.caption, section.headers, section.rows);
    case 'image':
      return createImage(section.src, section.alt);
    case 'video':
      return createVideo(section.src, section.title);
    default:
      return null;
  }
}

function createHeading(text) {
  const h = document.createElement('h2');
  h.className = 'font-headline text-2xl font-bold text-on-surface dark:text-stone-100 mt-10 mb-4 first:mt-0 transition-colors duration-300';
  h.textContent = text;
  return h;
}

function createParagraph(text) {
  const p = document.createElement('p');
  p.className = 'font-body text-base text-on-surface-variant dark:text-stone-300 leading-relaxed mb-4 transition-colors duration-300';
  p.textContent = text;
  return p;
}

function createCallout(style, text) {
  const styles = {
    tip: {
      border: 'border-l-4 border-[#16a34a] dark:border-emerald-500',
      bg: 'bg-[#f0fdf4] dark:bg-emerald-950/20',
      icon: 'lightbulb',
      iconColor: 'text-[#16a34a] dark:text-emerald-400',
      textColor: 'text-[#166534] dark:text-emerald-300',
    },
    important: {
      border: 'border-l-4 border-primary dark:border-emerald-500',
      bg: 'bg-primary-container/10 dark:bg-emerald-900/10',
      icon: 'info',
      iconColor: 'text-primary dark:text-emerald-400',
      textColor: 'text-on-surface dark:text-stone-200',
    },
    warning: {
      border: 'border-l-4 border-[#ca8a04] dark:border-amber-500',
      bg: 'bg-[#fefce8] dark:bg-amber-950/20',
      icon: 'warning',
      iconColor: 'text-[#ca8a04] dark:text-amber-400',
      textColor: 'text-[#854d0e] dark:text-amber-300',
    },
  };

  const s = styles[style] || styles.tip;

  const div = document.createElement('div');
  div.className = `${s.border} ${s.bg} rounded-r-xl p-4 mb-6 flex items-start gap-3 transition-colors duration-300`;
  div.innerHTML = `
    <span class="material-symbols-outlined ${s.iconColor} text-xl mt-0.5 flex-shrink-0 transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">${s.icon}</span>
    <p class="font-body text-sm ${s.textColor} leading-relaxed transition-colors duration-300">${text}</p>
  `;
  return div;
}

function createTable(caption, headers, rows) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mb-6 overflow-x-auto';

  let html = '';
  if (caption) {
    html += `<div class="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-stone-400 mb-2 transition-colors duration-300">${caption}</div>`;
  }

  html += '<table class="w-full border-collapse">';
  html += '<thead><tr>';
  for (const h of headers) {
    html += `<th class="text-left font-label text-xs uppercase tracking-wider text-on-surface-variant dark:text-stone-400 py-3 px-4 border-b border-surface-variant dark:border-stone-800 bg-surface-container-low dark:bg-stone-850 transition-colors duration-300">${h}</th>`;
  }
  html += '</tr></thead><tbody>';

  for (const row of rows) {
    html += '<tr class="border-b border-surface-variant/50 dark:border-stone-800/50 hover:bg-surface-container-low dark:hover:bg-stone-800 transition-colors duration-300">';
    for (const cell of row) {
      html += `<td class="font-body text-sm text-on-surface dark:text-stone-200 py-3 px-4 transition-colors duration-300">${cell}</td>`;
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  wrapper.innerHTML = html;
  return wrapper;
}

function createImage(src, alt) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mb-6 rounded-xl overflow-hidden border border-surface-variant dark:border-stone-800 shadow-sm transition-colors duration-300';
  wrapper.innerHTML = `<img src="${src}" alt="${alt || ''}" class="w-full h-auto" loading="lazy" />`;
  return wrapper;
}

function createVideo(src, title) {
  const wrapper = document.createElement('div');
  wrapper.className = 'mb-6 rounded-xl overflow-hidden border border-surface-variant dark:border-stone-800 shadow-sm bg-black transition-colors duration-300';
  wrapper.innerHTML = `
    <div class="relative w-full" style="padding-bottom: 56.25%;">
      <iframe
        src="${src}"
        title="${title || 'Video'}"
        class="absolute inset-0 w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  `;
  return wrapper;
}
