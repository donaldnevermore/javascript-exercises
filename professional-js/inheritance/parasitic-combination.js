// A better implementation.

function object(o) {
  const F = function () {};
  F.prototype = o;
  return new F();
}

function inheritPrototype(subType, superType) {
  const prototype = object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function () {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);

  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function () {
  console.log(this.age);
};

const instance = new SubType("Nicholas", 29);
instance.sayName();
instance.sayAge();
