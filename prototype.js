// function Person() {

// }

// Person.prototype = {
//     name: "Nicholas",
//     age: 29,
//     job: "Software Engineer",
//     sayName: function () {
//         console.log(this.name);
//     }
// }
// var friend = new Person();

// Object.defineProperty(Person.prototype, "constructor", {
//     enumerable: false,
//     value: Person
// })

// friend.sayName();

// Person.prototype.sayHi = function () {
//     console.log("hi");
// }
// friend.sayHi();

// 构造函数模式和原型模式组合使用
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constuctor: Person,
    sayName: function () {
        console.log(this.name);
    }
}

var p = new Person("Will", 22, "FrontEnd");