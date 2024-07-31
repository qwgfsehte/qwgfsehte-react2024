import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonAPI';
import { updatePokemons } from './hooks/useGetPokemons.slice';
import { pokemonListSlice } from './body/pokemonsList/pokemonList.slice';
import { pokemonDetailsSlice } from './body/pokemonDetails/pokemonDetails.slice';
import paginationSlice from './pagination/pagination.slice';
import { createWrapper } from 'next-redux-wrapper';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';

export const makeStore = () =>
  configureStore({
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

const store = makeStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const wrapper = createWrapper(makeStore);
export default store;
