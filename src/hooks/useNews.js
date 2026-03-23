import { useState, useEffect, useCallback } from 'react';
import { fetchTopHeadlines, searchNews } from '../services/api';

const useNews = (category = 'general', query = '', initialPage = 1) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [totalArticles, setTotalArticles] = useState(0);

  const fetchData = useCallback(async (pg) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (query) {
        data = await searchNews(query, pg);
      } else {
        data = await fetchTopHeadlines(category, pg);
      }
      const fetched = data.articles || [];
      setTotalArticles(data.totalArticles || fetched.length);
      if (pg === 1) {
        setArticles(fetched);
      } else {
        setArticles(prev => [...prev, ...fetched]);
      }
      setHasMore(fetched.length === 10);
    } catch (err) {
      setError(err.message || 'Failed to fetch news.');
    } finally {
      setLoading(false);
    }
  }, [category, query]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    fetchData(1);
  }, [fetchData]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage);
    }
  };

  return { articles, loading, error, hasMore, loadMore, totalArticles };
};

export default useNews;
