import { State as s, setState } from './store.js'

const initializeShipPos = () => {
  const screenMiddle = (canvas.width / 2)
  const bottom = (canvas.height - shipImg.height)
  let xPos = hasMousePosition ? s.mouse.x : screenMiddle
  let yPos = hasMousePosition ? s.mouse.y : bottom
  setState({Ship: { x: xPos, y: yPos }})
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

// s.mouse doesn't need to be tested because it is implied in the store also mouse movement is crucial to the game
const hasMousePosition = (state = s) => s && Number.isInteger(s.mouse.y)

export { createImage, resize, hasMousePosition, getCanvasSize, isInBounds }