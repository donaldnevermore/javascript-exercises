export function threeSumClosest(nums: number[], target: number): number {
    if (nums.length < 3) {
        throw new Error("Invalid argument.")
    }

    nums.sort((a, b) => a - b)
    let closest: number | null = null

    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }

        let left = i + 1
        let right = nums.length - 1

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right]
            if (sum === target) {
                return sum
            }

            if (closest === null || Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum
            }

            if (sum < target) {
                left++
                while (left < right && nums[left] === nums[left - 1]) {
                    left++
                }
            }
            else {
                right--
                while (left < right && nums[right] === nums[right + 1]) {
                    right--
                }
            }
        }
    }

    return closest as number
}
