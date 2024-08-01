import { GetServerSideProps } from 'next';
import { PokemonDetailsInfo } from 'src/Components/body/pokemonDetails/pokemonDetailsInfo';
import { pokemonApi } from 'src/Components/pokemonAPI';
import { wrapper } from 'src/Components/store';
import styles from '../../../Components/body/pokemonDetails/pokemonDetails.module.scss';
import Layout from 'src/Components/Layout';
import { AppContent } from 'src/Components/App/appLayout';
import { InfoPokemon } from 'src/interfaces/interface';

interface PokemonNameandUrl {
  name: string;
  url: string;
}

interface PageProps {
  resultDetailsData: InfoPokemon;
  allPokemons: PokemonNameandUrl[];
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const { res, query } = context;

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=59'
    );

    const resultDetails = await store.dispatch(
      pokemonApi.endpoints.fetchPokemonDetails.initiate(
        query.pokemonName as string
      )
    );
    const resultDetailsData = resultDetails.data ?? [];

    const result = await store.dispatch(
      pokemonApi.endpoints.getAllPokemons.initiate()
    );
    const allPokemons = result.data?.results ?? [];

    return {
      props: { resultDetailsData, allPokemons },
    };
  });

const PageNumber: React.FC<PageProps> = ({
  resultDetailsData,
  allPokemons,
}) => {
  return (
    <div className={styles['pokemon-details']}>
      <Layout
        secondaryChildren={<PokemonDetailsInfo data={resultDetailsData} />}
        mainChildren={<AppContent allPokemons={allPokemons} />}
      />
    </div>
  );
};

export default PageNumber;
