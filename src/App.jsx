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
  const [viewMode, setViewMode] = useState('bar');
  const [masterArray, setMasterArray] = useState([]);
  const [arrayInput, setArrayInput] = useState(''); 
  const [isSorting, setIsSorting] = useState(false);
  const [arraySize, setArraySize] = useState(20);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [activeAlgorithms, setActiveAlgorithms] = useState(initialActiveAlgos);
  const completionCounter = useRef(0);

  useEffect(() => {
    setArrayInput(masterArray.join(', '));
  }, [masterArray]);

  // This function ONLY generates a new random array.
  const generateRandomArray = () => {
    setIsSorting(false);
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * (200 - 5 + 1)) + 5);
    }
    setMasterArray(newArray);
  };

  // This function ONLY parses the text input.
  const generateArrayFromInput = () => {
    setIsSorting(false);
    const parsedInput = arrayInput
      .split(',')
      .map(s => Number(s.trim()))
      .filter(n => !isNaN(n) && n > 0);

    if (parsedInput.length > 0) {
      setMasterArray(parsedInput);
    } else {
      generateRandomArray();
    }
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);
  
  const handleAlgorithmToggle = (algoName) => {
    setActiveAlgorithms(prev => ({
      ...prev,
      [algoName]: !prev[algoName]
    }));
  };

  useEffect(() => {
    generateRandomArray();
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
        onGenerateRandom={generateRandomArray} // Pass the random generator
        onGenerateFromInput={generateArrayFromInput} // Pass the input parser
        onSort={handleSort}
        isSorting={isSorting}
        arraySize={arraySize}
        onSizeChange={setArraySize}
        animationSpeed={animationSpeed}
        onSpeedChange={setAnimationSpeed}
        activeAlgorithms={activeAlgorithms}
        onAlgorithmToggle={handleAlgorithmToggle}
        arrayInput={arrayInput}
        onArrayInputChange={setArrayInput}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <VisualizerGrid 
        masterArray={masterArray} 
        isSorting={isSorting}
        onSortComplete={handleSortCompletion} 
        animationSpeed={animationSpeed}
        activeAlgorithms={activeAlgorithms}
        viewMode={viewMode}
      />
    </div>
  );
}

export default App;