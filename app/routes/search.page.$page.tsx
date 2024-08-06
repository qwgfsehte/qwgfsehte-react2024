import { json, useLoaderData, useParams } from '@remix-run/react';
import { fetchSearchResults } from '../api/fetchAllPokemons';
import { AppContent } from '../../src/components/App/appLayout';
import { PokemonCardInfo } from '../../src/interfaces/interface';

interface PokemonsData {
  results: PokemonCardInfo[];
}

export const loader = async () => {
  const response = await fetchSearchResults();
  return json(response);
};

export default function PageSearch() {
  const { page } = useParams();
  const allPokemons = useLoaderData<PokemonsData>();

  return (
    <div>
      <AppContent
        allPokemons={allPokemons.results}
        currentPage={page as unknown as number}
      />
    </div>
  );
}
