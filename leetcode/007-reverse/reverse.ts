function reverse(x: number): number {
  const twoTo31 = Math.pow(2, 31);
  const maxInt32By10 = ~~((twoTo31 - 1) / 10);
  const minInt32By10 = ~~(-twoTo31 / 10);

  let rev = 0;
  while (x !== 0) {
    if (rev < minInt32By10 || rev > maxInt32By10) {
      return 0;
    }

    const digit = x % 10;
    x = ~~(x / 10);
    rev = rev * 10 + digit;
  }

  return rev;
}
