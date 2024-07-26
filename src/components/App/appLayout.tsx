import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Outlet } from 'react-router-dom';
import { setNameSelectedPokemon } from '../body/pokemonsList/pokemonList.slice';
import PokemonsList from '../body/pokemonsList/pokemonsList';
import ErrorMessage from '../errorMessage/errorMessage';
import Header from '../header/header';
import { useGetPokemons } from '../hooks/useGetPokemons';
import LoadingIndicator from '../loading/loading';
import { Pagination } from '../pagination/pagination';
import { setCurrentPage } from '../pagination/pagination.slice';
import { RootState } from '../store';
import './app.scss';
import './../context/theme.scss';
import { ModalWindow } from '../body/flyout/flyout';
import { useToggleTheme } from '../context/useContext';
import { Footer } from '../footer/footer';

const FIRST_PAGE = 1;

export function AppContent() {
  const { isDark } = useToggleTheme();
  const dispatch = useDispatch();
  const { page } = useParams<{ page?: string }>();
  const loading = useSelector(
    (state: RootState) => state.updatePokemons.loading
  );
  const errorMessage = useSelector(
    (state: RootState) => state.updatePokemons.errorMessage
  );
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
  );

  useEffect(() => {
    const pageParam = page ? parseInt(page, 10) : FIRST_PAGE;
    dispatch(setCurrentPage(pageParam));
  }, [dispatch, page]);

  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
  );

  useGetPokemons();

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <Header />
      {loading && <LoadingIndicator />}
      {!loading && errorMessage && <ErrorMessage />}
      {!loading && !errorMessage && (
        <main style={{ position: 'relative' }}>
          {Array.isArray(pokemonPage) && pokemonPage.length > 0 ? (
            <>
              <Link
                className="shadow-button"
                onClick={() => dispatch(setNameSelectedPokemon(''))}
                to={`/search/page/${currentPage}`}
              ></Link>
              <section className="container-cards">
                <PokemonsList />
                <Outlet />
              </section>
              <Pagination />
              <Footer />
              <ModalWindow />
            </>
          ) : (
            <p></p>
          )}
        </main>
      )}
    </div>
  );
}
