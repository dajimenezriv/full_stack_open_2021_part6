import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const slice = createSlice({
  name: 'notfication',
  initialState,
  reducers: {
    writeNotification(state, { payload }) {
      return payload;
    },
    clearNotification(state, { payload }) {
      return '';
    },
  },
});

export const setNotification = (content, seconds) => (dispatch) => {
  dispatch(writeNotification(content));
  setTimeout(() => dispatch(clearNotification()), seconds * 1000);
};

export const {
  writeNotification,
  clearNotification,
} = slice.actions;
export default slice.reducer;
