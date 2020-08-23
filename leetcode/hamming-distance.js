/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = function(x, y) {
    const z = x ^ y;
    const zBinary = z.toString(2);
    let count = 0;

    for (let i = 0; i < zBinary.length; i++) {
        if (zBinary[i] === "1") {
            count ++;
        }
    }

    return count;
}
