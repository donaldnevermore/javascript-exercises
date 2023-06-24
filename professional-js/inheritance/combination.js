// A common implementation.

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name); // 2nd time calling SuperType()

  this.age = age;
}

SubType.prototype = new SuperType(); // 1st time calling SuperType()
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

const instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); // ['red', 'blue', 'green', 'black']

instance1.sayName(); // "Nicholas"
instance1.sayAge(); // 29

const instance2 = new SubType("Greg", 27);
console.log(instance2.colors); // ['red', 'blue', 'green']

instance2.sayName(); // "Greg"
instance2.sayAge(); // 27
