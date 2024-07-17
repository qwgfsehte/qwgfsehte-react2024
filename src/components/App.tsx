import { useEffect } from 'react';
import Header from './header/header';
import './app.scss';
import { useGetPokemons } from './hooks/useGetPokemons';
import { InfoPokemon } from '../interfaces/interface';
import LoadingIndicator from './loading/loading';
import ErrorMessage from './errorMessage/errorMessage';
import PokemonsListContainer from './body/pokemonsList/pokemonsListContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Pagination } from './pagination/pagination';
import PokemonDetailsContainer from './body/pokemonDetails/pokemonDetailsContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const FIRST_PAGE = 1;

export function App() {
  const {
    allPokemons,
    getInfoPokemons,
    currentPage,
    setCurrentPage,
    handleNextPage,
    handlePrevPage,
    selectedPokemon,
    setSelectedPokemon,
  } = useGetPokemons();
  const navigate = useNavigate();
  const location = useLocation();
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
      const pokemon = detailsForPokemons.find(
        p => Number(p.id) === parseInt(detailsParams, 10)
      );
      setSelectedPokemon(pokemon || null);
    } else {
      setSelectedPokemon(null);
    }
  }, [detailsForPokemons, location.search, setCurrentPage, setSelectedPokemon]);

  function handlePokemonClick(pokemon: InfoPokemon) {
    const params = new URLSearchParams(location.search);
    const searchParams = params.get('search');
    navigate(
      `/?search=${searchParams}&page=${currentPage}&details=${pokemon.id}`
    );
  }

  function closePokemonDetails() {
    setSelectedPokemon(null);
    const params = new URLSearchParams(location.search);
    const searchParams = params.get('search');
    navigate(`/?search=${searchParams}&page=${currentPage}`);
  }

  const pokemonPage = useSelector(
    (state: RootState) => state.pokemonSlice.pokemonPage
  );
  console.log(pokemonPage);

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
                <PokemonsListContainer
                  pokemonData={pokemonPage}
                  selectedPokemon={selectedPokemon}
                  handlePokemonClick={handlePokemonClick}
                  onClose={closePokemonDetails}
                />
                <PokemonDetailsContainer
                  selectedPokemon={selectedPokemon}
                  closePokemonDetails={closePokemonDetails}
                />
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
