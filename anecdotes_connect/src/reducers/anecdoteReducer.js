import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from 'services/anecdote';

const slice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, { payload }) {
      // the Immer library allow us to mutate the state inside the reducer
      state.push(payload);
    },
    setAnecdotes(state, { payload }) {
      return payload;
    },
    updateAnecdote(state, { payload }) {
      const anecdote = payload;
      return state.map((a) => (
        anecdote.id !== a.id
          ? a
          : anecdote
      ));
    },
  },
});

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export const createAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content);
  dispatch(appendAnecdote(newAnecdote));
};

export const vote = (anecdote) => async (dispatch) => {
  let updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  updatedAnecdote = await anecdoteService.vote(updatedAnecdote);
  dispatch(updateAnecdote(updatedAnecdote));
};

export const {
  appendAnecdote,
  setAnecdotes,
  updateAnecdote,
} = slice.actions;
export default slice.reducer;
