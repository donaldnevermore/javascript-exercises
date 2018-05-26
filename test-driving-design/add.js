function add(a, b, callback) {
  let c = callback(a);
  return c + b;
}

function double(a) {
  return a * 2;
}

console.log(double(4));
module.exports = add;
console.log(add(1, 2, double));
