// ========================
// WEB SPEECH API WRAPPER
// ========================
// Browser-specific TTS. Not used by Telegram bot.

const SELECTED_VOICE_KEY = 'anchor_selected_voice_uri';
const SELECTED_PROMPT_VOICE_KEY = 'anchor_prompt_voice_uri';
const SELECTED_VOICE_RATE_KEY = 'anchor_voice_rate';
export const SELECTED_PROMPT_LANG_KEY = 'anchor_prompt_lang';

/**
 * Get the persisted Spanish playback rate (defaults to 1.0).
 */
export function getSpanishRate() {
  return parseFloat(localStorage.getItem(SELECTED_VOICE_RATE_KEY) || '1.0');
}

/**
 * Cancel any ongoing speech.
 */
export function cancelSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Get all Spanish voices.
 */
export function getSpanishVoices() {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices().filter(voice =>
    voice.lang.startsWith('es')
  );
}

/**
 * Get prompt language voices. With a lang code ('ru' | 'uk') only voices of
 * that language; without one, Russian + Ukrainian.
 */
export function getPromptVoices(lang) {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices().filter(voice =>
    lang
      ? voice.lang.startsWith(lang)
      : voice.lang.startsWith('ru') || voice.lang.startsWith('uk')
  );
}

/**
 * Get the currently selected prompt language code ('ru' or 'uk').
 */
export function getPromptLang() {
  return localStorage.getItem(SELECTED_PROMPT_LANG_KEY) === 'uk' ? 'uk' : 'ru';
}

/**
 * Speak the prompt (Russian or Ukrainian) using the selected voice.
 */
export function speakPrompt(text) {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);

  // Apply selected prompt voice if available
  const voices = window.speechSynthesis.getVoices();
  const selectedUri = localStorage.getItem(SELECTED_PROMPT_VOICE_KEY);
  const lang = getPromptLang();

  // The saved voice is used only if it speaks the chosen prompt language.
  if (selectedUri) {
    const voice = voices.find(v => v.voiceURI === selectedUri);
    if (voice && voice.lang.startsWith(lang)) utterance.voice = voice;
  }

  // Fallback lang from selected language setting
  utterance.lang = lang === 'uk' ? 'uk-UA' : 'ru-RU';
  window.speechSynthesis.speak(utterance);
}

/**
 * Speak the Spanish answer, then call onDone when finished.
 */
export function speakAnswer(text, onDone) {
  if (!('speechSynthesis' in window)) {
    setTimeout(onDone, 1500);
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);

  // Apply selected Spanish voice if available
  const voices = window.speechSynthesis.getVoices();
  const selectedUri = localStorage.getItem(SELECTED_VOICE_KEY);
  if (selectedUri) {
    const voice = voices.find(v => v.voiceURI === selectedUri);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
  } else {
    const esEsVoice = voices.find(v => v.lang === 'es-ES' || v.lang === 'es_ES');
    if (esEsVoice) {
      utterance.voice = esEsVoice;
      utterance.lang = 'es-ES';
    } else {
      utterance.lang = 'es-ES';
    }
  }

  if (!utterance.lang) utterance.lang = 'es-ES';
  utterance.rate = getSpanishRate();

  let isFired = false;
  const finish = () => {
    if (!isFired) {
      isFired = true;
      onDone();
    }
  };

  utterance.onend = finish;
  utterance.onerror = finish;
  setTimeout(finish, Math.max(2000, text.length * 100));
  window.speechSynthesis.speak(utterance);
}

/**
 * Speak the given text slowly (for individual word tap).
 */
export function speakSlowly(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  
  const voices = window.speechSynthesis.getVoices();
  const selectedUri = localStorage.getItem(SELECTED_VOICE_KEY);
  if (selectedUri) {
    const voice = voices.find(v => v.voiceURI === selectedUri);
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
  } else {
    const esEsVoice = voices.find(v => v.lang === 'es-ES' || v.lang === 'es_ES');
    if (esEsVoice) {
      utterance.voice = esEsVoice;
      utterance.lang = 'es-ES';
    } else {
      utterance.lang = 'es-ES';
    }
  }
  
  if (!utterance.lang) utterance.lang = 'es-ES';
  utterance.rate = getSpanishRate() * 0.75;
  window.speechSynthesis.speak(utterance);
}

// ========================
// VOICE SELECTOR HELPERS
// ========================

/**
 * Initialize the Spanish answer voice selector.
 */
