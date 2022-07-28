function singleNumber(nums: number[]): number {
    let n = 0

    for (const v of nums) {
        n ^= v
    }

    return n
}
