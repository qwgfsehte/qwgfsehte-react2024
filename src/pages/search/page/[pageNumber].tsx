import { AllPokemons } from 'src/interfaces/interface';
import { GetServerSideProps } from 'next';
import { wrapper } from 'src/Components/store';
import { pokemonApi } from 'src/Components/pokemonAPI';
import { AppContent } from 'src/Components/App/appLayout';

interface PageNumberProps {
  allPokemons: AllPokemons[];
}

// eslint-disable-next-line react-refresh/only-export-components
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

const PageNumber: React.FC<PageNumberProps> = ({ allPokemons }) => {
  return <AppContent allPokemons={allPokemons} />;
};

export default PageNumber;
