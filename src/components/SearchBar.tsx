// src/components/SearchBar/SearchBar.tsx
import styles from "../styles/SearchBar.module.scss";
import micIcon from "../assets/microphone.svg";
import cameraIcon from "../assets/camera.svg";
import searchIcon from "../assets/search.svg";
import backIcon from "../assets/back.svg"; // Add a back icon
import { useState, useEffect, useRef } from "react"; // Add useRef and useEffect
import VoiceSearch from "./VoiceSearch";
import ImageUploadModal from "./ImageUploadModal";
import { useNavigate } from "react-router-dom";
interface SearchBarProps {
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isFocused, onFocus, onBlur }) => {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [query, setQuery] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const navigate = useNavigate();
  const searchBarRef = useRef<HTMLDivElement>(null); // Create a ref for the SearchBar

  const handleBackClick = () => {
    setIsInputFocused(false); // Ensure input focus is reset
    onBlur(); // Trigger blur event
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsInputFocused(false); // Ensure input focus is reset
        onBlur(); // Trigger blur event
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onBlur]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate("/search-result", { state: { query } });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleVoiceClick = () => {
    setShowVoiceSearch(true);
  };
  const handleOnFocus = () => {
    setIsInputFocused(true);
    onFocus(); // Trigger focus event from parent
  };

  const historyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={styles.historyIcon}
    >
      <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 20a9 9 0 1 1 9-9 9 9 0 0 1-9 9zm.5-14h-1v6l5.25 3.15.5-.86L12.5 13z" />
    </svg>
  );

  return (
    <div
      ref={searchBarRef} // Attach the ref to the SearchBar container
      className={`${styles.searchBarContainer} ${
        isFocused ? styles.focused : ""
      }`}
    >
      <div className={styles.searchBar}>
        {isFocused && (
          <img
            src={backIcon}
            alt="Back"
            className={styles.backIcon}
            onClick={handleBackClick} // Use updated handler
          />
        )}
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleOnFocus} // Trigger focus event
          className={styles.searchInput}
          placeholder="Search"
        />
        <div className={styles.iconGroup}>
          <img
            src={micIcon}
            alt="mic"
            onClick={handleVoiceClick}
            className={styles.icon}
          />
          <VoiceSearch
            isOpen={showVoiceSearch}
            onClose={() => setShowVoiceSearch(false)}
          />
          <img
            src={cameraIcon}
            alt="camera"
            className={styles.icon}
            onClick={() => setShowImageUpload((prev) => !prev)}
          />
          {showImageUpload && <ImageUploadModal />}
        </div>
      </div>
      {isInputFocused && (
        <div className={styles.searchHistory}>
          <ul className={styles.historyList}>
            <li>
              <span>Recent searches</span>
              <span>MANAGE HISTORY</span>
            </li>
            <li>
              {historyIcon} How to use Google Lens
            </li>
            <li>
              {historyIcon} Capacitor.js tutorials
            </li>
            <li>
              {historyIcon} React best practices
            </li>
            <li>
              {historyIcon} Weather today
            </li>
            <li>
              {historyIcon} JavaScript ES6 features
            </li>
            <li>
              {historyIcon} CSS Grid vs Flexbox
            </li>
            <li>
              {historyIcon} Top 10 React libraries
            </li>
            <li>
              {historyIcon} Upcoming tech trends
            </li>
            <li>
              {historyIcon} Best IDEs for developers
            </li>
            <li>
              {historyIcon} How to debug React apps
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
