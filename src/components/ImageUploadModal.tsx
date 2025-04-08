import React, { useState, useRef, useCallback } from "react";
import Modal from "react-modal";
import Cropper from "react-easy-crop";
import { Camera } from "@capacitor/camera";
import styles from "../styles/imageUploadModal.module.scss";

Modal.setAppElement("#root");

const ImageUploadModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
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

  const handleCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = () => {
    // Logic to save or process the cropped image
    console.log("Cropped area pixels:", croppedAreaPixels);
    closeModal();
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
          <button className={styles.closeBtn} onClick={closeModal}>
            ×
          </button>
        </div>

        {!imageSrc ? (
          <div className={styles.uploadSection}>
            <div
              className={styles.dropArea}
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src="https://www.gstatic.com/images/branding/product/1x/photos_96dp.png"
                alt="Placeholder"
              />
              <p>
                Drag an image here or{" "}
                <span className={styles.uploadLink}>upload a file</span>
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
          <div className={styles.cropSection}>
            <div className={styles.cropperContainer}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
            <div className={styles.cropControls}>
              <button className={styles.cropSaveBtn} onClick={handleCropSave}>
                Save
              </button>
              <button className={styles.cropCancelBtn} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ImageUploadModal;