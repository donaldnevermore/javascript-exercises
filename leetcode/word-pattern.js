/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
const wordPattern = function(pattern, str) {
    let pat = pattern.split("");
    let words = str.split(" ");

    if (pat.length !== words.length) {
        return false;
    }

    const dict = {};

    for (let i = 0; i < pat.length; i++) {
        let key = pat[i];
        let value = words[i];

        if (!dict[key]) {
            dict[key] = value;

            let vals = Object.values(dict);
            let sets = new Set(vals);
            if (vals.length !== sets.size) {
                return false;
            }
        }
        else {
            if (dict[key] !== value) {
                return false;
            }
        }
    }

    return true;
}

console.log(wordPattern("abba", "dog cat cat dog"));
console.log(wordPattern("abba", "dog dog dog dog"));
