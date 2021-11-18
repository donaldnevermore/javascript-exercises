import { myPow } from "./my-pow"

test("my pow", () => {
    const n = myPow(2.0, 10)
    expect(n).toBe(1024.0)

    const n2 = myPow(2.1, 3)
    expect(n2).toBeCloseTo(9.261, 3)

    const n3 = myPow(2.0, -2)
    expect(n3).toBeCloseTo(0.25)
})
