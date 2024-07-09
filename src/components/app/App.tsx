import { useState } from 'react';
import Header from '../header/header';
import './app.scss';
import PokemonsList from '../body/pokemonsList';
import { useGetPokemons } from '../hooks/useGetPokemons';
import { InfoPokemon } from '../../interfaces/interface';
import { PokemonDetailsInfo } from '../body/pokemonDetailsInfo';

export function App() {
  const { allPokemons, pokemonData, loading, errorMessage, getInfoPokemons } =
    useGetPokemons();
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<InfoPokemon | null>(
    null
  );

  function triggerError() {
    setHasError(true);
  }

  function handlePokemonClick(pokemon: InfoPokemon) {
    setSelectedPokemon(pokemon);
  }

  function closePokemonDetails() {
    setSelectedPokemon(null);
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
            <div
              className={
                selectedPokemon ? 'pokemons-list half-width' : 'pokemons-list'
              }
            >
              <PokemonsList
                pokemonsList={pokemonData}
                onPokemonClick={handlePokemonClick}
              />
            </div>
          ) : (
            <p>No pokemons available.</p>
          )}
          {selectedPokemon && (
            <div className="pokemon-details">
              <PokemonDetailsInfo
                data={selectedPokemon}
                onClose={closePokemonDetails}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
