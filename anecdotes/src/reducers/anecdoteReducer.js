import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const initialState = anecdotesAtStart.map(asObject);

const slice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    // the default type is 'anecdotes/newAnecdote'
    newAnecdote(state, { payload }) {
      const content = payload;
      // the Immer library allow us to mutate the state inside the reducer
      state.push({
        content,
        id: getId(),
        votes: 0,
      });
    },
    // the default type is 'anecdotes/vote'
    vote(state, { payload }) {
      const id = payload;
      const prevAnecdote = state.find((anecdote) => anecdote.id === id);
      return state.map((anecdote) => (
        anecdote.id !== id
          ? anecdote
          : {
            ...prevAnecdote,
            votes: prevAnecdote.votes + 1,
          }));
    },
  },
});

export const { newAnecdote, vote } = slice.actions;
export default slice.reducer;
