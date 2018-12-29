let add = require("./add");
let doub = jest.fn(a => a * 2);
isType("有依赖的函数", () => {
  expect(add(1, 2, doub)).toBe(4);
});
// 不要再函数里调用别的函数，最好能够把函数当作参数传进来
