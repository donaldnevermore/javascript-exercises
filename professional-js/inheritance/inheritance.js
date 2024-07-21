function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

function SubType() {
    this.subproperty = false;
}

SubType.prototype = new SuperType();

// not working
// SubType.prototype = {
//     getSubValue: function() {
//         return this.subproperty;
//     },
//     someOtherMethod: function() {
//         return this.subproperty;
//     },
// };

// let instance3 = new SubType();
// throws error
// console.log(instance3.getSuperValue());

SubType.prototype.getSubValue = function () {
    return this.subproperty;
};

let instance = new SubType();
console.log(instance.getSuperValue()); // true

console.log(instance instanceof Object); // true
console.log(instance instanceof SuperType); // true
console.log(instance instanceof SubType); // true

// override supertype method
SubType.prototype.getSuperValue = function () {
    return false;
};

let instance2 = new SubType();
console.log(instance2.getSuperValue()); // false

function SuperType2() {
    this.colors = ["red", "blue", "green"];
}

function SubType2() {}

SubType2.prototype = new SuperType2();

let instance4 = new SubType2();
instance4.colors.push("black");
console.log(instance4.colors); // ['red', 'blue', 'green', 'black']

let instance5 = new SubType2();
console.log(instance5.colors); // ['red', 'blue', 'green', 'black']

console.log(instance4.colors === instance5.colors); // true
