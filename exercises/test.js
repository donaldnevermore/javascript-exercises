var a = 1;

var func1 = function () {
    var b = 2;
    var func2 = function () {
        var c = 3;
        console.log(b);
        console.log(a); // 函数内部可以访问到外部
    }
    func2();
    console.log(c); // 在函数外面是访问不到内部作用域的
};

// func1();

var func = function () {
    var a = 1;
    return function () {
        a++;
        console.log(a);
    }
};

var f = func();
// f();
// f();
// f();

var Type = {};
for (var i = 0, type; type = ["String", "Array", "Number"][i++];) {
    (function (type) {
        Type["is" + type] = function (obj) {
            return Object.prototype.toString.call(obj) === "[object " + type + "]";
        }
    })(type)
}

// console.log(Type.isArray([]));
// console.log(Type.isString("str"));

function test() {
    var context = [].shift.call(arguments); //相当于arguments的数组调用了shift方法
    var args = [].slice.call(arguments);
    console.log(context, args);
}
// test("test");

for (var i = 0, type; type = ["String", "Array", "Number"][i++];) {
    console.log(type); //实际上就是遍历数组的hack写法
}