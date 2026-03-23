import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiYoutube, FiInstagram } from 'react-icons/fi';
import './Footer.css';

const footerLinks = [
  { section: 'News', links: ['World', 'UK', 'Business', 'Politics', 'Technology', 'Science', 'Health'] },
  { section: 'Services', links: ['BBC Homepage', 'BBC iPlayer', 'BBC Sounds', 'CBBC', 'CBeebies', 'Bitesize'] },
  { section: 'More', links: ['Terms of Use', 'Privacy Policy', 'Cookies', 'Accessibility', 'Contact BBC', 'Advertise With Us'] },
];

const Footer = () => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__brand">
        <Link to="/" className="footer__logo">
          <span className="footer__logo-text">BBC</span>
          <span className="footer__logo-sub">News</span>
        </Link>
        <p className="footer__tagline">Trusted world news, every hour of every day.</p>
        <div className="footer__social">
          <a href="https://facebook.com/bbcnews" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
          <a href="https://twitter.com/bbcnews" aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
          <a href="https://youtube.com/bbcnews" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><FiYoutube /></a>
          <a href="https://instagram.com/bbcnews" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
        </div>
      </div>

      {footerLinks.map(({ section, links }) => (
        <div key={section} className="footer__col">
          <h4 className="footer__col-title">{section}</h4>
          <ul className="footer__links">
            {links.map(link => (
              <li key={link}>
                <a href="#" className="footer__link">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="footer__bottom">
      <p>© 2025 BBC. This is a fan-made clone for educational purposes only. Not affiliated with the BBC.</p>
    </div>
  </footer>
);

export default Footer;
