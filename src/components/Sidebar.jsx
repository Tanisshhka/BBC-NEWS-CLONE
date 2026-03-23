import { FiTrendingUp, FiClock } from 'react-icons/fi';
import './Sidebar.css';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const Sidebar = ({ articles = [], loading = false }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <FiTrendingUp className="sidebar__header-icon" />
        <h3 className="sidebar__title">Trending</h3>
      </div>
      <div className="sidebar__list">
        {loading
          ? Array(6).fill(null).map((_, i) => (
              <div key={i} className="sidebar__skeleton">
                <div className="sidebar__skeleton-line sidebar__skeleton-line--long" />
                <div className="sidebar__skeleton-line sidebar__skeleton-line--short" />
              </div>
            ))
          : articles.slice(0, 8).map((article, idx) => (
              <a
                key={idx}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="sidebar__item"
              >
                <span className="sidebar__item-num">{String(idx + 1).padStart(2, '0')}</span>
                <div className="sidebar__item-content">
                  <p className="sidebar__item-title">{article.title}</p>
                  <span className="sidebar__item-date">
                    <FiClock size={10} />
                    {formatDate(article.publishedAt)}
                  </span>
                </div>
              </a>
            ))}
      </div>
    </aside>
  );
};

export default Sidebar;
