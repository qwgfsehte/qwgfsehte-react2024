import Layout from 'src/Components/Layout';
import { GetServerSideProps } from 'next';
import { use } from 'react';
import { Provider } from 'react-redux';
import { AppContent } from 'src/Components/App/appLayout';
import { Pokeball } from 'src/Components/body/pokemonsList/pokeball';
import { filterPokemons } from 'src/Components/hooks/useFilterPokemons';
import { pokemonApi } from 'src/Components/pokemonAPI';
import store, { wrapper } from 'src/Components/store';
import { AllPokemons, PokemonCardInfo } from 'src/interfaces/interface';
import styles from 'src/Components/body/pokemonsList/pokemonList.module.scss';
import Header from 'src/Components/header/header';

interface PageNumberProps {
  allPokemons: AllPokemons[];
}

async function fetchSearchResults() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default function PageHome() {
  const allPokemons = use(fetchSearchResults());

  return (
    <Layout
      mainChildren={<AppContent allPokemons={allPokemons.results} />}
      secondaryChildren={
        <div>{'Please, select a Pokemon for more information'}</div>
      }
    ></Layout>
  );
}
