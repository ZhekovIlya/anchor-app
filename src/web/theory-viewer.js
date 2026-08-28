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
  const container = document.createElement('div');
  container.className = 'mb-8';

  let html = '';
  if (caption) {
    html += `
      <div class="flex items-center gap-2 mb-2.5 px-1 font-label text-xs font-bold uppercase tracking-wider text-primary dark:text-emerald-400">
        <span class="material-symbols-outlined text-base">table_chart</span>
        <span>${caption}</span>
      </div>`;
  }

  html += `
    <div class="rounded-2xl overflow-hidden border border-outline-variant/40 dark:border-stone-800 bg-surface-container-lowest dark:bg-stone-900 shadow-sm transition-all duration-300">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-surface-container-low dark:bg-stone-850 border-b border-surface-variant/70 dark:border-stone-800">
            <tr>`;

  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    const isFirst = i === 0;
    html += `
      <th class="py-3.5 px-4 sm:px-5 font-headline text-xs font-bold uppercase tracking-wider ${isFirst ? 'text-primary dark:text-emerald-400' : 'text-on-surface-variant dark:text-stone-300'}">
        ${h}
      </th>`;
  }

  html += `
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-variant/30 dark:divide-stone-800/60">`;

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const isZebra = r % 2 === 1;
    const zebraClass = isZebra ? 'bg-surface-container-lowest/60 dark:bg-stone-850/30' : 'bg-surface-container-lowest dark:bg-stone-900';

    html += `<tr class="${zebraClass} hover:bg-primary-container/10 dark:hover:bg-emerald-950/25 transition-colors duration-150">`;
    for (let c = 0; c < row.length; c++) {
      const cell = row[c];
      const isFirst = c === 0;
      let cellText = cell || '';

      // Format warning/check badges inside table cells
      let cellClass = isFirst
        ? 'font-bold text-on-surface dark:text-white'
        : 'text-on-surface-variant dark:text-stone-300';

      html += `<td class="py-3.5 px-4 sm:px-5 font-body text-sm ${cellClass} leading-relaxed">${cellText}</td>`;
    }
    html += `</tr>`;
  }

  html += `
          </tbody>
        </table>
      </div>
    </div>`;

  container.innerHTML = html;
  return container;
}

function createImage(src, alt) {
  const wrapper = document.createElement('div');
  wrapper.className = 'group relative mb-8 rounded-2xl overflow-hidden border border-outline-variant/40 dark:border-stone-800 shadow-md transition-all duration-300 hover:shadow-lg hover:border-primary/50 dark:hover:border-emerald-500/50 cursor-zoom-in bg-surface-container-lowest dark:bg-stone-900';
  
  wrapper.innerHTML = `
    <div class="flex items-center justify-between px-4 py-2.5 bg-surface-container-low dark:bg-stone-850 border-b border-surface-variant/40 dark:border-stone-800">
      <div class="flex items-center gap-2 text-xs font-headline font-bold text-on-surface dark:text-stone-200 truncate">
        <span class="material-symbols-outlined text-primary dark:text-emerald-400 text-base">image</span>
        <span class="truncate">${alt || 'Esquema visual del curso'}</span>
      </div>
      <span class="text-[11px] font-label font-bold text-primary dark:text-emerald-400 flex items-center gap-1 flex-shrink-0">
        <span class="material-symbols-outlined text-xs">zoom_in</span> Click to zoom
      </span>
    </div>
    <div class="p-2 sm:p-4 flex items-center justify-center bg-black/5 dark:bg-black/40">
      <img src="${src}" alt="${alt || 'Theory visual'}" class="w-full max-h-[480px] object-contain rounded-xl transition-transform duration-300 group-hover:scale-[1.01]" loading="lazy" />
    </div>
  `;

  wrapper.onclick = () => openImageLightbox(src, alt || 'Theory diagram');
  return wrapper;
}

/**
 * Open interactive high-res image lightbox with zoom and pan controls.
 */
