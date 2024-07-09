import { useEffect, useState } from 'react';
import axios from 'axios';
import { AllPokemons, InfoPokemon } from '../../interfaces/interface';
import { chunkArray } from '../../utils/utils';

export function useGetPokemons() {
  const [allPokemons, setAllPokemons] = useState<AllPokemons[]>([]);
  const [pokemonData, setPokemonData] = useState<InfoPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const fetchPokemons = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?limit=2000'
      );
      const data = await response.json();
      setAllPokemons(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage(
        'An error occurred while fetching the pokemons. Please try again later.'
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const getInfoPokemons = async (pokemons: AllPokemons[]) => {
    setLoading(true);
    const filteredPokemons = pokemons.filter(pokemon =>
      pokemon.name.includes(localStorage.getItem('searchValueInput') || '')
    );

    const arrayResultsPokemons = chunkArray(filteredPokemons);

    if (filteredPokemons.length === 0) {
      setErrorMessage('No pokemons found. Please try another search term.');
      setLoading(false);
      return;
    }

    try {
      const pokemonPromises = arrayResultsPokemons[0].map(result =>
        axios.get(result.url)
      );
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
    getInfoPokemons(allPokemons);
  }, [allPokemons]);

  return {
    allPokemons,
    pokemonData,
    loading,
    errorMessage,
    getInfoPokemons,
  };
}
