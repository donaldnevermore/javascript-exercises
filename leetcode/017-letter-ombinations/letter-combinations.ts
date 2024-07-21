function letterCombinations(digits: string): string[] {
    if (digits.length === 0) {
        return [];
    }

    const map: { [key: string]: string } = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz",
    };
    const result: string[] = [];
    backtrack(digits, map, 0, [], result);
    return result;
}

function backtrack(
    digits: string,
    map: { [key: string]: string },
    index: number,
    combination: string[],
    result: string[],
) {
    if (index === digits.length) {
        result.push(combination.join(""));
    } else {
        const letters = map[digits[index]];
        for (let i = 0; i < letters.length; i++) {
            combination.push(letters[i]);
            backtrack(digits, map, index + 1, combination, result);
            combination.splice(index, 1);
        }
    }
}

const a = letterCombinations("23");
console.log(a);
