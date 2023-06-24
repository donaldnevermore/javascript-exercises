class AsyncPolling {
  data = {}; // 请求结果
  remainTime = 0; // 剩余限制时长
  start = 0; // 开始时间
  end = 0; // 请求得到数据的时间

  constructor() {
    this.start = new Date().getTime();
  }

  /**
   *
   * @param num 轮询次数
   * @param interval 定时器时间(ms)
   * @param limitTime 最大限制时长(ms)
   * @param method
   * @param params
   */
  query(num, interval, limitTime, method, params) {
    let timer = null;
    if (num >= 1) {
      return new Promise((_, reject) => {
        method(params)
          .then(
            (res) => {
              this.data = res.data.data; // 这个只是接口返回的数据结构
              this.end = new Date().getTime();
            },
            (err) => {
              reject(err);
            }
          )
          .catch((err) => {
            console.log(err);
          });

        if (this.end !== 0) {
          // 如果拿到数据了
          this.remainTime = limitTime - (this.end - this.start);
        } else {
          // 如果还没拿到接口数据，设置剩余时间
          this.remainTime = limitTime;
        }

        // 如果剩余时间小于等于 0 就结束定时器
        if (this.remainTime <= 0) {
          clearTimeout(timer);
        } else {
          this.remainTime -= interval;

          // 轮询一次，num 就减少一次
          timer = setTimeout(() => {
            this.query(num - 1, interval, this.remainTime, method, params);
          }, interval);
        }
      }).catch((err) => {
        console.log(err);
      });
    } else {
      clearTimeout(timer);
    }
  }
}
