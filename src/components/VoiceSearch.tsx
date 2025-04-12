import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import { SpeechRecognition as CapacitorSpeechRecognition } from "@capacitor-community/speech-recognition";
import styles from "../styles/VoiceSearch.module.scss";

interface VoiceSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceSearch: React.FC<VoiceSearchProps> = ({ isOpen, onClose }) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finalTranscriptRef = useRef("");
  const recognitionRef = useRef<any>(null);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const isNative = Capacitor.getPlatform() !== "web";

  useEffect(() => {
    if (!isOpen) return;

    const startListening = async () => {
      if (isNative) {
        const hasPermission = await CapacitorSpeechRecognition.hasPermission();
        if (!hasPermission.permissionGranted) {
          await CapacitorSpeechRecognition.requestPermission();
        }

        setIsListening(true);

        await CapacitorSpeechRecognition.start({
          language: "en-US",
          maxResults: 1,
          partialResults: true,
          popup: false,
        });

        CapacitorSpeechRecognition.addListener("speechRecognitionResult", (event: any) => {
          const spoken = event.matches?.[0] || "";
          setTranscript(spoken);
          finalTranscriptRef.current = spoken;
          resetTimeout();
        });

        CapacitorSpeechRecognition.addListener("speechRecognitionEnd", () => {
          setIsListening(false);
          const finalText = finalTranscriptRef.current.trim();
          if (finalText) setShowConfirm(true);
          else onClose();
        });
      } else {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
          alert("Speech Recognition is not supported in this browser.");
          onClose();
          return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const result = Array.from(event.results)
            .map((res) => res[0].transcript)
            .join("");
          setTranscript(result);
          finalTranscriptRef.current = result;
          resetTimeout();
        };

        recognition.onend = () => {
          setIsListening(false);
          const finalText = finalTranscriptRef.current.trim();
          if (finalText) setShowConfirm(true);
          else onClose();
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error:", event);
          onClose();
        };

        setIsListening(true);
        recognition.start();
      }
    };

    startListening();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (isNative) {
        CapacitorSpeechRecognition.stop();
        CapacitorSpeechRecognition.removeAllListeners();
      } else {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
        }
      }
      // Do not clear finalTranscriptRef here
    };
  }, [isOpen]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (isNative) {
        CapacitorSpeechRecognition.stop();
      } else if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    }, 2000);
  };

  const handleConfirmRedirect = () => {
    const query = finalTranscriptRef.current.trim();
    if (query) {
      navigate("/search-result", { state: { query } });
    }
    cleanup();
  };

  const handleCancelRedirect = () => {
    cleanup();
  };

  const cleanup = () => {
    setShowConfirm(false);
    finalTranscriptRef.current = "";
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.listeningModal}
      overlayClassName={styles.modalOverlay}
      ariaHideApp={false}
    >
      <div className={styles.modalContent}>
        {isListening && (
          <div>
            <div className={styles.dotsAnimation}>
              <span className={styles.dot} style={{ backgroundColor: "#4285F4" }}></span>
              <span className={styles.dot} style={{ backgroundColor: "#EA4335" }}></span>
              <span className={styles.dot} style={{ backgroundColor: "#FBBC05" }}></span>
              <span className={styles.dot} style={{ backgroundColor: "#34A853" }}></span>
            </div>
            <p className={styles.listeningText}>{transcript || "Listening…"}</p>
          </div>
        )}

        {showConfirm && (
          <div className={styles.confirmContainer}>
            <p className={styles.confirmText}>
              We heard: <strong>"{finalTranscriptRef.current.trim()}"</strong>
            </p>
            <div className={styles.confirmButtons}>
              <button className={styles.confirmBtn} onClick={handleConfirmRedirect}>
                Continue
              </button>
              <button className={styles.cancelBtn} onClick={handleCancelRedirect}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default VoiceSearch;
