import { useEffect, useState } from "react";
import styles from "../styles/NewsFeed.module.scss";
import { MoreVertical } from "lucide-react";

type Article = {
  title: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
};

const FALLBACK_IMAGE = "https://via.placeholder.com/400x200?text=No+Image";

const NewsFeed = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`

        );
        const data = await res.json();

        const validArticles = (data.articles || []).filter(
          (article: Article) =>
            article.title && article.urlToImage && article.source?.name
        );

        setArticles(validArticles);
      } catch (error) {
        console.error("Failed to fetch articles", error);
        // Fallback dummy data
        setArticles([
          {
            title: "AI is Changing Everything in Tech",
            urlToImage: FALLBACK_IMAGE,
            source: { name: "TechCrunch" },
            publishedAt: new Date().toISOString(),
          },
          {
            title: "India Launches New Space Mission",
            urlToImage: FALLBACK_IMAGE,
            source: { name: "The Verge" },
            publishedAt: new Date().toISOString(),
          },
        ]);
      }
    };

    fetchNews();
  }, []);

  const timeAgo = (date: string) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (diff < 60) return `${diff}m ago`;
    const hours = Math.floor(diff / 60);
    return `${hours}h ago`;
  };

  return (
    <div className={styles.newsFeed}>
      {articles.map((article, idx) => (
        <div className={styles.card} key={idx}>
          <img
            className={styles.image}
            src={article.urlToImage || FALLBACK_IMAGE}
            alt="news"
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
          <div className={styles.content}>
            <h3 className={styles.title}>{article.title}</h3>
            <div className={styles.meta}>
              <span className={styles.source}>{article.source.name}</span>
              <span className={styles.dot}>·</span>
              <span className={styles.time}>{timeAgo(article.publishedAt)}</span>
              <MoreVertical size={16} className={styles.menuIcon} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
