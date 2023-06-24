function hasPath(matrix: string[][], word: string): boolean {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const marked: boolean[][] = [];
  for (let i = 0; i < rows; i++) {
    marked[i] = [];
  }

  const backtrack = (row: number, col: number, pathLength: number): boolean => {
    if (pathLength > word.length - 1) {
      return true;
    }

    let has = false;
    if (
      row >= 0 &&
      row < rows &&
      col >= 0 &&
      col < cols &&
      matrix[row][col] === word[pathLength] &&
      !marked[row][col]
    ) {
      marked[row][col] = true;

      has =
        backtrack(row, col - 1, pathLength + 1) ||
        backtrack(row, col + 1, pathLength + 1) ||
        backtrack(row - 1, col, pathLength + 1) ||
        backtrack(row + 1, col, pathLength + 1);

      if (!has) {
        marked[row][col] = false;
      }
    }

    return has;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (backtrack(row, col, 0)) {
        return true;
      }
    }
  }

  return false;
}

const board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];

const got = hasPath(board, "ABCCED");
console.log(got);
