let xiaoming = {
    name: "小明",
    age: 14,
    gender: true,
    height: 1.65,
    grade: null,
    "middle-school": '"W3C" Middle School',
    skills: ["JavaScript", "Java", "Python", "Lisp"],
    toJSON: function () {
        return {
            Name: this.name,
            Age: this.age,
        };
    },
};

// 加上参数，按缩进输出
// console.log(JSON.stringify(xiaoming, convert, ' '));

function convert(key, value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value;
}

// console.log(JSON.stringify(xiaoming));

console.log(
    JSON.parse('{"name":"小明","age":14}', function (key, value) {
        if (key === "name") {
            return value + "同学";
        }
        return value;
    }),
);
