"use strict"
// 引入hello模块
const greet = require("./hello")
let s = "Michael"
greet(s)

// 方法一：对module.exports赋值：

function hello2() {
    console.log("Hello, world!")
}

function greet2(name) {
    console.log("Hello, " + name + "!")
}

module.exports = {
    hello: hello2,
    greet: greet2,
}

// 方法二： 直接使用exports：

// hello.js

function hello3() {
    console.log("Hello, world!")
}

function greet3(name) {
    console.log("Hello, " + name + "!")
}

exports.hello = hello3
exports.greet = greet3
