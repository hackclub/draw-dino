// Declare global types
declare const G_vmlCanvasManager: any
declare function saveAs(blob: Blob, filename: string): void
declare function tippy(selector: string, options: any): void

interface Point {
  x: number
  y: number
}

interface Click {
  size: number
  color: string
  points: Point[]
  undone?: boolean
}

interface UrlParams {
  [key: string]: string
}

async function sendMetric(type: string, key: string, value: number): Promise<void> {
  const response = await fetch("/api/metric", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, key, value })
  });
  if (!response.ok) {
    throw Error("Failed to send metric");
  }
}

// Customization
const scaling = 3
const canvasWidth = 256
const canvasHeight = 256
const drawColor = 'black'
const backgroundColor = 'white'
const thinSize = 2
const thickSize = 4

let clicks: Click[] = []
let templateVisibility = true
let size = thinSize
let color = drawColor
let unsavedChanges = false
let paint = false
let mouseX = 0
let mouseY = 0

// Initialization
const canvasDiv = document.querySelector('#canvasDiv') as HTMLElement
const canvas = document.createElement('canvas')
canvas.setAttribute('width', String(canvasWidth))
canvas.setAttribute('height', String(canvasHeight))
canvas.setAttribute('id', 'canvas')
const pixelation = 'image-rendering: crisp-edges; image-rendering: pixelated;'
const borders = 'border: 1px solid black;'
canvas.setAttribute('style', `${pixelation} ${borders} width: ${canvasWidth * scaling}px; height: ${canvasHeight * scaling}px;`)
canvasDiv.appendChild(canvas)
if (typeof G_vmlCanvasManager != 'undefined') {
  G_vmlCanvasManager.initElement(canvas)
}
const context = canvas.getContext('2d') as CanvasRenderingContext2D
const templateImage = new Image()
templateImage.src = 'template.jpg'
templateImage.addEventListener('load', () => {
  redraw()
})

// Buttons & tools
const thickButton = document.querySelector('#thickButton') as HTMLElement
const thinButton = document.querySelector('#thinButton') as HTMLElement
const eraseButton = document.querySelector('#eraseButton') as HTMLElement
const templateButton = document.querySelector('#templateButton') as HTMLElement
const undoButton = document.querySelector('#undoButton') as HTMLElement
const redoButton = document.querySelector('#redoButton') as HTMLElement
const saveButton = document.querySelector('#saveButton') as HTMLElement

thickButton.addEventListener('click', () => {
  size = thickSize
  color = drawColor
})
thinButton.addEventListener('click', () => {
  size = thinSize
  color = drawColor
})
eraseButton.addEventListener('click', () => {
  color = backgroundColor
})
templateButton.addEventListener('click', () => {
  templateVisibility = !templateVisibility
  redraw()
})

function undo(): void {
  const doneClicks = clicks.filter(click => !click.undone)
  if (doneClicks.length > 0) {
    doneClicks[doneClicks.length - 1].undone = true
    redraw()
  }
}

undoButton.addEventListener('click', () => {
  undo()
})

function redo(): void {
  const recentUndoneClick = clicks.find(click => click.undone)
  if (recentUndoneClick) {
    recentUndoneClick.undone = false
    redraw()
  }
}

redoButton.addEventListener('click', () => {
  redo()
})

saveButton.addEventListener('click', () => {
  const filename = prompt("Name your dino drawing", "dino")

  const urlParams: UrlParams = {}
  window.location.search.replace('?', '').split('&').forEach(kvString => {
    const [key, value] = kvString.split('=')
    urlParams[key] = value
  })
  const filePrefix = urlParams['filePrefix']

  if (filename) {
    canvas.toBlob((blob: Blob | null) => {
      if (!blob) {
        sendMetric("increment", "errors.save_drawing", 1);
        return;
      }

      let safeFileName = `${filePrefix}-${filename}`.replace(/[^\w+]/g, '_')

      try {
        saveAs(blob, safeFileName + '.png')
        sendMetric("increment", "success.save_drawing", 1);
        unsavedChanges = false
      } catch (e: any) {
        console.log(e.message);
        sendMetric("increment", "errors.save_drawing", 1);
      }

      // If this is running as an embed, send the file off to the parent window
      if (window.parent) {
        window.parent.postMessage({ filename: safeFileName + '.png', blob }, "*")
      }
    })
  }
})

