function binarySearch(arr, num) {
    if (arr == null || num == null) {
        return -1
    }

    if (arr.length === 0) {
        return -1
    }

    let low = 0
    let high = arr.length - 1

    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        if (arr[mid] < num) {
            low = mid + 1
        }
        else if (arr[mid] > num) {
            high = mid - 1
        }
        else {
            return mid
        }
    }

    return -1
}

let arr1 = [1, 2, 3, 4, 5]
console.log(binarySearch(arr1, 3))
console.log(binarySearch([], 3))
