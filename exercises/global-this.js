function getGlobal() {
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof self !== "undefined") {
        return self;
    }

    return new Function("return this")();
}

const globalScopeObject = getGlobal();
console.log(globalScopeObject === globalThis);
