'use client';
import './pagination.module.scss';
import Link from 'next/link';
import styles from './pagination.module.scss';
import { filterPokemons } from '../hooks/useFilterPokemons';
import { MainProps } from 'src/interfaces/interface';
import { useEffect, useState } from 'react';
import { useToggleTheme } from '../context/useContext';
import stylesTheme from '../context/theme.module.scss';
import Cookies from 'js-cookie';
const PAGES_PER_GROUP = 10;

export function Pagination({ allPokemons, currentPage }: MainProps) {
  const { isDark } = useToggleTheme();
  const [currentGroup, setCurrentGroup] = useState(0);
  const [storedValue, setStoredValue] = useState('');

  useEffect(() => {
    const savedValue = Cookies.get('searchValueInput');
    if (savedValue) {
      setStoredValue(savedValue);
    }

    const interval = setInterval(() => {
      const newValue = Cookies.get('searchValueInput');
      if (newValue !== storedValue) {
        setStoredValue(newValue as string);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [storedValue]);

  const pagination = filterPokemons(
    allPokemons,
    currentPage,
    storedValue,
    true
  );

  const startPage = currentGroup * PAGES_PER_GROUP;
  const endPage = Math.min(startPage + PAGES_PER_GROUP, pagination.length);

  if (pagination.length === 0) {
    return;
  }

  return (
    <section className={styles['pagination-container']}>
      <button
        disabled={currentGroup === 0}
        className={`${styles['pagination__button']} ${styles['button-left']} ${isDark ? stylesTheme['dark-button-left'] : ''}`}
        data-testid="button-left"
        onClick={() => setCurrentGroup(currentGroup - 1)}
      ></button>
      <div className={styles['pagination']}>
        {pagination.slice(startPage, endPage).map((_, index: number) => {
          const pageIndex = startPage + index + 1;
          return (
            <Link
              key={pageIndex}
              className={`${styles['pagination__item']} ${pageIndex === Number(currentPage) ? styles['pagination__item_active'] : ''} ${isDark ? stylesTheme['dark-pagination__item'] : ''}`}
              href={`/search/page/${pageIndex}`}
            >
              {pageIndex}
            </Link>
          );
        })}
      </div>
      <button
        disabled={currentGroup === pagination.length - 1}
        className={`${styles['pagination__button']} ${styles['button-right']} ${isDark ? stylesTheme['dark-button-right'] : ''}`}
        data-testid="button-right"
        onClick={() => {
          setCurrentGroup(currentGroup + 1);
        }}
      ></button>
    </section>
  );
}
