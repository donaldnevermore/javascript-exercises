function deepCopy(obj, map) {
  map = map ?? new WeakMap();

  // Primitive values
  if (obj == null || (typeof obj !== "object" && typeof obj !== "function")) {
    return obj;
  }

  if (typeof obj === "function") {
    return function () {
      return obj.apply(this, arguments);
    };
  }

  if (obj instanceof Date || obj instanceof RegExp) {
    return new obj.constructor(obj);
  }

  if (Array.isArray(obj)) {
    const copy = [];
    obj.forEach((val, i) => {
      copy[i] = deepCopy(val);
    });
  }

  // Avoid cycle reference.
  if (map.has(obj)) {
    return map.get(obj);
  }

  if (obj instanceof Map) {
    const copy = new Map();
    map.set(obj, copy);
    obj.forEach((val, key) => {
      copy.set(key, deepCopy(val));
    });
    return copy;
  }

  if (obj instanceof Set) {
    const copy = new Set();
    map.set(obj, copy);
    obj.forEach((val) => {
      copy.add(deepCopy(val));
    });
    return copy;
  }

  // Objects
  if (typeof obj === "object") {
    const keys = Reflect.ownKeys(obj);
    const allDesc = Object.getOwnPropertyDescriptors(obj);
    const copy = Object.create(Object.getPrototypeOf(obj), allDesc);

    map.set(obj, copy);

    keys.forEach((key) => {
      copy[key] = deepCopy(obj[key], map);
    });

    return copy;
  }

  throw new TypeError("Unsupported type for deep copy.");
}

const obj = {
  num: 0, // number
  str: "", // string
  bool: true, // boolean
  unf: undefined, // undefined
  nul: null, // null
  sym: Symbol("sym"), // symbol
  bign: BigInt(1n), // bigint
  obj: {
    name: "anObject",
    id: 1,
  },
  arr: [0, 1, 2],
  func: function () {
    console.log("hello");
  },
  date: new Date(0),
  reg: /regexp/gi,
  map: new Map().set("mapKey", 1),
  set: new Set().add("set"),
  [Symbol("1")]: 1,
};

Object.defineProperty(obj, "nonEnumerable", {
  enumerable: false,
  value: "nonEnumerable",
});

Object.setPrototypeOf(obj, {
  proto: "proto",
});

obj.loop = obj;

const obj2 = deepCopy(obj);
console.log(obj2);
