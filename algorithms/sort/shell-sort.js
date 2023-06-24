/**
 * 希尔排序
 * O(n^(3/2))
 * 希尔排序的实质是分组插入排序， 该方法又称缩小增量排序。
 * 该方法的基本思想是： 先将整个待排元素序列分割为若干个子序列（由相隔某个增量的元素组成的）分别进行直接插入排序，
 * 然后依次缩减增量再进行排序，
 * 带这个序列中的元素基本有序（ 增量足够小） 时，
 * 再对全体元素进行一次直接插入排序
 */
function shellSort(arr) {
  const n = arr.length;
  let h = 1;
  while (h < Math.floor(n / 3)) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = h; i < n; i++) {
      for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
        const temp = arr[j];
        arr[j] = arr[j - h];
        arr[j - h] = temp;
      }
    }

    h = Math.floor(h / 3);
  }
}
