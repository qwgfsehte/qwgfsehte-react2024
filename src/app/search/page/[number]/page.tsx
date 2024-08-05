import Layout from '../../../../Components/Layout';
import { AppContent } from '../../../../Components/App/appLayout';
import { fetchSearchResults } from '../../../api/fetchAllPokemons';

interface Params {
  params: {
    number: number;
  };
}

export default async function PageHome({ params }: Params) {
  const { number } = params;
  const allPokemons = await fetchSearchResults();

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
