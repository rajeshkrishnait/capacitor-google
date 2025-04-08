// src/components/SearchBar/SearchBar.tsx
import styles from '../styles/SearchBar.module.scss';
import micIcon from '../assets/microphone.svg';
import cameraIcon from '../assets/camera.svg';
import { useState } from 'react';
import VoiceSearch from './VoiceSearch';
import ImageUploadModal from './ImageUploadModal';
const SearchBar = () => {
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const handleVoiceClick = () => {
    setShowVoiceSearch(true);
  };
  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchBar}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Google or type a URL"
        />
        <div className={styles.iconGroup}>
          <img src={micIcon} alt="mic"  onClick={handleVoiceClick} className={styles.icon} />
          {showVoiceSearch && <VoiceSearch />}

          <img src={cameraIcon} alt="camera" className={styles.icon} onClick={()=>setShowImageUpload(prev=>!prev)}/>
          {showImageUpload && <ImageUploadModal/>}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
