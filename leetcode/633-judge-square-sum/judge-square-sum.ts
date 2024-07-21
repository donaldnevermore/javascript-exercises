function judgeSquareSum(c: number): boolean {
    if (c < 0) {
        return false;
    }

    let left = 0;
    let right = Math.floor(Math.sqrt(c));

    while (left <= right) {
        const sum = left * left + right * right;
        if (sum < c) {
            left++;
        } else if (sum > c) {
            right--;
        } else {
            return true;
        }
    }

    return false;
}
