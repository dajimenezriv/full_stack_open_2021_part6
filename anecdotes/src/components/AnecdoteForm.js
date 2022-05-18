import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from 'reducers/anecdoteReducer';

function AnecdoteForm() {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div><input value={content} onChange={(e) => setContent(e.target.value)} /></div>
        <button type="button" onClick={() => dispatch(createAnecdote(content))}>create</button>
      </form>
    </div>
  );
}

export default AnecdoteForm;
