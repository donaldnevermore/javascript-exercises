/*
选择排序
不稳定
平均情况：T(n) = O(n*n)
最佳情况：T(n) = O(n*n)
最差情况：T(n) = O(n*n)

选择排序就是通过n - i次关键字间的比较，从n - i - 1个记录中选出关键字最小的记录，并和第i个记录进行交换。
它的工作原理：首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置;
然后，再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。
以此类推，直到所有元素均排序完毕。
*/
function selectSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var min = arr[i];
        for (var j = i + 1; j < arr.length - 1; j++) {
            if (min > arr[j]) {
                var temp = min;
                min = arr[j];
                arr[j] = temp;
            }
        }
        arr[i] = min;
    }
    return arr;
}