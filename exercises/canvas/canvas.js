let drawing = document.getElementById("drawing")

if (drawing.getContext) {
    const context = drawing.getContext("2d")

    context.beginPath()

    // 绘制外圆
    context.arc(100, 100, 99, 0, 2 * Math.PI, false)

    // 绘制内圆
    context.moveTo(194, 100)
    context.arc(100, 100, 94, 0, 2 * Math.PI, false)

    // 绘制分针
    context.moveTo(100, 100)
    context.lineTo(100, 15)

    // 绘制时针
    context.moveTo(100, 100)
    context.lineTo(35, 100)

    context.stroke()
}
