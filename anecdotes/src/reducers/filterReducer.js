import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const slice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, { payload }) {
      return payload;
    },
  },
});

export const { setFilter } = slice.actions;
export default slice.reducer;
