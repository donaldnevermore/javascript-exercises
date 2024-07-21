function findLongestWord(s: string, dictionary: string[]): string {
    let longest = "";

    for (const word of dictionary) {
        if (longest.length > word.length || (longest.length === word.length && longest < word)) {
            continue;
        }

        if (isSubstring(s, word)) {
            longest = word;
        }
    }

    return longest;
}

function isSubstring(s: string, word: string): boolean {
    let i = 0;
    let j = 0;

    while (i < s.length && j < word.length) {
        if (s[i] === word[j]) {
            j++;
        }
        i++;
    }

    return j === word.length;
}
