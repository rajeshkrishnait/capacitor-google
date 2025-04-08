import React, { useEffect } from "react";
import styles from "../styles/AccountModal.module.scss";
import { MdClose } from "react-icons/md"; // using react-icons for Google Material Icons

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <MdClose />
        </button>

        <div className={styles.email}>rajeshkrishnarajakumar@gmail.com</div>
        <div className={styles.avatarWrapper}>
          <img
            src="https://via.placeholder.com/100"
            alt="avatar"
            className={styles.avatar}
          />
          <div className={styles.editIcon}>✎</div>
        </div>
        <div className={styles.greeting}>Hi, Rajesh!</div>

        <button className={styles.manageBtn}>Manage your Google Account</button>

        <div className={styles.accountSwitcher}>
          Show more accounts
          <div className={styles.avatars}>
            <img src="https://via.placeholder.com/32" alt="user1" />
            <img src="https://via.placeholder.com/32" alt="user2" />
          </div>
        </div>

        <div className={styles.sectionLabel}>More from Google Search</div>
        <div className={styles.optionList}>
          <div className={styles.option}>
            <span><i className="material-icons">history</i> Search history</span>
            <span className={styles.subText}>Saving</span>
          </div>
          <div className={styles.option}><i className="material-icons">delete</i> Delete last 15 minutes</div>
          <div className={styles.option}><i className="material-icons">bookmark</i> Saves and Collections</div>
          <div className={styles.option}><i className="material-icons">person_search</i> Search personalisation</div>
          <div className={styles.option}><i className="material-icons">security</i> SafeSearch</div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
