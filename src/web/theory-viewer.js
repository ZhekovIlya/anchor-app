// ========================
// THEORY VIEWER & HIGH-DENSITY LEDGER
// ========================
// Renders the modern High-Density Theory Ledger (Stitch Screen 48aeb4e405db46209cf3db93b0a5c82f).
// Integrates all 30 theory modules with dual-column navigation, pinned topics, tags, and rich tables.

import {
  THEORY_CATEGORIES,
  POPULAR_TAGS,
  getAllTheoryTopics,
  getTheoryTopicById,
  getGroupedTheoryCatalog,
  getTheoryByTag,
  searchTheoryTopics
} from '../core/theory-registry.js';

const PINNED_STORAGE_KEY = 'anchor_pinned_theory';
const DEFAULT_PINNED_IDS = ['week_1_theory', 'week_6_theory', 'theory_verbs'];

// Current Ledger State
let currentActiveTopicId = 'week_1_theory';
let currentActiveTag = 'all';
let currentSearchQuery = '';
let currentExpandedCategories = new Set(THEORY_CATEGORIES.map(c => c.id));

/**
 * Get pinned topic IDs from localStorage
 * @returns {Array<string>}
 */
export function getPinnedTopicIds() {
  try {
    const raw = localStorage.getItem(PINNED_STORAGE_KEY);
    if (!raw) return [...DEFAULT_PINNED_IDS];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [...DEFAULT_PINNED_IDS];
  } catch {
    return [...DEFAULT_PINNED_IDS];
  }
}

/**
 * Save pinned topic IDs to localStorage
 * @param {Array<string>} ids 
 */
export function savePinnedTopicIds(ids) {
  try {
    localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save pinned theory topics:', e);
  }
}

/**
 * Toggle pin status for a topic
 * @param {string} topicId 
 * @returns {boolean} isPinned
 */
export function togglePinTopic(topicId) {
  const current = getPinnedTopicIds();
  const index = current.indexOf(topicId);
  let isPinned = false;

  if (index >= 0) {
    current.splice(index, 1);
    isPinned = false;
  } else {
    current.unshift(topicId);
    isPinned = true;
  }

  savePinnedTopicIds(current);
  return isPinned;
}

/**
 * Mount and render the full High-Density Theory Ledger inside a container.
 * @param {HTMLElement} container - Target container (e.g. #topicsContainer)
 * @param {Object} options - { initialTopicId }
 */
export function renderTheoryLedgerView(container, options = {}) {
  if (options.initialTopicId) {
    const resolved = getTheoryTopicById(options.initialTopicId);
    if (resolved) {
      currentActiveTopicId = resolved.id;
      currentExpandedCategories.add(resolved.category);
    }
  }

  container.innerHTML = '';
  container.className = 'w-full flex flex-col gap-8 transition-colors duration-300';

  // Outer Wrapper: 2-column High-Density Grid
  const ledgerGrid = document.createElement('div');
  ledgerGrid.className = 'w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start';

  // Left Column (Sidebar Navigation)
  const sidebar = document.createElement('aside');
  sidebar.className = 'w-full lg:col-span-4 xl:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24 z-10';

  // Right Column (Reader Pane)
  const readerPane = document.createElement('section');
  readerPane.className = 'w-full lg:col-span-8 xl:col-span-8 flex flex-col gap-6 min-w-0';

  ledgerGrid.appendChild(sidebar);
  ledgerGrid.appendChild(readerPane);
  container.appendChild(ledgerGrid);

  // Render Sidebar and Reader
  updateSidebar(sidebar, readerPane);
  updateReader(readerPane, sidebar);
}

/**
 * Render/Update the Sidebar Navigation
 */
