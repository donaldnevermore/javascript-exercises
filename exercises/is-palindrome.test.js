const isPalindrome = require("./is-palindrome")

test("palindrome", () => {
    expect(isPalindrome("aba")).toBe(true)
    expect(isPalindrome("abc")).toBe(false)
})
