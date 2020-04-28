/**
 * 插入排序
 * 稳定
 * 平均情况：T(n) = O(n*n)
 * 最佳情况：输入数组按升序排列。T(n) = O(n)
 * 最坏情况：输入数组按降序排列。T(n) = O(n*n)
 *
 * 插入排序的基本操作是将一个记录插入到已经排好序的有序表中，从而得到一个新的、记录数增1的有序表;
 * 排序过程大概如下:
 * 从第一个元素开始，该元素可以认为已经被排序;
 * 如果该元素（已排序）大于新元素，将该元素移到下一位置;
 * 将新元素插入到该位置后;
 * 重复步骤;
 */
function insertSort(arr) {
    const len = arr.length;

    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
            const temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
        }
    }
}
