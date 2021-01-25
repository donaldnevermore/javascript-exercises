// It's common to use a combination of constructor and prototype.

function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constructor: Person,
    sayName: function () {
        console.log(this.name);
    },
};

// a better implementation
// Person.prototype.sayName = function () {
//     console.log(this.name);
// };

let person1 = new Person("Nicholas", 29, "Software Engineer");
let person2 = new Person("Greg", 27, "Doctor");

person1.friends.push("Van");

console.log(person1.friends); // -> "Shelby,Court,Van"
console.log(person2.friends); // -> "Shelby,Court"
console.log(person1.friends === person2.friends); // -> false
console.log(person1.sayName === person2.sayName); // -> true
