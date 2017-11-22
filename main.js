'use strict';
// 引入hello模块
var greet = require('./hello');
var s = 'Michael';
greet(s);

// 方法一：对module.exports赋值：

function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

module.exports = {
    hello: hello,
    greet: greet
};
// 方法二： 直接使用exports：

// hello.js

function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

function hello() {
    console.log('Hello, world!');
}

exports.hello = hello;
exports.greet = greet;