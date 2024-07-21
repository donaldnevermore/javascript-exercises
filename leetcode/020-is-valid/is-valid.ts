export function isValid(s: string): boolean {
    if (s.length % 2 !== 0) {
        return false;
    }

    const map: { [index: string]: string } = {
        "(": ")",
        "[": "]",
        "{": "}",
    };
    const stack: string[] = [];

    for (const ch of s) {
        if (ch in map) {
            stack.push(ch);
        } else if (stack.length === 0 || map[stack.pop()!] !== ch) {
            return false;
        }
    }

    return stack.length === 0;
}
