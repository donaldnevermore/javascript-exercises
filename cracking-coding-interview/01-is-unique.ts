function isUnique(astr: string): boolean {
    if (astr.length > 128) {
        return false
    }

    const arr: boolean[] = []

    for (let i = 0; i < astr.length; i++) {
        const code = astr.charCodeAt(i)
        if (arr[code]) {
            return false
        }
        else {
            arr[code] = true
        }
    }

    return true
}

function unique(astr: string): boolean {
    let checker = 0
    for (let i = 0; i < astr.length; i++) {
        const val = astr.charCodeAt(i)
        if ((checker & (1 << val)) > 0) {
            return false
        }

        checker |= (1 << val)
    }

    return true
}

console.log(unique("abc"))
console.log(unique("aba"))
