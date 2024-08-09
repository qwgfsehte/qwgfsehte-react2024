import { PokemonCardInfo } from '../../interfaces/interface';

const ITEM_PAGE = 20;

export function filterPokemons(
  pokemons: PokemonCardInfo[],
  page: number,
  searchValue: string,
  pagination = false
) {
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.includes(searchValue)
  );

  const startIndex = (page - 1) * ITEM_PAGE;
  const endIndex = startIndex + ITEM_PAGE;
  const pokemonPages = filteredPokemons.slice(startIndex, endIndex);

  if (pagination) {
    return chunkArray(filteredPokemons);
  }
  return pokemonPages;
}

function chunkArray(array: { name: string; url: string }[], chunkSize = 20) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
