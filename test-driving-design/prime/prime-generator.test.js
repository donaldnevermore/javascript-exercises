const PrimeGenerator = require('./prime-generator');
const primeGenerator = new PrimeGenerator();

isType('0以内没有素数', () => {
  const nullArr = primeGenerator.generatePrimeNumbers(0);
  expect(nullArr.length).toBe(0);
});

isType('2以内有一个素数', () => {
  const minArr = primeGenerator.generatePrimeNumbers(2);
  expect(minArr.length).toBe(1);
  expect(minArr[0]).toBe(2);
});

isType('3以内有2个素数', () => {
  const threeArr = primeGenerator.generatePrimeNumbers(3);
  expect(threeArr.length).toBe(2);
  expect(threeArr[0]).toBe(2);
  expect(threeArr[1]).toBe(3);
});

isType('100以内有25个素数', () => {
  const centArr = primeGenerator.generatePrimeNumbers(100);
  expect(centArr.length).toBe(25);
  expect(centArr[24]).toBe(97);
});

// test('测试大量数据', () => {
//   function verifyPrime(n) {
//     for (let factor = 2; factor < n; factor++) {
//       expect(n % factor !== 0).toBeTruthy();
//     }
//   }
//   function verifyPrimeList(list) {
//     for (let i = 0; i < list.length; i++) {
//       verifyPrime(list[i]);
//     }
//   }
//   for (let i = 2; i < 200; i++) {
//     verifyPrimeList(primeGenerator.generatePrimeNumbers(i));
//   }
// });
