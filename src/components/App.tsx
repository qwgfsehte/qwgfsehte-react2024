import { useEffect } from 'react';
import Header from './header/header';
import './app.scss';
import { useGetPokemons } from './hooks/useGetPokemons';
import LoadingIndicator from './loading/loading';
import ErrorMessage from './errorMessage/errorMessage';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from './pagination/pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import PokemonsList from './body/pokemonsList/pokemonsList';
import PokemonDetailsContainer from './body/pokemonDetails/pokemonDetailsContainer';
import { setNameSelectedPokemon } from './body/pokemonsList/pokemonList.slice';

const FIRST_PAGE = 1;

export function App() {
  const {
    allPokemons,
    getInfoPokemons,
    currentPage,
    setCurrentPage,
    handleNextPage,
    handlePrevPage,
    setSelectedPokemon,
  } = useGetPokemons();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.updatePokemons.loading
  );
  const errorMessage = useSelector(
    (state: RootState) => state.updatePokemons.errorMessage
  );

  const detailsForPokemons = useSelector(
    (state: RootState) => state.updatePokemons.detailsForPokemons
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const detailsParams = params.get('details');
    const pageParam = params.get('page');

    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }

    if (detailsParams && detailsForPokemons.length > 0) {
      const pokemon = detailsForPokemons.find(p => p.name === detailsParams);
      setSelectedPokemon(pokemon || null);
    } else {
      setSelectedPokemon(null);
    }
  }, [detailsForPokemons, location.search, setCurrentPage, setSelectedPokemon]);

  function closePokemonDetails() {
    dispatch(setNameSelectedPokemon(''));
    const params = new URLSearchParams(location.search);
    const searchParams = params.get('search');
    navigate(`/?search=${searchParams}&page=${currentPage}`);
  }

  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonListSlice.pokemonPage
  );

  return (
    <>
      <Header
        fetchData={() => getInfoPokemons(allPokemons, FIRST_PAGE)}
        closePokemonDetails={closePokemonDetails}
      />
      {loading && <LoadingIndicator />}
      {!loading && errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      {!loading && !errorMessage && (
        <main style={{ position: 'relative' }}>
          {Array.isArray(pokemonPage) && pokemonPage.length > 0 ? (
            <>
              <button
                className="shadow-button"
                onClick={closePokemonDetails}
              ></button>
              <section className="container-cards">
                <PokemonsList />
                <PokemonDetailsContainer />
              </section>
              <Pagination
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                setCurrentPage={setCurrentPage}
                closePokemonDetails={closePokemonDetails}
              />
            </>
          ) : (
            <p></p>
          )}
        </main>
      )}
    </>
  );
}
