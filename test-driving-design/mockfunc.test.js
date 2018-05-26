const forEach = require('./mockfunc');
const mockCallback = jest.fn();
beforeEach(() => {
  forEach([0, 1], mockCallback);
});

test('The mock function is called twice', () => {
  expect(mockCallback.mock.calls.length).toBe(2);
});

test('The first argument of the first call to the function was 0', () => {
  expect(mockCallback.mock.calls[0][0]).toBe(0);
});

test('The first argument of the second call to the function was 1', () => {
  expect(mockCallback.mock.calls[1][0]).toBe(1);
});
