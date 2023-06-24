const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

const isFunction = (value) => typeof value === "function";

/*
const isIterable = (value) => value != null && isFunction(value[Symbol.iterator])
const isNativeFunction = ctor => isFunction(ctor) && /native code/.test(ctor.toString())
const nextTaskQueue = cb => {
    if (queueMicrotask !== undefined && isNativeFunction(queueMicrotask)) {
        queueMicrotask(cb)
    } else if (process !== undefined && isFunction(process.nextTick)) {
        process.nextTick(cb)
    } else if (MutationObserver !== undefined && (isNativeFunction(MutationObserver) ||
        MutationObserver.toString() === "[object MutationObserverConstructor]")) {
        const observer = new MutationObserver(cb)
        const node = document.createTextNode("1")

        observer.observe(node, { characterData: true })
        node.data = "2"
    } else {
        setTimeout(() => {
            cb()
        }, 0)
    }
}
*/

class MyPromise {
  state = STATUS.PENDING;
  result;

  // Resolve & reject callback queues.
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    const resolve = (result) => {
      if (this.state === STATUS.PENDING) {
        queueMicrotask(() => {
          this.state = STATUS.FULFILLED;
          this.result = result;
          this.onFulfilledCallbacks.forEach((callback) => callback(result));
        });
      }
    };

    const reject = (reason) => {
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

  then(onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled)
      ? onFulfilled
      : (value) => {
          return value;
        };
    onRejected = isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };

    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilled = () => {
        try {
          const x = onFulfilled?.(this.result);
          resolvePromise(promise2, x, resolve, reject);
        } catch (err) {
          reject?.(err);
        }
      };

      const rejected = () => {
        try {
          const x = onRejected?.(this.result);
          resolvePromise(promise2, x, resolve, reject);
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

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => {
      resolve?.(value);
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject?.(reason);
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    const final = isFunction(onFinally) ? onFinally() : onFinally;
    return this.then(
      (value) =>
        MyPromise.resolve(final).then(() => {
          return value;
        }),
      (reason) =>
        MyPromise.resolve(final).then(() => {
          throw reason;
        })
    );
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        const results = [];
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
            }
          );
        });
      } else {
        return reject?.(new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`));
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        if (promises.length !== 0) {
          promises.forEach((item) => {
            MyPromise.resolve(item).then(resolve, reject);
          });
        }
      } else {
        return reject?.(new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`));
      }
    });
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        const results = [];
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
            }
          );
        });
      } else {
        return reject?.(new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`));
      }
    });
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        const errors = [];
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
            }
          );
        });
      } else {
        return reject?.(new TypeError(`${promises} is not iterable (cannot read property Symbol(Symbol.iterator)`));
      }
    });
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
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
    let then;
    try {
      then = x.then;
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
          }
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

MyPromise.deferred = () => {
  const dfd = {};
  dfd.promise = new MyPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
