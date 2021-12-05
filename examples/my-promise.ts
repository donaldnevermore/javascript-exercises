enum PromiseStatus {
    PENDING,
    RESOLVED,
    REJECTED
}

export class MyPromise {
    private status: PromiseStatus = PromiseStatus.PENDING
    private value: any = null
    private reason: any = null

    private resolves: ((value: any) => any)[] = []
    private rejects: ((reason: any) => void)[] = []

    public constructor(executor: (resolve: any, reject: any) => void) {
        const resolve = (value: any) => {
            if (this.status === PromiseStatus.PENDING) {
                this.status = PromiseStatus.RESOLVED
                this.value = value
            }

            while (this.resolves.length > 0) {
                const callback = this.resolves.shift()
                callback!(value)
            }
        }

        const reject = (reason: any) => {
            if (this.status === PromiseStatus.PENDING) {
                this.status = PromiseStatus.REJECTED
                this.reason = reason
            }

            while (this.rejects.length > 0) {
                const callback = this.rejects.shift()
                callback!(reason)
            }
        }

        try {
            executor(resolve, reject)
        }
        catch (e: any) {
            reject(e)
        }
    }

    public then(resolve: any, reject: any): MyPromise {
        if (typeof resolve !== "function") {
            resolve = (value: any) => value
        }

        if (typeof reject !== "function") {
            reject = (reason: any) => {
                throw new Error(reason instanceof Error ? reason.message : reason)
            }
        }

        return new MyPromise((resolveFunc: any, rejectFunc: any) => {
            const fulfilled = (value: any) => {
                try {
                    const res = resolve(value)
                    if (res instanceof MyPromise) {
                        res.then(resolveFunc, rejectFunc)
                    }
                    else {
                        resolveFunc(res)
                    }
                }
                catch (e: any) {
                    rejectFunc(e)
                }
            }

            const rejected = (reason: any) => {
                try {
                    const res = reject(reason)
                    if (res instanceof MyPromise) {
                        res.then(resolveFunc, rejectFunc)
                    }
                    else {
                        rejectFunc(res)
                    }
                }
                catch (e: any) {
                    rejectFunc(e instanceof Error ? e.message : e)
                }
            }

            switch (this.status) {
            case PromiseStatus.RESOLVED:
                fulfilled(this.value)
                break
            case PromiseStatus.REJECTED:
                rejected(this.reason)
                break
            case PromiseStatus.PENDING:
                this.resolves.push(fulfilled)
                this.rejects.push(rejected)
                break
            default:
                break
            }
        })
    }

    public catch(errorFunc: (reason: any) => void) {
        return this.then(null, errorFunc)
    }

    public finally(callback: () => void): MyPromise {
        return new MyPromise((resolve: any, reject: any) => {
            callback()
            resolve()
        })
    }

    public static all(promises: MyPromise[]): MyPromise {
        return new MyPromise((resolve: any, reject: any) => {
            const deepPromise = (promise: any, index: number, result: any[]) => {
                if (index > promises.length - 1) {
                    return
                }

                if (typeof promise.then === "function") {
                    promise.then(
                        (value: any) => {
                            index++
                            result.push(value)
                            deepPromise(promises[index], index, result)
                        },
                        (reason: any) => {
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

            const result: any[] = []
            deepPromise(promises[0], 0, result)
            resolve(result)
        })
    }

    public static resolve(value: any){
        return new MyPromise((resolve: any, reject: any) => {
            resolve(value)
        })
    }

    public static reject(reason: any){
        return new MyPromise((resolve: any, reject: any) => {
            reject(reason)
        })
    }

    public static allSettled(promises: MyPromise[]): MyPromise {
        return new MyPromise((resolve: any, reject: any) => {
            const deepPromise = (promise: any, index: number, result: {status: string, value: any}[]) => {
                if (index > promises.length - 1) {
                    return
                }

                if (typeof promise.then === "function") {
                    promise.then((value: any) => {
                        index++
                        result.push({ status:"fulfilled", value })
                        deepPromise(promises[index], index, result)
                    },
                    (reason: any) => {
                        index++
                        result.push({ status: "rejected", value: reason })
                        deepPromise(promises[index], index, result)
                    })
                }
                else {
                    index++
                    result.push({ status:"fulfilled", value: promise })
                    deepPromise(promises[index], index, result)
                }
            }

            const result: {status: string, value: any}[] = []
            deepPromise(promises[0], 0, result)
            resolve(result)
        })
    }

    public static race(promises: MyPromise[]): MyPromise {
        return new MyPromise((resolve: any, reject: any) => {
            let done = false
            for (const promise of promises) {
                promise.then((value: any) => {
                    if (done) {
                        return
                    }
                    done = true
                    resolve(value)
                },
                (reason: any) => {
                    if (done) {
                        return
                    }
                    done = true
                    reject(reason)
                })
            }
        })
    }
}
