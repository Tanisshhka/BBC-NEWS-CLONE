import { Link } from 'react-router-dom';
import { FiExternalLink, FiClock } from 'react-icons/fi';
import './NewsCard.css';

const FALLBACK_IMG = 'https://via.placeholder.com/400x220/BB1919/ffffff?text=BBC+News';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const NewsCard = ({ article, featured = false, horizontal = false }) => {
  const { title, description, image, url, publishedAt, source } = article;

  return (
    <article className={`news-card ${featured ? 'news-card--featured' : ''} ${horizontal ? 'news-card--horizontal' : ''}`}>
      <div className="news-card__content-wrapper">
        <a href={url} target="_blank" rel="noopener noreferrer" className="news-card__img-link">
          <div className="news-card__img-wrapper">
            <img
              src={image || FALLBACK_IMG}
              alt={title}
              className="news-card__img"
              onError={(e) => { e.target.src = FALLBACK_IMG; }}
              loading="lazy"
            />
          </div>
        </a>
        <div className="news-card__body">
          {source?.name && (
            <span className="news-card__source">{source.name}</span>
          )}
          <h2 className="news-card__title">
            <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
          </h2>
          {description && (
            <p className="news-card__desc">{description}</p>
          )}
          <div className="news-card__footer">
            <span className="news-card__date">
              {formatDate(publishedAt)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};


export default NewsCard;
