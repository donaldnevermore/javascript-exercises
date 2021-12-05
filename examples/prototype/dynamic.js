function Person(name, age, job) {
    // Property
    this.name = name
    this.age = age
    this.job = job

    // Method
    if (typeof this.sayName !== "function") {
        Person.prototype.sayName = function () {
            console.log(this.name)
        }
    }
}

let friend = new Person("Nicholas", 29, "Software Engineer")
friend.sayName()
