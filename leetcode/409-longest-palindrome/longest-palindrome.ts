function longestPalindrome(s: string): number {
    const counter = new Set();
    let sum = 0;

    for (const ch of s) {
        if (counter.has(ch)) {
            counter.delete(ch);
            sum += 2;
        } else {
            counter.add(ch);
        }
    }

    return sum + (counter.size > 0 ? 1 : 0);
}
