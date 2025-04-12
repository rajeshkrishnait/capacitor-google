import React from "react";
import styles from "../styles/AccountModal.module.scss";
import { MdClose } from "react-icons/md";

interface Props {
  onClose: () => void;
}

const GoogleAccountModal: React.FC<Props> = ({ onClose }) => {
  return (
    <div className={styles.modalWrapper}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_74x24dp.png"
            alt="Google"
            className={styles.googleLogo}
          />
          <button className={styles.closeBtn} onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className={styles.profileSection}>
          <img
            src="https://via.placeholder.com/72"
            alt="Profile"
            className={styles.avatar}
          />
          <div className={styles.profileInfo}>
            <span className={styles.name}>Rajesh Krishna</span>
            <span className={styles.email}>rajeshkrishnarajakumar@gmail.com</span>
          </div>
        </div>

        <button className={styles.manageBtn}>Manage your Google Account</button>

        <div className={styles.optionList}>
          <div className={styles.option}>
            <span className={styles.icon}>history</span>
            <div className={styles.textWrapper}>
              <span>Search history</span>
              <span className={styles.subtext}>Saving</span>
            </div>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>delete</span>
            <span>Delete last 15 mins</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>upgrade</span>
            <span>Upgrade to Google One</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>security</span>
            <span>SafeSearch</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>bookmark</span>
            <span>Saves and collections</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>person_search</span>
            <span>Results about you</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>key</span>
            <span>Passwords</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>person</span>
            <span>Your profile</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>tune</span>
            <span>Search personalisation</span>
          </div>
          <div className={styles.option}>
            <span className={styles.icon}>settings</span>
            <span>Settings</span>
          </div>
        </div>

        <div className={styles.signOut}>
          <button className={styles.signOutBtn}>Sign out</button>
        </div>
      </div>
    </div>
  );
};

export default GoogleAccountModal;
