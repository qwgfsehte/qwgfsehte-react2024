import { useDispatch, useSelector } from 'react-redux';
import {
  setNameSelectedPokemon,
  setSearchValue,
} from '../body/pokemonsList/pokemonList.slice';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import { ModalWindow } from '../body/flyout/flyout';
import { useEffect } from 'react';
import styles from './app.module.scss';
import { useRouter } from 'next/router';
import { AllPokemons } from 'src/interfaces/interface';
import { setNewStateLoading, setPokemons } from '../hooks/useGetPokemons.slice';
import { setCurrentPage } from '../pagination/pagination.slice';
import { RootState } from '../store';

export function AppContent(allPokemons: { allPokemons: AllPokemons[] }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageNumber } = router.query;
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );

  useEffect(() => {
    dispatch(setPokemons(allPokemons.allPokemons));
    dispatch(setNewStateLoading(false));
  }, [allPokemons, dispatch]);

  useEffect(() => {
    const pageParam = Number(pageNumber) ? Number(pageNumber) : currentPage;
    dispatch(setCurrentPage(pageParam));
    dispatch(setSearchValue(localStorage.getItem('searchValueInput') || ''));
  }, [currentPage, dispatch, pageNumber]);

  useEffect(() => {
    const handlePopState = () => {
      dispatch(setNameSelectedPokemon(''));
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch]);

  return (
    <div className={styles['content-container']}>
      <button
        className={styles['shadow-button']}
        onClick={() => {
          dispatch(setNameSelectedPokemon(''));
          router.push(`/search/page/${currentPage}`, undefined, {
            shallow: true,
            scroll: false,
          });
        }}
      ></button>
      <div className={styles['pokemons-container']}>
        <PokemonsList allPokemons={allPokemons.allPokemons} />
      </div>
      <Pagination allPokemons={allPokemons.allPokemons} />
      <ModalWindow />
    </div>
  );
}
