import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const slice = createSlice({
  name: 'notfication',
  initialState,
  reducers: {
    setNotification(state, { payload }) {
      return payload;
    },
    removeNotification(state, { payload }) {
      return '';
    },
  },
});

export const { setNotification, removeNotification } = slice.actions;
export default slice.reducer;
