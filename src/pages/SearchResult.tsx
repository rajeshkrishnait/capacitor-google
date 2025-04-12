import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/SearchResult.module.scss";
import { ArrowLeft, X } from "lucide-react";

const SearchResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>(location.state?.query || "");
  const [feed, setFeed] = useState<{ image: string; title: string; site: string; time: string }[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      if (!query) return;
      const dummyFeed = Array(10)
        .fill(null)
        .map((_, i) => ({
          image: `https://placehold.co/200x200?text=Image+${i + 1}`,
          title: `Image ${i + 1} for "${query}"`,
          site: "example.com",
          time: `${i + 1}h ago`,
        }));
      setFeed(dummyFeed);
    };

    fetchFeed();
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const categories = ["Exam", "Paper", "Math", "Color", "Notes", "Diagram", "Answer Sheet"];

  return (
    <div className={styles.searchResultContainer}>
      <div className={styles.header}>
        <ArrowLeft className={styles.icon} onClick={() => navigate("/capacitor-google")} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search"
          className={styles.searchInput}
        />
        <X className={styles.icon} onClick={() => navigate("/capacitor-google")} />
      </div>
      <div className={styles.categorySlider}>
  {categories.map((cat) => (
    <button
      key={cat}
      className={styles.categoryPill}
      onClick={() => setQuery(cat)}
    >
      {cat}
    </button>
  ))}
</div>

      <div className={styles.tabsContainer}>
        <div className={styles.tab}>All</div>
        <div className={`${styles.tab} ${styles.activeTab}`}>Images</div>
        <div className={styles.tab}>Videos</div>
        <div className={styles.tab}>News</div>
      </div>

      <div className={styles.feedContainer}>
        {feed.length > 0 ? (
          feed.map((item, index) => (
            <div key={index} className={styles.feedItem}>
              <img src={item.image} alt={item.title} className={styles.feedImage} />
              <div className={styles.imageMeta}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.meta}>{item.site} · {item.time}</div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noResults}>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
