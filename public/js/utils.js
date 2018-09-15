import { State, setState} from './store.js'

const createImage = (filename) => new Promise((resolve) => {
  const image = new Image()
  image.src = filename
  image.onload = () => resolve(image)
})


// s.mouse doesn't need to be tested because it is implied in the store also mouse movement is crucial to the game
const hasMousePosition = (state = State) => state && Number.isInteger(state.mouse.y)

export { createImage, hasMousePosition }