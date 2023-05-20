function factorial(num) {
    if (num <= 1) {
        return 1
    }
    else {
        return num * factorial(num - 1)
    }
}

let anotherFactorial = factorial
factorial = null
// Throws error
// console.log(anotherFactorial(4));

function factorial2(num) {
    if (num <= 1) {
        return 1
    }
    else {
        return num * arguments.callee(num - 1)
    }
}

let anotherFactorial2 = factorial2
factorial2 = null
console.log(anotherFactorial2(4))

let factorial3 = function f(num) {
    if (num <= 1) {
        return 1
    }
    else {
        return num * f(num - 1)
    }
}

let anotherFactorial3 = factorial3
factorial3 = null
console.log(anotherFactorial3(4))
