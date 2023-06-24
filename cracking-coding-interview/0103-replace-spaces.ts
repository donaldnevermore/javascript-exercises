function replaceSpaces(s: string, length: number): string {
  let spaceCount = 0;
  for (let i = 0; i < length; i++) {
    if (s[i] === " ") {
      spaceCount++;
    }
  }

  let len = length + spaceCount * 2;

  const arr: string[] = [];
  for (let j = length - 1; j >= 0; j--) {
    if (s[j] === " ") {
      arr[len - 1] = "0";
      arr[len - 2] = "2";
      arr[len - 3] = "%";
      len -= 3;
    } else {
      arr[len - 1] = s[j];
      len--;
    }
  }

  return arr.join("");
}

console.log(replaceSpaces("a b", 3));
