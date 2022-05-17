# full_stack_open_2021_part6

## Configuration

Configure eslint.
```bash
npm install --save-dev eslint
npm init @eslint/config
```

Add jsconfig to import everything from src.
 
## Part a) Flux-architecture and Redux

It shows how to use reducers from Redux Toolkit.<br>
Reducers must be [pure functions](https://en.wikipedia.org/wiki/Pure_function).
This library will help us to define the reducer as an immutable function.
```bash
npm install @reduxjs/toolkit react-redux
npm install --save-dev deep-freeze
```

We learn how to create a reducer and to export its actions with createSlice.
```javascript
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
```