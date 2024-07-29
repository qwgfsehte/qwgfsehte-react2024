import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../footer/footer';
import { useToggleTheme } from '../context/useContext';
import { RootState } from '../store';
import { useGetPokemons } from '../hooks/useGetPokemons';
import ErrorMessage from '../errorMessage/errorMessage';
import Header from '../header/header';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import { Pagination } from '../pagination/pagination';
import { ModalWindow } from '../body/flyout/flyout';
import { useEffect } from 'react';
import Link from 'next/link';
import LoadingIndicator from '../loading/loading';
import styles from './app.module.scss';
import stylesTheme from 'Components/context/theme.module.scss';
import { setCurrentPage } from 'Components/pagination/pagination.slice';
import { useRouter } from 'next/router';

const FIRST_PAGE = 1;

export function AppContent() {
  const { isDark } = useToggleTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { pageNumber } = router.query;
  const loading = useSelector(
    (state: RootState) => state.updatePokemons.loading
  );
  const errorMessage = useSelector(
    (state: RootState) => state.updatePokemons.errorMessage
  );
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );

  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
  );

  useEffect(() => {
    const pageParam = Number(pageNumber) ? Number(pageNumber) : FIRST_PAGE;
    dispatch(setCurrentPage(pageParam));
  }, [dispatch, pageNumber]);

  useGetPokemons();

  return (
    <div className={isDark ? stylesTheme['dark'] : stylesTheme['light']}>
      <Header />
      <main style={{ position: 'relative' }}>
        {loading && <LoadingIndicator />}
        {!loading && errorMessage && <ErrorMessage />}
        {!loading &&
          !errorMessage &&
          Array.isArray(pokemonPage) &&
          pokemonPage.length > 0 && (
            <>
              <Link
                className={styles['shadow-button']}
                onClick={() => dispatch(setNameSelectedPokemon(''))}
                href={`/search/page/${currentPage}`}
              ></Link>
              <section className={styles['container-cards']}>
                <PokemonsList />
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
