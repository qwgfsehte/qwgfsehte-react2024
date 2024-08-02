import Layout from 'src/Components/Layout';
import { use } from 'react';
import { AppContent } from 'src/Components/App/appLayout';

async function fetchSearchResults() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

interface Params {
  params: {
    number: number;
  };
}

export default function PageHome({ params }: Params) {
  const { number } = params;
  const allPokemons = use(fetchSearchResults());

  return (
    <Layout
      mainChildren={
        <AppContent allPokemons={allPokemons.results} currentPage={number} />
      }
      secondaryChildren={
        <div>{'Please, select a Pokemon for more information'}</div>
      }
    ></Layout>
  );
}
