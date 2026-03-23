import './Loader.css';

const Loader = ({ fullPage = false }) => (
  <div className={`loader ${fullPage ? 'loader--full' : ''}`}>
    <div className="loader__spinner">
      <div></div><div></div><div></div><div></div>
    </div>
    <p className="loader__text">Loading news...</p>
  </div>
);

export default Loader;
