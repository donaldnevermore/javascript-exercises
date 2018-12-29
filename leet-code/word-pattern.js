/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
function wordPattern (pattern, str) {
  let pat = pattern.split('')
  let words = str.split(' ')

  if (pat.length !== words.length) {
    return false
  }

  let dict = {}

  for (let i = 0; i < pat.length; i++) {
    let key = pat[i]
    let value = words[i]

    if (!dict[key]) {
      dict[key] = value

      let vals = Object.values(dict)
      let sets = new Set(vals)
      if (vals.length !== sets.size) {
        // 值不一样
        return false
      }
    } else {
      if (dict[key] !== value) {
        // 键不一样
        return false
      }
    }
  }

  return true
}

console.log(wordPattern('abba', 'dog cat cat dog'))
console.log(wordPattern('abba', 'dog dog dog dog'))
