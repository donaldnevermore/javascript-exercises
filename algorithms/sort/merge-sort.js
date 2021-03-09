function merge(left, right) {
    let arr = []

    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            arr.push(left.shift())
        } else {
            arr.push(right.shift())
        }
    }

    return arr.concat(left, right)
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr
    } else {
        const middle = Math.floor(arr.length / 2)
        const left = mergeSort(arr.slice(0, middle))
        const right = mergeSort(arr.slice(middle, arr.length))
        return merge(left, right)
    }
}
