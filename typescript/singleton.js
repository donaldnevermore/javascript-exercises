/**
 * 单例模式
 * 保证一个类仅有一个实例，
 * 并且提供一个访问它的全局访问点。
 */
var Singleton = /** @class */ (function () {
    function Singleton(name) {
        this.name = name;
    }
    Singleton.prototype.getName = function () {
        console.log(this.name);
    };
    Singleton.getInstance = function (name) {
        if (!this.instance) {
            this.instance = new Singleton(name);
        }
        return this.instance;
    };
    return Singleton;
}());
var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');
console.log(a === b);
a.getName();
b.getName();
