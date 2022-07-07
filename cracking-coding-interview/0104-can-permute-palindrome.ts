function canPermutePalindrome(s: string): boolean {
    const map = new Map<string, boolean>()

    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ") {
            continue
        }

        toggle(map, s[i])
    }

    let count = 0
    for (const [k, v] of map) {
        if (v) {
            count++
        }
    }

    return count <= 1
}

function toggle(map: Map<string, boolean>, k: string) {
    if (!map.has(k)) {
        map.set(k, true)
        return
    }

    if (map.get(k)) {
        map.set(k, false)
    }
    else {
        map.set(k, true)
    }
}

function canPermutePalindromeLetter(s: string): boolean {
    let bitVector = 0

    for (let i = 0; i < s.length; i++) {
        if (s[i] === " ") {
            continue
        }

        const x = s.charCodeAt(i) - "a".charCodeAt(0)
        bitVector = toggleLetter(bitVector, x)
    }

    return (bitVector & (bitVector - 1)) === 0
}

function toggleLetter(bitVector: number, x: number) {
    const mask = 1 << x
    // if ((bitVector & mask) === 0) {
    //     bitVector |= mask
    // }
    // else {
    //     bitVector &= ~mask
    // }
    return bitVector ^ mask
}

console.log(canPermutePalindrome("AaBb//a"))
