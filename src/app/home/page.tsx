'use client';

import { useEffect } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {}, []);

  return (
    <div className={`${styles['home-page']}`}>
      <h2 className={`${styles['home-page__title']}`}>PikaInfo</h2>

      <Link
        href={`/search/page/1`}
        className={`${styles['home-page__button-start']}`}
      >
        Start
      </Link>
    </div>
  );
}
