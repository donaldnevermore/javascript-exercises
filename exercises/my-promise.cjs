const STATUS = {
    PENDING: "PENDING",
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED"
}

const isFunction = ctor => typeof ctor === "function"
const isNativeFunction = ctor => isFunction(ctor) && /native code/.test(ctor.toString())
const isIterable = ctor => ctor != null && isFunction(ctor[Symbol.iterator])

const nextTaskQueue = cb => {
    if (queueMicrotask !== undefined && isNativeFunction(queueMicrotask)) {
        queueMicrotask(cb)
    } else if (MutationObserver !== undefined && (isNativeFunction(MutationObserver) ||
        MutationObserver.toString() === "[object MutationObserverConstructor]")) {
        const observer = new MutationObserver(cb)
        const node = document.createTextNode("1")

        observer.observe(node, { characterData: true })
        node.data = "2"
    } else if (process !== undefined && isFunction(process.nextTick)) {
        process.nextTick(cb)
    } else {
        setTimeout(() => {
            cb()
        }, 0)
    }
}

const handlePromise = (newPromise, result, resolve, reject) => {
    if (newPromise === result) {
        return reject(new TypeError("Chaining cycle detected."))
    }

    let called = false
    if (result !== null && (typeof result === "object" || isFunction(result))) {
        try {
            const { then } = result
            if (isFunction(then)) {
                then.call(result, value => {
                    if (!called) {
                        called = true
                        nextTaskQueue(() => {
                            handlePromise(newPromise, value, resolve, reject)
                        })
                    }
                },
                reason => {
                    if (!called) {
                        called = true
                        nextTaskQueue(() => {
                            reject(reason)
                        })
                    }
                })
            } else {
                resolve(result)
            }
        } catch (err) {
            if (!called) {
                called = true
                reject(err)
            }
        }
    } else {
        resolve(result)
    }
}

class MyPromise {
    state = STATUS.PENDING
    result = null

    // Resolve & reject callback queues.
    resolveQueue = []
    rejectQueue = []

    constructor(executor) {
        const resolve = value => {
            if (this.state === STATUS.PENDING) {
                try {
                    handlePromise(this, value, resolveCore, reject)
                } catch (err) {
                    reject(err)
                }
            }
        }

        const resolveCore = value => {
            this.state = STATUS.FULFILLED
            this.result = value

            nextTaskQueue(() => {
                while (this.resolveQueue.length !== 0) {
                    const callback = this.resolveQueue.shift()
                    callback(value)
                }
            })
        }

        const reject = reason => {
            if (this.state === STATUS.PENDING) {
                this.state = STATUS.REJECTED
                this.result = reason
            }

            nextTaskQueue(() => {
                while (this.rejectQueue.length !== 0) {
                    const callback = this.rejectQueue.shift()
                    callback(reason)
                }
            })
        }

        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== "function") {
            onFulfilled = value => value
        }

        if (typeof onRejected !== "function") {
            onRejected = reason => {
                throw reason
            }
        }

        const newPromise = new MyPromise((resolve, reject) => {
            const fulfilled = value => {
                try {
                    const result = onFulfilled(value)
                    handlePromise(newPromise, result, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }

            const rejected = reason => {
                try {
                    const result = onRejected(reason)
                    handlePromise(newPromise, result, resolve, reject)
                } catch (err) {
                    reject(err)
                }
            }

            switch (this.state) {
            case STATUS.FULFILLED:
                nextTaskQueue(() => {
                    fulfilled(this.result)
                })
                break
            case STATUS.REJECTED:
                nextTaskQueue(() => {
                    rejected(this.result)
                })
                break
            case STATUS.PENDING:
                this.resolveQueue.push(fulfilled)
                this.rejectQueue.push(rejected)
                break
            default:
                break
            }
        })

        return newPromise
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(onFinally) {
        return this.then(
            value => MyPromise.resolve(onFinally()).then(() => value),
            reason => MyPromise.resolve(onFinally()).then(() => {
                throw reason
            })
        )
    }

    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        }

        return new MyPromise(resolve => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason)
        })
    }

    static all(promises) {
        if (!isIterable(promises)) {
            throw new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`)
        }

        return new MyPromise((resolve, reject) => {
            const promiseList = [...promises]
            const len = promiseList.length
            const result = []
            let resolvedCount = 0

            if (len === 0) {
                resolve(promiseList)
            } else {
                promiseList.forEach((promise, index) => {
                    MyPromise.resolve(promise).then(value => {
                        resolvedCount++
                        result[index] = value
                        if (resolvedCount === len) {
                            resolve(result)
                        }
                    },
                    reason => {
                        reject(reason)
                    })
                })
            }
        })
    }

    static allSettled(promises) {
        if (!isIterable(promises)) {
            throw new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`)
        }

        return new MyPromise(resolve => {
            const promiseList = [...promises]
            const len = promiseList.length
            const result = []
            let settledCount = 0

            if (len === 0) {
                resolve(promiseList)
            } else {
                promiseList.forEach((promise, index) => {
                    MyPromise.resolve(promise).then(value => {
                        settledCount++
                        result[index] = { status: STATUS.FULFILLED, value }
                        if (settledCount === len) {
                            resolve(result)
                        }
                    },
                    reason => {
                        settledCount++
                        result[index] = { status: STATUS.REJECTED, reason }
                        if (settledCount === len) {
                            resolve(result)
                        }
                    })
                })
            }
        })
    }

    static race(promises) {
        if (!isIterable(promises)) {
            throw new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`)
        }

        return new MyPromise((resolve, reject) => {
            const promiseList = [...promises]
            promiseList.forEach(promise => {
                MyPromise.resolve(promise).then(value => {
                    resolve(value)
                },
                reason => {
                    reject(reason)
                })
            })
        })
    }

    static any(promises) {
        if (!isIterable(promises)) {
            throw new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`)
        }

        return new Promise((resolve, reject) => {
            const promiseList = [...promises]
            const len = promiseList.length
            const errors = []
            let errorCount = 0

            if (len === 0) {
                reject(new AggregateError(errors, "All promises were rejected"))
            } else {
                promiseList.forEach(promise => {
                    MyPromise.resolve(promise).then(value => {
                        resolve(value)
                    },
                    reason => {
                        errorCount++
                        errors.push(reason)
                        if (errorCount === len) {
                            reject(new AggregateError(errors, "All promises were rejected"))
                        }
                    })
                })
            }
        })
    }
}

MyPromise.defer = MyPromise.deferred = function () {
    const dfd = {}
    dfd.promise = new MyPromise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = MyPromise
