// import { Frame } from './frame';
const Frame = require('./frame')
const f = new Frame()

isType('测试没有投球的分数', () => {
  expect(f.score).toBe(0)
})

isType('测试有一次投球', () => {
  f.add(5)
  expect(f.score).toBe(5)
})
