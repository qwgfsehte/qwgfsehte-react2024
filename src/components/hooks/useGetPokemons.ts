import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { AllPokemons, InfoPokemon } from '../../interfaces/interface';
import { chunkArray } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

export function useGetPokemons() {
  const [allPokemons, setAllPokemons] = useState<AllPokemons[]>([]);
  const [pokemonData, setPokemonData] = useState<InfoPokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [countPages, setCountPages] = useState<AllPokemons[][]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<InfoPokemon | null>(
    null
  );
  const itemPage = 20;
  const navigate = useNavigate();

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

  const getInfoPokemons = useCallback(
    async (pokemons: AllPokemons[], page: number) => {
      setLoading(true);
      const searchValue = localStorage.getItem('searchValueInput') || '';
      const params = new URLSearchParams(location.search);
      const detailsParams = params.get('details');
      navigate(
        `/?search=${encodeURIComponent(searchValue)}&page=${page}${detailsParams ? `&details=${detailsParams}` : ''}`
      );

      const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.includes(searchValue)
      );

      const startIndex = (page - 1) * itemPage;
      const endIndex = startIndex + itemPage;
      const pokemonPages = filteredPokemons.slice(startIndex, endIndex);
      const countPages = chunkArray(filteredPokemons);
      setCountPages(countPages);

      if (filteredPokemons.length === 0) {
        setErrorMessage('No pokemons found. Please try another search term.');
        setLoading(false);
        return;
      }

      try {
        const pokemonPromises = pokemonPages.map(result =>
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
    },
    [navigate]
  );

  useEffect(() => {
    if (allPokemons.length > 0) {
      getInfoPokemons(allPokemons, currentPage);
    }
  }, [allPokemons, currentPage, getInfoPokemons]);

  return {
    allPokemons,
    pokemonData,
    loading,
    errorMessage,
    getInfoPokemons,
    currentPage,
    setCurrentPage,
    handleNextPage: () => setCurrentPage(prev => prev + 1),
    handlePrevPage: () => setCurrentPage(prev => prev - 1),
    countPages,
    selectedPokemon,
    setSelectedPokemon,
  };
}
