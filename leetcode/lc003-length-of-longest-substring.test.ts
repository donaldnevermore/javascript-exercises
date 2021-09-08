import { lengthOfLongestSubstring } from "./lc003-length-of-longest-substring"

test("length-of-longest-substring", () => {
    const r = lengthOfLongestSubstring("arabcacfr")
    expect(r).toBe(4)
})
