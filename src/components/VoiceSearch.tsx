import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import styles from "../styles/VoiceSearch.module.scss";

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ isOpen, onClose }) => {
  const recognitionRef = useRef<any>(null);
  const [transcript, setTranscript] = useState("");

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
    recognition.interimResults = true; // Allow interim results for real-time updates
    recognition.continuous = false;

    recognition.onstart = () => console.log("Speech recognition started");
    recognition.onend = () => {
      console.log("Speech recognition ended");
      onClose();
    };
    recognition.onerror = (e) => {
      console.error("Speech error:", e);
      onClose();
    };

    recognition.onresult = (event: any) => {
      const interimTranscript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join("");
      setTranscript(interimTranscript);
      console.log(`Interim transcript: ${interimTranscript}`);
    };

    recognitionRef.current = recognition;
    recognition.start();

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [isOpen, onClose]);

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
        <span className={styles.modalTitle}>Listening...</span>
      </div>
      <div className={styles.modalContent}>
        <div className={styles.dotsAnimation}>
          <span className={styles.dot} style={{ backgroundColor: "#4285F4" }}></span>
          <span className={styles.dot} style={{ backgroundColor: "#EA4335" }}></span>
          <span className={styles.dot} style={{ backgroundColor: "#FBBC05" }}></span>
          <span className={styles.dot} style={{ backgroundColor: "#34A853" }}></span>
        </div>
        <p className={styles.listeningText}>{transcript || "Listening…"}</p>
      </div>
    </Modal>
  );
};

export default VoiceSearch;
