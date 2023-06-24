function reverseVowels(s: string): string {
  const arr: string[] = new Array(s.length);
  const dict: { [index: string]: boolean } = {
    a: true,
    A: true,
    e: true,
    E: true,
    i: true,
    I: true,
    o: true,
    O: true,
    u: true,
    U: true,
  };

  let left = 0;
  let right = s.length - 1;

  while (left <= right) {
    if (!dict[s[left]]) {
      arr[left] = s[left];
      left++;
    } else if (!dict[s[right]]) {
      arr[right] = s[right];
      right--;
    } else {
      arr[left] = s[right];
      arr[right] = s[left];
      left++;
      right--;
    }
  }

  return arr.join("");
}
