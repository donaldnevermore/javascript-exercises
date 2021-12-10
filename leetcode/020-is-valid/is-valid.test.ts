import { isValid } from "./is-valid"

test("", () => {
    const a = isValid("()[]{}")
    expect(a).toBe(true)

    const b = isValid("([)]")
    expect(b).toBe(false)

    const c = isValid("{[]}")
    expect(c).toBe(true)
})
