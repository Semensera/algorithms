// stack.js
class Stack {
  constructor() {
    this.items = [];
  }

  // Додає елемент
  push(element) {
    this.items.push(element);
  }

  // Видаляє і повертає верхній елемент
  pop() {
    if (this.isEmpty()) {
      console.log("Стек порожній");
      return null;
    }
    return this.items.pop();
  }

  // Повертає верхній елемент без видалення
  peek() {
    if (this.isEmpty()) {
      console.log("Стек порожній");
      return null;
    }
    return this.items[this.items.length - 1];
  }

  // Очищає стек
  clear() {
    this.items = [];
  }

  // Повертає кількість елементів
  count() {
    return this.items.length;
  }

  // Те саме, що count()
  size() {
    return this.count();
  }

  // Виводить стек у рядок
  toString() {
    if (this.isEmpty()) return "Стек порожній";
    return "Елементи стеку: " + this.items.slice().reverse().join(" ");
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Демонстрація
const stack = new Stack();
stack.push(11);
stack.push(22);
stack.push(33);
console.log(stack.toString());
console.log("Верхній елемент:", stack.peek());
console.log("Видалено:", stack.pop());
console.log(stack.toString());
console.log("Кількість:", stack.size());
stack.clear();
console.log(stack.toString());
