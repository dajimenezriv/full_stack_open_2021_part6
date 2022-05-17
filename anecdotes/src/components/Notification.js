import React from 'react';
import { useSelector } from 'react-redux';

function Notification() {
  const notification = useSelector((state) => state.notification);
  if (notification === '') return null;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };

  return (
    <div style={style}>
      {`you voted '${notification}'`}
    </div>
  );
}

export default Notification;
