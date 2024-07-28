import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonAPI';
import { updatePokemons } from './hooks/useGetPokemons.slice';
import { pokemonListSlice } from './body/pokemonsList/pokemonList.slice';
import { pokemonDetailsSlice } from './body/pokemonDetails/pokemonDetails.slice';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import paginationSlice from './pagination/pagination.slice';

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    updatePokemons: updatePokemons.reducer,
    pokemonListSlice: pokemonListSlice.reducer,
    pokemonDetailsSlice: pokemonDetailsSlice.reducer,
    paginationSlice: paginationSlice,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([pokemonApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