document.addEventListener('keypress', (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
    e.preventDefault()
    undo()
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
    e.preventDefault()
    redo()
  }
})

// double check with user before closing the page
window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
  if (unsavedChanges) {
    e.returnValue = 'You have unsaved changes that will be lost.';
  }
});

// sketching
function addClick(x: number, y: number, dragging: boolean): void {
  if (dragging) {
    // get the last click and add the coordinate
    const lastClick = clicks[clicks.length - 1]
    lastClick.points.push({ x, y })
  } else {
    // when we start clicking, we'll delete the "undone" history for good
    clicks = clicks.filter(click => !click.undone)
    // create a new click
    clicks.push({ size, color, points: [{ x, y }] })
  }
}

function redraw(): void {
  context.fillStyle = backgroundColor
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)

  if (templateVisibility) {
    context.drawImage(templateImage, context.canvas.width / 5, context.canvas.height / 5, context.canvas.width * 3 / 5, context.canvas.height * 3 / 5)
  }

  context.strokeStyle = drawColor

  clicks.filter(click => !click.undone).forEach(click => {
    context.beginPath()
    for (let i = 0; i < click.points.length; i++) {
      context.beginPath()
      let point = click.points[i]
      let prevPoint = click.points[i - 1]
      if (prevPoint) {
        context.moveTo(prevPoint.x, prevPoint.y)
      } else {
        context.moveTo(point.x - 1, point.y)
      }
      context.lineTo(point.x, point.y)
      context.closePath()
      context.strokeStyle = click.color
      context.lineWidth = click.size
      context.stroke()
    }
  })
}

function clickStart(event: MouseEvent | TouchEvent): void {
  event.preventDefault()
  unsavedChanges = true
  if (event instanceof MouseEvent) {
    mouseX = (event.pageX - canvas.offsetLeft) / scaling
    mouseY = (event.pageY - canvas.offsetTop) / scaling
  } else if (event instanceof TouchEvent) {
    const touch = event.touches[0]
    mouseX = (touch.pageX - canvas.offsetLeft) / scaling
    mouseY = (touch.pageY - canvas.offsetTop) / scaling
  }
  addClick(mouseX, mouseY, false)
  paint = true
  redraw()
}

canvas.addEventListener('mousedown', (e: MouseEvent) => {
  clickStart(e)
})
canvas.addEventListener('touchstart', (e: TouchEvent) => {
  clickStart(e)
})

function clickDrag(event: MouseEvent | TouchEvent): void {
  event.preventDefault()
  if (paint) {
    if (event instanceof MouseEvent) {
      mouseX = (event.pageX - canvas.offsetLeft) / scaling
      mouseY = (event.pageY - canvas.offsetTop) / scaling
    } else if (event instanceof TouchEvent) {
      const touch = event.touches[0]
      mouseX = (touch.pageX - canvas.offsetLeft) / scaling
      mouseY = (touch.pageY - canvas.offsetTop) / scaling
    }
    addClick(mouseX, mouseY, true)
    redraw()
  }
}

canvas.addEventListener('mousemove', (e: MouseEvent) => {
  clickDrag(e)
})
canvas.addEventListener('touchmove', (e: TouchEvent) => {
  clickDrag(e)
})

function clickStop(): void {
  paint = false
}

canvas.addEventListener('mouseup', () => {
  clickStop()
})
canvas.addEventListener('mouseleave', () => {
  clickStop()
})
canvas.addEventListener('touchend', () => {
  clickStop()
})
canvas.addEventListener('touchcancel', () => {
  clickStop()
})

// tooltips
function genTooltip(id: string, image: string, description: string = ''): void {
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
genTooltip('saveButton', 'save-button.gif', 'Saves the drawing to your computer. Automatically adds a file extension. <span style="color: #ff6700; font-weight: bold;">This will not save your dino on this website.</style>')
