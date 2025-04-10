// src/components/SearchBar/SearchBar.tsx
import styles from "../styles/SearchBar.module.scss";
import micIcon from "../assets/microphone.svg";
import cameraIcon from "../assets/camera.svg";
import searchIcon from "../assets/search.svg";
import backIcon from "../assets/back.svg"; // Add a back icon
import { useState } from "react";
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
  const navigate = useNavigate();

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

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        {isFocused && (
          <img
            src={backIcon}
            alt="Back"
            className={styles.backIcon}
            onClick={onBlur} // Trigger blur when back button is clicked
          />
        )}
        <img src={searchIcon} alt="Search" className={styles.searchIcon} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={onFocus} // Trigger focus event
          className={styles.searchInput}
          placeholder="Search Google or type a URL"
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
    </div>
  );
};

export default SearchBar;
