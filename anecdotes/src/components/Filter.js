import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'reducers/filterReducer';

function Filter() {
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter
      {' '}
      <input value={filter} onChange={(e) => dispatch(setFilter(e.target.value))} />
    </div>
  );
}

export default Filter;
