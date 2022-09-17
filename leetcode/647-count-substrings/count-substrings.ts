function countSubstrings(s: string): number {
    let count = 0

    const extendSubstring = (start: number, end: number) => {
        while (start >= 0 && end < s.length && s[start] === s[end]) {
            start--
            end++
            count++
        }
    }

    for (let i = 0; i < s.length; i++) {
        extendSubstring(i, i) // odd
        extendSubstring(i, i + 1) // even
    }

    return count
}
