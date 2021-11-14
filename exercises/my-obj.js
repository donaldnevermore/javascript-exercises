var myObj = {
    name: "腾讯1",
    showThis: function () {
        console.log(this)
        var self = this

        function bar() {
            self.name = "腾讯2"
        }

        bar()
    },
}

myObj.showThis() // myObj 对象
console.log(myObj.name) // 腾讯2
console.log(globalThis.name) // undefined
