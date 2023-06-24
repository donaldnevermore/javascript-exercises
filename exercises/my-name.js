function bar() {
  console.log(myName);
}

function foo() {
  var myName = "腾讯1";
  bar();
}

foo(); // 腾讯2

var myName = "腾讯2"; // 变量提升
