import { useParams } from 'react-router-dom';
import useNews from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import './Category.css';

const categoryLabels = {
  world: 'World',
  business: 'Business',
  technology: 'Technology',
  sports: 'Sports',
  entertainment: 'Entertainment',
  science: 'Science',
  health: 'Health',
};

const CardSkeleton = () => (
  <div className="card-skeleton">
    <div className="card-skeleton__img" />
    <div className="card-skeleton__body">
      <div className="card-skeleton__line card-skeleton__line--short" />
      <div className="card-skeleton__line card-skeleton__line--long" />
      <div className="card-skeleton__line" />
    </div>
  </div>
);

const Category = () => {
  const { id } = useParams();
  const label = categoryLabels[id] || id;
  const { articles, loading, error, hasMore, loadMore } = useNews(id);
  const { articles: trending, loading: trendingLoading } = useNews('world');

  return (
    <main className="category">
      <div className="category__hero">
        <div className="category__hero-inner">
          <h1 className="category__heading">{label}</h1>
          <p className="category__subheading">Latest {label} news from around the world</p>
        </div>
      </div>

      <div className="category__layout">
        <section className="category__main">
          {error && (
            <div className="category__error">
              <p>⚠️ {error}</p>
              <p>Please check your API key in the <code>.env</code> file.</p>
            </div>
          )}

          <div className="category__grid">
            {loading && articles.length === 0
              ? Array(9).fill(null).map((_, i) => <CardSkeleton key={i} />)
              : articles.map((article, i) => (
                  <NewsCard key={article.url || i} article={article} />
                ))}
          </div>

          {!loading && hasMore && (
            <div className="category__load-more">
              <button className="btn-load-more" onClick={loadMore}>Load More</button>
            </div>
          )}

          {loading && articles.length > 0 && <Loader />}
        </section>

        <aside className="category__sidebar">
          <Sidebar articles={trending} loading={trendingLoading} />
        </aside>
      </div>
    </main>
  );
};

export default Category;
