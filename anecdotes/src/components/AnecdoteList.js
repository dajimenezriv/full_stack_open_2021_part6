import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from 'reducers/anecdoteReducer';
import { removeNotification, setNotification } from 'reducers/notificationReducer';

function AnecdoteList() {
  // we want the whole state
  const anecdotes = useSelector((state) => {
    if (state.filter === '') return state.anecdotes;
    return state.anecdotes.filter((a) => a.content.includes(state.filter));
  });
  const dispatch = useDispatch();

  // a state mutation was detected between dispatches
  // we cannot modify the state
  return (
    <div>
      {
        [].concat(anecdotes)
          .sort((a, b) => b.votes - a.votes)
          .map((anecdote) => (
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                {`has ${anecdote.votes}`}
                <button
                  type="button"
                  onClick={() => {
                    dispatch(vote(anecdote.id));
                    dispatch(setNotification(anecdote.content));
                    setTimeout(() => dispatch(removeNotification()), 5000);
                  }}
                >
                  vote
                </button>
              </div>
            </div>
          ))
      }
    </div>
  );
}

export default AnecdoteList;
