import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import Visualizer from './components/Visualizer';

// Define colors for visualization
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const PIVOT_COLOR = 'yellow';

function App() {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [algorithm, setAlgorithm] = useState('bubbleSort');
  const [isSorting, setIsSorting] = useState(false);

  const generateRandomArray = () => {
    const bars = document.getElementsByClassName('array-bar');
    for (let bar of bars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.floor(Math.random() * (500 - 5 + 1)) + 5);
    }
    setArray(newArray);
  };

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const bubbleSort = () => {
    setIsSorting(true);
    const animations = getBubbleSortAnimations(array);
    const arrayBars = document.getElementsByClassName('array-bar');
    const speed = 101 - animationSpeed;

    for (let i = 0; i < animations.length; i++) {
      const animationStep = animations[i];
      if (animationStep[0] === -1) continue;

      const stepType = i % 4;

      if (stepType < 2) {
        const [barOneIdx, barTwoIdx] = animationStep;
        const color = stepType === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * speed);
      } else {
        const [barIdx, newHeight] = animationStep;
        setTimeout(() => {
          arrayBars[barIdx].style.height = `${newHeight}px`;
        }, i * speed);
      }
    }
    const totalDuration = animations.length * speed;
    setTimeout(() => setIsSorting(false), totalDuration);
  };

  const mergeSort = () => {
    setIsSorting(true);
    const arrayToSort = [...array];
    const animations = getMergeSortAnimations(arrayToSort);
    const arrayBars = document.getElementsByClassName('array-bar');
    const speed = 101 - animationSpeed;

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          arrayBars[barOneIdx].style.backgroundColor = color;
          arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * speed);
      } else {
        const [barOneIdx, newHeight] = animations[i];
        setTimeout(() => {
          arrayBars[barOneIdx].style.height = `${newHeight}px`;
        }, i * speed);
      }
    }
    const totalDuration = animations.length * speed;
    setTimeout(() => setIsSorting(false), totalDuration);
  };
  
  const quickSort = () => {
    setIsSorting(true);
    const arrayToSort = [...array];
    const animations = getQuickSortAnimations(arrayToSort);
    const arrayBars = document.getElementsByClassName('array-bar');
    const speed = 101 - animationSpeed;

    for (let i = 0; i < animations.length; i++) {
      const animation = animations[i];
      const type = animation[0];

      if (type === 'compare' || type === 'revert') {
        const [, barOneIdx, barTwoIdx] = animation;
        const color = type === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.backgroundColor = color;
          if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.backgroundColor = color;
        }, i * speed);
      } else if (type === 'pivot') {
        const [, barOneIdx] = animation;
        const color = PIVOT_COLOR;
        setTimeout(() => {
          if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.backgroundColor = color;
        }, i * speed);
      } else {
        const [, barOneIdx, barOneHeight, barTwoIdx, barTwoHeight] = animation;
        setTimeout(() => {
          if (arrayBars[barOneIdx]) arrayBars[barOneIdx].style.height = `${barOneHeight}px`;
          if (arrayBars[barTwoIdx]) arrayBars[barTwoIdx].style.height = `${barTwoHeight}px`;
        }, i * speed);
      }
    }
    const totalDuration = animations.length * speed;
    setTimeout(() => {
      for (const bar of arrayBars) {
        bar.style.backgroundColor = PRIMARY_COLOR;
      }
      setIsSorting(false);
    }, totalDuration);
  };

  const handleSort = () => {
    switch (algorithm) {
      case 'bubbleSort':
        bubbleSort();
        break;
      case 'mergeSort':
        mergeSort();
        break;
      case 'quickSort':
        quickSort();
        break;
      default:
        bubbleSort();
    }
  };

  return (
    <div className="app-container">
      <Header />
      <ControlPanel
        onGenerateArray={generateRandomArray}
        arraySize={arraySize}
        onSizeChange={setArraySize}
        animationSpeed={animationSpeed}
        onSpeedChange={setAnimationSpeed}
        algorithm={algorithm}
        onAlgorithmChange={setAlgorithm}
        onSort={handleSort}
        isSorting={isSorting}
      />
      <Visualizer array={array} />
    </div>
  );
}

// All animation helper functions below

function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  const auxiliaryArray = array.slice();
  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
    for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push([j, auxiliaryArray[j + 1]]);
        animations.push([j + 1, auxiliaryArray[j]]);
        let temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      } else {
        animations.push([-1, -1]);
        animations.push([-1, -1]);
      }
    }
  }
  return animations;
}

function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(mainArray, low, high, animations) {
  if (low < high) {
    const pi = partition(mainArray, low, high, animations);
    quickSortHelper(mainArray, low, pi - 1, animations);
    quickSortHelper(mainArray, pi + 1, high, animations);
  }
}

function partition(mainArray, low, high, animations) {
  const pivot = mainArray[high];
  animations.push(['pivot', high, high]);
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push(['compare', j, high]);
    animations.push(['revert', j, high]);
    if (mainArray[j] < pivot) {
      i++;
      animations.push(['swap', i, mainArray[j], j, mainArray[i]]);
      swap(mainArray, i, j);
    }
  }
  animations.push(['swap', i + 1, mainArray[high], high, mainArray[i + 1]]);
  swap(mainArray, i + 1, high);
  animations.push(['revert', i + 1, i + 1]);
  return i + 1;
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

export default App;