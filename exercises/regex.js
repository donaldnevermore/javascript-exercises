let text = 'cat,bat,sat,fat'
let pattern = /.at/
let matches = text.match(pattern)
console.log(matches.index)
console.log(matches[0])
console.log(pattern.lastIndex)

let pos = text.search(/at/)
console.log(pos)

let result = text.replace(/at/g, 'ond')
console.log(result)
