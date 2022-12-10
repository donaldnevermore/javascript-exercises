class Merge {
    private static aux: number[]

    public static merge(arr: number[], low: number, mid: number, high: number) {
        let i = low
        let j = mid + 1

        for (let k = low; k <= high; k++) {
            this.aux[k] = arr[k]
        }

        for (let k = low; k <= high; k++) {
            if (i > mid) {
                arr[k] = this.aux[j++]
            }
            else if (j > high) {
                arr[k] = this.aux[i++]
            }
            else if (this.aux[j] < this.aux[i]) {
                arr[k] = this.aux[j++]
            }
            else {
                arr[k] = this.aux[i++]
            }
        }
    }

    public static topDown(arr: number[]) {
        this.aux = new Array(arr.length)

        this.sort(arr, 0, arr.length - 1)
    }

    private static sort(arr: number[], low: number, high: number) {
        if (high <= low) {
            return
        }

        const mid = low + Math.floor((high - low) / 2)
        this.sort(arr, low, mid)
        this.sort(arr, mid + 1, high)
        this.merge(arr, low, mid, high)
    }
}

function merge(left: number[], right: number[]): number[] {
    const arr: number[] = []

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            arr.push(left.shift()!)
        }
        else {
            arr.push(right.shift()!)
        }
    }

    return arr.concat(left, right)
}

function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr
    }

    const mid = Math.floor(arr.length / 2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid, arr.length))
    return merge(left, right)
}

const a = [3, 5, 2, 1, 8, 9, 7]
console.log(mergeSort(a))
