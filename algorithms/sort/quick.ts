import { exch, shuffle } from "./exch.js";

/**
 * 快速排序
 * 不稳定
 *
 * 平均情况：T(n) = O(nlogn)
 * 最佳情况：T(n) = O(nlogn)
 * 最差情况：T(n) = O(n^2)
 */
function quick(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quick(left).concat([pivot], quick(right));
}

function quickSort(arr: number[]) {
    shuffle(arr);
    sort(arr, 0, arr.length - 1);
}

function sort(arr: number[], low: number, high: number) {
    if (high <= low) {
        return;
    }

    const j = partition(arr, low, high);
    sort(arr, low, j - 1);
    sort(arr, j + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    let i = low;
    let j = high + 1;
    const v = arr[low];

    while (true) {
        while (arr[++i] < v) {
            if (i === high) {
                break;
            }
        }
        while (v < arr[--j]) {
            if (j === low) {
                break;
            }
        }
        if (i >= j) {
            break;
        }
        exch(arr, i, j);
    }

    exch(arr, low, j);
    return j;
}

const a = [3, 5, 2, 1, 8, 9, 7];
quickSort(a);
console.log(a);
