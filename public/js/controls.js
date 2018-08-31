import { State, setState } from './store.js'

const onKeyPress = (e) => {
  // todo setState({ keyPress: e.key })
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

const mouseDown = (e) => {
  // TODO: controls should not know of app info like weapons, and firing
  // just let me know when a button was pressed (i.e. mouseDown: true, or mouse: 'down')
  const { weapon } = State
  setState({
    weapon: { firing: true }
  })
}

const mouseUp = (e) => {
  const { weapon } = State
  setState({
    weapon: { firing: false }
  })
}

export { onKeyPress, onMouseMove, mouseDown, mouseUp }