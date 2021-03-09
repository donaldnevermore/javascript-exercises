function deepCopy(obj) {
    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj !== "object") {
        return obj
    }

    // Handle Date
    if (obj instanceof Date) {
        let copy = new Date()
        copy.setTime(obj.getTime())
        return copy
    }

    // Handle Array
    if (obj instanceof Array) {
        let copy = []
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i])
        }
        return copy
    }

    // Handle Function
    if (obj instanceof Function) {
        const copy = function () {
            return obj.apply(this, arguments)
        }

        return copy
    }

    // Handle Object
    if (obj instanceof Object) {
        let copy = {}

        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = deepCopy(obj[attr])
            }
        }

        return copy
    }

    throw new Error(
        "Unable to copy obj as type isn't supported " + obj.constructor.name
    )
}

let arr = [{ a: 1, city: ["x", "y", "z"] }, { b: 2 }]
let arr2 = deepCopy(arr)
console.log(arr)
console.log(arr2)
