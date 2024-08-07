const enum STATUS {
    PENDING = "pending",
    FULFILLED = "fulfilled",
    REJECTED = "rejected",
}

type Resolve<T> = (value?: T | PromiseLike<T>) => void;
type Reject = (reason?: any) => void;
type Executor<T> = (resolve?: Resolve<T>, reject?: Reject) => void;
type OnFulfilled<T, TResult1> = ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null;
type OnRejected<TResult> = ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null;
type OnFinally = (() => void) | undefined | null;

// eslint-disable-next-line @typescript-eslint/ban-types
const isFunction = (value: any): value is Function => typeof value === "function";

class MyPromise<T> implements PromiseLike<T> {
    public state = STATUS.PENDING;
    public result!: T;
    private onFulfilledCallbacks: Resolve<T>[] = [];
    private onRejectedCallbacks: Reject[] = [];

    constructor(executor: Executor<T>) {
        const resolve: Resolve<T> = (result) => {
            if (this.state === STATUS.PENDING) {
                queueMicrotask(() => {
                    this.state = STATUS.FULFILLED;
                    this.result = result as T;
                    this.onFulfilledCallbacks.forEach((callback) => callback(result));
                });
            }
        };

        const reject: Reject = (reason) => {
            if (this.state === STATUS.PENDING) {
                queueMicrotask(() => {
                    this.state = STATUS.REJECTED;
                    this.result = reason;
                    this.onRejectedCallbacks.forEach((callback) => callback(reason));
                });
            }
        };

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    public then<TResult1 = T, TResult2 = never>(
        onfulfilled?: OnFulfilled<T, TResult1>,
        onrejected?: OnRejected<TResult2>,
    ): MyPromise<TResult1 | TResult2> {
        onfulfilled = isFunction(onfulfilled)
            ? onfulfilled
            : (value) => {
                  return value as TResult1 | PromiseLike<TResult1>;
              };
        onrejected = isFunction(onrejected)
            ? onrejected
            : (reason) => {
                  throw reason;
              };

        const promise2 = new MyPromise<TResult1 | TResult2>((resolve, reject) => {
            const fulfilled = () => {
                try {
                    const x = onfulfilled?.(this.result as T);
                    resolvePromise(promise2, x!, resolve, reject);
                } catch (err) {
                    reject?.(err);
                }
            };

            const rejected = () => {
                try {
                    const x = onrejected?.(this.result);
                    resolvePromise(promise2, x!, resolve, reject);
                } catch (err) {
                    reject?.(err);
                }
            };

            switch (this.state) {
                case STATUS.FULFILLED:
                    queueMicrotask(fulfilled);
                    break;
                case STATUS.REJECTED:
                    queueMicrotask(rejected);
                    break;
                case STATUS.PENDING:
                    this.onFulfilledCallbacks.push(() => {
                        queueMicrotask(fulfilled);
                    });
                    this.onRejectedCallbacks.push(() => {
                        queueMicrotask(rejected);
                    });
                    break;
                default:
                    break;
            }
        });

        return promise2;
    }

    public static resolve<T>(value?: T | PromiseLike<T>): MyPromise<Awaited<T>> {
        if (value instanceof MyPromise) {
            return value;
        }

        return new MyPromise((resolve) => {
            resolve?.(value as Awaited<T>);
        });
    }

    public static reject<T = never>(reason?: any): MyPromise<T> {
        return new MyPromise((_, reject) => {
            reject?.(reason);
        });
    }

    public catch<TResult = never>(onrejected?: OnRejected<TResult>): MyPromise<T | TResult> {
        return this.then(null, onrejected);
    }

    public finally(onfinally?: OnFinally): MyPromise<T> {
        const final = isFunction(onfinally) ? onfinally() : onfinally;
        return this.then(
            (value) =>
                MyPromise.resolve(final).then(() => {
                    return value;
                }),
            (reason) =>
                MyPromise.resolve(final).then(() => {
                    throw reason;
                }),
        );
    }

    public static all<T>(promises: Iterable<T | PromiseLike<T>>): MyPromise<Awaited<T>[]> {
        return new MyPromise((resolve, reject) => {
            if (Array.isArray(promises)) {
                const results: Awaited<T>[] = [];
                let count = 0;
                if (promises.length === 0) {
                    return resolve?.(promises);
                }

                promises.forEach((item, index) => {
                    MyPromise.resolve(item).then(
                        (value) => {
                            count++;
                            results[index] = value;
                            if (count === promises.length) {
                                resolve?.(results);
                            }
                        },
                        (reason) => {
                            reject?.(reason);
                        },
                    );
                });
            } else {
                return reject?.(
                    new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`),
                );
            }
        });
    }

    public static race<T>(promises: Iterable<T | PromiseLike<T>>): MyPromise<Awaited<T>> {
        return new MyPromise((resolve, reject) => {
            if (Array.isArray(promises)) {
                if (promises.length !== 0) {
                    promises.forEach((item) => {
                        MyPromise.resolve(item).then(resolve, reject);
                    });
                }
            } else {
                return reject?.(
                    new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`),
                );
            }
        });
    }

