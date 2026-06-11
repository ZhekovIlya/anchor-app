// ========================
// SPEECH RECOGNITION CORE
// ========================
// Wrapper around Web Speech API.

export class SpeechRecognitionService {
  constructor(options = {}) {
    this.onResult = options.onResult || (() => {});
    this.onError = options.onError || (() => {});
    this.onEnd = options.onEnd || (() => {});
    this.isRecording = false;
    this.mockMode = false;
    this.recognition = null;

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.warn("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'es-ES';

    this.recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      this.onResult(finalTranscript.trim() || interimTranscript.trim());
    };

    this.recognition.onerror = (event) => {
      this.onError(event.error);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      this.onEnd();
    };
  }

  start(mockMode = false) {
    this.mockMode = mockMode;
    this.isRecording = true;
    if (this.mockMode) {
      console.log("[Mock Speech] Started");
      return;
    }
    
    if (this.recognition) {
      try {
        this.recognition.start();
      } catch(e) {
        // Already started or other error
        this.onError(e.message);
      }
    }
  }

  stop() {
    this.isRecording = false;
    if (this.mockMode) {
      console.log("[Mock Speech] Stopped");
      this.onEnd();
      return;
    }

    if (this.recognition) {
      this.recognition.stop();
    }
  }

  // Triggered manually in mock mode
  simulateSpeech(text) {
    if (this.mockMode && this.isRecording) {
      this.onResult(text);
    }
  }
}
