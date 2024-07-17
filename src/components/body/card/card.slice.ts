import { createSlice } from '@reduxjs/toolkit';

export const cardSlice = createSlice({
  name: 'pokemon',
  initialState: {
    data: null,
  },
  reducers: {
    setPokemonData: (state, action) => {
      state.data = action.payload;
    },
  },
});