function openImageLightbox(src, title) {
  const existing = document.getElementById('theoryImageLightbox');
  if (existing) existing.remove();

  let currentZoom = 1;
  const minZoom = 0.5;
  const maxZoom = 4.0;
  const zoomStep = 0.3;

  const modal = document.createElement('div');
  modal.id = 'theoryImageLightbox';
  modal.className = 'fixed inset-0 z-[9999] flex flex-col bg-black/90 backdrop-blur-md text-white select-none animate-in fade-in duration-200';

  modal.innerHTML = `
    <!-- Top toolbar -->
    <div class="flex items-center justify-between px-4 py-3 bg-black/60 border-b border-white/10 flex-shrink-0 z-10">
      <div class="flex items-center gap-3 overflow-hidden">
        <span class="material-symbols-outlined text-emerald-400 text-xl flex-shrink-0">image</span>
        <span class="font-headline text-sm sm:text-base font-bold truncate">${title}</span>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <button id="lightboxZoomOut" class="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition text-white" title="Zoom out (-)">
          <span class="material-symbols-outlined text-lg">zoom_out</span>
        </button>
        <button id="lightboxZoomReset" class="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition text-xs font-mono font-bold" title="Reset zoom">
          <span id="lightboxZoomVal">100%</span>
        </button>
        <button id="lightboxZoomIn" class="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition text-white" title="Zoom in (+)">
          <span class="material-symbols-outlined text-lg">zoom_in</span>
        </button>
        <a href="${src}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition text-white ml-2" title="Open full resolution image in new tab">
          <span class="material-symbols-outlined text-lg">open_in_new</span>
        </a>
        <button id="lightboxCloseBtn" class="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 active:scale-95 transition text-white ml-2" title="Close (Esc)">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>

    <!-- Image viewport container -->
    <div id="lightboxViewport" class="flex-1 overflow-auto p-4 flex items-center justify-center cursor-grab active:cursor-grabbing relative">
      <img id="lightboxImg" src="${src}" alt="${title}" class="max-w-none transition-transform duration-150 ease-out origin-center rounded-lg shadow-2xl" style="max-height: 85vh; width: auto;" />
    </div>

    <!-- Footer helper hint -->
    <div class="px-4 py-2 text-center text-xs text-stone-400 bg-black/40 border-t border-white/5 flex-shrink-0">
      Use zoom buttons, double-click to toggle 2x zoom, or click 'Open in new tab' for 100% raw resolution. Press ESC to close.
    </div>
  `;

  document.body.appendChild(modal);

  const img = modal.querySelector('#lightboxImg');
  const zoomVal = modal.querySelector('#lightboxZoomVal');
  const viewport = modal.querySelector('#lightboxViewport');
  const btnIn = modal.querySelector('#lightboxZoomIn');
  const btnOut = modal.querySelector('#lightboxZoomOut');
  const btnReset = modal.querySelector('#lightboxZoomReset');
  const btnClose = modal.querySelector('#lightboxCloseBtn');

  function updateTransform() {
    img.style.transform = `scale(${currentZoom})`;
    zoomVal.textContent = `${Math.round(currentZoom * 100)}%`;
  }

  btnIn.onclick = (e) => {
    e.stopPropagation();
    currentZoom = Math.min(maxZoom, currentZoom + zoomStep);
    updateTransform();
  };

  btnOut.onclick = (e) => {
    e.stopPropagation();
    currentZoom = Math.max(minZoom, currentZoom - zoomStep);
    updateTransform();
  };

  btnReset.onclick = (e) => {
    e.stopPropagation();
    currentZoom = 1;
    updateTransform();
  };

  img.ondblclick = (e) => {
    e.stopPropagation();
    currentZoom = currentZoom === 1 ? 2.2 : 1;
    updateTransform();
  };

  const closeModal = () => {
    document.removeEventListener('keydown', handleKeyDown);
    modal.classList.add('animate-out', 'fade-out');
    setTimeout(() => modal.remove(), 150);
  };

  btnClose.onclick = closeModal;
  viewport.onclick = (e) => {
    if (e.target === viewport) closeModal();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === '+' || e.key === '=') {
      currentZoom = Math.min(maxZoom, currentZoom + zoomStep);
      updateTransform();
    }
    if (e.key === '-' || e.key === '_') {
      currentZoom = Math.max(minZoom, currentZoom - zoomStep);
      updateTransform();
    }
    if (e.key === '0') {
      currentZoom = 1;
      updateTransform();
    }
  };

  document.addEventListener('keydown', handleKeyDown);
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
