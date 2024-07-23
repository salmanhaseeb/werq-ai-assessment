import React from 'react';

const Spinner = () => (
  <div className="spinner">
    <svg
      viewBox="0 0 50 50"
      className="circular"
      style={{ width: '24px', height: '24px', display: 'inline-block', verticalAlign: 'middle' }}
    >
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
        strokeMiterlimit="10"
        style={{ stroke: '#1abc9c' }}
      />
    </svg>
  </div>
);

export default Spinner;
