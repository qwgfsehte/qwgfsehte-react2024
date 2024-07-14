import { Link } from 'react-router-dom';
import './pageError404.scss';

export default function ErrorPage404() {
  return (
    <div id="error-page" className="error-page">
      <div className="error-page__error-container">
        <h1 style={{ fontSize: '45px' }}>404</h1>
        <h2>Not Found</h2>
        <img
          src="./src/assets/imgs/img-for-error-page.png"
          alt="pokemon-error"
          className="error-page__img"
        />
        <p>This page doesn’t exist.</p>
        <Link className="error-page__button" to="/">
          Go to home
        </Link>
      </div>
    </div>
  );
}
