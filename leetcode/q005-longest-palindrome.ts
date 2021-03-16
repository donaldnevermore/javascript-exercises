export function longestPalindrome(s: string): string {
    if (s && s.length <= 0) {
        return null
    }

    let longest = 1
    let start = 0

    for (let i = 0; i < s.length; i++) {
        const findLongest = (j, k) => {
            while (j >= 0 && k < s.length && s[j] === s[k]) {
                if (k - j + 1 > longest) {
                    longest = k - j + 1
                    start = j
                }

                j--
                k++
            }
        }

        findLongest(i - 1, i + 1)
        findLongest(i, i + 1)
    }

    return s.substr(start, longest)
}

export function longestPalindromeDP(s: string): string {
    if (s && s.length <= 0) {
        return null
    }

    const dp = []
    for (let i = 0; i < s.length; i++) {
        dp[i] = []
    }

    let longest = 1
    let start = 0

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (i - j < 2) {
                // i next to j of i == j
                dp[j][i] = s[i] === s[j]
            }
            else {
                // Compare, then bring i and j closer.
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

    return s.substr(start, longest)
}
