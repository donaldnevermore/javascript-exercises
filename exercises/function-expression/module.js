let singleton = (function () {
    let privateVariable = 10

    function privateFunction() {
        return false
    }

    return {
        publicProperty: true,

        publicMethod: function () {
            privateVariable++
            return privateFunction()
        },
    }
})()

let application = (function () {
    let components = []

    components.push(new BaseComponent())

    return {
        getComponentCount: function () {
            return components.length
        },

        registerComponent: function (component) {
            if (typeof component === "object") {
                components.push(component)
            }
        },
    }
})()
