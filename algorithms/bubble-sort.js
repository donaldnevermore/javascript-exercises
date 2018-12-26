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
function bubbleSort (arr) {
  let len = arr.length

  for (let i = 0; i < len - 1; i++) {
    let n = 0
    for (let j = 0; j < len - i; j++) {
      if (arr[j] < arr[j - 1]) {
        n++
        console.log(n)
        let temp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = temp
      }
    }
    if (n < 1) {
      break
    }
  }
  return arr
}
