// prototype pattern
function Person() {}

Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function () {
    console.log(this.name);
};

let person1 = new Person();
person1.sayName(); // -> "Nicholas"

let person2 = new Person();
person2.sayName(); // -> "Nicholas"

console.log(person1.sayName === person2.sayName); // -> true

console.log(Person.prototype.isPrototypeOf(person1)); // -> true
console.log(Person.prototype.isPrototypeOf(person2)); // -> true

console.log(Object.getPrototypeOf(person1) === Person.prototype); // -> true
console.log(Object.getPrototypeOf(person1).name); // -> "Nicholas"

person1.name = "Greg";
console.log(person1.name); // -> "Greg"
console.log(person2.name); // -> "Nicholas"

delete person1.name;
console.log(person1.name); // -> "Nicholas"

console.log(person1.hasOwnProperty("name")); // -> false
person1.name = "Greg";
console.log(person1.name); // -> "Greg"
console.log(person1.hasOwnProperty("name")); // -> true

console.log(person2.name); // -> "Nicholas"
console.log(person2.hasOwnProperty("name")); // -> false

delete person1.name;
console.log(person1.name); // -> "Nicholas"
console.log(person1.hasOwnProperty("name")); // -> false

console.log(person1.hasOwnProperty("name")); // -> false
console.log("name" in person1); // -> true

person1.name = "Greg";
console.log(person1.name); // -> "Greg"
console.log(person1.hasOwnProperty("name")); // -> true
console.log("name" in person1); // -> true

console.log(person2.name); // -> "Nicholas"
console.log(person2.hasOwnProperty("name")); // -> false
console.log("name" in person2); // -> true

delete person1.name;
console.log(person1.name); // -> "Nicholas"
console.log(person1.hasOwnProperty("name")); // -> false
console.log("name" in person1); // -> true

function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && name in object;
}

let person3 = new Person();
console.log(hasPrototypeProperty(person3, "name")); // -> true
person3.name = "Greg";
console.log(hasPrototypeProperty(person3, "name")); // -> false

let o = {
    toString: function () {
        return "My Object";
    },
};

for (let prop in o) {
    if (prop === "toString") {
        console.log("Found toString");
    }
}

let keys = Object.keys(Person.prototype);
console.log(keys); // -> "name,age,job,sayName"
let p1 = new Person();
p1.name = "Rob";
p1.age = 31;
let p1keys = Object.keys(p1);
console.log(p1keys); // -> "name,age"

let keys2 = Object.getOwnPropertyNames(Person.prototype);
console.log(keys2);
