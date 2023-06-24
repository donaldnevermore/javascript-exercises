var myname = "小明";

function showName() {
  console.log(myname); // undefined

  if (0) {
    var myname = "小红"; // var 没有块级作用域
  }

  console.log(myname); // undefined
}

function showName2() {
  console.log(myname);

  if (0) {
    let myname = "小红";
  }

  console.log(myname);
  console.log(globalThis.myname); // undefined
}

showName();
console.log();
showName2();
