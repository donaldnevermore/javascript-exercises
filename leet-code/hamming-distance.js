/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
function hammingDistance (x, y) {
  const z = x ^ y
  const zStr = z.toString(2)
  let count = 0

  for (let i = 0; i < zStr.length; i++) {
    if (zStr[i] === '1') {
      count += 1
    }
  }

  return count
}