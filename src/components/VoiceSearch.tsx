import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/VoiceSearch.module.scss";

const VoiceSearch = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window?.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e) => console.error("Speech error:", e);

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      fakeApiCall(text);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const fakeApiCall = async (text: string) => {
    setResult(null);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setResult(`You searched for: "${text}"`);
  };

  return (
    <div className={styles.container}>
      {!isListening && !transcript && (
        <button onClick={startListening} className={styles.micButton}>
          <img
            src="https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png"
            alt="Mic"
          />
        </button>
      )}

      {isListening && (
        <div className={styles.listeningModal}>
          <div className={styles.modalCard}>
            <img
              src="https://www.gstatic.com/images/branding/googlemic/2x/googlemic_color_24dp.png"
              alt="Listening"
              className={styles.listeningIcon}
            />
            <p className={styles.listeningText}>Listening…</p>
            <button className={styles.cancelButton} onClick={stopListening}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {transcript && result && (
        <div className={styles.resultCard}>
          <p className={styles.resultText}>{transcript}</p>
          <p className={styles.resultHint}>{result}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;
