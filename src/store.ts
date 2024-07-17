import { configureStore } from '@reduxjs/toolkit';
import { pokemonAPI } from './components/pokemonAPI';
import { updatePokemons } from './components/hooks/useGetPokemons.slice';
import { pokemonDetailsSlice } from './components/body/pokemonDetails/pokemonDetails.slice';
import { pokemonListSlice } from './components/body/pokemonsList/pokemonList.slice';

const store = configureStore({
  reducer: {
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    updatePokemons: updatePokemons.reducer,
    pokemonListSlice: pokemonListSlice.reducer,
    pokemonDetailsSlice: pokemonDetailsSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
