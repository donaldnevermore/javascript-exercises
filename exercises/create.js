function myCreate(proto, propertyObject) {
    if (propertyObject === null) {
        throw new TypeError("Cannot convert undefined or null to object");
    }

    const Fn = function () {};
    Fn.prototype = proto;
    const obj = new Fn();

    if (propertyObject !== undefined) {
        Object.defineProperties(obj, propertyObject);
    }
    if (proto === null) {
        // Create an object without [[Prototype]]
        Object.setPrototypeOf(obj, null);
    }

    return obj;
}

const obj1 = myCreate(null); // Create a "null" object
console.log(obj1); // {} -- Seems normal but wait...
// obj1.toString() throws error: obj1.toString is not a function

const obj2 = myCreate({ a: "aa" });
console.log(obj2); // {}
const obj3 = myCreate(
    { a: "aa" },
    {
        b: {
            value: "bb",
            enumerable: true,
        },
    },
);
console.log(obj3); // {b: 'bb'}
