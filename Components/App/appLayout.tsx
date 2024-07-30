import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../footer/footer';
import { useToggleTheme } from '../context/useContext';
import { RootState } from '../store';
import Header from '../header/header';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import { ModalWindow } from '../body/flyout/flyout';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './app.module.scss';
import stylesTheme from 'Components/context/theme.module.scss';
import { useRouter } from 'next/router';
import PokemonDetailsContainer from 'Components/body/pokemonDetails/pokemonDetailsContainer';
import { setPokemons } from 'Components/hooks/useGetPokemons.slice';
import { setCurrentPage } from 'Components/pagination/pagination.slice';
import { useFilterPokemons } from 'Components/hooks/useFilterPokemons';
import { AllPokemons } from 'interfaces/interface';

const FIRST_PAGE = 1;

export function AppContent(allPokemons: { allPokemons: AllPokemons[] }) {
  const { isDark } = useToggleTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageNumber, details } = router.query;
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );

  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
  );

  const nameSelectedPokemon = useSelector(
    (state: RootState) => state.pokemonListSlice.nameSelectedPokemon
  );

  useEffect(() => {
    dispatch(setPokemons(allPokemons.allPokemons));
  }, [allPokemons, dispatch]);

  useFilterPokemons(allPokemons, currentPage);

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
  }, [dispatch, pageNumber]);

  return (
    <div className={`${styles.main} ${isDark ? stylesTheme.dark : ''}`}>
      <Header />
      <main style={{ position: 'relative' }}>
        {Array.isArray(pokemonPage) && pokemonPage.length > 0 && (
          <>
            <Link
              className={styles['shadow-button']}
              onClick={() => dispatch(setNameSelectedPokemon(''))}
              href={`/search/page/${currentPage}`}
            ></Link>
            <section className={styles['container-cards']}>
              <PokemonsList />
              {nameSelectedPokemon ? <PokemonDetailsContainer /> : <div></div>}
            </section>
            <Pagination />
            <ModalWindow />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
