function createComparisonFunction(propertyName) {
    return function (object1, object2) {
        // propertyName is still accessible even though the function is returned
        let value1 = object1[propertyName]
        let value2 = object2[propertyName]
        if (value1 < value2) {
            return -1
        }
        else if (value1 > value2) {
            return 1
        }
        else {
            return 0
        }
    }
}

function compare(value1, value2) {
    if (value1 < value2) {
        return -1
    }
    else if (value1 > value2) {
        return 1
    }
    else {
        return 0
    }
}

let result = compare(5, 10)

let compare2 = createComparisonFunction("name")
let result2 = compare2({ name: "Nicholas" }, { name: "Greg" })

let compareNames = createComparisonFunction("name")

let result3 = compareNames({ name: "Nicholas" }, { name: "Greg" })

// To release memory
compareNames = null

function createFunctions() {
    let result = []

    // Bad to use var
    for (let i = 0; i < 10; i++) {
        result[i] = function () {
            return i
        }
    }

    return result
}

function createFunction2() {
    let result = []

    // Bad to use var
    for (let i = 0; i < 10; i++) {
        result[i] = function (num) {
            return (function () {
                return num
            })(i)
        }
    }

    return result
}
