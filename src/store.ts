import { configureStore } from '@reduxjs/toolkit';
import { pokemonAPI } from './components/pokemonAPI';
import { updatePokemons } from './components/hooks/useGetPokemons.slice';
import { pokemonSlice } from './components/body/pokemonsList/pokemonList.slice';

const store = configureStore({
  reducer: {
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
    updatePokemons: updatePokemons.reducer,
    pokemonSlice: pokemonSlice.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
