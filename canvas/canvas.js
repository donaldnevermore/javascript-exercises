let draw = document.querySelector("#draw");
let save = document.querySelector("#save");
let drawing = document.getElementById("drawing");

draw.addEventListener("click", function () {
  // make sure the canvas is supported
  if (drawing.getContext) {
    const context = drawing.getContext("2d");
    context.strokeStyle = "red";
    context.fillStyle = "#0000ff";

    drawRect(context);
  }
});

function drawClock(context) {
  context.beginPath();

  // 绘制外圆
  context.arc(100, 100, 99, 0, 2 * Math.PI, false);

  if (context.isPointInPath(100, 100)) {
    console.log("in");
  }

  // 绘制内圆
  context.moveTo(194, 100);
  context.arc(100, 100, 94, 0, 2 * Math.PI, false);

  context.translate(100, 100);

  context.rotate(1);

  // 绘制分针
  context.moveTo(0, 0);
  context.lineTo(0, -85);

  // 绘制时针
  context.moveTo(0, 0);
  context.lineTo(-65, 0);

  context.stroke();

  // context.font = "bold 14 Arial"
  // context.textAlign = "start"
  // context.textBaseline = "middle"
  // context.fillText("12", 100, 20)

  let fontSize = 100;
  context.font = fontSize + "px Arial";
  while (context.measureText("Hello world!").width > 60) {
    fontSize--;
    context.font = fontSize + "px Arial";
  }
  context.fillText("Hello world!", 10, 10);
  context.fillText("Font size is " + fontSize + " px", 10, 50);
}

function drawRect(context) {
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 4;
  context.shadowColor = "rgba(0,0,0,0.5)";

  // let gradient = createRectLinearGradient(context, 30, 30, 50, 50)
  let gradient = context.createRadialGradient(55, 55, 10, 55, 55, 30);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(1, "black");

  context.fillStyle = "#ff0000";
  context.fillRect(10, 10, 50, 50);

  context.globalAlpha = 0.5;
  context.globalCompositeOperation = "destination-over";

  context.fillStyle = gradient;
  context.fillRect(30, 30, 50, 50);
  context.globalAlpha = 0;
  // context.clearRect(40, 40, 10, 10)
}

function createRectLinearGradient(context, x, y, width, height) {
  return context.createLinearGradient(x, y, x + width, y + height);
}

function strokeRect(context) {
  context.strokeStyle = "#ff0000";
  context.strokeRect(10, 10, 50, 50);

  context.strokeStyle = "rgba(0,0,255,0.5";
  context.strokeRect(30, 30, 50, 50);
}

// save to png
save.addEventListener("click", () => {
  if (drawing.getContext) {
    let imgURI = drawing.toDataURL("image/png");

    let image = document.createElement("img");
    image.src = imgURI;
    document.body.appendChild(image);
  }
});
