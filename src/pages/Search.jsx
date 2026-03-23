import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import useNews from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import './Search.css';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get('q') || '';

  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  const { articles, loading, error, hasMore, loadMore, totalArticles } = useNews('general', query);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q') || '';
    setQuery(q);
    setInputValue(q);
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <main className="search-page">
      <div className="search-page__hero">
        <div className="search-page__hero-inner">
          <h1 className="search-page__heading">Search News</h1>
          <form className="search-page__form" onSubmit={handleSubmit}>
            <FiSearch className="search-page__form-icon" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search for news..."
              className="search-page__input"
            />
            <button type="submit" className="search-page__btn">Search</button>
          </form>
          {query && !loading && (
            <p className="search-page__meta">
              {totalArticles > 0
                ? `Showing results for "${query}" (${totalArticles} articles found)`
                : `No results found for "${query}"`}
            </p>
          )}
        </div>
      </div>

      <div className="search-page__content">
        {error && (
          <div className="search-page__error">⚠️ {error} — Please check your API key.</div>
        )}

        {loading && articles.length === 0 ? (
          <Loader fullPage />
        ) : (
          <>
            <div className="search-page__grid">
              {articles.map((article, i) => (
                <NewsCard key={article.url || i} article={article} />
              ))}
            </div>

            {!loading && articles.length === 0 && query && (
              <div className="search-page__empty">
                <span>🔍</span>
                <p>No articles found. Try a different search term.</p>
              </div>
            )}

            {!loading && hasMore && (
              <div className="search-page__load-more">
                <button className="btn-load-more" onClick={loadMore}>Load More</button>
              </div>
            )}

            {loading && articles.length > 0 && <Loader />}
          </>
        )}
      </div>
    </main>
  );
};

export default Search;
