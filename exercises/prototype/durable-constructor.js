function Person(name, age, job) {
    let o = {}

    o.sayName = function () {
        console.log(name)
    }

    return o
}

let friend = Person("Nicholas", 29, "Software Engineer")
friend.sayName() // "Nicholas"
