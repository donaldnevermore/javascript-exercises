'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log('Times up -- stop!');
    callback && callback();
  }, 1000);
}
timerGame(() => {
  console.log('done!');
});
module.exports = timerGame;
