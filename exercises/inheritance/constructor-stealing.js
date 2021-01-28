function SuperType() {
    this.colors = ["red", "blue", "green"];
}

function SubType() {
    SuperType.call(this);
}

let instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors); // -> ['red', 'blue', 'green', 'black']

let instance2 = new SubType();
console.log(instance2.colors); // -> ['red', 'blue', 'green']

console.log(instance1.colors === instance2.colors);

function SuperType2(name) {
    this.name = name;
}

function SubType2() {
    SuperType2.call(this, "Nicholas");

    this.age = 29;
}

let instance3 = new SubType2();
console.log(instance3.name); // -> "Nicholas"
console.log(instance3.age); // -> 29
