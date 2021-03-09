function throttle(method, context = null) {
    clearTimeout(method.timerID)
    method.timerID = setTimeout(() => {
        method.call(context)
    }, 100)
}
