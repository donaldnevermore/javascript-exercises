function deepcopy(data) {
  let obj;
  if (data instanceof Array) {
    obj = [];
    for (let i = 0; i < data.length; i++) {
      obj.push(deepcopy(data[i]));
    }
  } else if (typeof data === 'object') {
    obj = {};
    for (let key in data) {
      obj[key] = deepcopy(obj[key]);
    }
  }
  return obj;
}

let arr = [{ a: 1, city: ['x', 'y', 'z'] }, { b: 2 }];
arr2 = deepcopy(arr);
console.log(arr2 === arr);
