function object(o) {
    const F = function () {}
    F.prototype = o
    return new F()
}

function createAnother(original) {
    const clone = object(original)
    clone.sayHi = function () {
        console.log("Hi")
    }
    return clone
}

const person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
}

const anotherPerson = createAnother(person)
anotherPerson.sayHi() // "Hi"
