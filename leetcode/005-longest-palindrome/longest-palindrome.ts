function longestPalindrome(s: string): string {
    if (s.length < 2) {
        return s
    }

    let longest = 1
    let position = 0

    const findLongest = (left: number, right: number) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            const distance = right - left + 1
            if (distance > longest) {
                longest = distance
                position = left
            }

            left--
            right++
        }
    }

    for (let i = 0; i < s.length; i++) {
        findLongest(i - 1, i + 1)
        findLongest(i, i + 1)
    }

    return s.slice(position, position + longest)
}

// maybe slower...
function longestPalindromeDP(s: string): string {
    if (s.length < 2) {
        return s
    }

    const dp: boolean[][] = new Array(s.length)
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(s.length).fill(false)
    }

    let longest = 1
    let start = 0

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (i - j < 2) {
                // i next to j or i == j
                dp[j][i] = s[i] === s[j]
            } else {
                // Compare and move i and j closer.
                dp[j][i] = s[i] === s[j] && dp[j + 1][i - 1]
            }

            // Found a longer one.
            const distance = i - j + 1
            if (dp[j][i] && longest < distance) {
                longest = distance
                start = j
            }
        }
    }

    return s.slice(start, start + longest)
}
