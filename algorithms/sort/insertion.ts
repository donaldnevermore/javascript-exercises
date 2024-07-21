import { exch } from "./exch.js";

/**
 * 插入排序
 * 稳定
 *
 * 平均情况：T(n) = O(n^2)
 * 最佳情况：输入数组按升序排列，T(n) = O(n)
 * 最坏情况：输入数组按降序排列，T(n) = O(n^2)
 */
function insertionSort(arr: number[]) {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
            exch(arr, j, j - 1);
        }
    }
}

function insertionSort2(arr: number[]) {
    const n = arr.length;
    let min = 0;
    for (let k = 1; k < n; k++) {
        if (arr[k] < arr[min]) {
            min = k;
        }
    }
    exch(arr, 0, min);

    for (let i = 1; i < n; i++) {
        for (let j = i; arr[j] < arr[j - 1]; j--) {
            exch(arr, j, j - 1);
        }
    }
}

function insertionSort3(arr: number[]) {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        const temp = arr[i];
        let j = i;
        while (j > 0 && temp < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
}

function insertionSort4(arr: number[]) {
    const n = arr.length;
    let min = 0;
    for (let k = 1; k < n; k++) {
        if (arr[k] < arr[min]) {
            min = k;
        }
    }
    exch(arr, 0, min);

    for (let i = 1; i < n; i++) {
        const temp = arr[i];
        let j = i;
        while (temp < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
}

const a = [3, 5, 2, 1, 8, 9, 7];
insertionSort4(a);
console.log(a);
