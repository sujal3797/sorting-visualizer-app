import React from 'react';
import VisualizerCard from './VisualizerCard';

const VisualizerGrid = ({ masterArray, isSorting, onSortComplete, animationSpeed, activeAlgorithms, viewMode }) => {
  // Filter for only the active algorithms before mapping
  const algorithmsToDisplay = Object.keys(activeAlgorithms).filter(
    (algo) => activeAlgorithms[algo]
  );

  return (
    <div className="visualizer-grid">
      {algorithmsToDisplay.map((algoName) => (
        <VisualizerCard
          key={algoName}
          algorithmName={algoName}
          array={masterArray}
          isSorting={isSorting}
          onSortComplete={onSortComplete}
          animationSpeed={animationSpeed}
          viewMode={viewMode} // Pass speed to card
        />
      ))}
    </div>
  );
};

export default VisualizerGrid;