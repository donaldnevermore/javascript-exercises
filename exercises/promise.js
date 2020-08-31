const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";

class MyPromise {
    status = PENDING;
    value = undefined;
    reason = undefined;

    // Resolves & rejects callback queues.
    resolves = [];
    rejects = [];

    constructor(executor) {
        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVED;
                this.value = value;
            }

            while (this.resolves.length > 0) {
                const callback = this.resolves.shift();
                callback(value);
            }
        };

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
            }

            while (this.rejects.length > 0) {
                const callback = this.rejects.shift();
                callback(reason);
            }
        };

        try {
            executor(resolve, reject);
        }
        catch (e) {
            reject(e);
        }
    }

    then(resolve, reject) {
        if (typeof resolve !== "function") {
            resolve = value => value;
        }

        if (typeof reject !== "function") {
            reject = reason => {
                throw new Error(reason instanceof Error ? reason.message : reason);
            };
        }

        return new MyPromise((resolveFunc, rejectFunc) => {
            const fulfilled = value => {
                try {
                    const res = resolve(value);
                    if (res instanceof MyPromise) {
                        res.then(resolveFunc, rejectFunc);
                    }
                    else {
                        resolveFunc(res);
                    }
                }
                catch (e) {
                    rejectFunc(e);
                }
            };

            const rejected = reason => {
                try {
                    const res = reject(reason);
                    if (res instanceof MyPromise) {
                        res.then(resolveFunc, rejectFunc);
                    }
                    else {
                        rejectFunc(res);
                    }
                }
                catch (e) {
                    rejectFunc(e instanceof Error ? e.message : e);
                }
            };

            switch (this.status) {
                case RESOLVED:
                    fulfilled(this.value);
                    break;
                case REJECTED:
                    rejected(this.reason);
                    break;
                case PENDING:
                    this.resolves.push(fulfilled);
                    this.rejects.push(rejected);
                    break;
                default:
                    break;
            }

        });
    }

    catch(errorFunc) {
        this.then(null, errorFunc);
    }
}

// Test sync
const myPromise = new MyPromise((resolve, reject) => {
    resolve("Promise sync");
});

myPromise.then(res => {
    console.log(res);
});

// Test async
const myPromise2 = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve("Promise async");
    }, 500);
});

myPromise2.then(res => {
    console.log(res);
});

// Test chain
const myPromise3 = new MyPromise((resolve, reject) => {
    resolve("First");
});

myPromise3.then(res => {
    console.log(res);
    return new MyPromise((resolve, reject) => {
        resolve("Promise second");
    });
}).then().then(res => {
    console.log(res);
    return "Third";
}).then(res => {
    console.log(res);
});

// Test catch
const myPromise4 = new MyPromise((resolve, reject) => {
    reject("Promise reject");
});

myPromise4.catch(e => {
    console.log(e);
});
