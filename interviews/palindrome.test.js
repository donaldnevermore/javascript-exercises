const isPalindrome = require("./palindrome")

test("palindrome", () => {
    expect(isPalindrome("aba")).toBe(true)
    expect(isPalindrome("abc")).toBe(false)
})
