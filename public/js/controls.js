import { State, setState } from './store.js'
import { PlayerShip } from './App.js'

const onKeyPress = (e) => {
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
  const { weapon } = State
  setState({
    weapon: { firing: true }
  })
  PlayerShip.firing = true
}

const mouseUp = (e) => {
  const { weapon } = State
  setState({
    weapon: { firing: false }
  })
  PlayerShip.firing = false
}

export { onKeyPress, onMouseMove, mouseDown, mouseUp }