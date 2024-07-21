(function () {
    let privateVariable = 10;

    function privateFunction() {
        return false;
    }

    // Throws error under strict mode
    MyObject = function () {};

    MyObject.prototype.publicMethod = function () {
        privateVariable++;
        return privateFunction();
    };
})()(function () {
    let name = "";

    Person = function (value) {
        name = value;
    };

    Person.prototype.getName = function () {
        return name;
    };

    Person.prototype.setName = function (value) {
        name = value;
    };
})();

let person1 = new Person("Nicholas");
console.log(person1.getName()); // "Nicholas"
person1.setName("Greg");
console.log(person1.getName()); // "Greg"

let person2 = new Person("Michael");
console.log(person1.getName()); // "Michael"
console.log(person2.getName()); // "Michael"
