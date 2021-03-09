/**
 * 快速排序
 * 不稳定
 * 平均情况：T(n) = O(n*logn)
 * 最佳情况：T(n) = O(n*logn)
 * 最差情况：T(n) = O(n*n)
 *
 * 1.在数据集之中，选择一个元素作为基准;
 * 2.所有小于基准的元素，都移到基准的左边；所有大于基准的元素，都移到基准的右边;
 * 3.对基准左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止;
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr
    }

    const pivotIndex = Math.floor(arr.length / 2)
    const pivot = arr.splice(pivotIndex, 1)[0]
    let left = []
    let right = []

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return quickSort(left).concat([pivot], quickSort(right))
}
