const isPalindrome = require('./palindrome')

isType('回文字符串', () => {
  expect(isPalindrome('aba')).toBe(true)
  expect(isPalindrome('abc')).toBe(false)
})