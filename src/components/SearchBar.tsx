// src/components/SearchBar/SearchBar.tsx
import styles from '../styles/SearchBar.module.scss';
import micIcon from '../assets/microphone.svg';
import cameraIcon from '../assets/camera.svg';
import { useState } from 'react';
import VoiceSearch from './VoiceSearch';
import ImageUploadModal from './ImageUploadModal';
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate("/search-result", { state: { query } });
    }
  };

  const handleVoiceClick = () => {
    setShowVoiceSearch(true);
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
          placeholder="Search Google or type a URL"
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
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
