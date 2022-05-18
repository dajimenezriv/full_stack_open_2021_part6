import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from 'reducers/anecdoteReducer';

function AnecdoteForm(props) {
  const [content, setContent] = useState('');

  /*
  The first function (createAnecdote) is a regular action creator
  whereas the second function (props.createAnecdote) contains the additional
  dispatch to the store that was added by connect.
  console.log(createAnecdote);
  console.log(props.createAnecdote);
  */

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div><input value={content} onChange={(e) => setContent(e.target.value)} /></div>
        <button
          type="button"
          onClick={() => props.createAnecdote(content)} // eslint-disable-line
        >
          create
        </button>
      </form>
    </div>
  );
}

// we don't need to access the state, so pass null
export default connect(null, { createAnecdote })(AnecdoteForm);
