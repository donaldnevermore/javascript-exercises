class Frame {
  constructor () {
    this._score = 0
  }

  get score () {
    return this._score
  }

  add (pins) {
    this._score += pins
  }
}

module.exports = Frame
