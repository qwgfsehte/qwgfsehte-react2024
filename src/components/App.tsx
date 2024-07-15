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

const FIRST_PAGE = 1;

export function App() {
  const {
    allPokemons,
    pokemonData,
    loading,
    errorMessage,
    getInfoPokemons,
    currentPage,
    setCurrentPage,
    handleNextPage,
    handlePrevPage,
    countPages,
    selectedPokemon,
    setSelectedPokemon,
  } = useGetPokemons();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const detailsParams = params.get('details');
    const pageParam = params.get('page');

    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }

    if (detailsParams && pokemonData.length > 0) {
      const pokemon = pokemonData.find(
        p => Number(p.id) === parseInt(detailsParams, 10)
      );
      setSelectedPokemon(pokemon || null);
    } else {
      setSelectedPokemon(null);
    }
  }, [location.search, pokemonData, setCurrentPage, setSelectedPokemon]);

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
          {Array.isArray(pokemonData) && pokemonData.length > 0 ? (
            <>
              <button
                className="shadow-button"
                onClick={closePokemonDetails}
              ></button>
              <section className="container-cards">
                <PokemonsListContainer
                  pokemonData={pokemonData}
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
                countPages={countPages}
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
