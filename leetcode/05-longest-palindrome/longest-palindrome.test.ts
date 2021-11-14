import { longestPalindrome, longestPalindromeDP } from "./longest-palindrome"

test("longest palindrome", () => {
    const r = longestPalindrome("abbabbcc")
    expect(r).toBe("bbabb")

    const r2 = longestPalindrome("abba")
    expect(r2).toBe("abba")

    const r3 = longestPalindrome("a")
    expect(r3).toBe("a")

    const r4 = longestPalindrome("asaqwerewq")
    expect(r4).toBe("qwerewq")

    const d = longestPalindromeDP("abbabbcc")
    expect(d).toBe("bbabb")

    const d2 = longestPalindromeDP("asaqwerewq")
    expect(d2).toBe("qwerewq")
})
