// doublyLinkedList.js
// Реалізація двобічно зв'язного списку

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  size() { return this._size; }

  addFirst(value) {
    const n = new Node(value);
    n.next = this.head;
    if (this.head) this.head.prev = n; else this.tail = n;
    this.head = n;
    this._size++;
  }

  addLast(value) {
    const n = new Node(value);
    n.prev = this.tail;
    if (this.tail) this.tail.next = n; else this.head = n;
    this.tail = n;
    this._size++;
  }

  removeFirst() {
    this._ensureNotEmpty();
    const n = this.head;
    this.head = n.next;
    if (this.head) this.head.prev = null; else this.tail = null;
    this._size--;
    return n.value;
  }

  removeLast() {
    this._ensureNotEmpty();
    const n = this.tail;
    this.tail = n.prev;
    if (this.tail) this.tail.next = null; else this.head = null;
    this._size--;
    return n.value;
  }

  contains(value) {
    for (let c = this.head; c; c = c.next) {
      if (Object.is(c.value, value)) return true;
    }
    return false;
  }

  get(index) { return this._nodeAt(index).value; }

  insert(index, value) {
    if (index < 0 || index > this._size) throw new RangeError("index");
    if (index === 0) return void this.addFirst(value);
    if (index === this._size) return void this.addLast(value);
    const next = this._nodeAt(index);
    const prev = next.prev;
    const n = new Node(value);
    n.prev = prev; n.next = next;
    prev.next = n; next.prev = n;
    this._size++;
  }

  removeAt(index) {
    const n = this._nodeAt(index);
    this._unlink(n);
    return n.value;
  }

  max() {
    this._ensureNotEmpty();
    let best = this.head.value;
    for (let c = this.head.next; c; c = c.next) if (c.value > best) best = c.value;
    return best;
  }

  min() {
    this._ensureNotEmpty();
    let best = this.head.value;
    for (let c = this.head.next; c; c = c.next) if (c.value < best) best = c.value;
    return best;
  }

  addAll(index, arr) {
    if (!Array.isArray(arr)) throw new TypeError("arr must be array");
    if (index < 0 || index > this._size) throw new RangeError("index");
    let i = index;
    for (const v of arr) this.insert(i++, v);
  }

  toString() {
    let sb = "{";
    let i = 0;
    for (let c = this.head; c; c = c.next, i++) {
      if (i > 0) sb += " ";
      sb += `[index:${i}; value:${c.value}]`;
    }
    sb += "}";
    return sb;
  }


  _ensureNotEmpty() {
    if (this._size === 0) throw new Error("List is empty");
  }

  _nodeAt(index) {
    if (index < 0 || index >= this._size) throw new RangeError("index");
    if (index <= (this._size >> 1)) {
      let c = this.head;
      for (let i = 0; i < index; i++) c = c.next;
      return c;
    } else {
      let c = this.tail;
      for (let i = this._size - 1; i > index; i--) c = c.prev;
      return c;
    }
  }

  _unlink(n) {
    const p = n.prev, nx = n.next;
    if (p) p.next = nx; else this.head = nx;
    if (nx) nx.prev = p; else this.tail = p;
    this._size--;
  }
}

module.exports = { DoublyLinkedList };

if (typeof require !== "undefined" && require.main === module) {
  const list = new DoublyLinkedList();
  list.addLast(10);
  list.addFirst(5);
  list.addLast(20);
  list.insert(1, 7);              // [5, 7, 10, 20]
  list.addAll(2, [8, 9]);         // [5, 7, 8, 9, 10, 20]
  console.log("List:", list.toString());
  console.log("size =", list.size());
  console.log("get(3) =", list.get(3));
  console.log("contains(9) =", list.contains(9));
  console.log("min =", list.min(), "max =", list.max());
  console.log("removeAt(1) ->", list.removeAt(1)); // 7
  console.log("removeFirst() ->", list.removeFirst()); // 5
  console.log("removeLast() ->", list.removeLast()); // 20
  console.log("After removals:", list.toString());
}
