// 第25页:生成新数组迭代器方法
function curve(grade) {
  return (grade += 5);
}
var grades = [77, 65, 81, 92, 83];
var newgrades = grades.map(curve);
// console.log(newgrades);

function first(word) {
  return word[0];
}
var words = ['for', 'your', 'information'];
var acrony = words.map(first);
// console.log(acrony.join(""));
