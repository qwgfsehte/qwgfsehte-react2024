'use client';
import './pagination.module.scss';
import Link from 'next/link';
import styles from './pagination.module.scss';
import { filterPokemons } from '../hooks/useFilterPokemons';
import { MainProps } from 'src/interfaces/interface';
import { useState } from 'react';
const PAGES_PER_GROUP = 10;

export function Pagination({ allPokemons, currentPage }: MainProps) {
  const [currentGroup, setCurrentGroup] = useState(0);

  const pagination = filterPokemons(allPokemons, currentPage, '', true);
  const startPage = currentGroup * PAGES_PER_GROUP;
  const endPage = Math.min(startPage + PAGES_PER_GROUP, pagination.length);

  return (
    <section className={styles['pagination-container']}>
      <button
        disabled={currentGroup === 0}
        className={`${styles['pagination__button']} ${styles['button-left']}`}
        data-testid="button-left"
        onClick={() => setCurrentGroup(currentGroup - 1)}
      ></button>
      <div className={styles['pagination']}>
        {pagination.slice(startPage, endPage).map((_, index: number) => {
          const pageIndex = startPage + index + 1;
          return (
            <Link
              key={pageIndex}
              className={`${styles['pagination__item']} ${pageIndex === Number(currentPage) ? styles['pagination__item_active'] : ''}`}
              href={`/search/page/${pageIndex}`}
            >
              {pageIndex}
            </Link>
          );
        })}
      </div>
      <button
        disabled={currentGroup === pagination.slice(startPage, endPage).length}
        className={`${styles['pagination__button']} ${styles['button-right']}`}
        data-testid="button-right"
        onClick={() => {
          setCurrentGroup(currentGroup + 1);
        }}
      ></button>
    </section>
  );
}
