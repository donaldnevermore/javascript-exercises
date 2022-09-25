/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m - 1
    let j = n - 1
    let merged = m + n - 1

    while (i >= 0 || j >= 0) {
        if (i < 0) {
            nums1[merged] = nums2[j]
            j--
        }
        else if (j < 0) {
            nums1[merged] = nums1[i]
            i--
        }
        else if (nums1[i] < nums2[j]) {
            nums1[merged] = nums2[j]
            j--
        }
        else {
            nums1[merged] = nums1[i]
            i--
        }

        merged--
    }
}
