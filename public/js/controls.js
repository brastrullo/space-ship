import { State as s, setState, canvas, ctx } from './store.js'
import { PlayerShip } from './init.js'

const onKeyPress = (e) => {
}

const onMouseMove = (e) => {
  const { mouse } = s
  setState({
    mouse : {
      x: e.clientX,
      y: e.clientY
    }
  })
}

const mouseDown = (e) => {
  const { weapon } = s
  setState({
    weapon: { firing: true }
  })
  PlayerShip.firing = true
}

const mouseUp = (e) => {
  const { weapon } = s
  setState({
    weapon: { firing: false }
  })
  PlayerShip.firing = false
}

export { onKeyPress, onMouseMove, mouseDown, mouseUp }