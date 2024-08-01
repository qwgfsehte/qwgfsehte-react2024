import { useDispatch, useSelector } from 'react-redux';
import './pagination.module.scss';
import { setCurrentGroup, setCurrentPage } from './pagination.slice';
import { RootState } from '../store';
import Link from 'next/link';
import styles from './pagination.module.scss';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';
import { filterPokemons } from '../hooks/useFilterPokemons';
import { AllPokemonsProps } from 'src/interfaces/interface';

const PAGES_PER_GROUP = 10;

export function Pagination(pokemonList: AllPokemonsProps) {
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );

  const currentGroup = useSelector(
    (state: RootState) => state.paginationSlice.currentGroup
  );
  const inputValue = useSelector(
    (state: RootState) => state.pokemonListSlice.searchValue
  );

  const dispatch = useDispatch();

  const pagination = filterPokemons(
    pokemonList.allPokemons,
    currentPage,
    inputValue,
    true
  );

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
    dispatch(setNameSelectedPokemon(''));
  };

  const startPage = currentGroup * PAGES_PER_GROUP;
  const endPage = Math.min(startPage + PAGES_PER_GROUP, pagination.length);

  return (
    <section className={styles['pagination-container']}>
      <button
        disabled={currentGroup === 0}
        className={`${styles['pagination__button']} ${styles['button-left']}`}
        onClick={() => dispatch(setCurrentGroup(currentGroup - 1))}
        data-testid="button-left"
      ></button>
      <div className={styles['pagination']}>
        {pagination.slice(startPage, endPage).map((_, index: number) => {
          const pageIndex = startPage + index + 1;
          return (
            <Link
              onClick={() => {
                handlePageChange(pageIndex);
              }}
              key={pageIndex}
              className={`${styles['pagination__item']} ${pageIndex === currentPage ? styles['pagination__item_active'] : ''}`}
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
        onClick={() => dispatch(setCurrentGroup(currentGroup + 1))}
        data-testid="button-right"
      ></button>
    </section>
  );
}
