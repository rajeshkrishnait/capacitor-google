import React, { useState } from "react";
import GoogleLogo from "../components/GoogleLogo.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Footer from "../components/Footer.tsx";
import { useTheme } from "../context/ThemeProvider";
import NewsFeed from "../components/NewsFeed.tsx";
import QuickActions from "../components/QuickActions.tsx";
import MobileFooter from "../components/MobileFooter.tsx";
import styles from "../styles/HomePage.module.scss";
import Nav from "../components/Nav.tsx";
const HomePage: React.FC = () => {
  const { windowWidth } = useTheme();
  const isMobile = windowWidth <= 768; // Adjust the breakpoint as needed
  const [activeTab, setActiveTab] = useState<"home" | "recent" | "notifications" | "menu">("home");
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Track search focus state

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setIsSearchFocused(false);

  return (
    <div className={`${styles.homepage} ${isSearchFocused ? styles.searchFocused : ""}`}>
      {!isSearchFocused && <Nav />}
      {!isSearchFocused && <div className={styles.navWrapper}><GoogleLogo /></div>}
      <div className={styles.homepageCenter}>
        <SearchBar
          isFocused={isSearchFocused}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        {!isSearchFocused && isMobile && <QuickActions />}
        {!isSearchFocused && isMobile && <NewsFeed />}

      </div>
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter activeTab={activeTab} onTabChange={setActiveTab} />}
    </div>
  );
};

export default HomePage;
