// queue.js
class Queue {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Потрібна додатна місткість");
    }
    this._data = new Array(capacity);
    this._head = 0;   // індекс першого елемента
    this._tail = -1;  // індекс останнього елемента
    this._size = 0;   // кількість елементів
  }

  // Додає елемент у кінець черги
  enqueue(x) {
    if (this._size === this._data.length) {
      console.log("Черга переповнена!");
      return;
    }
    this._tail = (this._tail + 1) % this._data.length;
    this._data[this._tail] = x;
    this._size++;
  }

  // Видаляє і повертає елемент з початку черги
  dequeue() {
    if (this.isEmpty()) {
      console.log("Черга порожня!");
      return null;
    }
    const x = this._data[this._head];
    this._head = (this._head + 1) % this._data.length;
    this._size--;
    return x;
  }

  // Повертає перший елемент без видалення
  peek() {
    if (this.isEmpty()) {
      console.log("Черга порожня!");
      return null;
    }
    return this._data[this._head];
  }

  // Очищає чергу
  clear() {
    this._head = 0;
    this._tail = -1;
    this._size = 0;
  }

  // Кількість елементів
  count() { return this._size; }
  size()  { return this._size; }

  isEmpty() { return this._size === 0; }

  toString() {
    if (this.isEmpty()) return "Черга порожня";
    let out = "Елементи черги: ";
    for (let i = 0; i < this._size; i++) {
      out += this._data[(this._head + i) % this._data.length] + " ";
    }
    return out.trimEnd();
  }
}

// Демонстрація
const q = new Queue(5);
q.enqueue(11);
q.enqueue(22);
q.enqueue(33);
console.log(q.toString());
console.log("Перший:", q.peek());
console.log("Видалено:", q.dequeue());
console.log(q.toString());
console.log("К-сть:", q.size());
q.clear();
console.log(q.toString());
