function countBinarySubstrings(s: string): number {
    let count = 0;
    let curr = 1;
    let prev = 0;

    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i - 1]) {
            curr++;
        } else {
            prev = curr;
            curr = 1;
        }

        // min(prev, curr)
        if (prev >= curr) {
            count++;
        }
    }

    return count;
}
