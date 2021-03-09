function add(num1, num2) {
    let sum = num1 + num2
    return sum
}

function MyObject() {
    let privateVariable = 10

    function privateFunction() {
        return false
    }

    this.publicMethod = function () {
        privateVariable++
        return privateFunction()
    }
}

function Person(name) {
    this.getName = function () {
        return name
    }

    this.setName = function (value) {
        name = value
    }
}

let person = new Person("Nicholas")
console.log(person.getName())
person.setName("Greg")
console.log(person.getName())
