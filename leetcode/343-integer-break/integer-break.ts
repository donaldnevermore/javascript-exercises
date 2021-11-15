export function integerBreak(n: number): number {
    if (n <= 1) {
        return 0
    }

    const dp: any = []

    for (let i = 0; i < n + 1; i++) {
        dp[i] = 0
    }

    for (let i = 2; i <= n; i++) {
        let max = 0

        for (let j = 1; j <= Math.floor(i / 2); j++) {
            const product = Math.max(j * (i - j), j * dp[i - j])
            if (max < product) {
                max = product
            }
        }

        dp[i] = max
    }

    return dp[n]
}
