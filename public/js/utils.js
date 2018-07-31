import { State as s, setState, canvas, ctx } from './store.js'

const addBackground = () => {
  ctx.fillStyle = '#123'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const createImage = (filename) => new Promise((resolve) => {
  const image = new Image()
  image.src = filename
  image.onload = () => resolve(image)
})

const resize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

const getCanvasSize = () => {
  return {canvasWidth: canvas.width, canvasHeight: canvas.height}
}

const isInBounds = (x, y) => {
  return x > 0 && y > 0
}

const hitDetection = (activeEnemies, activeBullets) => {
  activeEnemies.forEach((enemy,i) => {
    if (enemy.didHit()) {
      // activeEnemies.slice(i, 1)
    }
  })
}

// s.mouse doesn't need to be tested because it is implied in the store also mouse movement is crucial to the game
const hasMousePosition = (state = s) => s && Number.isInteger(s.mouse.y)

export { addBackground, createImage, resize, hasMousePosition, getCanvasSize, isInBounds }