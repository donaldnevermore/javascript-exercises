/**
 * 二分插入排序
 * 平均情况：T(n) = O(n*n)
 * 最佳情况：T(n) = O(n*logn)
 * 最差情况：T(n) = O(n*n)
 *
 * 从第一个元素开始，该元素可以认为已经被排序;
 * 取出下一个元素，在已经排序的元素序列中二分查找到第一个比它大的数的位置;
 * 将新元素插入到该位置后;
 * 重复上述两步;
 */
function binaryInsertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i]
        let left = 0
        let right = i - 1
        while (left <= right) {
            const middle = Number.parseInt(String((left + right) / 2))
            if (key < arr[middle]) {
                right = middle - 1
            } else {
                left = middle + 1
            }
        }
        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j]
        }
        arr[left] = key
    }
    return arr
}
