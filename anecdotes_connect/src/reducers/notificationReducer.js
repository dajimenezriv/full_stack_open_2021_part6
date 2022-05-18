import { createSlice } from '@reduxjs/toolkit';

const initialState = '';
let timeoutID = null;

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
  if (timeoutID !== null) clearTimeout(timeoutID);
  dispatch(writeNotification(content));
  timeoutID = setTimeout(() => dispatch(clearNotification()), seconds * 1000);
};

export const {
  writeNotification,
  clearNotification,
} = slice.actions;
export default slice.reducer;
