import React from "react";
import styles from "../styles/MobileFooter.module.scss";
import { Home, Clock, Bell, Menu } from "lucide-react";

type Tab = "home" | "recent" | "notifications" | "menu";

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const MobileFooter: React.FC<Props> = ({ activeTab, onTabChange }) => {
  return (
    <footer className={styles.mobileFooter}>
      <div
        className={`${styles.footerIcon} ${activeTab === "home" ? styles.active : ""}`}
        onClick={() => onTabChange("home")}
      >
        <Home />
      </div>
      <div
        className={`${styles.footerIcon} ${activeTab === "recent" ? styles.active : ""}`}
        onClick={() => onTabChange("recent")}
      >
        <Clock />
      </div>
      <div
        className={`${styles.footerIcon} ${activeTab === "notifications" ? styles.active : ""}`}
        onClick={() => onTabChange("notifications")}
      >
        <div className={styles.notificationIcon}>
          <Bell />
          <span className={styles.redDot} />
        </div>
      </div>
      <div
        className={`${styles.footerIcon} ${activeTab === "menu" ? styles.active : ""}`}
        onClick={() => onTabChange("menu")}
      >
        <Menu />
      </div>
    </footer>
  );
};

export default MobileFooter;
