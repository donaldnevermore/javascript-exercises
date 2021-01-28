function object(o) {
    function F() {}

    F.prototype = o;
    return new F();
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"],
};

let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends); // -> ["Shelby", "Court", "Van", "Barbie"]

let person2 = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"],
};

let anotherPerson2 = Object.create(person2);
anotherPerson2.name = "Greg";
anotherPerson2.friends.push("Rob");

let yetAnotherPerson2 = object(person2);
yetAnotherPerson2.name = "Linda";
yetAnotherPerson2.friends.push("Barbie");

console.log(person2.friends); // -> ["Shelby", "Court", "Van", "Barbie"]

let person3 = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"],
};

let anotherPerson3 = Object.create(person3, {
    name: {
        value: "Greg",
    },
});

console.log(anotherPerson3.name);
