import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pokemonApi } from '../pokemonAPI';
import { AllPokemons, Pokemon } from 'src/interfaces/interface';

export const initialState: Pokemon = {
  allPokemons: [],
  filteredPokemons: [],
  detailsForPokemons: [],
  loading: true,
  errorMessage: '',
};

export const updatePokemons = createSlice({
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<AllPokemons[]>) => {
      state.allPokemons = action.payload;
    },
    setFilteredPokemons: (state, action: PayloadAction<AllPokemons[][]>) => {
      state.filteredPokemons = action.payload;
    },
    setNewStateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(pokemonApi.endpoints.getAllPokemons.matchPending, state => {
        state.loading = true;
        state.errorMessage = '';
      })
      .addMatcher(pokemonApi.endpoints.getAllPokemons.matchFulfilled, state => {
        state.loading = false;
        state.errorMessage = '';
      })
      .addMatcher(pokemonApi.endpoints.getAllPokemons.matchRejected, state => {
        state.errorMessage = '';
        state.loading = false;
      });
  },
  name: 'Pokemons',
});

export const {
  setErrorMessage,
  setPokemons,
  setFilteredPokemons,
  setNewStateLoading,
} = updatePokemons.actions;

export default updatePokemons.reducer;
