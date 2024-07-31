import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../footer/footer';
import { useToggleTheme } from '../context/useContext';
import Header from '../header/header';
import {
  setNameSelectedPokemon,
  setSearchValue,
} from '../body/pokemonsList/pokemonList.slice';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import { ModalWindow } from '../body/flyout/flyout';
import { useEffect } from 'react';
import styles from './app.module.scss';
import stylesTheme from '../context/theme.module.scss';
import { useRouter } from 'next/router';
import { AllPokemons } from 'src/interfaces/interface';
import PokemonDetailsContainer from '../body/pokemonDetails/pokemonDetailsContainer';
import { setNewStateLoading, setPokemons } from '../hooks/useGetPokemons.slice';
import { setCurrentPage } from '../pagination/pagination.slice';
import useDetailsPokemon from '../hooks/useDetailsPokemon';
import { RootState } from '../store';

const FIRST_PAGE = 1;

export function AppContent(allPokemons: { allPokemons: AllPokemons[] }) {
  const { isDark } = useToggleTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageNumber, details } = router.query;
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );

  useEffect(() => {
    dispatch(setPokemons(allPokemons.allPokemons));
    dispatch(setNewStateLoading(false));
  }, [allPokemons, dispatch]);

  useEffect(() => {
    if (typeof details === 'string') {
      dispatch(setNameSelectedPokemon(details));
    } else {
      dispatch(setNameSelectedPokemon(''));
    }
  }, [dispatch, details]);

  useEffect(() => {
    const pageParam = Number(pageNumber) ? Number(pageNumber) : FIRST_PAGE;
    dispatch(setCurrentPage(pageParam));
    dispatch(setSearchValue(localStorage.getItem('searchValueInput') || ''));
  }, [dispatch, pageNumber]);

  const infoPokemon = useDetailsPokemon(details as string);

  return (
    <div className={`${styles.main} ${isDark ? stylesTheme.dark : ''}`}>
      <Header />
      <button
        className={styles['shadow-button']}
        onClick={() => {
          dispatch(setNameSelectedPokemon(''));
          router.push(`/search/page/${currentPage}`, undefined, {
            shallow: true,
          });
        }}
      ></button>
      <div className={styles['pokemons-container']}>
        <PokemonsList allPokemons={allPokemons} />
        <PokemonDetailsContainer infoPokemon={infoPokemon} />
      </div>
      <div>{infoPokemon.infoPokemon?.name}</div>
      <Pagination allPokemons={allPokemons} />
      <ModalWindow />
      <Footer />
    </div>
  );
}
