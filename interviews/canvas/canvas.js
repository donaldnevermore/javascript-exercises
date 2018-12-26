let drawing = document.getElementById('drawing')

if (drawing.getContext) {
  let context = drawing.getContext('2d')

  context.fillStyle = '#fff000'
  context.fillRect(10, 10, 50, 50)

  context.fillStyle = 'rgba(0,0,255,0.5)'
  context.fillRect(30, 30, 50, 50)

  // 清除
  context.clearRect(40, 40, 10, 10)
}