export function initVoiceSelector(selectElement) {
  if (!('speechSynthesis' in window)) return;

  const populate = () => {
    const voices = getSpanishVoices();
    const currentUri = localStorage.getItem(SELECTED_VOICE_KEY);

    selectElement.innerHTML = '<option value="" class="bg-white dark:bg-stone-900 text-on-surface dark:text-stone-100">Default Spanish Voice (es-ES)</option>';
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.voiceURI;
      option.className = 'bg-white dark:bg-stone-900 text-on-surface dark:text-stone-100';
      option.textContent = `${voice.name} (${voice.lang})`;
      if (voice.voiceURI === currentUri) option.selected = true;
      selectElement.appendChild(option);
    });
  };

  populate();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populate;
  }

  selectElement.addEventListener('change', (e) => {
    localStorage.setItem(SELECTED_VOICE_KEY, e.target.value);
    // The Truman Show greeting: "Buenos días, y por si no nos vemos, buenas tardes y buenas noches."
    speakAnswer("Buenos días, y por si no nos vemos, buenas tardes y buenas noches.", () => {});
  });
}

/**
 * Initialize the Spanish speed range slider.
 */
export function initSpeedSelector(rangeElement, labelElement) {
  if (!rangeElement) return;

  // Restore persisted value
  const saved = getSpanishRate();
  rangeElement.value = String(saved);
  if (labelElement) labelElement.textContent = `${saved.toFixed(1)}×`;

  rangeElement.addEventListener('input', () => {
    const rate = parseFloat(rangeElement.value);
    localStorage.setItem(SELECTED_VOICE_RATE_KEY, String(rate));
    if (labelElement) labelElement.textContent = `${rate.toFixed(1)}×`;
  });
}

const PROMPT_LANG_CHANGED_EVENT = 'anchor:prompt-lang-changed';

/**
 * Initialize the Prompt language select (ru / uk). Stored under
 * anchor_prompt_lang; the prompt-voice list is rebuilt when it changes.
 */
export function initPromptLangSelector(langSelect, voiceSelect) {
  if (!langSelect) return;
  langSelect.value = getPromptLang();

  langSelect.addEventListener('change', () => {
    const lang = langSelect.value === 'uk' ? 'uk' : 'ru';
    localStorage.setItem(SELECTED_PROMPT_LANG_KEY, lang);

    // Forget a saved voice that does not speak the new language.
    const uri = localStorage.getItem(SELECTED_PROMPT_VOICE_KEY);
    if (uri && 'speechSynthesis' in window) {
      const voice = window.speechSynthesis.getVoices().find(v => v.voiceURI === uri);
      if (!voice || !voice.lang.startsWith(lang)) localStorage.removeItem(SELECTED_PROMPT_VOICE_KEY);
    }

    window.dispatchEvent(new Event(PROMPT_LANG_CHANGED_EVENT));
    speakPrompt(lang === 'uk' ? 'Привіт, як справи?' : 'Привет, как дела?');
  });
}

/**
 * Initialize the Prompt voice selector. Lists only voices of the chosen prompt
 * language (see initPromptLangSelector) and persists the voice URI. Choosing a
 * voice does not change the language.
 */
export function initPromptVoiceSelector(selectElement) {
  if (!selectElement || !('speechSynthesis' in window)) return;

  const populate = () => {
    const lang = getPromptLang();
    const voices = getPromptVoices(lang);
    const currentUri = localStorage.getItem(SELECTED_PROMPT_VOICE_KEY);
    const label = lang === 'uk' ? 'Default Ukrainian voice' : 'Default Russian voice';

    selectElement.innerHTML = '';
    const def = document.createElement('option');
    def.value = '';
    def.className = 'bg-white dark:bg-stone-900 text-on-surface dark:text-stone-100';
    def.textContent = voices.length ? label : `${label} (no installed voice found)`;
    selectElement.appendChild(def);

    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.voiceURI;
      option.className = 'bg-white dark:bg-stone-900 text-on-surface dark:text-stone-100';
      option.textContent = `${voice.name} (${voice.lang})`;
      if (voice.voiceURI === currentUri) option.selected = true;
      selectElement.appendChild(option);
    });
  };

  populate();
  window.addEventListener(PROMPT_LANG_CHANGED_EVENT, populate);
  if (speechSynthesis.onvoiceschanged !== undefined) {
    const prev = speechSynthesis.onvoiceschanged;
    speechSynthesis.onvoiceschanged = () => {
      if (prev) prev();
      populate();
    };
  }

  selectElement.addEventListener('change', (e) => {
    localStorage.setItem(SELECTED_PROMPT_VOICE_KEY, e.target.value);
    speakPrompt(getPromptLang() === 'uk' ? 'Привіт, як справи?' : 'Привет, как дела?');
  });
}
