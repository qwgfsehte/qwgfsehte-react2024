import { useEffect, useState } from 'react';
import './pagination.scss';
import { filterPokemons } from '../hooks/useFilterPokemons';
import { Link, useNavigation } from '@remix-run/react';
import { AppProps, PokemonCardInfo } from '../../interfaces/interface';
import Cookies from 'js-cookie';

const PAGES_PER_GROUP = 10;

export function Pagination({ allPokemons, currentPage }: AppProps) {
  const [currentGroup, setCurrentGroup] = useState(0);
  const [storedValue, setStoredValue] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<
    PokemonCardInfo[] | { name: string; url: string }[][]
  >([]);
  const navigation = useNavigation();

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

  useEffect(() => {
    const result = filterPokemons(allPokemons, currentPage, storedValue, true);
    setFilteredPokemons(result);
  }, [allPokemons, currentPage, storedValue]);

  const startPage = currentGroup * PAGES_PER_GROUP;
  const endPage = Math.min(
    startPage + PAGES_PER_GROUP,
    filteredPokemons.length
  );

  return (
    <>
      {navigation.state === 'loading' ||
        (filteredPokemons.length === 0 && <div></div>)}
      {navigation.state !== 'loading' && filteredPokemons.length !== 0 && (
        <section className="pagination-container">
          <button
            disabled={currentGroup === 0}
            className="pagination__button button-left"
            data-testid="button-left"
            onClick={() => setCurrentGroup(currentGroup - 1)}
          ></button>
          <div className="pagination">
            {filterPokemons(allPokemons, currentPage, storedValue)
              .slice(startPage, endPage)
              .map((_, index) => {
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
            disabled={
              currentGroup === filteredPokemons.slice(startPage, endPage).length
            }
            className="pagination__button button-right"
            data-testid="button-right"
            onClick={() => {
              setCurrentGroup(currentGroup + 1);
            }}
          ></button>
        </section>
      )}
    </>
  );
}
