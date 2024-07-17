import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllPokemons } from '../../../interfaces/interface';

export const initialState: { pokemonPage: AllPokemons[] } = {
  pokemonPage: [],
};

export const pokemonSlice = createSlice({
  reducers: {
    setPokemonPage: (state, action: PayloadAction<AllPokemons[]>) => {
      state.pokemonPage = action.payload;
    },
  },
  name: 'pokemonList',
  initialState: initialState,
});

export const { setPokemonPage } = pokemonSlice.actions;
