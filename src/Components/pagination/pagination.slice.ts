import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState = {
  currentPage: 1,
  currentGroup: 0,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCurrentGroup: (state, action: PayloadAction<number>) => {
      state.currentGroup = action.payload;
    },
  },
});

export const { setCurrentPage, setCurrentGroup } = paginationSlice.actions;
export default paginationSlice.reducer;
