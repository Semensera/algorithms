/**
 * Допоміжна функція для обміну двох елементів у масиві.
 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * Функція розділення (Partition).
 * Обирає останній елемент як опору (pivot) [cite: 37] та розміщує його
 * на правильній позиції у відсортованому масиві.
 * Всі елементи, менші (або більші, залежно від сортування) за опору,
 * розміщуються зліва, а більші (або менші) - справа.
 * 
 */
function partition(arr, low, high, ascending) {
  const pivot = arr[high]; // Опорний елемент [cite: 37]
  let i = (low - 1); // Індекс меншого/більшого елемента

  for (let j = low; j < high; j++) {
    // Умова для сортування за зростанням
    if (ascending) {
      if (arr[j] <= pivot) {
        i++;
        swap(arr, i, j);
      }
    } 
    // Умова для сортування за спаданням
    else { 
      if (arr[j] >= pivot) {
        i++;
        swap(arr, i, j);
      }
    }
  }

  // Розміщуємо опорний елемент на його кінцевій позиції
  swap(arr, i + 1, high);
  return (i + 1); // Повертаємо індекс опори
}

/**
 * Рекурсивна функція реалізації Quick Sort.
 * 
 */
function quickSortRecursive(arr, low, high, ascending) {
  // Базовий випадок: поки в підмасиві більше одного елемента 
  if (low < high) {
    // pi - індекс опорного елемента після розділення
    const pi = partition(arr, low, high, ascending);

    // Рекурсивний виклик для підмасивів
    quickSortRecursive(arr, low, pi - 1, ascending); // Елементи зліва 
    quickSortRecursive(arr, pi + 1, high, ascending); // Елементи справа 
  }
}

/**
 * Головний метод, що сортує масив за допомогою Quick Sort.
 * @param {number[]} arr - Масив цілих чисел[cite: 2].
 * @param {boolean} ascending - true для сортування за зростанням, 
 * false - за спаданням.
 */
function sortArrayQuickSort(arr, ascending = true) {
  quickSortRecursive(arr, 0, arr.length - 1, ascending);
  return arr;
}

// --- Приклад виконання ---
const numbers = [9, -3, 5, 2, 6, 8, -6, 1, 3]; // Масив з Рис. 1 [cite: 6, 7, 8, 9, 10, 11]
console.log("Оригінальний масив:", numbers);

// Копіюємо масив, щоб не змінювати оригінал
const sortedAsc = sortArrayQuickSort([...numbers], true); // Сортування за зростанням [cite: 2]
console.log("Відсортовано (за зростанням):", sortedAsc);

const sortedDesc = sortArrayQuickSort([...numbers], false); // Сортування за спаданням [cite: 2]
console.log("Відсортовано (за спаданням):", sortedDesc);
