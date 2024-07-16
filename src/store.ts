import { configureStore } from '@reduxjs/toolkit';
import { pokemonAPI } from './components/pokemonAPI';

const store = configureStore({
  reducer: {
    [pokemonAPI.reducerPath]: pokemonAPI.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonAPI.middleware),
});

export default store;
