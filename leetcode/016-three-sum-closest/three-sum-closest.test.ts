import { threeSumClosest } from "./three-sum-closest"

test("", () => {
    const a = threeSumClosest([-1, 2, 1, -4], 1)
    expect(a).toBe(2)

    const b = threeSumClosest([0, 0, 0], 1)
    expect(b).toBe(0)
})
