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

We learn how to create a reducer and to export its actions.
```javascript
const reducer = (state = initialState, { type, data } = {}) => {
  switch (type) {
    case 'VOTE': {
      const { id } = data;
      const prevAnecdote = state.find((anecdote) => anecdote.id === id);
      return state.map((anecdote) => (
        anecdote.id !== id
          ? anecdote
          : {
            ...prevAnecdote,
            votes: prevAnecdote.votes + 1,
          }));
    }

    case 'NEW_ANECDOTE': {
      return [...state, data];
    }

    default:
      return state;
  }
};

export const vote = (id) => ({
  type: 'VOTE',
  data: { id },
});

export const createAnecdote = (content) => ({
  type: 'NEW_ANECDOTE',
  data: {
    content,
    id: getId(),
    votes: 0,
  },
});
```