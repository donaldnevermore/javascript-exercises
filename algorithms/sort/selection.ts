import { exch } from "./exch.js";

/**
 * 选择排序
 * 不稳定
 *
 * 平均情况：T(n) = O(n^2)
 * 最佳情况：T(n) = O(n^2)
 * 最差情况：T(n) = O(n^2)
 */
function selectionSort(arr: number[]) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[min]) {
        // Find out the smallest one.
        min = j;
      }
    }

    exch(arr, i, min);
  }
}
