function throttle(func, delay) {
    let shouldWait = false

    return function (...args) {
        if (!shouldWait) {
            func.apply(this, args)
            shouldWait = true

            setTimeout(() => {
                shouldWait = false
            }, delay)
        }
    }
}

function debounce(func, delay) {
    let timeout

    return function (...args) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            timeout = null
            func.apply(this, args)
        }, delay)
    }
}