    public static allSettled<T>(promises: Iterable<T | PromiseLike<T>>): MyPromise<PromiseSettledResult<Awaited<T>>[]> {
        return new MyPromise((resolve, reject) => {
            if (Array.isArray(promises)) {
                const results: PromiseSettledResult<Awaited<T>>[] = [];
                let count = 0;
                if (promises.length === 0) {
                    return resolve?.(promises);
                }

                promises.forEach((item, index) => {
                    MyPromise.resolve(item).then(
                        (value) => {
                            count++;
                            results[index] = { status: STATUS.FULFILLED, value };
                            if (count === promises.length) {
                                resolve?.(results);
                            }
                        },
                        (reason) => {
                            count++;
                            results[index] = { status: STATUS.REJECTED, reason };
                            if (count === promises.length) {
                                resolve?.(results);
                            }
                        },
                    );
                });
            } else {
                return reject?.(
                    new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`),
                );
            }
        });
    }

    public static any<T>(promises: Iterable<T | PromiseLike<T>>): MyPromise<Awaited<T>> {
        return new MyPromise((resolve, reject) => {
            if (Array.isArray(promises)) {
                const errors: any[] = [];
                let count = 0;
                if (promises.length === 0) {
                    return reject?.(new AggregateError(errors, "All promises were rejected"));
                }

                promises.forEach((item) => {
                    MyPromise.resolve(item).then(
                        (value) => {
                            resolve?.(value);
                        },
                        (reason) => {
                            count++;
                            errors.push(reason);
                            if (count === promises.length) {
                                reject?.(new AggregateError(errors, "All promises were rejected"));
                            }
                        },
                    );
                });
            } else {
                return reject?.(
                    new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`),
                );
            }
        });
    }
}

const resolvePromise = <T>(promise2: MyPromise<T>, x: T | PromiseLike<T>, resolve?: Resolve<T>, reject?: Reject) => {
    if (promise2 === x) {
        return reject?.(new TypeError("Chaining cycle detected."));
    }

    if (x instanceof MyPromise) {
        switch (x.state) {
            case STATUS.PENDING:
                x.then((y) => {
                    resolvePromise(promise2, y, resolve, reject);
                }, reject);
                break;
            case STATUS.FULFILLED:
                resolve?.(x.result);
                break;
            case STATUS.REJECTED:
                reject?.(x.result);
                break;
            default:
                break;
        }
    } else if ((typeof x === "object" && x !== null) || isFunction(x)) {
        let then: PromiseLike<T>["then"];
        try {
            then = (x as PromiseLike<T>).then;
        } catch (err) {
            return reject?.(err);
        }

        if (isFunction(then)) {
            let called = false;
            try {
                then.call(
                    x,
                    (value) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        resolvePromise(promise2, value, resolve, reject);
                    },
                    (reason) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject?.(reason);
                    },
                );
            } catch (err) {
                if (called) {
                    return;
                }
                called = true;
                reject?.(err);
            }
        } else {
            resolve?.(x);
        }
    } else {
        resolve?.(x);
    }
};
