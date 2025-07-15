import React from 'react';

const ControlPanel = (props) => {
  const {
    onGenerateRandom,
    onGenerateFromInput,
    onSort,
    isSorting,
    arraySize,
    onSizeChange,
    animationSpeed,
    onSpeedChange,
    activeAlgorithms,
    onAlgorithmToggle,
    arrayInput,
    onArrayInputChange,
    viewMode,
    onViewModeChange,
  } = props;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onGenerateFromInput();
    }
  };

  return (
    <>
      <div className="main-controls">
        <button onClick={onGenerateRandom} disabled={isSorting}>
          Generate New Array
        </button>
        <input
          type="text"
          className="array-input"
          value={arrayInput}
          onChange={(e) => onArrayInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isSorting}
          placeholder="Enter numbers, e.g., 8, 5, 2, 9, 1"
        />
        <div className="slider-container">
          <label>Size</label>
          <input type="range" min="10" max="100" value={arraySize} onChange={(e) => onSizeChange(e.target.value)} className="slider" disabled={isSorting} />
        </div>
        <div className="slider-container">
          <label>Speed</label>
          <input type="range" min="10" max="100" value={animationSpeed} onChange={(e) => onSpeedChange(e.target.value)} className="slider" disabled={isSorting} />
        </div>
        <div className="view-mode-toggle">
          <button 
            className={viewMode === 'cell' ? 'active' : ''} 
            onClick={() => onViewModeChange('cell')}
            disabled={isSorting}
          >
            Cell
          </button>
          <button 
            className={viewMode === 'bar' ? 'active' : ''} 
            onClick={() => onViewModeChange('bar')}
            disabled={isSorting}
          >
            Bar
          </button>
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