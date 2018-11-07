import { State, setState } from './store.js'

const Keys = {
  LEFT: 'KeyA',
  UP: 'KeyW',
  RIGHT: 'KeyD',
  DOWN: 'KeyS',
  FIRE: 'KeyJ',
  PAUSE: 'KeyP'
}

const onKeydown = (e) => {
  const { inGameTime, lastKeyPressed, keysPressed } = State
  // remove inGameTime from state - super expensive
  keysPressed[e.code] = inGameTime
  setState({ lastKeyPressed: keysPressed },
    () => console.log(State.lastKeyPressed))
}

const onKeyup = (e) => {
  const { inGameTime, lastKeyPressed, keysPressed } = State
  // console.log(lastKeyPressed.indexOf(e.code), e.code,'asdf')
  delete keysPressed[e.code]
  setState({ lastKeyPressed: keysPressed })
}

const onMouseMove = (e) => {
  const { mouse } = State
  setState({
    mouse : {
      x: e.clientX,
      y: e.clientY
    }
  })
}

const onMouseDown = (e) => {
  // TODO: controls should not know of app info like weapons, and firing
  // just let me know when a button was pressed (i.e. mouseDown: true, or mouse: 'down')
  const { weapon } = State
  setState({
    weapon: { firing: true }
  })
}

const onMouseUp = (e) => {
  const { weapon } = State
  setState({
    weapon: { firing: false }
  })
}

const onResize = (e) => {
  const { canvas } = State
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

export const setupEventListeners = () => {
  const { canvas } = State
  window.addEventListener('resize', onResize)
  window.addEventListener('keyup', (e) => onKeyup(e))
  window.addEventListener('keydown', (e) => onKeydown(e))
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
}

export const setupKeyboardControls = () => {
  setState({Keys}, console.log(State))
}
