/**
 * 希尔排序
 * O(n^(3/2))
 * 希尔排序的实质是分组插入排序， 该方法又称缩小增量排序。
 * 该方法的基本思想是： 先将整个待排元素序列分割为若干个子序列（ 由相隔某个‘ 增量’ 的元素组成的）分别进行直接插入排序，
 * 然后依次缩减增量再进行排序，
 * 带这个序列中的元素基本有序（ 增量足够小） 时，
 * 再对全体元素进行一次直接插入排序
 */
function shellSort(arr) {
    const len = arr.length;

    for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < len; i++) {
            let j = i;
            const current = arr[i];
            while (j - gap >= 0 && current < arr[j - gap]) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = current;
        }
    }
}
