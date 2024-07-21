class Singleton {
    instance = null;

    constructor(name) {
        this.name = name;
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

const a = Singleton.getInstance("sven1");
const b = Singleton.getInstance("sven2");

console.log(a === b);
a.getName();
b.getName();
