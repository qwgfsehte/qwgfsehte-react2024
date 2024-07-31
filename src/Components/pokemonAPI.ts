import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from './store';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import { ApiResponse, InfoPokemon } from 'src/interfaces/interface';

export function isHydrateAction(
  action: Action
): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      const payload = action as PayloadAction<{ [key: string]: never }>;
      return payload.payload[reducerPath];
    }
  },

  endpoints: builder => ({
    getAllPokemons: builder.query<ApiResponse, void>({
      query() {
        return 'pokemon?limit=2000';
      },
      keepUnusedDataFor: 3600,
    }),
    fetchPokemonDetails: builder.query<InfoPokemon, string>({
      query(name: string) {
        return `pokemon/${name}`;
      },
      keepUnusedDataFor: 3600,
    }),
  }),
});
