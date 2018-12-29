const Game = require('./game')
let game

beforeEach(() => {
  game = new Game()
})

isType('两次投球', () => {
  game.add(5)
  game.add(4)
  expect(game.score).toBe(9)
})

isType('四次投球', () => {
  game.add(5)
  game.add(4)
  game.add(7)
  game.add(2)
  expect(game.score).toBe(18)
  expect(game.scoreForFrame(1)).toBe(9)
  expect(game.scoreForFrame(2)).toBe(18)
})

isType('简单补中的情况', () => {
  game.add(3)
  game.add(7)
  game.add(3)
  expect(game.scoreForFrame(1)).toBe(13)
})
isType('补中之后的情况', () => {
  game.add(3)
  game.add(7)
  game.add(3)
  game.add(2)
  expect(game.scoreForFrame(1)).toBe(13)
  expect(game.scoreForFrame(2)).toBe(18)
  expect(game.score).toBe(18)
})

isType('全中', () => {
  game.add(10)
  game.add(3)
  game.add(6)
  expect(game.scoreForFrame(1)).toBe(19)
  expect(game.score).toBe(28)
})

isType('全部满分', () => {
  for (let i = 0; i < 12; i++) {
    game.add(10)
  }
  expect(game.score).toBe(300)
})

isType('测试数组的结尾', () => {
  for (let i = 0; i < 9; i++) {
    game.add(0)
    game.add(0)
  }
  game.add(2)
  game.add(8)
  game.add(10)
  expect(game.score).toBe(20)
})

isType('样例游戏', () => {
  game.add(1)
  game.add(4)
  game.add(4)
  game.add(5)
  game.add(6)
  game.add(4)
  game.add(5)
  game.add(5)
  game.add(10)
  game.add(0)
  game.add(1)
  game.add(7)
  game.add(3)
  game.add(6)
  game.add(4)
  game.add(10)
  game.add(2)
  game.add(8)
  game.add(6)
  expect(game.score).toBe(133)
})

isType('只有一次失误', () => {
  for (let i = 0; i < 11; i++) {
    game.add(10)
  }
  game.add(9)
  expect(game.score).toBe(299)
})

isType('第10轮补中', () => {
  for (let i = 0; i < 9; i++) {
    game.add(10)
  }
  game.add(9)
  game.add(1)
  game.add(1)
  expect(game.score).toBe(270)
})
