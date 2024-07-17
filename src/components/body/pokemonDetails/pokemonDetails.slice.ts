import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: {
  nameSelectedPokemon: string;
  loading: boolean;
} = {
  nameSelectedPokemon: '',
  loading: true,
};

export const pokemonDetailsSlice = createSlice({
  reducers: {
    setNewStateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  name: 'pokemonDetails',
  initialState: initialState,
});
