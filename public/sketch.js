// Customization
const scaling = 3
const canvasWidth = 256
const canvasHeight = 256
const drawColor = 'black'
const backgroundColor = 'white'
const thinSize = 2
const thickSize = 4

var clicks = []
var templateVisibility = true
var size = thinSize
var color = drawColor
var paint

// Initialization
const canvasDiv = document.querySelector('#canvasDiv')
canvas = document.createElement('canvas')
canvas.setAttribute('width', canvasWidth)
canvas.setAttribute('height', canvasHeight)
canvas.setAttribute('id', 'canvas')
const pixelation = 'image-rendering: crisp-edges; image-rendering: pixelated;'
canvas.setAttribute('style', `${pixelation} width: ${canvasWidth * scaling}px; height: ${canvasHeight * scaling}px;`)
canvasDiv.appendChild(canvas)
if (typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas)
}
context = canvas.getContext('2d')
const templateImage = new Image()
templateImage.src = 'template.jpg'
templateImage.addEventListener('load', e => {
  redraw()
})

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
document.querySelector('#templateButton').addEventListener('click', e => {
  templateVisibility = !templateVisibility
  redraw()
})
document.querySelector('#saveButton').addEventListener('click', e => {
  const filename = prompt("Name your dino drawing", "pirate-dino")
  if (filename) {
    canvas.toBlob(blob => {
      saveAs(blob, filename + '.jpg')
    })
  }
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

  if (templateVisibility) {
    context.drawImage(templateImage, context.canvas.width / 5, context.canvas.height / 5, context.canvas.width * 3 / 5, context.canvas.height * 3 / 5)
  }

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

// tooltips
function genTooltip(id, image, description='') {
  tippy(`#${id}`, {
    content: `<div style="max-width: 300px;"><img src="${image}" style="max-width: 100%;" /><p style="font-weight: 500; font-family: system-ui;">${description}</p></div>`,
    delay: [500, 0],
    followCursor: 'horizontal',
    placement: 'bottom'
  })
}
genTooltip('thinButton', 'thin-button.gif', 'Draw a <span style="font-weight: 100;">thin</span> black line')
genTooltip('thickButton', 'thick-button.gif', 'Draw a <span style="font-weight: 800;">thick</span> black line')
genTooltip('templateButton', 'template-button.gif', 'Show a dino outline you can use as a starting point. You can toggle it on and off anytime.')
genTooltip('eraseButton', 'erase-button.gif', 'Draw with a <span style="background: white; color: black; border-radius: 5px;">white</span> marker to erase mistakes or cut out black parts of an image. Also covers the dino template.')
genTooltip('saveButton', 'save-button.gif', 'Saves your drawing as a JPG to your computer. You don’t need to include a file extension. <span style="color: #ff6700; font-weight: bold;">This will not save your dino on this website.</style>')