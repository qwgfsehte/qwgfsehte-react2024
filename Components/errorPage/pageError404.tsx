import Link from 'next/link';
import styles from './pageError404.module.scss';

export default function ErrorPage404() {
  return (
    <div id="error-page" className={styles['error-page']}>
      <div className={styles['error-page__error-container']}>
        <h1 style={{ fontSize: '45px' }}>404</h1>
        <h2>Not Found</h2>
        <img
          src="/assets/imgs/img-for-error-page.png"
          alt="pokemon-error"
          className={styles['error-page__img']}
        />
        <p>This page doesn’t exist.</p>
        <Link className={styles['error-page__button']} href={`/search/page/1`}>
          Go to home
        </Link>
      </div>
    </div>
  );
}
