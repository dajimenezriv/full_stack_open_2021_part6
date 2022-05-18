import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { setFilter } from 'reducers/filterReducer';

const mapStateToProps = (state) => ({ filter: state.filter });

const mapDispatchToProps = {
  setFilter,
};

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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
