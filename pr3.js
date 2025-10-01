// Генерація матриці
function generateMatrix(rows, cols, min, max) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        matrix.push(row);
    }
    return matrix;
}

// Красивий вивід
function printMatrix(matrix) {
    console.log("       " + matrix[0].map((_, j) => `стовпець ${j + 1}`).join("   "));
    for (let i = 0; i < matrix.length; i++) {
        console.log(`рядок ${i + 1}  ` + matrix[i].join("    "));
    }
    console.log();
}

// 1. Циклічний зсув вправо та догори
function shiftMatrix(matrix, kRight, kUp) {
    let rows = matrix.length;
    let cols = matrix[0].length;
    let shifted = Array.from({ length: rows }, () => Array(cols).fill(0));

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let newI = (i - kUp + rows) % rows;
            let newJ = (j + kRight) % cols;
            shifted[newI][newJ] = matrix[i][j];
        }
    }
    return shifted;
}

// 2. Сума елементів після 3-го в рядку
function sumAfterThird(matrix) {
    return matrix.map(row => row.slice(3).reduce((a, b) => a + b, 0));
}

// 3. Відняти середнє арифметичне рядка
function subtractRowAverage(matrix) {
    return matrix.map(row => {
        let avg = row.reduce((a, b) => a + b, 0) / row.length;
        return row.map(x => x - avg);
    });
}

// 4. Видалити рядки/стовпці з максимумом
function deleteMaxRowsCols(matrix) {
    let max = Math.max(...matrix.flat());
    let rowsToDelete = new Set();
    let colsToDelete = new Set();

    matrix.forEach((row, i) =>
        row.forEach((val, j) => {
            if (val === max) {
                rowsToDelete.add(i);
                colsToDelete.add(j);
            }
        })
    );

    return matrix
        .filter((_, i) => !rowsToDelete.has(i))
        .map(row => row.filter((_, j) => !colsToDelete.has(j)));
}

// 5. Поміняти стовпці з max і min
function swapMaxMinCols(matrix) {
    let flat = matrix.flat();
    let maxVal = Math.max(...flat);
    let minVal = Math.min(...flat);
    let colMax, colMin;

    matrix.forEach(row => {
        row.forEach((val, j) => {
            if (val === maxVal) colMax = j;
            if (val === minVal) colMin = j;
        });
    });

    let swapped = matrix.map(row => [...row]);
    swapped.forEach(row => {
        [row[colMax], row[colMin]] = [row[colMin], row[colMax]];
    });
    return swapped;
}

// 6. Видалити рядок і стовпець з максимумом
function deleteRowColWithMax(matrix) {
    let max = Math.max(...matrix.flat());
    let rowMax, colMax;

    matrix.forEach((row, i) =>
        row.forEach((val, j) => {
            if (val === max) {
                rowMax = i;
                colMax = j;
            }
        })
    );

    return matrix
        .filter((_, i) => i !== rowMax)
        .map(row => row.filter((_, j) => j !== colMax));
}

// 7. Видалити рядки та стовпці для багатьох максимумів
function deleteAllMax(matrix) {
    let max = Math.max(...matrix.flat());
    return deleteMaxRowsCols(matrix, max);
}

// 8. Поміняти місцями рядок/стовпець з максимумом та мінімумом
function swapRowCol(matrix) {
    let max = Math.max(...matrix.flat());
    let min = Math.min(...matrix.flat());
    let rowMax, colMax, rowMin, colMin;

    matrix.forEach((row, i) =>
        row.forEach((val, j) => {
            if (val === max) {
                rowMax = i;
                colMax = j;
            }
            if (val === min) {
                rowMin = i;
                colMin = j;
            }
        })
    );

    let swapped = matrix.map(row => [...row]);

    // міняємо рядки
    [swapped[rowMax], swapped[rowMin]] = [swapped[rowMin], swapped[rowMax]];
    // міняємо стовпці
    swapped.forEach(row => {
        [row[colMax], row[colMin]] = [row[colMin], row[colMax]];
    });

    return swapped;
}

// Тест
let M = generateMatrix(4, 5, -5, 9);
console.log("Початкова матриця:");
printMatrix(M);

console.log("Зсув на 1 вправо і 1 догори:");
printMatrix(shiftMatrix(M, 1, 1));

console.log("Сума після 3-го елемента в кожному рядку:");
console.log(sumAfterThird(M));

console.log("Відняти середнє кожного рядка:");
printMatrix(subtractRowAverage(M));

console.log("Видалення рядків/стовпців з максимумом:");
printMatrix(deleteMaxRowsCols(M));

console.log("Поміняти місцями стовпці з max і min:");
printMatrix(swapMaxMinCols(M));

console.log("Видалити рядок і стовпець з максимумом:");
printMatrix(deleteRowColWithMax(M));

console.log("Видалити всі рядки/стовпці з максимумами:");
printMatrix(deleteAllMax(M));

console.log("Поміняти місцями рядок/стовпець з max і min:");
printMatrix(swapRowCol(M));
