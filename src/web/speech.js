// ========================
// WEB SPEECH API WRAPPER
// ========================
// Browser-specific TTS. Not used by Telegram bot.

const SELECTED_VOICE_KEY = 'anchor_selected_voice_uri';

/**
 * Cancel any ongoing speech.
 */
export function cancelSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Get all available Spanish voices.
 */
export function getSpanishVoices() {
  if (!('speechSynthesis' in window)) return [];
  return window.speechSynthesis.getVoices().filter(voice => 
    voice.lang.startsWith('es')
  );
}

/**
 * Speak the Russian prompt.
 */
export function speakPrompt(text, lang = 'ru-RU') {
  if (!('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
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
  
  // Apply selected voice if available
  const voices = window.speechSynthesis.getVoices();
  const selectedUri = localStorage.getItem(SELECTED_VOICE_KEY);
  if (selectedUri) {
    const voice = voices.find(v => v.voiceURI === selectedUri);
    if (voice) utterance.voice = voice;
  }
  
  utterance.lang = 'es-ES'; // Fallback lang

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
 * UI helper to initialize the voice selector.
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
