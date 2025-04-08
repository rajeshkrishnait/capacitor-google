import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/SearchResult.module.scss";

const SearchResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>(location.state?.query || "");
  const [feed, setFeed] = useState<string[]>([]);

  useEffect(() => {
    // Fetch dummy feed data based on the query
    const fetchFeed = async () => {
      if (!query) return;
      const dummyFeed = Array(5)
        .fill(null)
        .map((_, i) => `Result ${i + 1} for "${query}"`);
      setFeed(dummyFeed);
    };

    fetchFeed();
  }, [query]);

  const handleSearch = () => {
    if (query.trim()) {
      navigate("/search-result", { state: { query } });
    }
  };

  return (
    <div className={styles.searchResultContainer}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className={styles.searchInput}
      />
      <button onClick={handleSearch} className={styles.searchButton}>
        Search
      </button>
      <div className={styles.feedContainer}>
        {feed.length > 0 ? (
          feed.map((item, index) => (
            <div key={index} className={styles.feedItem}>
              {item}
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
