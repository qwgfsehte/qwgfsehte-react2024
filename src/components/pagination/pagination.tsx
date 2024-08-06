import { useState } from 'react';
import './pagination.scss';
import { filterPokemons } from '../hooks/useFilterPokemons';
import { Link } from '@remix-run/react';
import { AppProps } from '../../interfaces/interface';
import { useCookie } from '../hooks/useCookies';

const PAGES_PER_GROUP = 10;

export function Pagination({ allPokemons, currentPage }: AppProps) {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [storedValue] = useCookie('searchValueInput');

  const pagination = filterPokemons(
    allPokemons,
    currentPage,
    storedValue,
    true
  );

  const startPage = currentGroup * PAGES_PER_GROUP;
  const endPage = Math.min(startPage + PAGES_PER_GROUP, pagination.length);

  return (
    <section className="pagination-container">
      <button
        disabled={currentGroup === 0}
        className="pagination__button button-left"
        data-testid="button-left"
        onClick={() => setCurrentGroup(currentGroup - 1)}
      ></button>
      <div className="pagination">
        {pagination.slice(startPage, endPage).map((_, index) => {
          const pageIndex = startPage + index + 1;
          return (
            <Link
              key={pageIndex}
              className={`pagination__item ${pageIndex === Number(currentPage) ? 'pagination__item_active' : ''}`}
              to={`/search/page/${pageIndex}`}
            >
              {pageIndex}
            </Link>
          );
        })}
      </div>
      <button
        disabled={currentGroup === pagination.slice(startPage, endPage).length}
        className="pagination__button button-right"
        data-testid="button-right"
        onClick={() => {
          setCurrentGroup(currentGroup + 1);
        }}
      ></button>
    </section>
  );
}
