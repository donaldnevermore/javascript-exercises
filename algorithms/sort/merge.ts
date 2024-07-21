function m() {
    let aux: number[];

    const merge = (arr: number[], low: number, mid: number, high: number) => {
        let i = low;
        let j = mid + 1;

        for (let k = low; k <= high; k++) {
            aux[k] = arr[k];
        }

        for (let k = low; k <= high; k++) {
            if (i > mid) {
                arr[k] = aux[j++];
            } else if (j > high) {
                arr[k] = aux[i++];
            } else if (aux[j] < aux[i]) {
                arr[k] = aux[j++];
            } else {
                arr[k] = aux[i++];
            }
        }
    };

    const topDown = (arr: number[]) => {
        aux = new Array(arr.length);

        sort(arr, 0, arr.length - 1);
    };

    const sort = (arr: number[], low: number, high: number) => {
        if (high <= low) {
            return;
        }

        const mid = low + Math.floor((high - low) / 2);
        sort(arr, low, mid);
        sort(arr, mid + 1, high);
        merge(arr, low, mid, high);
    };
}

function merge(left: number[], right: number[]): number[] {
    const arr: number[] = [];

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            arr.push(left.shift() as number);
        } else {
            arr.push(right.shift() as number);
        }
    }

    return arr.concat(left, right);
}

function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid, arr.length));
    return merge(left, right);
}

const a = [3, 5, 2, 1, 8, 9, 7];
console.log(mergeSort(a));
