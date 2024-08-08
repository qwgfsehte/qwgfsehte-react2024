import { json, useLoaderData, useParams } from '@remix-run/react';
import { fetchSearchResults } from '../api/fetchAllPokemons';
import { MainContent } from '../../src/components/App/appLayout';
import { PokemonCardInfo } from '../../src/interfaces/interface';
import Header from '../../src/components/header/header';
import { Footer } from '../../src/components/footer/footer';

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
      <Header />
      <MainContent
        allPokemons={allPokemons.results}
        currentPage={page as unknown as number}
      />
      <Footer />
    </div>
  );
}
