class Scorer {
  constructor () {
    this.ball = 0
    this.throws = []
    this.currentThrow = 0
  }

  addThrow (pins) {
    this.throws.push(pins)
    this.currentThrow++
  }

  scoreForFrame (theFrame) {
    this.ball = 0
    let score = 0
    for (let currentFrame = 0; currentFrame < theFrame; currentFrame++) {
      if (this.strike()) {
        // 全中
        score += 10 + this.nextTwoBallsForStrike
        this.ball++
      } else if (this.spare()) {
        score += 10 + this.nextBallForSpare
        this.ball += 2
      } else {
        score += this.twoBallsInFrame
        this.ball += 2
      }
    }
    return score
  }

  strike () {
    return this.throws[this.ball] === 10
  }

  get nextTwoBallsForStrike () {
    return this.throws[this.ball + 1] + this.throws[this.ball + 2]
  }

  get twoBallsInFrame () {
    return this.throws[this.ball] + this.throws[this.ball + 1]
  }

  spare () {
    return this.throws[this.ball] + this.throws[this.ball + 1] === 10
  }

  get nextBallForSpare () {
    return this.throws[this.ball + 2]
  }
}
