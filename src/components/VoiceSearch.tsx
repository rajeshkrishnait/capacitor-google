import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import styles from "../styles/VoiceSearch.module.scss";

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ isOpen, onClose }) => {
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const SpeechRecognition =
      window?.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      onClose();
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;

    const resetTimeout = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log("No speech detected for 2 seconds. Ending recognition.");
        recognition.stop();
      }, 5000); // 2-second timeout
    };

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsListening(true);
      resetTimeout();
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsListening(false);
      if (transcript.trim()) {
        navigate("/search-result", { state: { query: transcript } });
      }
      onClose();
    };

    recognition.onerror = (e) => {
      console.error("Speech error:", e);
      setIsListening(false);
      onClose();
    };

    recognition.onresult = (event: any) => {
      const interimTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setTranscript(interimTranscript);
      console.log(`Interim transcript: ${interimTranscript}`);
      resetTimeout(); // Reset timeout on speech detection
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [isOpen, onClose, navigate, transcript]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.listeningModal}
      overlayClassName={styles.modalOverlay}
      ariaHideApp={false}
    >
      <div className={styles.modalHeader}>
        <button className={styles.backButton} onClick={onClose}>
          ←
        </button>
        <span className={styles.modalTitle}>
          {isListening ? "Listening..." : "Results"}
        </span>
      </div>
      <div className={styles.modalContent}>
        {isListening ? (
          <div>
            <div className={styles.dotsAnimation}>
              <span className={styles.dot} style={{ backgroundColor: "#4285F4" }}></span>
              <span className={styles.dot} style={{ backgroundColor: "#EA4335" }}></span>
              <span className={styles.dot} style={{ backgroundColor: "#FBBC05" }}></span>
              <span className={styles.dot} style={{ backgroundColor: "#34A853" }}></span>
            </div>
            <p className={styles.listeningText}>{transcript || "Listening…"}</p>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default VoiceSearch;
