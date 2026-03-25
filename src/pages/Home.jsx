import useNews from '../hooks/useNews';
import NewsCard from '../components/NewsCard';
import Sidebar from '../components/Sidebar';
import Loader from '../components/Loader';
import './Home.css';

const CardSkeleton = () => (
  <div className="card-skeleton">
    <div className="card-skeleton__img" />
    <div className="card-skeleton__body">
      <div className="card-skeleton__line card-skeleton__line--short" />
      <div className="card-skeleton__line card-skeleton__line--long" />
      <div className="card-skeleton__line" />
      <div className="card-skeleton__line card-skeleton__line--med" />
    </div>
  </div>
);

const Home = () => {
  const { articles, loading, error, hasMore, loadMore } = useNews('home');
  const { articles: trendingArticles, loading: trendingLoading } = useNews('world');

  const featured = articles[0] || null;
  const rest = articles.slice(1);

  return (
    <main className="home">
      {/* Breaking News Banner */}
      <div className="breaking-banner">
        <span className="breaking-banner__label">Breaking News</span>
        <span className="breaking-banner__text">
          {featured ? featured.title : 'Loading latest headlines...'}
        </span>
      </div>

      <div className="home__layout">
        {/* Main Content */}
        <section className="home__main">
          {/* Featured Article */}
          {loading && !featured ? (
            <CardSkeleton />
          ) : featured && (
            <section className="home__hero">
              <NewsCard article={featured} featured={true} horizontal={true} />
            </section>
          )}


          {/* Section Header */}
          <div className="home__section-header">
            <span className="home__section-label">Top Stories</span>
          </div>

          {/* News Grid */}
          <div className="home__grid">
            {loading && rest.length === 0
              ? Array(8).fill(null).map((_, i) => <CardSkeleton key={i} />)
              : rest.map((article, i) => (
                  <NewsCard key={article.url || i} article={article} />
                ))}
          </div>

          {/* Error state */}
          {error && (
            <div className="home__error">
              <p>⚠️ {error}</p>
              <p className="home__error-hint">Please check your API key in the <code>.env</code> file.</p>
            </div>
          )}

          {/* Load More */}
          {!loading && hasMore && (
            <div className="home__load-more">
              <button className="btn-load-more" onClick={loadMore}>
                Load More Stories
              </button>
            </div>
          )}

          {loading && rest.length > 0 && <Loader />}
        </section>

        {/* Sidebar */}
        <aside className="home__sidebar">
          <Sidebar articles={trendingArticles} loading={trendingLoading} />
        </aside>
      </div>
    </main>
  );
};

export default Home;
