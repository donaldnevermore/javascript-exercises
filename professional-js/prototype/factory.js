// Factory pattern
function createPerson(name, age, job) {
  let o = {};
  o.name = name;
  o.age = age;
  o.job = job;

  o.sayName = function () {
    console.log(this.name);
  };

  return o;
}

let person1 = createPerson("Nicholas", 29, "Software Engineer");
let person2 = createPerson("Greg", 27, "Doctor");

// Constructor pattern
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;

  this.sayName = function () {
    console.log(this.name);
  };
}

let person3 = new Person("Nicholas", 29, "Software Engineer");
let person4 = new Person("Greg", 27, "Doctor");

console.log(person3.constructor === Person); // true
console.log(person4.constructor === Person); // true

console.log(person3 instanceof Object); // true
console.log(person3 instanceof Person); // true
console.log(person4 instanceof Object); // true
console.log(person4 instanceof Person); // true

// As constructor
let person5 = new Person("Nicholas", 29, "Software Engineer");
person5.sayName(); // "Nicholas"

// As normal function
Person("Greg", 27, "Doctor");
global.sayName(); // "Greg"

// Called in another object
let o = {};
Person.call(o, "Kristen", 25, "Nurse");
o.sayName(); // "Kristen

// let person5 = new Person("Nicholas", 29, "Software Engineer")
let person6 = new Person("Greg", 27, "Doctor");
// Constructor problem
console.log(person5.sayName === person6.sayName); // false

function Person2(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName;
}

function sayName() {
  console.log(this.name);
}

let p1 = new Person2("Nicholas", 29, "Software Engineer");
let p2 = new Person2("Greg", 27, "Doctor");

console.log(p1.sayName === p2.sayName); // true
