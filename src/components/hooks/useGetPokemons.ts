import { useCallback, useEffect, useState } from 'react';
import { AllPokemons, InfoPokemon } from '../../interfaces/interface';
import { chunkArray } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { pokemonAPI } from '../pokemonAPI';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilteredPokemons,
  setPokemons,
  setErrorMessage,
} from './useGetPokemons.slice';
import { setPokemonPage } from '../body/pokemonsList/pokemonList.slice';

export function useGetPokemons() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<InfoPokemon | null>(
    null
  );
  const itemPage = 20;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const allPokemons = useSelector(
    (state: RootState) => state.updatePokemons.allPokemons
  );

  const { data, isLoading, isError, isSuccess } =
    pokemonAPI.useGetAllPokemonsQuery();

  useEffect(() => {
    if (isSuccess && data && allPokemons.length === 0) {
      dispatch(setPokemons(data.results));
    }
    if (isError) {
      dispatch(
        setErrorMessage(
          'An error occurred while fetching the pokemons. Please try again later.'
        )
      );
    }
  }, [data, isSuccess, dispatch, allPokemons.length, isLoading, isError]);

  const getInfoPokemons = useCallback(
    async (pokemons: AllPokemons[], page: number) => {
      dispatch(setErrorMessage(''));
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

      dispatch(setFilteredPokemons(chunkArray(filteredPokemons)));
      dispatch(setPokemonPage(pokemonPages));

      if (filteredPokemons.length === 0) {
        dispatch(
          setErrorMessage('No pokemons found. Please try another search term.')
        );
        return;
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    if (allPokemons.length > 0) {
      getInfoPokemons(allPokemons, currentPage);
    }
  }, [allPokemons, currentPage, dispatch, getInfoPokemons]);

  return {
    allPokemons,
    getInfoPokemons,
    currentPage,
    setCurrentPage,
    handleNextPage: () => setCurrentPage(prev => prev + 1),
    handlePrevPage: () => setCurrentPage(prev => prev - 1),
    selectedPokemon,
    setSelectedPokemon,
  };
}
