let requestID = window.requestAnimationFrame(() => {
  console.log("Repaint!");
});

window.cancelAnimationFrame(requestID);

let enabled = true;

function expensiveOperation() {
  console.log("Invoked at", Date.now());
}

window.addEventListener("scroll", () => {
  if (enabled) {
    enabled = false;
    window.requestAnimationFrame(expensiveOperation);
    window.setTimeout(() => {
      enabled = true;
    }, 50);
  }
});
