function isPalindrome(input) {
    if (typeof input !== "string") {
        return false;
    }

    return input.split("").reverse().join("") === input;
}

module.exports = isPalindrome;
