// Simple prototype
function Person() {}

Person.prototype = {
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function () {
        console.log(this.name);
    },
};

let friend = new Person();

console.log(friend instanceof Object); // true
console.log(friend instanceof Person); // true
console.log(friend.constructor === Person); // false
console.log(friend.constructor === Object); // true

function Person2() {}

Person2.prototype = {
    constructor: Person,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function () {
        console.log(this.name);
    },
};

Object.defineProperty(Person.prototype, "constructor", {
    enumerable: false,
    value: Person,
});

Person.prototype.sayHi = function () {
    console.log("hi");
};

let friend2 = new Person();
friend2.sayHi();

function Person3() {}

let friend3 = new Person3();

Person3.prototype = {
    constructor: Person3,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    sayName: function () {
        console.log(this.name);
    },
};

// Throws error
// friend2.sayName();

console.log(typeof Array.prototype.sort); // "function"
console.log(typeof String.prototype.substring); // "function"

String.prototype.startsWith = function (text) {
    return this.indexOf(text) === 0;
};

let msg = "Hello world!";
console.log(msg.startsWith("Hello")); // true

function Person4() {}

Person4.prototype = {
    constructor: Person4,
    name: "Nicholas",
    age: 29,
    job: "Software Engineer",
    friends: ["Shelby", "Court"],

    sayName: function () {
        console.log(this.name);
    },
};

let person1 = new Person4();
let person2 = new Person4();

person1.friends.push("Van");

console.log(person1.friends); // "Shelby,Court,Van"
console.log(person2.friends); // "Shelby,Court,Van"
console.log(person1.friends === person2.friends); // true
