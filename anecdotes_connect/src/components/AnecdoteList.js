import React from 'react';
import { connect } from 'react-redux';
import { vote } from 'reducers/anecdoteReducer';
import { setNotification } from 'reducers/notificationReducer';

// we are moving the state to the props
const mapStateToProps = (state) => {
  if (state.filter === '') return { anecdotes: state.anecdotes };
  return { anecdotes: state.anecdotes.filter((a) => a.content.includes(state.filter)) };
};

const mapDispatchToProps = {
  vote,
  setNotification,
};

function AnecdoteList(props) {
  const { anecdotes } = props;

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
                    props.vote(anecdote); // eslint-disable-line
                    props.setNotification(`you voted '${anecdote.content}'`, 5); // eslint-disable-line
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

// The AnecdoteList component has "direct access" via props.anecdotes and props.filter
// for inspecting the state of the Redux store.
const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
export default ConnectedAnecdotes;
