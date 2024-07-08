import { useEffect, useState } from 'react';
import Header from '../header/header';
import axios from 'axios';
import './app.scss';
import PokemonsList from '../body/pokemonsList';
import { chunkArray } from '../../utils/utils';
import { AllPokemons, InfoPokemon } from '../../interfaces/interface';

function App() {
  const [allPokemons, setAllPokemons] = useState<AllPokemons[]>([]);
  const [pokemonData, setPokemonData] = useState<InfoPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  async function getAllPokemons() {
    setLoading(true);
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=2000'
      );
      const data = await response.json();
      setAllPokemons(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getAllPokemons();
  }, []);

  const getInfoPokemons = async (pokemons: AllPokemons[]) => {
    setLoading(true);
    const filteredPokemons = pokemons.filter((pokemon: { name: string }) =>
      pokemon.name.includes(localStorage.getItem('searchValueInput') || '')
    );

    const array = chunkArray(filteredPokemons);

    if (filteredPokemons.length === 0) {
      setLoading(false);
      setErrorMessage('No pokemons found. Please try another search term.');
      return;
    }

    try {
      const pokemonPromises = array[0].map(result => axios.get(result.url));
      const responses = await Promise.all(pokemonPromises);
      setPokemonData(responses.map(res => res.data));
      setLoading(false);
      setErrorMessage('');
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        'An error occurred while fetching the pokemons. Please try again later.'
      );
      console.error(error);
    }
  };

  useEffect(() => {
    if (allPokemons.length > 0) {
      getInfoPokemons(allPokemons);
    }
  }, [allPokemons]);

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

export default App;
