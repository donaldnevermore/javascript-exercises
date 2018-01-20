// function factorial2 (num) {
//     if(num<=1){
//         return 1;
//     }else{
//         return num*arguments.callee(num-1);
//     }
// }
// console.log(factorial2(5));

var factorial = function f(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * f(num - 1);
  }
};

console.log(factorial(5));
var f = factorial;
console.log(f(5));
