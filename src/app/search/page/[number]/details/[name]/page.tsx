import Layout from '../../../../../../Components/Layout';
import styles from '../../../../../../Components/body/pokemonDetails/pokemonDetails.module.scss';
import { AppContent } from '../../../../../../Components/App/appLayout';
import { use } from 'react';
import { PokemonDetailsInfo } from '../../../../../../Components/body/pokemonDetails/pokemonDetailsInfo';
import { fetchDetailsResults } from '../../../../../api/fetchDetailsPokemon';
import { fetchSearchResults } from '../../../../../api/fetchAllPokemons';

interface Params {
  params: {
    number: number;
    name: string;
  };
}

export default function PageDetails({ params }: Params) {
  const { name, number } = params;
  const allPokemons = use(fetchSearchResults());
  const resultDetailsData = use(fetchDetailsResults(name));

  return (
    <div className={styles['pokemon-details']}>
      <Layout
        secondaryChildren={
          <PokemonDetailsInfo data={resultDetailsData} currentPage={number} />
        }
        mainChildren={
          <AppContent allPokemons={allPokemons.results} currentPage={number} />
        }
      />
    </div>
  );
}
