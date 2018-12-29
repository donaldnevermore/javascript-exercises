// function factorial2 (num) {
//     if(num<=1){
//         return 1;
//     }else{
//         return num*arguments.callee(num-1);
//     }
// }
// console.log(factorial2(5));

function factorial (num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}

console.log(factorial(5))
