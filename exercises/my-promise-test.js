import MyPromise from "./my-promise.cjs"

// Test sync
const myPromise = new MyPromise((resolve, reject) => {
    resolve("Promise sync")
})

myPromise.then((res) => {
    console.log(res)
})

// Test async
const myPromise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise async")
    }, 500)
})

myPromise2.then((res) => {
    console.log(res)
})

// Test chain
const myPromise3 = new MyPromise((resolve, reject) => {
    resolve("First")
})

myPromise3.then((res) => {
    console.log(res)
    return new MyPromise((resolve, reject) => {
        resolve("Promise second")
    })
})
    .then()
    .then((res) => {
        console.log(res)
        return "Third"
    })
    .then((res) => {
        console.log(res)
    })

// Test catch
const myPromise4 = new MyPromise((resolve, reject) => {
    reject("Promise reject")
})

myPromise4.catch((e) => {
    console.log(e)
})

// Test all
const myPromise5 = MyPromise.resolve(1)
const myPromise6 = MyPromise.resolve(2)
const myPromise7 = MyPromise.resolve(3)

MyPromise.all([myPromise5, myPromise6, myPromise7]).then((res) => {
    console.log(res)
})

const myPromise8 = MyPromise.resolve(1)
const myPromise9 = MyPromise.reject("reject")
const myPromise10 = MyPromise.resolve(3)

MyPromise.all([myPromise8, myPromise9, myPromise10])
    .then((res) => {
        console.log(res, "resolve")
    })
    .catch((e) => {
        console.log(e)
    })

// Test resolve
MyPromise.resolve("static resolve").then((res) => {
    console.log(res)
})

// Test reject
MyPromise.reject("static reject").catch((e) => {
    console.log(e)
})

// Test allSettled
const myPromise11 = MyPromise.resolve(1)
const myPromise12 = MyPromise.resolve(2)
const myPromise13 = MyPromise.resolve(3)

MyPromise.allSettled([myPromise11, myPromise12, myPromise13]).then((res) => {
    console.log(res)
})

const myPromise14 = MyPromise.resolve(1)
const myPromise15 = MyPromise.resolve("reject")
const myPromise16 = MyPromise.resolve(3)

MyPromise.allSettled([myPromise14, myPromise15, myPromise16]).then((res) => {
    console.log(res)
})

// Test finally
const myPromise17 = MyPromise.resolve(1)

myPromise17.then((res) => {
    console.log(res)
})
    .finally(() => {
        console.log("finally resolve")
    })

const myPromise18 = MyPromise.reject(2)
myPromise18.then((res) => {
    console.log(res)
})
    .catch((e) => {
        console.log(e)
    })
    .finally(() => {
        console.log("finally reject")
    })

// Test race
const myPromise19 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 500, "one")
})

const myPromise20 = new MyPromise((resolve, reject) => {
    setTimeout(resolve, 100, "two")
})

MyPromise.race([myPromise19, myPromise20]).then((value) => {
    console.log(value)
})
