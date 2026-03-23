import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const categories = [
  { label: 'Home', path: '/' },
  { label: 'World', path: '/category/world' },
  { label: 'Business', path: '/category/business' },
  { label: 'Technology', path: '/category/technology' },
  { label: 'Sports', path: '/category/sports' },
  { label: 'Entertainment', path: '/category/entertainment' },
  { label: 'Science', path: '/category/science' },
];

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
      setMenuOpen(false);
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__top">
        <button className="navbar__hamburger" onClick={() => setMenuOpen(p => !p)} aria-label="Menu">
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-text">BBC</span>
          <span className="navbar__logo-sub">News</span>
        </Link>

        <div className="navbar__actions">
          <button className="navbar__icon-btn" onClick={() => setSearchOpen(p => !p)} aria-label="Search">
            {searchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
          </button>
          <button className="navbar__icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <form className="navbar__search-bar" onSubmit={handleSearch}>
          <FiSearch className="navbar__search-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search BBC News..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar__search-input"
          />
          <button type="submit" className="navbar__search-btn">Search</button>
        </form>
      )}

      <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
        {categories.map(cat => (
          <NavLink
            key={cat.path}
            to={cat.path}
            end={cat.path === '/'}
            className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {cat.label}
          </NavLink>
        ))}
        {/* Mobile search inside menu */}
        <form className="navbar__mobile-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar__mobile-search-input"
          />
          <button type="submit" className="navbar__mobile-search-btn"><FiSearch /></button>
        </form>
      </nav>
    </header>
  );
};

export default Navbar;
