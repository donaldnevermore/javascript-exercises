let person = {};
person.name = "Nicholas";
person.age = 29;
person.job = "Software Engineer";

person.sayName = function () {
  console.log(this.name);
};

// object literal
let person2 = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",

  sayName: function () {
    console.log(this.name);
  },
};

let person3 = {};
Object.defineProperty(person3, "name", {
  writable: false,
  value: "Nicholas",
});

console.log(person3.name); // "Nicholas"
person.name = "Greg";
console.log(person3.name); // "Nicholas"

let person4 = {};
Object.defineProperty(person4, "name", {
  configurable: false,
  value: "Nicholas",
});

console.log(person4.name); // "Nicholas"
delete person.name;
console.log(person4.name); // "Nicholas"

let person5 = {};
Object.defineProperty(person5, "name", {
  configurable: false,
  value: "Nicholas",
});

// Throws error
// Object.defineProperty(person5, "name", {
//     configurable: true,
//     value: "Nicholas"
// });

let book = {
  _year: 2004,
  edition: 1,
};

Object.defineProperty(book, "year", {
  get: function () {
    return this._year;
  },
  set: function (newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  },
});

book.year = 2005;
console.log(book.edition); // 2

let book2 = {};

Object.defineProperties(book2, {
  _year: {
    writable: true,
    value: 2004,
  },
  edition: {
    writable: true,
    value: 1,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    },
  },
});

let book3 = {};

Object.defineProperties(book3, {
  _year: {
    value: 2004,
  },
  edition: {
    value: 1,
  },
  year: {
    get: function () {
      return this._year;
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    },
  },
});

let descriptor = Object.getOwnPropertyDescriptor(book3, "_year");
console.log(descriptor.value); // 2004
console.log(descriptor.configurable); // false
console.log(typeof descriptor.get); // "undefined"

let descriptor2 = Object.getOwnPropertyDescriptor(book3, "year");
console.log(descriptor.value); // undefined
console.log(descriptor.configurable); // false
console.log(typeof descriptor2.get); // "function"
