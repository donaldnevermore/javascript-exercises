/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
    if (!nums || nums.length < 2) {
        return [];
    }

    const numbersMap = {};

    for (let i = 0; i < nums.length; i++) {
        const otherNumber = target - nums[i];
        if (nums[i] in numbersMap) {
            return [numbersMap[nums[i]], i];
        }
        else {
            numbersMap[otherNumber] = i;
        }
    }
}

console.log(twoSum([2, 7, 11, 15], 9));
