class Test1 {
    p = 1;

    b() {
        console.log(this.p);
    }

    // Prevent this from being undefined
    c = () => {
        console.log(this.p);
    };
}

// let a = new Test1()
// const cc = a.c
// cc()

const obj = {
    prop: 42,
    func() {
        return obj.prop;
    },
};
const f = obj.func;
console.log(f());
