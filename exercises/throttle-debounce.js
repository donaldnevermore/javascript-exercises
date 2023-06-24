function throttle(func, delay) {
  let enabled = true;

  return function (...args) {
    if (enabled) {
      enabled = false;
      func.apply(this, args);
      setTimeout(() => {
        enabled = true;
      }, delay);
    }
  };
}

function debounce(func, delay) {
  let timeout;

  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = undefined;
      func.apply(this, args);
    }, delay);
  };
}
