export const bubbleSortAnimator = async (array, setArray, setActiveIndices, setStats, speed) => {
  let arrayCopy = [...array];
  let n = arrayCopy.length;
  let stats = { swaps: 0, comparisons: 0 };

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      stats.comparisons++;
      setStats({ ...stats });
      setActiveIndices([j, j + 1]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (arrayCopy[j] > arrayCopy[j + 1]) {
        swapped = true;
        stats.swaps++;
        setStats({ ...stats });
        [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];
        setArray([...arrayCopy]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }
    }
    if (swapped === false) break;
  }
};

export const selectionSortAnimator = async (array, setArray, setActiveIndices, setSortedIndices, setStats, speed) => {
  let arrayCopy = [...array];
  let n = arrayCopy.length;
  let stats = { swaps: 0, comparisons: 0 };
  let sorted = [];

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      stats.comparisons++;
      setStats({ ...stats });
      setActiveIndices([i, j]);
      await new Promise((r) => setTimeout(r, speed));
      if (arrayCopy[j] < arrayCopy[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      stats.swaps++;
      setStats({ ...stats });
      [arrayCopy[i], arrayCopy[minIdx]] = [arrayCopy[minIdx], arrayCopy[i]];
      setArray([...arrayCopy]);
      await new Promise((r) => setTimeout(r, speed));
    }
    sorted.push(i);
    setSortedIndices([...sorted]);
  }
  setSortedIndices([...sorted, n - 1]);
};

export const insertionSortAnimator = async (array, setArray, setActiveIndices, setSortedIndices, setStats, speed) => {
  let arrayCopy = [...array];
  let n = arrayCopy.length;
  let stats = { swaps: 0, comparisons: 0 };

  for (let i = 1; i < n; i++) {
    let key = arrayCopy[i];
    let j = i - 1;
    setActiveIndices([i]);
    await new Promise(r => setTimeout(r, speed));

    while (j >= 0) {
      stats.comparisons++;
      setStats({ ...stats });
      setActiveIndices([i, j]);
      await new Promise(r => setTimeout(r, speed));
      if (arrayCopy[j] > key) {
        stats.swaps++;
        setStats({ ...stats });
        arrayCopy[j + 1] = arrayCopy[j];
        setArray([...arrayCopy]);
        await new Promise(r => setTimeout(r, speed));
        j = j - 1;
      } else {
        break;
      }
    }
    arrayCopy[j + 1] = key;
    setArray([...arrayCopy]);
  }
  setSortedIndices(Array.from(Array(n).keys()));
};

export const mergeSortAnimator = async (array, setArray, setActiveIndices, setSortedIndices, setStats, speed) => {
    let stats = { swaps: 0, comparisons: 0 };
    let arrayCopy = [...array];

    async function merge(arr, l, m, r) {
        let n1 = m - l + 1, n2 = r - m;
        let L = new Array(n1), R = new Array(n2);
        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            stats.comparisons++;
            setStats({...stats});
            setActiveIndices([l + i, m + 1 + j]);
            await new Promise(res => setTimeout(res, speed));
            if (L[i] <= R[j]) {
                arr[k] = L[i]; i++;
            } else {
                arr[k] = R[j]; j++;
            }
            stats.swaps++; // Overwrite counts as a "swap" visually
            setStats({...stats});
            setArray([...arr]);
            await new Promise(res => setTimeout(res, speed));
            k++;
        }
        while (i < n1) { arr[k] = L[i]; stats.swaps++; setStats({...stats}); setArray([...arr]); await new Promise(res => setTimeout(res, speed)); i++; k++; }
        while (j < n2) { arr[k] = R[j]; stats.swaps++; setStats({...stats}); setArray([...arr]); await new Promise(res => setTimeout(res, speed)); j++; k++; }
    }

    async function mergeSortRecursive(arr, l, r) {
        if (l >= r) return;
        let m = l + parseInt((r - l) / 2);
        await mergeSortRecursive(arr, l, m);
        await mergeSortRecursive(arr, m + 1, r);
        await merge(arr, l, m, r);
    }
    
    await mergeSortRecursive(arrayCopy, 0, arrayCopy.length - 1);
    setSortedIndices(Array.from(Array(arrayCopy.length).keys()));
};

export const quickSortAnimator = async (array, setArray, setActiveIndices, setSortedIndices, setStats, speed) => {
    let stats = { swaps: 0, comparisons: 0 };
    let arrayCopy = [...array];

    async function partition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        setActiveIndices([high]);
        await new Promise(res => setTimeout(res, speed));

        for (let j = low; j < high; j++) {
            stats.comparisons++;
            setStats({...stats});
            setActiveIndices([high, j]);
            await new Promise(res => setTimeout(res, speed));
            if (arr[j] < pivot) {
                i++;
                stats.swaps++;
                setStats({...stats});
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await new Promise(res => setTimeout(res, speed));
            }
        }
        stats.swaps++;
        setStats({...stats});
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);
        setSortedIndices(prev => [...prev, i + 1]);
        await new Promise(res => setTimeout(res, speed));
        return i + 1;
    }

    async function quickSortRecursive(arr, low, high) {
        if (low < high) {
            let pi = await partition(arr, low, high);
            await quickSortRecursive(arr, low, pi - 1);
            await quickSortRecursive(arr, pi + 1, high);
        } else if (low >= 0 && high >= 0 && low === high) {
            setSortedIndices(prev => [...prev, low]);
        }
    }

    await quickSortRecursive(arrayCopy, 0, arrayCopy.length - 1);
};

export const heapSortAnimator = async (array, setArray, setActiveIndices, setSortedIndices, setStats, speed) => {
    let stats = { swaps: 0, comparisons: 0 };
    let arrayCopy = [...array];
    let n = arrayCopy.length;

    async function heapify(arr, N, i) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        if (l < N) {
            stats.comparisons++;
            setStats({...stats});
            setActiveIndices([l, largest]);
            await new Promise(res => setTimeout(res, speed));
            if (arr[l] > arr[largest]) largest = l;
        }
        if (r < N) {
            stats.comparisons++;
            setStats({...stats});
            setActiveIndices([r, largest]);
            await new Promise(res => setTimeout(res, speed));
            if (arr[r] > arr[largest]) largest = r;
        }
        if (largest !== i) {
            stats.swaps++;
            setStats({...stats});
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            await new Promise(res => setTimeout(res, speed));
            await heapify(arr, N, largest);
        }
    }

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) await heapify(arrayCopy, n, i);

    for (let i = n - 1; i > 0; i--) {
        stats.swaps++;
        setStats({...stats});
        [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
        setArray([...arrayCopy]);
        setSortedIndices(prev => [i, ...prev]);
        await new Promise(res => setTimeout(res, speed));
        await heapify(arrayCopy, i, 0);
    }
    setSortedIndices(prev => [0, ...prev]);
};