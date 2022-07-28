function myAtoi(s: string): number {
    const auto = new Automaton()

    for (const ch of s) {
        auto.get(ch)
    }

    return auto.sign * auto.sum
}

class Automaton {
    private table: {[index: string]: string[]} = {
        "start": ["start", "signed", "in_number", "end"],
        "signed": ["end", "end", "in_number", "end"],
        "in_number": ["end", "end", "in_number", "end"],
        "end": ["end", "end", "end", "end"],
    }
    private state = "start"
    public sign = 1
    public sum = 0

    public get(ch: string) {
        const col = this.getCol(ch)
        this.state = this.table[this.state][col]

        switch (this.state) {
        case "signed":
            if (ch === "-") {
                this.sign = -1
            }
            break
        case "in_number": {
            const n = ch.charCodeAt(0) - "0".charCodeAt(0)
            this.sum = this.sum * 10 + n
            if (this.sign === 1) {
                this.sum = Math.min(this.sum, 2 ** 31 - 1)
            }
            else {
                this.sum = Math.min(this.sum, 2 ** 31)
            }
            break
        }
        default:
            break
        }
    }

    private getCol(ch: string) {
        switch (ch) {
        case " ":
            return 0
        case "+":
        case "-":
            return 1
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return 2
        default:
            return 3
        }
    }
}

console.log(myAtoi("4193 with words"))
console.log(myAtoi("-91283472332"))
