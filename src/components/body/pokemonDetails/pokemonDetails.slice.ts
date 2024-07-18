import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonAPI } from '../../pokemonAPI';

export const initialState: {
  nameSelectedPokemon: string;
  loading: boolean;
  error: string | null;
} = {
  nameSelectedPokemon: '',
  loading: true,
  error: null,
};

export const pokemonDetailsSlice = createSlice({
  name: 'pokemonDetails',
  initialState: initialState,
  reducers: {
    setNewStateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        pokemonAPI.endpoints.fetchPokemonDetails.matchPending,
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        pokemonAPI.endpoints.fetchPokemonDetails.matchFulfilled,
        state => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        pokemonAPI.endpoints.fetchPokemonDetails.matchRejected,
        state => {
          state.loading = false;
          state.error = 'Failed to fetch details';
        }
      );
  },
});
