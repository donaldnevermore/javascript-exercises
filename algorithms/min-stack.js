class MinStack {
  constructor () {
    this.data = []
    this.mins = []
  }

  push (num) {
    this.data.push(num)

    if (this.mins.length === 0) {
      this.mins.push(0)
    } else {
      let min = this.getMin()
      if (num < min) {
        this.mins.push(this.data.length - 1)
      }
    }
  }

  pop () {
    if (this.data.length === 0) {
      throw new Error('空栈')
    }

    let popIndex = this.data.length - 1
    let minIndex = this.mins[this.mins.length - 1]

    if (popIndex === minIndex) {
      this.mins.pop()
    }

    return this.data.pop()
  }

  getMin () {
    if (this.mins.length === 0) {
      throw new Error('空栈')
    }

    let minIndex = this.mins[this.mins.length - 1]

    return this.data[minIndex]
  }
}

module.exports = MinStack

