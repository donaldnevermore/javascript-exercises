function SuperType (name) {
  this.name = name
  this.colors = [1, 2, 3]
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (name, age) {
  SuperType.call(this, name)

  this.age = age
}

// 函数来实现继承
function inheritPrototype (subType, superType) {
  let prototype = Object(superType.prototype)
  prototype.constructor = subType
  subType.prototype = prototype
}

inheritPrototype(SubType, SuperType)

const s = new SubType('sub')
s.sayName()
