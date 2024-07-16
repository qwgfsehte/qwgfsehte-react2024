import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AllPokemons, InfoPokemon } from '../interfaces/interface';

export const pokemonAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getAllPokemons: builder.query<AllPokemons[], void>({
      query() {
        return 'pokemon?limit=2000';
      },
    }),
    getDetailsPokemon: builder.query<InfoPokemon[], number>({
      query(id: number) {
        return `pokemon/${id}/`;
      },
    }),
  }),
});
