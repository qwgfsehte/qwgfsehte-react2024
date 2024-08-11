import { AllPokemons } from 'src/interfaces/interface';
import { GetServerSideProps } from 'next';
import { wrapper } from '../../../Components/store';
import { pokemonApi } from '../../../Components/pokemonAPI';
import { AppContent } from '../../../Components/App/appLayout';
import Layout from '../../../Components/Layout';

interface PageNumberProps {
  allPokemons: AllPokemons[];
}

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const { res } = context;

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=59'
    );

    const result = await store.dispatch(
      pokemonApi.endpoints.getAllPokemons.initiate()
    );
    const allPokemons = result.data?.results ?? [];

    return {
      props: { allPokemons },
    };
  });

const PageHome: React.FC<PageNumberProps> = ({ allPokemons }) => {
  return (
    <Layout
      mainChildren={<AppContent allPokemons={allPokemons} />}
      secondaryChildren={<div></div>}
    ></Layout>
  );
};

export default PageHome;
