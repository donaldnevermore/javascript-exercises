export function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) {
        return ""
    }

    const first = strs[0]

    for (let i = 0; i < first.length; i++) {
        for (let j = 1; j < strs.length; j++) {
            const s = strs[j]
            if (i > s.length - 1 || first[i] !== s[i]) {
                return first.substring(0, i)
            }
        }
    }

    return first
}
