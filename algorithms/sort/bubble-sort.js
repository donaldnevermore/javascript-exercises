/**
 * 冒泡排序
 * 稳定
 * 平均情况：T(n) = O(n*n)
 * 最佳情况：T(n) = O(n)
 * 最差情况：T(n) = O(n*n)
 *
 * 它的基本思想是：两两比较相邻记录的关键字，如果反序则交换，直到没有反序的记录为止。
 * 它重复地走访过要排序的数列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。
 * 走访数列的工作是重复地进行直到没有再需要交换，也就是说该数列已经排序完成。
 */
function bubbleSort(arr) {
    let swap = true
    while (swap) {
        swap = false
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                const temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
                swap = true
            }
        }
    }
}
