export function myPow(x: number, n: number): number {
  if (x === 0) {
    return 0;
  }
  if (n !== Math.floor(n)) {
    throw new Error(`Invalid argument: ${n}`);
  }

  const absExponent = n < 0 ? -n : n;

  let res = quickMul(x, absExponent);

  if (n < 0) {
    res = 1 / res;
  }

  return res;
}

function quickMul(x: number, n: number): number {
  let res = 1;

  while (n > 0) {
    if (n % 2 === 1) {
      res *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }

  return res;
}
