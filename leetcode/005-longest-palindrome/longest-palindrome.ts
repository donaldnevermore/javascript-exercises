function longestPalindrome(txt: string): string {
    if (txt.length < 2) {
        return txt;
    }

    let longest = 1;
    let position = 0;

    const findLongest = (left: number, right: number) => {
        let l = left;
        let r = right;
        while (l >= 0 && r < txt.length && txt[l] === txt[r]) {
            const distance = r - l + 1;
            if (distance > longest) {
                longest = distance;
                position = l;
            }

            l--;
            r++;
        }
    };

    for (let i = 0; i < txt.length; i++) {
        findLongest(i - 1, i + 1);
        findLongest(i, i + 1);
    }

    return txt.slice(position, position + longest);
}

// maybe slower...
function longestPalindromeDP(s: string): string {
    if (s.length < 2) {
        return s;
    }

    const dp: boolean[][] = new Array(s.length);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(s.length).fill(false);
    }

    let longest = 1;
    let start = 0;

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (i - j < 2) {
                // i next to j or i == j
                dp[j][i] = s[i] === s[j];
            } else {
                // Compare and move i and j closer.
                dp[j][i] = s[i] === s[j] && dp[j + 1][i - 1];
            }

            // Found a longer one.
            const distance = i - j + 1;
            if (dp[j][i] && longest < distance) {
                longest = distance;
                start = j;
            }
        }
    }

    return s.slice(start, start + longest);
}
