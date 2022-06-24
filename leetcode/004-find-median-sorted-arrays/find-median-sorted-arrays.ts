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

/**
 *
 * @param nums1
 * @param nums2
 * @param k The Kth element's index is k-1.
 * @returns
 */
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

function findMedianSortedArraysFast(nums1: number[], nums2: number[]): number {
    if (nums1.length > nums2.length) {
        return findMedianSortedArraysFast(nums2, nums1)
    }

    const m = nums1.length
    const n = nums2.length
    let left = 0
    let right = m
    let median1 = 0
    let median2 = 0

    while (left <= right) {
        // nums1[0..i-1] and nums2[0..j-1]
        const i = Math.floor((left + right) / 2)
        // nums1[i..m-1] and nums2[j..n-1]
        const j = Math.floor((m + n + 1) / 2) - i

        const numsIm1 = i === 0 ? Number.MIN_SAFE_INTEGER : nums1[i - 1]
        const numsI = i === m ? Number.MAX_SAFE_INTEGER : nums1[i]
        const numsJm1 = j === 0 ? Number.MIN_SAFE_INTEGER : nums2[j - 1]
        const numsJ = j === n ? Number.MAX_SAFE_INTEGER : nums2[j]

        if (numsIm1 <= numsJ) {
            median1 = Math.max(numsIm1, numsJm1)
            median2 = Math.min(numsI, numsJ)
            left = i + 1
        }
        else {
            right = i - 1
        }
    }

    return (m + n) % 2 === 0 ? (median1 + median2) / 2.0 : median1
}

console.log(findMedianSortedArraysFast([1, 2, 4, 9], [1, 2, 3, 4, 5, 6, 7, 8, 9]))
