function Person(name, age, job) {
  let o = {};
  o.name = name;
  o.age = age;
  o.job = job;

  o.sayName = function () {
    console.log(this.name);
  };

  return o;
}

let friend = new Person("Nicholas", 29, "Software Engineer");
friend.sayName(); // "Nicholas"

function SpecialArray() {
  let values = [];

  values.push.apply(values, arguments);

  values.toPiedString = function () {
    return this.join("|");
  };

  return values;
}

let colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPiedString()); // "red|blue|green"
