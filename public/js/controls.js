import { State as s, setState } from './store.js'

const onKeyPress = (e) => {
//   let velX = 0,
//   velY = 0,
//   friction = 0., // lower is slower
//   maxSpd = 2 // max speed
//   const isMaxSpd = (n) => Math.abs(n) < maxSpd
//   switch(e.code) {
//     case 'KeyW':
//     if (isMaxSpd(velY)) {
//       velY++
//     }
//     break
//     case 'KeyS':
//     if (isMaxSpd(velY)) {
//       velY--
//     }
//     break
//     case 'KeyD':
//     if (isMaxSpd(velX)) {
//       velX++
//     }
//     break
//     case 'KeyA':
//     if (isMaxSpd(velX)) {
//       velX--
//     }
//     break
//     default:
//     break
//   }
//   console.log(velX, velY)
//   velY*= friction
//   mouseY += velY
  
//   velX*=friction
//   mouseY += velX
}



const updateShipPosWBounds = () => {
  const { shipImg, Ship, mouse, shipSize, } = s
  const size = size ? shipSize : 0

  if (Ship.x !== mouse.x && Ship.y !== mouse.y) {
    let xPos = mouse.x - (size / 2)
    let yPos = mouse.y - size
    // keep ship in bounds  
    if (xPos < (size / 2)) {
      xPos = size / 2
    } else if (xPos > canvas.width - ( size / 2)) {
      xPos = canvas.width - (size / 2)
    }
    
    if (yPos > canvas.height - size) {
      yPos = canvas.height - size
    }
    setState({Ship: {x: xPos, y: yPos}})
    console.log(size, Ship, mouse)
  }
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
  }, () => console.log(s))
}

const mouseUp = (e) => {
  const { Ship, weapon } = s
  setState({
    weapon: { firing: false }
  }, () => console.log('mouseup: ', weapon))
}

export { onKeyPress, onMouseMove, mouseDown, mouseUp }