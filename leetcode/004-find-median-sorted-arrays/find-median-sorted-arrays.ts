function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const totalLength = nums1.length + nums2.length
    const mid = Math.floor(totalLength / 2)
    if (totalLength % 2 === 1) {
        return getKthElement(nums1, nums2, mid + 1)
    }
    else {
        return (getKthElement(nums1, nums2, mid) + getKthElement(nums1, nums2, mid + 1)) / 2.0
    }
}

function getKthElement(nums1: number[], nums2: number[], k: number): number {
    let i = 0
    let j = 0

    for (;;) {
        if (i > nums1.length - 1) {
            return nums2[j + k - 1]
        }
        if (j > nums2.length - 1) {
            return nums1[i + k - 1]
        }
        if (k === 1) {
            return Math.min(nums1[i], nums2[j])
        }

        const halfK = Math.floor(k / 2)
        const m = Math.min(i + halfK, nums1.length) - 1
        const n = Math.min(j + halfK, nums2.length) - 1

        if (nums1[m] <= nums2[n]) {
            k -= m - i + 1
            i = m + 1
        }
        else {
            k -= n - j + 1
            j = n + 1
        }
    }
}

console.log(findMedianSortedArrays([1, 2, 4, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]))
