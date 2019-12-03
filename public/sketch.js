// Customization
const scaling = 3
const canvasWidth = 256
const canvasHeight = 256
const drawColor = 'black'
const backgroundColor = 'white'
const thinSize = 2
const thickSize = 4

var clicks = []
var size = thinSize
var color = drawColor
var paint

// Initialization
const canvasDiv = document.querySelector('#canvasDiv')
canvas = document.createElement('canvas')
canvas.setAttribute('width', canvasWidth)
canvas.setAttribute('height', canvasHeight)
canvas.setAttribute('id', 'canvas')
const pixelation = 'image-rendering: pixelated;'
canvas.setAttribute('style', `${pixelation} width: ${canvasWidth * scaling}px; height: ${canvasHeight * scaling}px;`)
canvasDiv.appendChild(canvas)
if (typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas)
}
context = canvas.getContext('2d')

// Buttons & tools
document.querySelector('#thickButton').addEventListener('click', e => {
  size = thickSize
  color = drawColor
})
document.querySelector('#thinButton').addEventListener('click', e => {
  size = thinSize
  color = drawColor
})
document.querySelector('#eraseButton').addEventListener('click', e => {
  color = backgroundColor
})
document.querySelector('#saveButton').addEventListener('click', e => {
  canvas.toBlob(blob => {
    saveAs(blob, `babydino.jpg`)
  })
})

// sketching
function addClick(x, y, dragging) {
  clicks.push({
    x, y, dragging, size, color
  })
}

function redraw() {
  context.fillStyle = backgroundColor
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)

  context.strokeStyle = drawColor

  for (let i = 0; i < clicks.length; i++) {
    let click = clicks[i]
    let prevClick = clicks[i-1]

    context.beginPath()
    if (click.dragging && prevClick) {
      context.moveTo(prevClick.x, prevClick.y)
    } else {
      context.moveTo(click.x - 1, click.y)
    }
    context.lineTo(click.x, click.y)
    context.closePath()
    context.strokeStyle = click.color
    context.lineWidth = click.size
    context.stroke()
  }
}

canvas.addEventListener('mousedown', e => {
  mouseX = (e.pageX - canvas.offsetLeft) / scaling
  mouseY = (e.pageY - canvas.offsetTop) / scaling
  addClick(mouseX, mouseY, false)
  paint = true
  redraw()
})

canvas.addEventListener('mousemove', e => {
  if (paint) {
    mouseX = (e.pageX - canvas.offsetLeft) / scaling
    mouseY = (e.pageY - canvas.offsetTop) / scaling
    addClick(mouseX, mouseY, true)
    redraw()
  }
})

canvas.addEventListener('mouseup', e => {
  paint = false
})

canvas.addEventListener('mouseleave', e => {
  paint = false
})