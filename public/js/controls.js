import { State, setState } from './store.js'

const onResize = (e) => {
  const { canvas } = State;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const onKeyPress = (e) => {
  // TODO setState({ keyPress: e.key })
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

const setupEventListeners = () => {
  const { canvas } = State;
  window.addEventListener('resize', onResize)
  window.addEventListener('keypress', onKeyPress)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', onMouseDown)
  canvas.addEventListener('mouseup', onMouseUp)
}

export default setupEventListeners

