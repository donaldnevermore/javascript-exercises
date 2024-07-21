const enum A {
    M,
    N,
}
const enum B {
    M,
    N,
}

// @ts-expect-error not structural typing
const a: A = B.M;
console.log(a);
