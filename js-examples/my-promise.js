const PENDING = "PENDING"
const RESOLVED = "RESOLVED"
const REJECTED = "REJECTED"

class MyPromise {
    status = PENDING
    value = null
    reason = null

    // Resolves & rejects callback queues.
    resolves = []
    rejects = []

    constructor(executor) {
        const resolve = value => {
            if (this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
            }

            while (this.resolves.length > 0) {
                const callback = this.resolves.shift()
                callback(value)
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
            }

            while (this.rejects.length > 0) {
                const callback = this.rejects.shift()
                callback(reason)
            }
        }

        try {
            executor(resolve, reject)
        }
        catch (e) {
            reject(e)
        }
    }

    then(resolve, reject) {
        if (typeof resolve !== "function") {
            resolve = value => value
        }

        if (typeof reject !== "function") {
            reject = reason => {
                throw new Error(reason instanceof Error ? reason.message : reason)
            }
        }

        return new MyPromise((resolveFunc, rejectFunc) => {
            const fulfilled = value => {
                try {
                    const res = resolve(value)
                    if (res instanceof MyPromise) {
                        res.then(resolveFunc, rejectFunc)
                    }
                    else {
                        resolveFunc(res)
                    }
                }
                catch (e) {
                    rejectFunc(e)
                }
            }

            const rejected = reason => {
                try {
                    const res = reject(reason)
                    if (res instanceof MyPromise) {
                        res.then(resolveFunc, rejectFunc)
                    }
                    else {
                        rejectFunc(res)
                    }
                }
                catch (e) {
                    rejectFunc(e instanceof Error ? e.message : e)
                }
            }

            switch (this.status) {
            case RESOLVED:
                fulfilled(this.value)
                break
            case REJECTED:
                rejected(this.reason)
                break
            case PENDING:
                this.resolves.push(fulfilled)
                this.rejects.push(rejected)
                break
            default:
                break
            }
        })
    }

    catch(errorFunc) {
        return this.then(null, errorFunc)
    }

    finally(callback) {
        return new MyPromise((resolve, reject) => {
            callback()
            resolve()
        })
    }

    static all(promises) {
        return new MyPromise((resolve, reject) => {
            const deepPromise = (promise, index, result) => {
                if (index > promises.length - 1) {
                    return
                }

                if (typeof promise.then === "function") {
                    promise.then(
                        value => {
                            index++
                            result.push(value)
                            deepPromise(promises[index], index, result)
                        },
                        reason => {
                            reject(reason)
                        }
                    )
                }
                else {
                    index++
                    result.push(promise)
                    deepPromise(promises[index], index, result)
                }
            }

            const result = []
            deepPromise(promises[0], 0, result)
            resolve(result)
        })
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason)
        })
    }

    static allSettled(promises) {
        return new MyPromise((resolve, reject) => {
            const deepPromise = (promise, index, result) => {
                if (index > promises.length - 1) {
                    return
                }

                if (typeof promise.then === "function") {
                    promise.then(
                        value => {
                            index++
                            result.push({ status: "fulfilled", value })
                            deepPromise(promises[index], index, result)
                        },
                        reason => {
                            index++
                            result.push({ status: "rejected", value: reason })
                            deepPromise(promises[index], index, result)
                        }
                    )
                }
                else {
                    index++
                    result.push({ status: "fulfilled", value: promise })
                    deepPromise(promises[index], index, result)
                }
            }

            const result = []
            deepPromise(promises[0], 0, result)
            resolve(result)
        })
    }

    static race(promises) {
        return new MyPromise((resolve, reject) => {
            let done = false
            for (const promise of promises) {
                promise.then(
                    value => {
                        if (done) {
                            return
                        }
                        done = true
                        resolve(value)
                    },
                    reason => {
                        if (done) {
                            return
                        }
                        done = true
                        reject(reason)
                    }
                )
            }
        })
    }
}

// Test sync
const myPromise = new MyPromise((resolve, reject) => {
    resolve("Promise sync")
})

myPromise.then(res => {
    console.log(res)
})

// Test async
const myPromise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise async")
    }, 500)
})

myPromise2.then(res => {
    console.log(res)
})

// Test chain
const myPromise3 = new MyPromise((resolve, reject) => {
    resolve("First")
})

myPromise3
    .then((res) => {
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

myPromise17
    .then((res) => {
        console.log(res)
    })
    .finally(() => {
        console.log("finally resolve")
    })

const myPromise18 = MyPromise.reject(2)
myPromise18
    .then((res) => {
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
