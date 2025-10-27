class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this._size = 0;
  }

  // Додати елемент (<= праворуч)
  add(v) { this.root = this._insert(this.root, v); }
  _insert(n, v) {
    if (!n) { this._size++; return new Node(v); }
    if (v < n.val) n.left = this._insert(n.left, v);
    else           n.right = this._insert(n.right, v);
    return n;
  }

  // Перевірити наявність
  contains(v) {
    let n = this.root;
    while (n) {
      if (v === n.val) return true;
      n = (v < n.val) ? n.left : n.right;
    }
    return false;
  }

  // Видалити елемент
  remove(v) { this.root = this._delete(this.root, v); }
  _delete(n, v) {
    if (!n) return null;
    if (v < n.val) n.left = this._delete(n.left, v);
    else if (v > n.val) n.right = this._delete(n.right, v);
    else {
      // 0 або 1 дитина
      if (!n.left && !n.right) { this._size--; return null; }
      if (!n.left) { this._size--; return n.right; }
      if (!n.right) { this._size--; return n.left; }
      // 2 дитини: найлівіший у правому піддереві
      const succ = this._minNode(n.right);
      n.val = succ.val;
      n.right = this._delete(n.right, succ.val); // фактичне видалення + _size--
    }
    return n;
  }

  // Мінімум / Максимум
  min() {
    if (!this.root) throw new Error("Дерево порожнє");
    return this._minNode(this.root).val;
  }
  _minNode(n) { while (n.left) n = n.left; return n; }

  max() {
    if (!this.root) throw new Error("Дерево порожнє");
    return this._maxNode(this.root).val;
  }
  _maxNode(n) { while (n.right) n = n.right; return n; }

  // Порахувати, очистити
  count() { return this._size; }
  size()  { return this._size; }
  clear() { this.root = null; this._size = 0; }

  // Вивести всі елементи (in-order)
  toString() {
    const arr = [];
    this._inOrder(this.root, arr);
    return `In-order: [${arr.join(", ")}]`;
  }
  _inOrder(n, out) {
    if (!n) return;
    this._inOrder(n.left, out);
    out.push(n.val);
    this._inOrder(n.right, out);
  }
}

// Демонстрація
const bst = new BinarySearchTree();
[7,3,9,1,5,8,10,6,4,7].forEach(v => bst.add(v));
console.log(bst.toString());
console.log("Мін:", bst.min(), "Макс:", bst.max());
console.log("Є 5?", bst.contains(5));
bst.remove(3);
console.log("Після видалення 3:", bst.toString());
console.log("Кількість:", bst.size());
bst.clear();
console.log("Після clear():", bst.toString(), "size=", bst.size());
