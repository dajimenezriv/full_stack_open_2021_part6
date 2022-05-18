import React, { useEffect } from 'react';
import AnecdoteForm from 'components/AnecdoteForm';
import AnecdoteList from 'components/AnecdoteList';
import Notification from 'components/Notification';
import Filter from 'components/Filter';
import { initializeAnecdotes } from 'reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  // in our app the value of dispatch doesn't change
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
}

export default App;
