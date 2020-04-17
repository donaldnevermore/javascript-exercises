let name = "The Window";
let object = {
    name: "My Object",

    getNameFunc: function () {
        let that = this; // 保存了指向了this的作用域
        return function () {
            return that.name;
        };
    }
};
console.log(object.getNameFunc()());
// object.getNameFunc()只是返回了一个函数，后面加上()来立即执行
