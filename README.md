# full_stack_open_2021_part6

[Course](https://fullstackopen.com/en/part6)

## Configuration

Configure eslint.
```bash
npm install --save-dev eslint
npm init @eslint/config
```

Add jsconfig to import everything from src.
 
## Part a) Flux-architecture and Redux || Part b) Many reducers

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

### How to run?

```bash
npm start
npm test
```

## Part c) Communication with server in a redux application

We want to abstract all the connection with the server from the components.<br>
```
npm install redux-thunk
```
With Redux Thunk it is possible to implement action creators which return a function instead of an object.<br>
```javascript
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
```

### How to run?

```bash
npm start
npm run server # serves the db.json
```

## Part d) connect

We are going to use the connect-function from react-redux.<br>
It is not use anymore, but maybe it's still used in old projects.<br>

```javascript
const mapStateToProps = (state) => {
  if (state.filter === '') return { anecdotes: state.anecdotes };
  return { anecdotes: state.anecdotes.filter((a) => a.content.includes(state.filter)) };
};

const mapDispatchToProps = {
  vote,
  setNotification,
};

function AnecdoteList(props) {
  ...
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdotes;
```
