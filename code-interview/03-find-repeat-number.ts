function findRepeatNumber(nums: number[]): number {
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] !== i) {
            const temp = nums[i];
            if (nums[i] === nums[temp]) {
                return nums[i];
            }

            // Swap
            nums[i] = nums[temp];
            nums[temp] = temp;
        }
    }

    return -1;
}

function findRepeatNumber2(nums: number[]): number {
    const arr: boolean[] = new Array(nums.length);
    for (const v of nums) {
        if (arr[v]) {
            return v;
        } else {
            arr[v] = true;
        }
    }

    return -1;
}

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));
