function object(o) {
    function F() {}

    F.prototype = o
    return new F()
}

function createAnother(original) {
    let clone = object(original)
    clone.sayHi = function () {
        console.log("hi")
    }
    return clone
}

let person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"],
}

let anotherPerson = createAnother(person)
anotherPerson.sayHi() // "hi"
