function isAnagram(s: string, t: string): boolean {
    const arr: number[] = new Array(26).fill(0)

    for (const v of s) {
        const ch = v.charCodeAt(0) - "a".charCodeAt(0)
        arr[ch]++
    }
    for (const v of t) {
        const ch = v.charCodeAt(0) - "a".charCodeAt(0)
        arr[ch]--
    }

    for (const v of arr) {
        if (v !== 0) {
            return false
        }
    }
    return true
}
