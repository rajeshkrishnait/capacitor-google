import React, { useState } from 'react';
import GoogleLogo from '../components/GoogleLogo.tsx';
import SearchBar from '../components/SearchBar.tsx';
import Footer from '../components/Footer.tsx';
import Nav from '../components/Nav.tsx';
import { useTheme } from '../context/ThemeProvider';
import NewsFeed from '../components/NewsFeed.tsx';
import QuickActions from '../components/QuickActions.tsx';
import MobileFooter from '../components/MobileFooter.tsx';

const HomePage: React.FC = () => {
  const { windowWidth } = useTheme(); // Correct destructuring
  const isMobile = windowWidth <= 768; // Adjust the breakpoint as needed
  const [activeTab, setActiveTab] = useState<"home" | "recent" | "notifications" | "menu">("home");

  return (
    <div className="homepage">
        <Nav />
        <div className="homepage__center">
          <GoogleLogo />
          <SearchBar />
          {isMobile && <QuickActions />}

          {isMobile && <NewsFeed />}
        </div>
        {!isMobile && <Footer/>}
        {isMobile &&  <MobileFooter activeTab={activeTab} onTabChange={setActiveTab} />}

    </div>
  );
};

export default HomePage;
