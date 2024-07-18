import { useEffect } from 'react';
import { pokemonAPI } from '../pokemonAPI';
import { AppDispatch, RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemons, setErrorMessage } from './useGetPokemons.slice';
import { useFilterPokemons } from './useFilterPokemons';

export function useGetPokemons() {
  const dispatch: AppDispatch = useDispatch();
  const allPokemons = useSelector(
    (state: RootState) => state.updatePokemons.allPokemons
  );
  const currentPage = useSelector(
    (state: RootState) => state.paginationSlice.currentPage
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

  useFilterPokemons(allPokemons, currentPage);
}
