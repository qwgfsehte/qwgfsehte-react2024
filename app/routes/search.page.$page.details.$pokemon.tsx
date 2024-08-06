import { json, useLoaderData, useParams } from '@remix-run/react';
import { PokemonDetailsInfo } from '../../src/components/body/pokemonDetails/pokemonDetailsInfo';
import { fetchDetailsResults } from '../api/fetchDetailsPokemon';
import { InfoPokemon } from '../../src/interfaces/interface';

interface Params {
  params: {
    pokemon: string;
  };
}

export const loader = async ({ params }: Params) => {
  const { pokemon } = params;
  const response = await fetchDetailsResults(pokemon);
  return json(response);
};

export default function PageDetails() {
  const { page } = useParams();
  const data = useLoaderData<InfoPokemon>();

  return (
    <PokemonDetailsInfo data={data} currentPage={page as unknown as number} />
  );
}
