export function lengthOfLongestSubstring(s: string): number {
    let curLength = 0
    let maxLength = 0

    const position = new Map()

    for (let i = 0; i < s.length; i++) {
        let prevIndex: number
        if (position.has(s[i])) {
            prevIndex = position.get(s[i])
        }
        else {
            prevIndex = -1
        }

        if (prevIndex < 0 || i - prevIndex > curLength) {
            curLength++
        }
        else {
            if (curLength > maxLength) {
                maxLength = curLength
            }

            curLength = i - prevIndex
        }

        position.set(s[i], i)
    }

    if (curLength > maxLength) {
        maxLength = curLength
    }

    return maxLength
}
