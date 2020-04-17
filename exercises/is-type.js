let a = 1;

let func1 = function () {
    let b = 2;
    let func2 = function () {
        let c = 3;
        console.log(b);
        console.log(a); // 函数内部可以访问到外部
    };
    func2();
    console.log(c); // 在函数外面是访问不到内部作用域的
};

// func1();

let func = function () {
    let a = 1;
    return function () {
        a++;
        console.log(a);
    };
};

let f = func();
// f();
// f();
// f();

let Type = {};
let typeArr = ["String", "Array", "Number"];
for (let i = 0; i < typeArr.length; i++) {
    let type = typeArr[i];
    Type["is" + type] = function (obj) {
        return Object.prototype.toString.call(obj) === "[object " + type + "]";
    };
}

console.log(Type.isArray([]));
console.log(Type.isString("str"));

function isType() {
    let context = [].shift.call(arguments); //相当于arguments的数组调用了shift方法
    let args = [].slice.call(arguments);
    console.log(context, args);
}

// test("test");

for (let i = 0, type; type = ["String", "Array", "Number"][i++];) {
    console.log(type); // 实际上就是遍历数组的hack写法
}
