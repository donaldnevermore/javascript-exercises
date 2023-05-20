function outputNumbers(count) {
    for (var i = 0; i < count; i++) {
        console.log(i)
    }

    var i
    console.log(i)
}

function outputNumbers2(count) {
    (function () {
        for (var i = 0; i < count; i++) {
            console.log(i)
        }
    })()

    // Throws error
    console.log(i)
}

(function () {
    let now = new Date()
    if (now.getMonth() === 0 && now.getDate() === 1) {
        console.log("Happy new year!")
    }
})()
