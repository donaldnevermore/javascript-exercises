export function exch(arr: number[], i: number, j: number) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

export function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    exch(arr, i, j);
  }
}

// bug
// function test(i: number, j: number) {
//     const a = 0
//     [i, j] = [j, i]
// }
