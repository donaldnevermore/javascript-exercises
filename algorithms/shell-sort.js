/**
 * 希尔排序
 * O(n^(3/2))
 * 希尔排序的实质是分组插入排序， 该方法又称缩小增量排序。
 * 该方法的基本思想是： 先将整个待排元素序列分割为若干个子序列（ 由相隔某个‘ 增量’ 的元素组成的）分别进行直接插入排序，
 * 然后依次缩减增量再进行排序，
 * 带这个序列中的元素基本有序（ 增量足够小） 时，
 * 再对全体元素进行一次直接插入排序
 */
function shellSort (array) {
  let increment = array.length
  let i
  let temp //暂存
  let count = 0
  do {
    //设置增量
    increment = Math.floor(increment / 3) + 1
    for (i = increment; i < array.length; i++) {
      console.log(increment)
      if (array[i] < array[i - increment]) {
        temp = array[i]
        for (let j = i - increment; j >= 0 && temp < array[j]; j -= increment) {
          array[j + increment] = array[j]
        }
        array[j + increment] = temp
      }
    }
  }
  while (increment > 1)
  return array
}