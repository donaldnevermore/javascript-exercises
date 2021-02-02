function functionName(arg0, arg1, arg2) {}

console.log(functionName.name);

// Function declaration hoisting
sayHi();

function sayHi() {
    console.log("Hi!");
}

let functionName2 = function (arg0, arg1, arg2) {};

// Throws error
// sayHi2();
let sayHi2 = function () {
    console.log("Hi!");
};

// Don't do this.
// May cause an undefined behavior.
let condition = true;
if (condition) {
    function sayHi() {
        console.log("Hi!");
    }
} else {
    function sayHi() {
        console.log("Yo!");
    }
}

// It's OK.
let sayHi3;

if (condition) {
    sayHi3 = function () {
        console.log("Hi!");
    };
} else {
    sayHi3 = function () {
        console.log("Yo!");
    };
}
