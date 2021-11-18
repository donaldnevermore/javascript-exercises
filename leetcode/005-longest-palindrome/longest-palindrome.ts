export function longestPalindrome(s: string): string {
    if (s.length === 0) {
        return ""
    }

    let longest = 1
    let start = 0

    const findLongest = (j: number, k: number) => {
        while (j >= 0 && k < s.length && s[j] === s[k]) {
            const distance = k - j + 1
            if (distance > longest) {
                longest = distance
                start = j
            }

            j--
            k++
        }
    }

    for (let i = 0; i < s.length; i++) {
        findLongest(i - 1, i + 1)
        findLongest(i, i + 1)
    }

    return s.substr(start, longest)
}

export function longestPalindromeDP(s: string): string {
    if (s.length === 0) {
        return ""
    }

    const dp: any = []
    for (let i = 0; i < s.length; i++) {
        dp[i] = []
    }

    let longest = 1
    let start = 0

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (i - j < 2) {
                // i next to j or i == j
                dp[j][i] = s[i] === s[j]
            }
            else {
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

    return s.substr(start, longest)
}
