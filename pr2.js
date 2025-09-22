// Метод генерації масиву заданої довжини в діапазоні [min, max]
function generateArray(length, min, max) {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return arr;
}

// Метод для виводу масиву у потрібному форматі
function printArray(arr) {
    let result = arr.map((val, idx) => `[cell - ${idx}, value - ${val}]`).join(",");
    console.log("{" + result + "}");
}

// Bubble Sort
function bubbleSort(arr, ascending = true) {
    let n = arr.length;
    let sorted = [...arr];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if ((ascending && sorted[j] > sorted[j + 1]) ||
                (!ascending && sorted[j] < sorted[j + 1])) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    return sorted;
}

// Insertion Sort
function insertionSort(arr, ascending = true) {
    let sorted = [...arr];
    for (let i = 1; i < sorted.length; i++) {
        let key = sorted[i];
        let j = i - 1;
        while (j >= 0 && ((ascending && sorted[j] > key) || (!ascending && sorted[j] < key))) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        sorted[j + 1] = key;
    }
    return sorted;
}

// Selection Sort
function selectionSort(arr, ascending = true) {
    let sorted = [...arr];
    for (let i = 0; i < sorted.length - 1; i++) {
        let target = i;
        for (let j = i + 1; j < sorted.length; j++) {
            if ((ascending && sorted[j] < sorted[target]) ||
                (!ascending && sorted[j] > sorted[target])) {
                target = j;
            }
        }
        [sorted[i], sorted[target]] = [sorted[target], sorted[i]];
    }
    return sorted;
}

// Тестування
let arr = generateArray(10, 1, 20);
console.log("Початковий масив:");
printArray(arr);

console.log("\nBubble Sort (зростання):");
printArray(bubbleSort(arr, true));

console.log("\nBubble Sort (спадання):");
printArray(bubbleSort(arr, false));

console.log("\nInsertion Sort (зростання):");
printArray(insertionSort(arr, true));

console.log("\nInsertion Sort (спадання):");
printArray(insertionSort(arr, false));

console.log("\nSelection Sort (зростання):");
printArray(selectionSort(arr, true));

console.log("\nSelection Sort (спадання):");
printArray(selectionSort(arr, false));
