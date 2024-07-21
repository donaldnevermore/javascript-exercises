function hammingDistance(x: number, y: number): number {
    let z = x ^ y;

    let count = 0;
    while (z !== 0) {
        z &= z - 1;
        count++;
    }

    return count;
}
