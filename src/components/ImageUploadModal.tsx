import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { Camera } from "@capacitor/camera";
import styles from "../styles/imageUploadModal.module.scss";

Modal.setAppElement("#root");

const ImageUploadModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => setIsOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = async () => {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: "DataUrl",
        source: "CAMERA",
      });
      setImageSrc(photo.dataUrl);
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  return (
    <div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={styles.lensModal}
        overlayClassName={styles.lensOverlay}
      >
        <div className={styles.modalHeader}>
          <span>Search any image with Google Lens</span>
          <button className={styles.closeBtn} onClick={closeModal}>×</button>
        </div>

        {!imageSrc ? (
          <div className={styles.uploadSection}>
            <div className={styles.dropArea} onClick={() => fileInputRef.current?.click()}>
              <img
                src="https://www.gstatic.com/images/branding/product/1x/photos_96dp.png"
                alt="Placeholder"
              />
              <p>
                Drag an image here or <span className={styles.uploadLink}>upload a file</span>
              </p>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                capture="environment"
              />
            </div>

            <p className={styles.orText}>OR</p>

            <div className={styles.urlInputContainer}>
              <input
                type="text"
                placeholder="Paste image link"
                className={styles.urlInput}
              />
              <button className={styles.searchBtn}>Search</button>
            </div>

            <button className={styles.cameraBtn} onClick={handleCameraClick}>
              📷 Take a photo
            </button>
          </div>
        ) : (
          <div className={styles.resultSection}>
            <img src={imageSrc} alt="Uploaded preview" className={styles.previewImg} />
            <p className={styles.dummyResults}>Dummy results displayed here...</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageUploadModal