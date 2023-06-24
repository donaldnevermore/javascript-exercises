function convert(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  const cycle = numRows * 2 - 2;
  const arr: string[] = [];
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < s.length - i; j += cycle) {
      arr.push(s[j + i]);

      // Omit the first and the last row.
      if (0 < i && i < numRows - 1 && j + cycle - i < s.length) {
        arr.push(s[j + cycle - i]);
      }
    }
  }

  return arr.join("");
}
/*
0             0+t                    0+2t                     0+3t
1      t-1    1+t            0+2t-1  1+2t            0+3t-1   1+3t
2  t-2        2+t  0+2t-2            2+2t  0+3t-2             2+3t
3             3+t                    3+2t                     3+3t
*/
