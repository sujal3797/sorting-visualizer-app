import React, { useState, useEffect } from 'react';
import { 
  bubbleSortAnimator, 
  selectionSortAnimator,
  insertionSortAnimator,
  mergeSortAnimator,
  quickSortAnimator,
  heapSortAnimator,
} from '../sortingAlgorithms.js';

const PRIMARY_COLOR = '#58a6ff';
const SECONDARY_COLOR = '#f87171';
const SORTED_COLOR = '#4ade80';

const VisualizerCard = ({ algorithmName, array, isSorting, onSortComplete, viewMode }) => {
  const [localArray, setLocalArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [stats, setStats] = useState({ swaps: 0, comparisons: 0 });
  const [cardIsSorting, setCardIsSorting] = useState(false);

  useEffect(() => {
    setLocalArray([...array]);
    setActiveIndices([]);
    setSortedIndices([]);
    setStats({ swaps: 0, comparisons: 0 });
  }, [array]);

  useEffect(() => {
    if (isSorting && !cardIsSorting) {
      setCardIsSorting(true);
      const speed = 101 - 50; // Using a medium speed for now
      let sortPromise;

      switch (algorithmName) {
        case 'Bubble Sort':
          sortPromise = bubbleSortAnimator(localArray, setLocalArray, setActiveIndices, setStats, speed);
          break;
        case 'Selection Sort':
          sortPromise = selectionSortAnimator(localArray, setLocalArray, setActiveIndices, setSortedIndices, setStats, speed);
          break;
        case 'Insertion Sort':
          sortPromise = insertionSortAnimator(localArray, setLocalArray, setActiveIndices, setSortedIndices, setStats, speed);
          break;
        case 'Merge Sort':
          sortPromise = mergeSortAnimator(localArray, setLocalArray, setActiveIndices, setSortedIndices, setStats, speed);
          break;
        case 'Quick Sort':
          sortPromise = quickSortAnimator(localArray, setLocalArray, setActiveIndices, setSortedIndices, setStats, speed);
          break;
        case 'Heap Sort':
          sortPromise = heapSortAnimator(localArray, setLocalArray, setActiveIndices, setSortedIndices, setStats, speed);
          break;
        default:
          sortPromise = Promise.resolve();
          break;
      }
      
      sortPromise.then(() => {
        setActiveIndices([]);
        setCardIsSorting(false);
        onSortComplete();
      });
    }
  }, [isSorting]);

  return (
    <div className="visualizer-card">
      <h3>{algorithmName}</h3>
      <div className="bar-container">
        {viewMode === 'bar'
          ? // Bar View
            localArray.map((value, idx) => {
              let backgroundColor = PRIMARY_COLOR;
              if (sortedIndices.includes(idx)) backgroundColor = SORTED_COLOR;
              if (activeIndices.includes(idx)) backgroundColor = SECONDARY_COLOR;
              
              return (
                <div
                  className="array-bar"
                  key={idx}
                  style={{
                    height: `${value / 1.5}px`,
                    backgroundColor: backgroundColor,
                  }}
                ></div>
              );
            })
          : // Cell View
            localArray.map((value, idx) => {
              // ✅ Add this same color logic here
              let backgroundColor = PRIMARY_COLOR;
              if (sortedIndices.includes(idx)) backgroundColor = SORTED_COLOR;
              if (activeIndices.includes(idx)) backgroundColor = SECONDARY_COLOR;

              return (
                <div
                  className="cell"
                  key={idx}
                  style={{ backgroundColor: backgroundColor }}
                >
                  {value}
                </div>
              );
            })}
      </div>
      <div className="stats-container">
        <span>Swaps: {stats.swaps}</span>
        <span>Comparisons: {stats.comparisons}</span>
      </div>
    </div>
  );
};

export default VisualizerCard;