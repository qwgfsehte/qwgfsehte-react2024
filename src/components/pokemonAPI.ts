import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiResponse, InfoPokemon } from '../interfaces/interface';

export const pokemonAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: builder => ({
    getAllPokemons: builder.query<ApiResponse, void>({
      query() {
        return 'pokemon?limit=2000';
      },
    }),
    fetchPokemonDetails: builder.query<InfoPokemon[], string>({
      query(name: string) {
        return `pokemon/${name}`;
      },
    }),
  }),
});
