function Person(name, age, job) {
    // property
    this.name = name;
    this.age = age;
    this.job = job;

    // method
    if (typeof this.sayName !== "function") {
        Person.prototype.sayName = function () {
            console.log(this.name);
        };
    }
}

let friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName();