function updateSidebar(sidebar, readerPane) {
  sidebar.innerHTML = '';

  // 1. Search Bar
  const searchBox = document.createElement('div');
  searchBox.className = 'relative w-full';
  searchBox.innerHTML = `
    <div class="relative flex items-center">
      <span class="material-symbols-outlined absolute left-3.5 text-stone-400 text-lg pointer-events-none">search</span>
      <input
        type="text"
        id="theorySearchInput"
        placeholder="Buscar conceptos, tablas, verbos..."
        value="${escapeHtml(currentSearchQuery)}"
        class="w-full pl-10 pr-10 py-2.5 bg-surface-container-low dark:bg-stone-850 border border-outline-variant/40 dark:border-stone-800 rounded-xl text-sm font-body text-on-surface dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-primary dark:focus:border-emerald-500 focus:ring-1 focus:ring-primary dark:focus:ring-emerald-500 transition-colors"
      />
      ${currentSearchQuery ? `
        <button id="clearTheorySearchBtn" class="absolute right-3 text-stone-400 hover:text-on-surface dark:hover:text-stone-200 transition-colors">
          <span class="material-symbols-outlined text-base">close</span>
        </button>
      ` : ''}
    </div>
  `;

  const input = searchBox.querySelector('#theorySearchInput');
  input.oninput = (e) => {
    currentSearchQuery = e.target.value;
    updateSidebar(sidebar, readerPane);
  };

  const clearBtn = searchBox.querySelector('#clearTheorySearchBtn');
  if (clearBtn) {
    clearBtn.onclick = () => {
      currentSearchQuery = '';
      updateSidebar(sidebar, readerPane);
    };
  }

  sidebar.appendChild(searchBox);

  // 2. Tag Filter Chips
  const tagBar = document.createElement('div');
  tagBar.className = 'flex flex-wrap gap-1.5 pb-1';
  for (const tag of POPULAR_TAGS) {
    const isTagActive = currentActiveTag === tag.id;
    const chip = document.createElement('button');
    chip.className = isTagActive
      ? 'px-3 py-1 bg-primary dark:bg-emerald-600 text-on-primary rounded-lg text-xs font-label font-semibold shadow-xs transition-all'
      : 'px-3 py-1 bg-surface-container-lowest dark:bg-stone-850 text-on-surface-variant dark:text-stone-300 hover:bg-surface-container-low dark:hover:bg-stone-800 border border-outline-variant/30 dark:border-stone-800 rounded-lg text-xs font-label font-medium transition-colors';
    chip.textContent = tag.label;
    chip.onclick = () => {
      currentActiveTag = tag.id;
      updateSidebar(sidebar, readerPane);
    };
    tagBar.appendChild(chip);
  }
  sidebar.appendChild(tagBar);

  // 3. Pinned Section
  const pinnedIds = getPinnedTopicIds();
  const allTopics = getAllTheoryTopics();
  const pinnedTopics = pinnedIds.map(id => allTopics.find(t => t.id === id)).filter(Boolean);

  if (pinnedTopics.length > 0 && !currentSearchQuery && currentActiveTag === 'all') {
    const pinnedSection = document.createElement('div');
    pinnedSection.className = 'flex flex-col gap-2';
    pinnedSection.innerHTML = `
      <div class="flex items-center justify-between px-1">
        <h3 class="font-label text-[11px] font-bold uppercase tracking-wider text-on-surface-variant dark:text-stone-400 flex items-center gap-1.5">
          <span class="material-symbols-outlined text-xs text-primary dark:text-emerald-400" style="font-variation-settings: 'FILL' 1;">push_pin</span>
          Fijados / Pinned
        </h3>
        <span class="text-[11px] font-mono text-stone-400 dark:text-stone-500">${pinnedTopics.length}</span>
      </div>
      <div id="pinnedListContainer" class="flex flex-col gap-1"></div>
    `;

    const pinnedList = pinnedSection.querySelector('#pinnedListContainer');
    for (const topic of pinnedTopics) {
      const isSelected = topic.id === currentActiveTopicId;
      const item = document.createElement('div');
      item.className = isSelected
        ? 'group flex items-center justify-between p-2.5 rounded-xl bg-primary/10 dark:bg-emerald-950/40 border-l-3 border-primary dark:border-emerald-500 text-primary dark:text-emerald-400 font-semibold cursor-pointer shadow-xs transition-colors'
        : 'group flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest dark:bg-stone-850 hover:bg-surface-container-low dark:hover:bg-stone-800 border border-outline-variant/20 dark:border-stone-800/80 text-on-surface dark:text-stone-200 cursor-pointer transition-colors';

      item.innerHTML = `
        <div class="flex items-center gap-2.5 overflow-hidden">
          <span class="material-symbols-outlined text-base ${isSelected ? 'text-primary dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'} flex-shrink-0" style="font-variation-settings: 'FILL' 1;">${topic.icon}</span>
          <span class="text-xs font-body font-medium truncate">${escapeHtml(topic.title)}</span>
        </div>
        <button class="unpin-btn opacity-0 group-hover:opacity-100 p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition text-stone-400 hover:text-amber-500" title="Desfijar">
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      `;

      item.onclick = (e) => {
        if (e.target.closest('.unpin-btn')) {
          e.stopPropagation();
          togglePinTopic(topic.id);
          updateSidebar(sidebar, readerPane);
          return;
        }
        currentActiveTopicId = topic.id;
        currentExpandedCategories.add(topic.category);
        updateSidebar(sidebar, readerPane);
        updateReader(readerPane, sidebar);
      };

      pinnedList.appendChild(item);
    }
    sidebar.appendChild(pinnedSection);
  }

  // 4. Categories & Curriculum Groups
  const catalogSection = document.createElement('div');
  catalogSection.className = 'flex flex-col gap-3';

  // Filter topics based on active search or active tag
  let filteredTopics = allTopics;
  if (currentSearchQuery) {
    filteredTopics = searchTheoryTopics(currentSearchQuery);
  } else if (currentActiveTag !== 'all') {
    filteredTopics = getTheoryByTag(currentActiveTag);
  }

  if (filteredTopics.length === 0) {
    catalogSection.innerHTML = `
      <div class="p-6 text-center text-on-surface-variant dark:text-stone-400 bg-surface-container-lowest dark:bg-stone-850 rounded-2xl border border-outline-variant/30 dark:border-stone-800">
        <span class="material-symbols-outlined text-3xl mb-2 text-stone-400">search_off</span>
        <p class="text-sm font-body">No se encontraron temas con "${escapeHtml(currentSearchQuery)}"</p>
      </div>
    `;
    sidebar.appendChild(catalogSection);
    return;
  }

  // Render grouped accordions
  for (const cat of THEORY_CATEGORIES) {
    const catTopics = filteredTopics.filter(t => t.category === cat.id);
    if (catTopics.length === 0) continue;

    const isExpanded = currentExpandedCategories.has(cat.id);
    const catCard = document.createElement('div');
    catCard.className = 'rounded-2xl bg-surface-container-lowest dark:bg-stone-850 border border-outline-variant/30 dark:border-stone-800 overflow-hidden shadow-xs transition-colors duration-300';

    const headerBtn = document.createElement('button');
    headerBtn.className = 'w-full flex items-center justify-between p-3.5 bg-surface-container-low/50 dark:bg-stone-900/50 hover:bg-surface-container-low dark:hover:bg-stone-900 transition-colors text-left';
    headerBtn.innerHTML = `
      <div class="flex items-center gap-2.5">
        <span class="material-symbols-outlined text-lg text-primary dark:text-emerald-400">${cat.icon}</span>
        <span class="font-headline text-xs font-bold text-on-surface dark:text-stone-100">${cat.fullLabel}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/10 text-primary dark:bg-emerald-950/60 dark:text-emerald-400">${catTopics.length}</span>
        <span class="material-symbols-outlined text-base text-stone-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}">expand_more</span>
      </div>
    `;

    headerBtn.onclick = () => {
      if (currentExpandedCategories.has(cat.id)) {
        currentExpandedCategories.delete(cat.id);
      } else {
        currentExpandedCategories.add(cat.id);
      }
      updateSidebar(sidebar, readerPane);
    };

    catCard.appendChild(headerBtn);

    if (isExpanded) {
      const topicList = document.createElement('div');
      topicList.className = 'p-2 flex flex-col gap-1 border-t border-outline-variant/20 dark:border-stone-800';

      for (const topic of catTopics) {
        const isSelected = topic.id === currentActiveTopicId;
        const topicBtn = document.createElement('button');
        topicBtn.className = isSelected
          ? 'w-full flex items-center justify-between p-2.5 rounded-xl bg-primary/10 dark:bg-emerald-950/40 text-primary dark:text-emerald-400 font-semibold border-l-3 border-primary dark:border-emerald-500 shadow-xs transition-colors text-left'
          : 'w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-container-low dark:hover:bg-stone-800 text-on-surface dark:text-stone-300 font-normal transition-colors text-left';

        topicBtn.innerHTML = `
          <div class="flex items-center gap-2.5 overflow-hidden">
            <span class="material-symbols-outlined text-base ${isSelected ? 'text-primary dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'} flex-shrink-0">${topic.icon}</span>
            <div class="truncate">
              <div class="text-xs font-body font-medium truncate">${escapeHtml(topic.title)}</div>
              <div class="text-[10px] font-label text-stone-400 dark:text-stone-500">${escapeHtml(topic.sourceLabel)}</div>
            </div>
          </div>
          <span class="material-symbols-outlined text-xs text-stone-300 dark:text-stone-600 ${isSelected ? 'text-primary dark:text-emerald-400' : ''}">chevron_right</span>
        `;

        topicBtn.onclick = () => {
          currentActiveTopicId = topic.id;
          updateSidebar(sidebar, readerPane);
          updateReader(readerPane, sidebar);
          // Smooth scroll to top of reader on small screens
          if (window.innerWidth < 1024) {
            readerPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };

        topicList.appendChild(topicBtn);
      }
      catCard.appendChild(topicList);
    }

    catalogSection.appendChild(catCard);
  }

  sidebar.appendChild(catalogSection);
}

/**
 * Render/Update the Right Reader Pane
 */
function updateReader(readerPane, sidebar) {
  readerPane.innerHTML = '';

  const topic = getTheoryTopicById(currentActiveTopicId) || getAllTheoryTopics()[0];
  if (!topic) return;

  const categoryDef = THEORY_CATEGORIES.find(c => c.id === topic.category) || THEORY_CATEGORIES[0];
  const isPinned = getPinnedTopicIds().includes(topic.id);

  // 1. Article Hero Container
  const heroCard = document.createElement('div');
  heroCard.className = 'rounded-3xl p-6 sm:p-8 bg-surface-container-lowest dark:bg-stone-850 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex flex-col gap-4 transition-colors duration-300';

  // Category & Source Badge + Pin Button
  const topMetaRow = document.createElement('div');
  topMetaRow.className = 'flex items-center justify-between gap-4 flex-wrap';

  topMetaRow.innerHTML = `
    <div class="flex items-center gap-2 flex-wrap">
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold uppercase tracking-wider bg-primary/10 text-primary dark:bg-emerald-950/60 dark:text-emerald-300 border border-primary/20 dark:border-emerald-800/40">
        <span class="material-symbols-outlined text-sm">${categoryDef.icon}</span>
        ${categoryDef.label}
      </span>
      <span class="px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-surface-container-low dark:bg-stone-800 text-on-surface-variant dark:text-stone-400 border border-outline-variant/20 dark:border-stone-750">
        ${escapeHtml(topic.sourceLabel)}
      </span>
    </div>
    <button id="pinTopicToggleBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border ${isPinned ? 'bg-amber-500/15 border-amber-500/40 text-amber-700 dark:text-amber-300' : 'bg-surface-container-low dark:bg-stone-800 border-outline-variant/30 dark:border-stone-750 text-on-surface-variant dark:text-stone-400'} hover:opacity-90 active:scale-95 transition text-xs font-label font-semibold cursor-pointer">
      <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' ${isPinned ? 1 : 0};">push_pin</span>
      <span>${isPinned ? 'Fijado / Pinned' : 'Fijar / Pin'}</span>
    </button>
  `;

  const pinBtn = topMetaRow.querySelector('#pinTopicToggleBtn');
  pinBtn.onclick = () => {
    togglePinTopic(topic.id);
    updateSidebar(sidebar, readerPane);
    updateReader(readerPane, sidebar);
  };

  heroCard.appendChild(topMetaRow);

  // Title
  const title = document.createElement('h1');
  title.className = 'font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-on-surface dark:text-stone-100 leading-tight';
  title.textContent = topic.title;
  heroCard.appendChild(title);

  // Subtitle
  if (topic.subtitle) {
    const subtitle = document.createElement('p');
    subtitle.className = 'font-body text-base text-on-surface-variant dark:text-stone-300 leading-relaxed';
    subtitle.textContent = topic.subtitle;
    heroCard.appendChild(subtitle);
  }

  // Tags Bar
  if (topic.tags && topic.tags.length > 0) {
    const tagsRow = document.createElement('div');
    tagsRow.className = 'flex flex-wrap gap-1.5 pt-2 border-t border-outline-variant/20 dark:border-stone-800';
    for (const tag of topic.tags) {
      const tagChip = document.createElement('span');
      tagChip.className = 'px-2.5 py-0.5 rounded-md bg-surface-container-low dark:bg-stone-800 text-[11px] font-mono text-stone-500 dark:text-stone-400 cursor-pointer hover:text-primary dark:hover:text-emerald-400 transition-colors';
      tagChip.textContent = `#${tag}`;
      tagChip.onclick = () => {
        currentActiveTag = tag;
        updateSidebar(sidebar, readerPane);
      };
      tagsRow.appendChild(tagChip);
    }
    heroCard.appendChild(tagsRow);
  }

  readerPane.appendChild(heroCard);

  // 2. Sections Container (High-Density Ledger)
  const contentCard = document.createElement('article');
  contentCard.className = 'rounded-3xl p-6 sm:p-8 bg-surface-container-lowest dark:bg-stone-850 border border-outline-variant/30 dark:border-stone-800 shadow-sm flex flex-col gap-6 transition-colors duration-300';

  if (Array.isArray(topic.sections) && topic.sections.length > 0) {
    for (const section of topic.sections) {
      const el = renderSection(section);
      if (el) contentCard.appendChild(el);
    }
  } else {
    contentCard.innerHTML = `
      <p class="text-on-surface-variant dark:text-stone-400 text-sm font-body italic">
        Contenido en desarrollo para este tema.
      </p>
    `;
  }

  readerPane.appendChild(contentCard);

  // 3. Footer Linear Navigation Bar (Prev / Next Topic)
  const allTopics = getAllTheoryTopics();
  const currentIndex = allTopics.findIndex(t => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  const footerNav = document.createElement('div');
  footerNav.className = 'flex items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low dark:bg-stone-900 border border-outline-variant/30 dark:border-stone-800 transition-colors';

  footerNav.innerHTML = `
    <div>
      ${prevTopic ? `
        <button id="prevTopicBtn" class="flex items-center gap-2 text-xs font-label font-bold text-on-surface-variant dark:text-stone-400 hover:text-primary dark:hover:text-emerald-400 transition-colors text-left">
          <span class="material-symbols-outlined text-base">arrow_back</span>
          <div class="hidden sm:block">
            <div class="text-[10px] text-stone-400">Anterior</div>
            <div class="truncate max-w-[180px]">${escapeHtml(prevTopic.title)}</div>
          </div>
        </button>
      ` : '<div></div>'}
    </div>
    <div>
      ${nextTopic ? `
        <button id="nextTopicBtn" class="flex items-center gap-2 text-xs font-label font-bold text-on-surface-variant dark:text-stone-400 hover:text-primary dark:hover:text-emerald-400 transition-colors text-right">
          <div class="hidden sm:block">
            <div class="text-[10px] text-stone-400">Siguiente</div>
            <div class="truncate max-w-[180px]">${escapeHtml(nextTopic.title)}</div>
          </div>
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      ` : '<div></div>'}
    </div>
  `;

  if (prevTopic) {
    footerNav.querySelector('#prevTopicBtn').onclick = () => {
      currentActiveTopicId = prevTopic.id;
      currentExpandedCategories.add(prevTopic.category);
      updateSidebar(sidebar, readerPane);
      updateReader(readerPane, sidebar);
      readerPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  if (nextTopic) {
    footerNav.querySelector('#nextTopicBtn').onclick = () => {
      currentActiveTopicId = nextTopic.id;
      currentExpandedCategories.add(nextTopic.category);
      updateSidebar(sidebar, readerPane);
      updateReader(readerPane, sidebar);
      readerPane.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  }

  readerPane.appendChild(footerNav);
}

/**
 * Backward compatibility helpers for deep-links
 */
export function renderTheoryArticle(elements, topic, onBack) {
  const resolved = getTheoryTopicById(topic.id || topic);
  if (resolved) {
    currentActiveTopicId = resolved.id;
    currentExpandedCategories.add(resolved.category);
  }
  if (onBack) onBack();
}

export function renderWordTheoryArticle(elements, theory, onBack) {
  const resolved = getTheoryTopicById(theory.id || theory);
  if (resolved) {
    currentActiveTopicId = resolved.id;
    currentExpandedCategories.add(resolved.category);
  }
  if (onBack) onBack();
}

/**
 * HTML Escape Helper
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Section Renderers
 */
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
  h.className = 'font-headline text-xl sm:text-2xl font-bold text-on-surface dark:text-stone-100 mt-6 mb-3 first:mt-0 transition-colors duration-300';
  h.textContent = text;
  return h;
}

function createParagraph(text) {
  const p = document.createElement('p');
  p.className = 'font-body text-sm sm:text-base text-on-surface-variant dark:text-stone-300 leading-relaxed mb-4 transition-colors duration-300';
  p.textContent = text;
  return p;
}

function createCallout(style, text) {
  const styles = {
    tip: {
      border: 'border-l-4 border-emerald-500 dark:border-emerald-400',
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/25',
      icon: 'lightbulb',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      textColor: 'text-emerald-900 dark:text-emerald-200',
    },
    important: {
      border: 'border-l-4 border-primary dark:border-emerald-500',
      bg: 'bg-primary-container/10 dark:bg-emerald-900/15',
      icon: 'info',
      iconColor: 'text-primary dark:text-emerald-400',
      textColor: 'text-on-surface dark:text-stone-100',
    },
    warning: {
      border: 'border-l-4 border-amber-500 dark:border-amber-400',
      bg: 'bg-amber-50/80 dark:bg-amber-950/25',
      icon: 'warning',
      iconColor: 'text-amber-600 dark:text-amber-400',
      textColor: 'text-amber-950 dark:text-amber-200',
    },
  };

  const s = styles[style] || styles.tip;

  const div = document.createElement('div');
  div.className = `${s.border} ${s.bg} rounded-r-2xl p-4 mb-4 flex items-start gap-3 transition-colors duration-300 shadow-2xs`;
  div.innerHTML = `
    <span class="material-symbols-outlined ${s.iconColor} text-xl mt-0.5 flex-shrink-0 transition-colors duration-300" style="font-variation-settings: 'FILL' 1;">${s.icon}</span>
    <p class="font-body text-sm ${s.textColor} leading-relaxed transition-colors duration-300">${text}</p>
  `;
  return div;
}

function formatCellContent(raw, isFirst) {
  if (raw === null || raw === undefined) return '';
  let str = String(raw);

  // Convert markdown bold **text** -> <strong>
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-on-surface dark:text-stone-100">$1</strong>');

  // Convert markdown backticks `code` -> styled pill badge
  str = str.replace(/`([^`]+)`/g, '<code class="px-2 py-0.5 rounded-md font-mono text-xs font-bold bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60 shadow-2xs">$1</code>');

  // Highlight checkmarks, crosses, warnings
  str = str.replace(/✅\s*([^<,\n\r]+)/g, '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-100/90 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300/70 dark:border-emerald-700/70">✅ $1</span>');
  str = str.replace(/❌\s*([^<,\n\r]+)/g, '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-rose-100/90 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-300/70 dark:border-rose-700/70">❌ $1</span>');
  str = str.replace(/⚠️\s*([^<,\n\r]+)/g, '<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-amber-100/90 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border border-amber-300/70 dark:border-amber-700/70">⚠️ $1</span>');

  // Highlight arrows →
  str = str.replace(/→/g, '<span class="text-emerald-600 dark:text-emerald-400 font-bold mx-1.5">→</span>');

  if (isFirst) {
    return `<span class="font-bold text-emerald-900 dark:text-emerald-200 tracking-tight">${str}</span>`;
  }

  return str;
}

function createTable(caption, headers, rows) {
  const container = document.createElement('div');
  container.className = 'mb-6';

  let html = '';
  if (caption) {
    html += `
      <div class="flex items-center gap-2.5 mb-2.5 px-1">
        <span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/15 dark:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400">
          <span class="material-symbols-outlined text-base">table_chart</span>
        </span>
        <span class="font-label text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">${caption}</span>
      </div>`;
  }

  html += `
    <div class="rounded-2xl overflow-hidden border border-emerald-300/50 dark:border-emerald-900/40 bg-white dark:bg-stone-900 shadow-xs hover:shadow-sm transition-all duration-300 ring-1 ring-emerald-500/10 dark:ring-emerald-500/15">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gradient-to-r from-emerald-100/80 via-teal-50/70 to-emerald-50/50 dark:from-emerald-950/80 dark:via-stone-900 dark:to-emerald-950/60 border-b-2 border-emerald-300/80 dark:border-emerald-800/60">
            <tr>`;

  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    const isFirst = i === 0;
    html += `
      <th class="py-3 px-4 sm:px-5 font-headline text-xs font-bold uppercase tracking-wider ${isFirst ? 'text-emerald-900 dark:text-emerald-300' : 'text-stone-700 dark:text-stone-300'}">
        ${h}
      </th>`;
  }

  html += `
            </tr>
          </thead>
          <tbody class="divide-y divide-emerald-100/60 dark:divide-stone-800/70">`;

  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    const isZebra = r % 2 === 1;
    const zebraClass = isZebra ? 'bg-emerald-50/35 dark:bg-emerald-950/20' : 'bg-white dark:bg-stone-900';

    html += `<tr class="${zebraClass} hover:bg-emerald-100/50 dark:hover:bg-emerald-900/35 transition-colors duration-150">`;
    for (let c = 0; c < row.length; c++) {
      const cell = row[c];
      const isFirst = c === 0;
      const formatted = formatCellContent(cell, isFirst);

      let cellClass = isFirst
        ? 'py-3 px-4 sm:px-5 font-body text-sm text-stone-900 dark:text-stone-100 leading-relaxed font-medium'
        : 'py-3 px-4 sm:px-5 font-body text-sm text-stone-700 dark:text-stone-300 leading-relaxed';

      html += `<td class="${cellClass}">${formatted}</td>`;
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
  wrapper.className = 'group relative mb-6 rounded-2xl overflow-hidden border border-outline-variant/40 dark:border-stone-800 shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/50 dark:hover:border-emerald-500/50 cursor-zoom-in bg-surface-container-lowest dark:bg-stone-900';
  
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
        <a href="${src}" target="_blank" rel="noopener noreferrer" class="p-2 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition text-white ml-2" title="Open full resolution in new tab">
          <span class="material-symbols-outlined text-lg">open_in_new</span>
        </a>
        <button id="lightboxCloseBtn" class="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 active:scale-95 transition text-white ml-2" title="Close (Esc)">
          <span class="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
    </div>
    <div id="lightboxViewport" class="flex-1 overflow-auto p-4 flex items-center justify-center cursor-grab active:cursor-grabbing relative">
      <img id="lightboxImg" src="${src}" alt="${title}" class="max-w-none transition-transform duration-150 ease-out origin-center rounded-lg shadow-2xl" style="max-height: 85vh; width: auto;" />
    </div>
    <div class="px-4 py-2 text-center text-xs text-stone-400 bg-black/40 border-t border-white/5 flex-shrink-0">
      Use zoom buttons or double-click to toggle zoom. Press ESC to close.
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
  wrapper.className = 'mb-6 rounded-2xl overflow-hidden border border-surface-variant dark:border-stone-800 shadow-sm bg-black transition-colors duration-300';
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
