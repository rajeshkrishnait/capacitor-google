import React, { useState } from "react";
import GoogleLogo from "../components/GoogleLogo.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Footer from "../components/Footer.tsx";
import Nav from "../components/Nav.tsx";
import { useTheme } from "../context/ThemeProvider";
import NewsFeed from "../components/NewsFeed.tsx";
import QuickActions from "../components/QuickActions.tsx";
import MobileFooter from "../components/MobileFooter.tsx";
import styles from "../styles/HomePage.module.scss";

const HomePage: React.FC = () => {
  const { windowWidth } = useTheme();
  const isMobile = windowWidth <= 768; // Adjust the breakpoint as needed
  const [activeTab, setActiveTab] = useState<"home" | "recent" | "notifications" | "menu">("home");
  const [isSearchFocused, setIsSearchFocused] = useState(false); // Track search focus state

  const handleSearchFocus = () => setIsSearchFocused(true);
  const handleSearchBlur = () => setIsSearchFocused(false);

  return (
    <div className={`${styles.homepage} ${isSearchFocused ? styles.searchFocused : ""}`}>
      <Nav />
      <div className={styles.homepageCenter}>
        {!isSearchFocused && <GoogleLogo />}
        <SearchBar
          isFocused={isSearchFocused}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        {!isSearchFocused && isMobile && <QuickActions />}
        {!isSearchFocused && isMobile && <NewsFeed />}
        {isSearchFocused && (
          <div className={styles.searchHistory}>
            <p className={styles.historyTitle}>Recent Searches:</p>
            <ul className={styles.historyList}>
              <li>How to use Google Lens</li>
              <li>Capacitor.js tutorials</li>
              <li>React best practices</li>
              <li>Weather today</li>
              <li>JavaScript ES6 features</li>
              <li>CSS Grid vs Flexbox</li>
              <li>Top 10 React libraries</li>
              <li>Upcoming tech trends</li>
              <li>Best IDEs for developers</li>
              <li>How to debug React apps</li>
              <li>Latest in AI research</li>
              <li>How to optimize web performance</li>
            </ul>
          </div>
        )}
      </div>
      {!isMobile && <Footer />}
      {isMobile && <MobileFooter activeTab={activeTab} onTabChange={setActiveTab} />}
    </div>
  );
};

export default HomePage;
