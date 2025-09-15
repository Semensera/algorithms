// Практична робота №1

// функція для виводу масиву у форматі [елемент_i_значення_x]
function printArray(arr) {
    arr.forEach((val, i) => {
        console.log(`[елемент_${i + 1}_значення_${val}]`);
    });
}

// 1. порахувати кількість та суму парних елементів
function evenCountAndSum(arr, min, max) {
    let filtered = arr.filter(v => v % 2 === 0 && v >= min && v <= max);
    return {
        count: filtered.length,
        sum: filtered.reduce((a, b) => a + b, 0)
    };
}

// 2. середнє арифметичне та кількість більших за нього
function avgAndGreater(arr) {
    let avg = arr.reduce((a, b) => a + b, 0) / arr.length;
    let count = arr.filter(v => v > avg).length;
    return { avg, count };
}

// 3. попарна сума елементів двох масивів однакової довжини
function pairwiseSum(arr1, arr2) {
    return arr1.map((v, i) => v + arr2[i]);
}

// 4. конкатенація масивів
function concatArrays(arr1, arr2) {
    return arr1.concat(arr2);
}

// 5. поміняти місцями максимум та мінімум
function swapMinMax(arr) {
    let maxIndex = arr.indexOf(Math.max(...arr));
    let minIndex = arr.indexOf(Math.min(...arr));
    [arr[maxIndex], arr[minIndex]] = [arr[minIndex], arr[maxIndex]];
    return arr;
}

// 6. поділ на додатні та від’ємні масиви
function splitPositiveNegative(arr) {
    return {
        positive: arr.filter(v => v > 0),
        negative: arr.filter(v => v < 0)
    };
}

// 7. видалити дублікати максимума та мінімума
function removeDuplicatesMinMax(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let seenMax = false, seenMin = false;
    return arr.filter(v => {
        if (v === max) {
            if (seenMax) return false;
            seenMax = true;
        }
        if (v === min) {
            if (seenMin) return false;
            seenMin = true;
        }
        return true;
    });
}

// 8. середні арифметичні двох масивів і масив елементів між ними
function thirdArrayBetweenAverages(arr1, arr2) {
    let avg1 = arr1.reduce((a, b) => a + b, 0) / arr1.length;
    let avg2 = arr2.reduce((a, b) => a + b, 0) / arr2.length;
    let minAvg = Math.min(avg1, avg2);
    let maxAvg = Math.max(avg1, avg2);

    let combined = arr1.concat(arr2);
    let result = combined.filter(v => v >= minAvg && v <= maxAvg);

    return { avg1, avg2, result };
}


// тест з фіксованими масивами


let array1 = [5, -2, 10, 7, -8, 3];
let array2 = [4, 6, -1, 9, -3, 12];

console.log("Масив 1:");
printArray(array1);
console.log("Масив 2:");
printArray(array2);

console.log("\n1. Кількість і сума парних у діапазоні [-10, 20]:", evenCountAndSum(array1, -10, 20));
console.log("2. Середнє і кількість більших:", avgAndGreater(array1));
console.log("3. Попарна сума:", pairwiseSum(array1, array2));
console.log("4. Конкатенація:", concatArrays(array1, array2));
console.log("5. Масив із переставленим max/min:", swapMinMax([...array1]));
console.log("6. Поділ на додатні/від’ємні:", splitPositiveNegative(array1));
console.log("7. Без дублікатів max/min:", removeDuplicatesMinMax(array1));
console.log("8. Середні арифметичні і третій масив:", thirdArrayBetweenAverages(array1, array2));
