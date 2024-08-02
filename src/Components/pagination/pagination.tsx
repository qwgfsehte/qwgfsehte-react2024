'use client';
import { useDispatch, useSelector } from 'react-redux';
import './pagination.module.scss';
import { setCurrentGroup, setCurrentPage } from './pagination.slice';
import { RootState } from '../store';
import Link from 'next/link';
import styles from './pagination.module.scss';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';
import { filterPokemons } from '../hooks/useFilterPokemons';
import { AllPokemonsProps } from 'src/interfaces/interface';
import stylesTheme from '../context/theme.module.scss';
import { useToggleTheme } from '../context/useContext';

const PAGES_PER_GROUP = 10;

export function Pagination(pokemonList: AllPokemonsProps) {
  // const { isDark } = useToggleTheme();
  // const currentPage = useSelector(
  //   (state: RootState) => state.paginationSlice.currentPage
  // );

  // const currentGroup = useSelector(
  //   (state: RootState) => state.paginationSlice.currentGroup
  // );
  // const inputValue = useSelector(
  //   (state: RootState) => state.pokemonListSlice.searchValue
  // );

  // const dispatch = useDispatch();

  const pagination = filterPokemons(pokemonList.allPokemons, 1, '', true);

  const startPage = 1 * PAGES_PER_GROUP;
  const endPage = Math.min(startPage + PAGES_PER_GROUP, pagination.length);

  return (
    <section className={styles['pagination-container']}>
      <button
        className={`${styles['pagination__button']} ${styles['button-left']}`}
        data-testid="button-left"
      ></button>
      <div className={styles['pagination']}>
        {pagination.slice(startPage, endPage).map((_, index: number) => {
          const pageIndex = startPage + index + 1;
          return (
            <Link
              key={pageIndex}
              className={`${styles['pagination__item']} ${pageIndex === 1 ? styles['pagination__item_active'] : ''}`}
              href={`/search/page/${pageIndex}`}
            >
              {pageIndex}
            </Link>
          );
        })}
      </div>
      <button
        className={`${styles['pagination__button']} ${styles['button-right']}`}
        data-testid="button-right"
      ></button>
    </section>
  );
}
