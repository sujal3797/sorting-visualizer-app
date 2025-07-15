import React from 'react';

const Visualizer = ({ array }) => {
  return (
    <div className="visualizer-container">
      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx} // Add this line to fix the warning
          style={{ height: `${value}px` }}
        ></div>
      ))}
    </div>
  );
};

export default Visualizer;