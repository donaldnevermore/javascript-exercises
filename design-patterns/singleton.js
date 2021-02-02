/**
 * 单例模式
 * 保证一个类仅有一个实例，
 * 并且提供一个访问它的全局访问点。
 */
class Singleton {
    constructor(name) {
        this.name = name;
        this.instance = null;
    }

    getName() {
        console.log(this.name);
    }

    static getInstance(name) {
        if (!this.instance) {
            this.instance = new Singleton(name);
        }
        return this.instance;
    }
}

let a = Singleton.getInstance("sven1");
let b = Singleton.getInstance("sven2");

console.log(a === b);
a.getName();
b.getName();
