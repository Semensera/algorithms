

const SIZES = [10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
const RUNS = 3;
const K = 6;

// Генератор випадкових цілих у [-10000; 10000]
function randomInt(min, max) {
  return (min + Math.floor(Math.random() * (max - min + 1)));
}
function makeRandomArray(n) {
  const a = new Array(n);
  for (let i = 0; i < n; i++) a[i] = randomInt(-10000, 10000);
  return a;
}

// Метод 1: повне сортування
function sixthBySort(arr) {
  const b = arr.slice();
  b.sort((x, y) => x - y);
  return b[b.length - K];
}

// Метод 2: підтримка відсортованого топ-6 (спадно)
function sixthByTopK(arr) {
  const top = [];
  for (let v of arr) {
    if (top.length < K || v > top[top.length - 1]) {
      // вставка у відсортований масив (спадно)
      let i = top.length - 1;
      while (i >= 0 && top[i] < v) i--;
      top.splice(i + 1, 0, v);
      if (top.length > K) top.pop();
    }
  }
  return top.length === K ? top[K - 1] : Number.NEGATIVE_INFINITY;
}

// Метод 3: 6 разів знаходимо максимум і "витираємо"
function sixthByRepeatedMax(arr) {
  const b = arr.slice();
  let sixth = Number.NEGATIVE_INFINITY;
  for (let t = 0; t < K; t++) {
    let maxVal = Number.NEGATIVE_INFINITY;
    let maxIdx = -1;
    for (let i = 0; i < b.length; i++) {
      if (b[i] > maxVal) { maxVal = b[i]; maxIdx = i; }
    }
    sixth = maxVal;
    if (maxIdx >= 0) b[maxIdx] = Number.NEGATIVE_INFINITY;
  }
  return sixth;
}

function nowNs() {
  return process.hrtime.bigint();
}
function msBetween(startNs, endNs) {
  return Number(endNs - startNs) / 1e6;
}

function timeOnce(fn, arr) {
  const t0 = nowNs();
  const val = fn(arr);
  const t1 = nowNs();
  return { ms: msBetween(t0, t1), val };
}

(async function main() {
  const rows = [];
  for (const n of SIZES) {
    try {
      // Перевірка "сухим" виділенням пам'яті
      let probe = new Array(Math.min(n, 10_000));
      // Генерація однієї бази даних для чесного порівняння
      const base = makeRandomArray(n);

      const times = {
        sort: [], topk: [], repmax: []
      };
      let lastVals = { sort: null, topk: null, repmax: null };

      for (let r = 0; r < RUNS; r++) {
        // Щоб дані були однаковими між методами в рамках одного RUN:
        const a1 = base.slice();
        const a2 = base.slice();
        const a3 = base.slice();

        let t;

        t = timeOnce(sixthBySort, a1);
        times.sort.push(t.ms); lastVals.sort = t.val;

        t = timeOnce(sixthByTopK, a2);
        times.topk.push(t.ms); lastVals.topk = t.val;

        t = timeOnce(sixthByRepeatedMax, a3);
        times.repmax.push(t.ms); lastVals.repmax = t.val;
      }

      const avg = arr => arr.reduce((s, x) => s + x, 0) / arr.length;

      rows.push({
        size: n.toLocaleString('en-US'),
        'Спосіб 1 (сортування)': `${avg(times.sort).toFixed(2)} ms  [${times.sort.map(x=>x.toFixed(0)).join(', ')}]  ⇒ ${lastVals.sort}`,
        'Спосіб 2 (масив топ-6)': `${avg(times.topk).toFixed(2)} ms  [${times.topk.map(x=>x.toFixed(0)).join(', ')}]  ⇒ ${lastVals.topk}`,
        'Спосіб 3 (6 максимумів)': `${avg(times.repmax).toFixed(2)} ms  [${times.repmax.map(x=>x.toFixed(0)).join(', ')}]  ⇒ ${lastVals.repmax}`,
      });
    } catch (e) {
      rows.push({
        size: n.toLocaleString('en-US'),
        'Спосіб 1 (сортування)': '—',
        'Спосіб 2 (масив топ-6)': '—',
        'Спосіб 3 (6 максимумів)': '—',
        note: 'Пропущено через обмеження пам’яті/ресурсів'
      });
    }
  }

  console.table(rows);
})();
// node --max-old-space-size=8192 pr9.js - так запускати

