const isPalindrome = require("./palindrome");

test("回文字符串", () => {
    expect(isPalindrome("aba")).toBe(true);
    expect(isPalindrome("abc")).toBe(false);
});
