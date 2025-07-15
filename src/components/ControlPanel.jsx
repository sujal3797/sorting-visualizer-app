import React from 'react';

const ControlPanel = ({
  onGenerateArray,
  arraySize,
  onSizeChange,
  animationSpeed,
  onSpeedChange,
  algorithm,
  onAlgorithmChange,
  onSort, // New prop
  isSorting, // New prop
}) => {
  return (
    <div className="control-panel">
      <button onClick={onGenerateArray} disabled={isSorting}>
        Generate New Array
      </button>

      <div className="slider-container">
        <label>Size</label>
        <input
          type="range"
          min="10"
          max="100"
          value={arraySize}
          onChange={(e) => onSizeChange(e.target.value)}
          className="slider"
          disabled={isSorting}
        />
      </div>

      <div className="slider-container">
        <label>Speed</label>
        <input
          type="range"
          min="10"
          max="100"
          value={animationSpeed}
          onChange={(e) => onSpeedChange(e.target.value)}
          className="slider"
          disabled={isSorting}
        />
      </div>

      <select
        value={algorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
        disabled={isSorting}
      >
        <option value="bubbleSort">Bubble Sort</option>
        <option value="mergeSort">Merge Sort</option>
        <option value="quickSort">Quick Sort</option>
      </select>

      <button className="sort-button" onClick={onSort} disabled={isSorting}>
        Sort!
      </button>
    </div>
  );
};

export default ControlPanel;