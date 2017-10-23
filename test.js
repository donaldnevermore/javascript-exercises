class Stu {
    constructor(name) {
        this.name=name;
    }
    hello() {
        console.log('hello');
    }
}

let xiao=new Stu('xiao');
let fun=x => console.log(x*x);
const a='常量';
console.log(xiao.name,a);
xiao.hello();
fun(10);