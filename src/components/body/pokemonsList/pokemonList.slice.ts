import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllPokemons } from '../../../interfaces/interface';

export const initialState: {
  pokemonPage: AllPokemons[];
  nameSelectedPokemon: string;
} = {
  pokemonPage: [],
  nameSelectedPokemon: '',
};

export const pokemonListSlice = createSlice({
  name: 'pokemonList',
  initialState: initialState,
  reducers: {
    setPokemonPage: (state, action: PayloadAction<AllPokemons[]>) => {
      state.pokemonPage = action.payload;
    },
    setNameSelectedPokemon: (state, action: PayloadAction<string>) => {
      state.nameSelectedPokemon = action.payload;
    },
  },
});

export const { setPokemonPage, setNameSelectedPokemon } =
  pokemonListSlice.actions;
