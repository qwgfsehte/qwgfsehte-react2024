import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    handleNextPage: state => {
      state.currentPage += 1;
    },
    handlePrevPage: state => {
      state.currentPage -= 1;
    },
  },
});

export const { setCurrentPage, handleNextPage, handlePrevPage } =
  paginationSlice.actions;
