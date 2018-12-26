class PrimeGenerator {
  constructor () {
    this.crossedOut = []
    this.result = []
  }

  generatePrimeNumbers (maxValue) {
    if (maxValue < 2) {
      return [] // 对不合理值返回空数组
    } else {
      this.initializeArrayOfIntegers(maxValue)
      this.crossOutMultiples()
      this.putUncrossedIntegersIntoResult()
      return this.result
    }
  }

  putUncrossedIntegersIntoResult () {
    let i
    let j

    // 有多少个素数
    let count = 0
    for (i = 0; i < this.crossedOut.length; i++) {
      if (this.crossedOut[i]) {
        count++
      }
    }

    // 把素数转移到数组中
    this.result = []
    for (i = 0, j = 0; i < this.crossedOut.length; i++) {
      if (this.crossedOut[i]) {
        this.result.push(i)
      }
    }
  }

  crossOutMultiples () {
    let i
    let j

    for (i = 2; i < Math.sqrt(this.crossedOut.length) + 1; i++) {
      if (this.crossedOut[i]) {
        // 如果没被划掉，就划掉其倍数
        for (j = 2 * i; j < this.crossedOut.length; j += i) {
          this.crossedOut[j] = false // 倍数不是素数
        }
      }
    }
  }

  initializeArrayOfIntegers (maxValue) {
    this.crossedOut.length = maxValue + 1
    this.crossedOut = []
    let i

    // 将数组初始化为true
    for (i = 0; i < this.crossedOut.length; i++) {
      this.crossedOut[i] = true
    }

    // 去掉已知的非素数
    this.crossedOut[0] = this.crossedOut[1] = false
  }
}

module.exports = PrimeGenerator
