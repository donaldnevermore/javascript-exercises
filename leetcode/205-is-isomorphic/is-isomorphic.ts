function isIsomorphic(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false
    }

    const prevIndexOfS: number[] = []
    const prevIndexOfT: number[] = []

    for (let i = 0; i < s.length; i++) {
        const sc = s.charCodeAt(i)
        const tc = t.charCodeAt(i)

        if (prevIndexOfS[sc] !== prevIndexOfT[tc]) {
            return false
        }

        // Save index 0
        prevIndexOfS[sc] = i + 1
        prevIndexOfT[tc] = i + 1
    }

    return true
}
