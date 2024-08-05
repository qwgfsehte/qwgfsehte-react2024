import { json, Link, Outlet, useLoaderData, useParams } from '@remix-run/react';
import { fetchSearchResults } from '../api/fetchAllPokemons';
import Header from '../../src/components/header/header';
import { AppContent } from '../../src/components/App/appLayout';

export const loader: LoaderFunction = async () => {
  const response = await fetchSearchResults();
  return json(response);
};

export default function Search() {
  const { page } = useParams();
  const allPokemons = useLoaderData();

  return (
    <div>
      <AppContent allPokemons={allPokemons} currentPage={page} />
      <Outlet />
    </div>
  );
}
