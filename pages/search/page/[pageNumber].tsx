import { AppContent } from 'Components/App/appLayout';
import { pokemonApi } from 'Components/pokemonAPI';
import { wrapper } from 'Components/store';
import { AllPokemons } from 'interfaces/interface';
import { GetServerSideProps } from 'next';

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
