import { setFilteredPokemons, setErrorMessage } from './useGetPokemons.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useEffect } from 'react';
import { AllPokemons } from 'src/interfaces/interface';
import { setPokemonPage } from '../body/pokemonsList/pokemonList.slice';

const ITEM_PAGE = 20;

export function useFilterPokemons(
  pokemons: { allPokemons: AllPokemons[] },
  page: number
) {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    filterPokemons(dispatch, pokemons.allPokemons, page);
  }, [dispatch, page, pokemons]);
}

export function filterPokemons(
  dispatch: AppDispatch,
  pokemons: AllPokemons[],
  page: number
) {
  dispatch(setErrorMessage(''));
  const searchValue = localStorage.getItem('searchValueInput') || '';
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.includes(searchValue)
  );

  const startIndex = (page - 1) * ITEM_PAGE;
  const endIndex = startIndex + ITEM_PAGE;
  const pokemonPages = filteredPokemons.slice(startIndex, endIndex);

  dispatch(setFilteredPokemons(chunkArray(filteredPokemons)));
  dispatch(setPokemonPage(pokemonPages));

  if (filteredPokemons.length === 0) {
    dispatch(
      setErrorMessage('No pokemons found. Please try another search term.')
    );
  }
}

function chunkArray(array: { name: string; url: string }[], chunkSize = 20) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
