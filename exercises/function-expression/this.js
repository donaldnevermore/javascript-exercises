let name = "The Window";

let object = {
    name: "My Object",

    getNameFunc: function () {
        return function () {
            return this.name;
        };
    },
};

// object.getNameFunc() returns a function; the following () is to call it
// -> undefined under node.js
// -> "The Window" under non-strict mode
console.log(object.getNameFunc()());

let object2 = {
    name: "My Object",

    getNameFunc: function () {
        let that = this; // Save this scope
        return function () {
            return that.name;
        };
    },
};

console.log(object2.getNameFunc()()); // -> "My Object"

let object3 = {
    name: "My Object",

    getName: function () {
        return this.name;
    },
};

console.log(object3.getName()); // -> "My Object"
console.log(object3.getName()); // -> "My Object"

// -> undefined under node.js
// -> "The Window" under non-strict mode
console.log((object3.getName = object3.getName)());
