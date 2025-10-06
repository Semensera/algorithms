// 1. Від 1 до n
function print1ToN(n, current = 1) {
    if (current > n) return;
    process.stdout.write(current + " ");
    print1ToN(n, current + 1);
}

// 2. Від A до B
function printAtoB(a, b) {
    process.stdout.write(a + " ");
    if (a < b) printAtoB(a + 1, b);
    else if (a > b) printAtoB(a - 1, b);
}

// 3. Точна степінь двійки
function isPowerOfTwo(n) {
    if (n === 1) return true;
    if (n % 2 !== 0 || n === 0) return false;
    return isPowerOfTwo(n / 2);
}

// 4. Сума цифр числа
function sumDigits(n) {
    if (n === 0) return 0;
    return n % 10 + sumDigits(Math.floor(n / 10));
}

// 5. Цифри числа справа наліво
function printDigitsReverse(n) {
    if (n === 0) return;
    process.stdout.write((n % 10) + " ");
    printDigitsReverse(Math.floor(n / 10));
}

// 6. Цифри числа зліва направо
function printDigitsForward(n) {
    if (n === 0) return;
    let rest = Math.floor(n / 10);
    if (rest > 0) printDigitsForward(rest);
    process.stdout.write((n % 10) + " ");
}

// ----------------------
// Тести
console.log("1) Від 1 до n:");
print1ToN(5);
console.log("\n\n2) Від A до B:");
printAtoB(5, 1);
console.log("\n\n3) Точна степінь двійки:");
console.log(8, isPowerOfTwo(8) ? "YES" : "NO");
console.log(3, isPowerOfTwo(3) ? "YES" : "NO");
console.log("\n4) Сума цифр числа:");
console.log(179, "->", sumDigits(179));
console.log("\n5) Цифри справа наліво:");
printDigitsReverse(179);
console.log("\n6) Цифри зліва направо:");
printDigitsForward(179);
