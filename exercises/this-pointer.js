// 情况 1
function foo() {
    console.log(this.a) // 1
}

var a = 1
foo() // this 指向 window 全局

// 情况 2
function fn() {
    console.log(this)
}

var obj = { fn: fn }
obj.fn() // this 指向 obj 对象

// 情况 3
function CreateJsPerson(name, age) {
    // this 是当前类的一个实例 p1
    this.name = name // => p1.name = name
    this.age = age // => p1.age = age
}

var p1 = new CreateJsPerson("xxx", 48)

// 情况 4
function add(c, d) {
    return this.a + this.b + c + d
}

var o = { a: 1, b: 3 }
add.call(o, 5, 7) // 1 + 3 + 5 + 7 = 16 this 指向 o 对象
add.apply(o, [10, 20]) // 1 + 3 + 10 + 20 = 34 this 指向 o 对象

// 情况 5
let btn1 = document.getElementById("btn1")
let obj2 = {
    name: "kobe",
    age: 39,
    getName: function () {
        btn1.onclick = () => {
            console.log(this) // obj2
        }
    },
}
obj2.getName() // this 指向 obj2，因为箭头函数的 this 是在外层函数定义的时候就指定了
