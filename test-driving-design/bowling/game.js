const Scorer = require('./scorer')

class Game {
  constructor () {
    this.throws = []
    this.currentFrame = 0
    this.isFirstThrow = true
    this.scorer = new Scorer()
  }

  get score () {
    return this.scoreForFrame(this.currentFrame)
  }

  add (pins) {
    this.scorer.addThrow(pins)
    this.adjustCurrentFrame(pins)
  }

  adjustCurrentFrame (pins) {
    if (this.lastBallInFrame(pins)) {
      this.advanceFrame()
      this.isFirstThrow = true
    } else {
      this.isFirstThrow = false
    }
  }

  lastBallInFrame (pins) {
    return this.strike(pins) || !this.isFirstThrow
  }

  strike (pins) {
    return this.isFirstThrow && pins === 10
  }

  adjustFrameForStrike (pins) {
    if (pins === 10) {
      this.advanceFrame()
      return true
    }
    return false
  }

  advanceFrame () {
    this.currentFrame++
    if (this.currentFrame > 10) {
      this.currentFrame = 10
    }
  }

  scoreForFrame (theFrame) {
    return this.scorer.scoreForFrame(theFrame)
  }
}

module.exports = Game
