import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonApi } from '../../pokemonAPI';

export const initialState: {
  loading: boolean;
  error: string | null;
} = {
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
        pokemonApi.endpoints.fetchPokemonDetails.matchPending,
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonDetails.matchFulfilled,
        state => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        pokemonApi.endpoints.fetchPokemonDetails.matchRejected,
        state => {
          state.loading = false;
          state.error = 'Failed to fetch details';
        }
      );
  },
});

export const { setNewStateLoading } = pokemonDetailsSlice.actions;
export default pokemonDetailsSlice.reducer;
