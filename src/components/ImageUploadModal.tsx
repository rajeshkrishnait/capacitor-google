import React, { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './utils/cropImage';
import './ImageSearchModal.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (croppedImage: Blob) => void;
}

const ImageSearchModal: React.FC<Props> = ({ isOpen, onClose, onSearch }) => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [zoom, setZoom] = useState(1);

  const isMobile = Capacitor.isNativePlatform();

  useEffect(() => {
    if (isOpen && isMobile) {
      openCamera();
    }
  }, [isOpen]);

  const openCamera = async () => {
    try {
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 90,
      });
      setImage(photo.dataUrl || null);
    } catch (e) {
      console.error('Camera error', e);
      onClose();
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleCropSave = async () => {
    if (!image || !croppedAreaPixels) return;
    const blob = await getCroppedImg(image, croppedAreaPixels);
    onSearch(blob);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      {!image && !isMobile && (
        <div className="upload-container">
          <label className="upload-label">
            Upload Image
            <input type="file" accept="image/*" onChange={handleUpload} hidden />
          </label>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      )}

      {image && (
        <div className={`cropper-container ${isMobile ? 'mobile' : 'web'}`}>
          <Cropper
            image={image}
            crop={{ x: 0, y: 0 }}
            zoom={zoom}
            aspect={1}
            onCropChange={() => {}}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
          <div className="controls">
            <button onClick={handleCropSave}>Search</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSearchModal;
