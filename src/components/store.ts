import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonAPI';
import { updatePokemons } from './hooks/useGetPokemons.slice';
import { pokemonDetailsSlice } from './body/pokemonDetails/pokemonDetails.slice';
import { pokemonListSlice } from './body/pokemonsList/pokemonList.slice';
import { paginationSlice } from './pagination/pagination.slice';
import { setupListeners } from '@reduxjs/toolkit/query/react';

const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    updatePokemons: updatePokemons.reducer,
    pokemonListSlice: pokemonListSlice.reducer,
    pokemonDetailsSlice: pokemonDetailsSlice.reducer,
    paginationSlice: paginationSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([pokemonApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
