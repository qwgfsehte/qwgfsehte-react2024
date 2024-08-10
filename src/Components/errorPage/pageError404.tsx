import Link from 'next/link';
import styles from './pageError404.module.scss';
import Image from 'next/image';

export default function ErrorPage404() {
  return (
    <div id="error-page" className={styles['error-page']}>
      <div className={styles['error-page__error-container']}>
        <h1 style={{ fontSize: '45px' }}>404</h1>
        <h2>Not Found</h2>
        <Image
          src="/assets/imgs/img-for-error-page.png"
          alt="pokemon-error"
          className={styles['error-page__img']}
          width={200}
          height={300}
          priority
        />
        <p>This page doesn’t exist.</p>
        <Link className={styles['error-page__button']} href={`/`}>
          Go to home
        </Link>
      </div>
    </div>
  );
}
