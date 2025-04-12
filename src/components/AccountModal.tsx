import React, { useRef, useEffect } from "react";
import styles from "../styles/AccountModal.module.scss";
import { MdClose, MdExpandMore } from "react-icons/md";
import profile from '../assets/profile.jpg';

interface Props {
  onClose: () => void;
}

const GoogleAccountModal: React.FC<Props> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = modalRef.current;
    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      currentY = e.touches[0].clientY;
    };

    const handleTouchEnd = () => {
      const delta = currentY - startY;
      if (delta < -50) {
        modal?.classList.add(styles.fullscreen);
      } else if (delta > 50) {
        modal?.classList.remove(styles.fullscreen);
      }
    };

    modal?.addEventListener("touchstart", handleTouchStart);
    modal?.addEventListener("touchmove", handleTouchMove);
    modal?.addEventListener("touchend", handleTouchEnd);

    return () => {
      modal?.removeEventListener("touchstart", handleTouchStart);
      modal?.removeEventListener("touchmove", handleTouchMove);
      modal?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal} ref={modalRef}>
        <div className={styles.modalHeader}>
          <button className={styles.closeBtn} onClick={onClose}>
            <MdClose size={24} />
          </button>
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_74x24dp.png"
            alt="Google"
            className={styles.googleLogo}
          />
          <div className={styles.placeholder} />
        </div>

        <div className={styles.profileSection}>
          <img
            src={profile}
            alt="Profile"
            className={styles.avatar}
          />
          <div className={styles.profileInfo}>
            <span className={styles.name}>Rajesh Krishna</span>
            <span className={styles.email}>
              rajeshkrishnarajakumar@gmail.com
            </span>
          </div>
          <MdExpandMore size={24} className={styles.dropdownIcon} />
        </div>

        <button className={styles.manageBtn}>Manage your Google Account</button>

        <div className={styles.optionList}>
          {[
            { icon: "history", text: "Search history", sub: "Saving" },
            { icon: "delete", text: "Delete last 15 mins" },
            { icon: "upgrade", text: "Upgrade to Google One" },
            { icon: "security", text: "SafeSearch" },
            { icon: "bookmark", text: "Saves and collections" },
            { icon: "person_search", text: "Results about you" },
            { icon: "key", text: "Passwords" },
            { icon: "person", text: "Your profile" },
            { icon: "tune", text: "Search personalisation" },
            { icon: "settings", text: "Settings" },
          ].map(({ icon, text, sub }) => (
            <div className={styles.option} key={text}>
              <span className={`material-icons ${styles.icon}`}>{icon}</span>
              <div className={styles.textWrapper}>
                <span>{text}</span>
                {sub && <span className={styles.subtext}>{sub}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.signOut}>
          <button className={styles.signOutBtn}>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAccountModal;
