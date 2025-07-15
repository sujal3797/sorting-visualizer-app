import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Header from './components/Header';
import VisualizerGrid from './components/VisualizerGrid';
import ControlPanel from './components/ControlPanel';

const ALL_ALGORITHMS = [
  'Bubble Sort', 'Selection Sort', 'Insertion Sort',
  'Heap Sort', 'Merge Sort', 'Quick Sort',
];

const initialActiveAlgos = ALL_ALGORITHMS.reduce((acc, algo) => {
  acc[algo] = true;
  return acc;
}, {});

function App() {
  const [masterArray, setMasterArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [activeAlgorithms, setActiveAlgorithms] = useState(initialActiveAlgos);
  const completionCounter = useRef(0);

  const generateArray = () => {
    setIsSorting(false);
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * (200 - 5 + 1)) + 5);
    }
    setMasterArray(newArray);
  };
  
  const handleAlgorithmToggle = (algoName) => {
    setActiveAlgorithms(prev => ({
      ...prev,
      [algoName]: !prev[algoName]
    }));
  };

  useEffect(() => {
    generateArray();
  }, [arraySize]);

  const handleSort = () => {
    const numActive = Object.values(activeAlgorithms).filter(Boolean).length;
    if (numActive === 0) return;
    completionCounter.current = 0;
    setIsSorting(true);
  };
  
  const handleSortCompletion = () => {
    const numActive = Object.values(activeAlgorithms).filter(Boolean).length;
    completionCounter.current++;
    if (completionCounter.current === numActive) {
      setIsSorting(false);
    }
  };

  return (
    <div className="app-container">
      <Header />
      <ControlPanel
        onGenerateArray={generateArray}
        onSort={handleSort}
        isSorting={isSorting}
        arraySize={arraySize}
        onSizeChange={setArraySize}
        animationSpeed={animationSpeed}
        onSpeedChange={setAnimationSpeed}
        activeAlgorithms={activeAlgorithms}
        onAlgorithmToggle={handleAlgorithmToggle}
      />
      <VisualizerGrid 
        masterArray={masterArray} 
        isSorting={isSorting}
        onSortComplete={handleSortCompletion} 
        animationSpeed={animationSpeed}
        activeAlgorithms={activeAlgorithms}
      />
    </div>
  );
}

export default App;