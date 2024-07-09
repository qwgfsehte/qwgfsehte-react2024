import { useState } from 'react';
import Header from '../header/header';
import './app.scss';
import PokemonsList from '../body/pokemonsList';
import { useGetPokemons } from '../hooks/useGetPokemons';

export function App() {
  const { allPokemons, pokemonData, loading, errorMessage, getInfoPokemons } =
    useGetPokemons();
  const [hasError, setHasError] = useState<boolean>(false);

  function triggerError() {
    setHasError(true);
  }

  if (hasError) {
    throw new Error('Test error');
  }

  return (
    <>
      <Header
        fetchData={() => getInfoPokemons(allPokemons)}
        triggerError={triggerError}
      />
      {loading && (
        <div className="loading-indicator">
          <img
            className="loading-img"
            src="./src/assets/imgs/loading.gif"
            alt="Loading"
          />
          Loading...
        </div>
      )}

      {!loading && errorMessage && (
        <div className="error-container">
          <img
            className="main-page__error-img"
            src="./src/assets/imgs/error-search.png"
            alt=""
          />
          <h2>{errorMessage}</h2>
        </div>
      )}

      {!loading && !errorMessage && (
        <div className="container-cards">
          {Array.isArray(pokemonData) && pokemonData.length > 0 ? (
            <PokemonsList pokemonsList={pokemonData} />
          ) : (
            <p>No pokemons available.</p>
          )}
        </div>
      )}
    </>
  );
}
