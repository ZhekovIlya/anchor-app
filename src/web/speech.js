// ========================
// WEB SPEECH API WRAPPER
// ========================
// Browser-specific TTS. Not used by Telegram bot.

const SELECTED_VOICE_KEY = 'anchor_selected_voice_uri';
const SELECTED_PROMPT_VOICE_KEY = 'anchor_prompt_voice_uri';
export const SELECTED_PROMPT_LANG_KEY = 'anchor_prompt_lang';

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
 * Get all prompt language voices (Russian + Ukrainian).
 */
export function getPromptVoices() {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices().filter(voice =>
    voice.lang.startsWith('ru') || voice.lang.startsWith('uk')
  );
}

/**
 * Get the currently selected prompt language code ('ru' or 'uk').
 */
export function getPromptLang() {
  return localStorage.getItem(SELECTED_PROMPT_LANG_KEY) || 'ru';
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

  if (selectedUri) {
    const voice = voices.find(v => v.voiceURI === selectedUri);
    if (voice) utterance.voice = voice;
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
    if (voice) utterance.voice = voice;
  }

  utterance.lang = 'es-ES';

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

    selectElement.innerHTML = '<option value="">Default Spanish Voice</option>';
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.voiceURI;
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
 * Initialize the Prompt voice selector (Russian / Ukrainian).
 * Populates voices grouped by locale and persists both the voice URI and the lang code.
 */
export function initPromptVoiceSelector(selectElement) {
  if (!('speechSynthesis' in window)) return;

  const populate = () => {
    const voices = getPromptVoices();
    const currentUri = localStorage.getItem(SELECTED_PROMPT_VOICE_KEY);

    selectElement.innerHTML = '<option value="">Default Prompt Voice</option>';
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.voiceURI;
      option.dataset.lang = voice.lang.startsWith('uk') ? 'uk' : 'ru';
      option.textContent = `${voice.name} (${voice.lang})`;
      if (voice.voiceURI === currentUri) option.selected = true;
      selectElement.appendChild(option);
    });
  };

  populate();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    const prev = speechSynthesis.onvoiceschanged;
    speechSynthesis.onvoiceschanged = () => {
      if (prev) prev();
      populate();
    };
  }

  selectElement.addEventListener('change', (e) => {
    const selected = selectElement.options[selectElement.selectedIndex];
    const lang = selected.dataset.lang || 'ru';
    localStorage.setItem(SELECTED_PROMPT_VOICE_KEY, e.target.value);
    localStorage.setItem(SELECTED_PROMPT_LANG_KEY, lang);
    // Speak a quick test in the new language
    const testText = lang === 'uk' ? 'Привіт, як справи?' : 'Привет, как дела?';
    speakPrompt(testText);
  });
}
