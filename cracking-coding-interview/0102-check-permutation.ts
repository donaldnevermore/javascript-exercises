// A simple method: sort 2 strings and compare them.

function checkPermutation(s1: string, s2: string): boolean {
    if (s1.length !== s2.length) {
        return false;
    }

    const charCount: number[] = [];

    for (let i = 0; i < s1.length; i++) {
        const ch = s1.charCodeAt(i);
        if (charCount[ch]) {
            charCount[ch]++;
        } else {
            charCount[ch] = 1;
        }
    }

    for (let j = 0; j < s2.length; j++) {
        const ch = s2.charCodeAt(j);
        if (charCount[ch] && charCount[ch] > 0) {
            charCount[ch]--;
        } else {
            return false;
        }
    }

    return true;
}

console.log(checkPermutation("abc", "bca"));
console.log(checkPermutation("abc", "bad"));
