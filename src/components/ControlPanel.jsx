import React from 'react';

const ControlPanel = (props) => {
  const {
    onGenerateArray, 
    onSort, 
    isSorting,
    arraySize,
    onSizeChange,
    animationSpeed,
    onSpeedChange,
    activeAlgorithms,
    onAlgorithmToggle,
  } = props;

  return (
    <>
      <div className="main-controls">
        <button onClick={onGenerateArray} disabled={isSorting}>
          Generate New Array
        </button>
        <div className="slider-container">
          <label>Size</label>
          <input type="range" min="10" max="100" value={arraySize} onChange={(e) => onSizeChange(e.target.value)} className="slider" disabled={isSorting}/>
        </div>
        <div className="slider-container">
          <label>Speed</label>
          <input type="range" min="10" max="100" value={animationSpeed} onChange={(e) => onSpeedChange(e.target.value)} className="slider" disabled={isSorting}/>
        </div>
        <button className="sort-button" onClick={onSort} disabled={isSorting}>
          Sort All!
        </button>
      </div>
      <div className="algo-selection-controls">
        {Object.keys(activeAlgorithms).map(algoName => (
          <div key={algoName} className="checkbox-container">
            <input 
              type="checkbox"
              id={algoName}
              name={algoName}
              checked={activeAlgorithms[algoName]}
              onChange={() => onAlgorithmToggle(algoName)}
              disabled={isSorting}
            />
            <label htmlFor={algoName}>{algoName}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default ControlPanel;