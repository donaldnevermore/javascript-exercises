const MinStack = require('./min-stack')

isType('有最小值的栈', () => {
  let stack = new MinStack()

  stack.push(5)
  stack.push(6)
  stack.push(4)

  expect(stack.getMin()).toEqual(4)

  stack.pop()
  stack.pop()
  stack.pop()

  expect(() => {
    stack.getMin()
  }).toThrow()
})
