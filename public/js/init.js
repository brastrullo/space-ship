'use strict'
import { State as s, setState } from './store.js'
import loadAssets from './loadAssets.js'
import { resize, hasMousePosition, getCanvasSize, isInBounds } from './utils.js'
import { onKeyPress, onMouseMove, mouseDown, mouseUp } from './controls.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const { started } = s

if (canvas === undefined || ctx === undefined) {
  throw new Error('canvas: ', canvas, 'ctx: ', ctx)
}

const drawShip = () => {
  const { shipImg, Ship, shipSize } = s
  const size = Math.floor(shipSize)

  if(shipImg !== undefined && size !== undefined) {
    ctx.drawImage(shipImg,
      0, 0, size, size, // Source Image, Location and size: (0, 0) => (size, size)
      Ship.x, Ship.y , size, size // Destination Image on canvas, Location and size: (10, top) => (size, size)
    )
  } else {
    console.log('shipImg:', shipImg, 'size:', size)
  }
}

const drawEnemies = () => {
  const { enemyShipImg, enemyShipSize } = s
  const size = Math.floor(enemyShipSize)
  const Enemies = [
    {img: enemyShipImg, size: enemyShipSize, coordinates: [500,200] },
    {img: enemyShipImg, size: enemyShipSize, coordinates: [700,200] },
  ]
  
  const drawEnemyShip = (img, size, coordinates) => {
    ctx.drawImage(enemyShipImg,
      0, 0, size, size, // Source Image, Location and size: (0, 0) => (size, size)
      coordinates[0], coordinates[1] , size * .3, size * .3 // Destination Image on canvas, Location and size: (10, top) => (size, size)
    )
  }

  if(enemyShipImg !== undefined && enemyShipSize !== undefined) {
    Enemies.forEach(enemy => {
      drawEnemyShip(enemy.img, enemy.size, enemy.coordinates)
    })
  } else {
    console.log('shipImg:', shipImg, 'size:', size)
  }
}

const drawBullets = () => {
  const { Ship, shipImg, bullets, weapon, activeBullets } = s
  const midX = Ship.x + (shipImg.height / 2) - 5
  const maxBullets = 20
  const bulletsArray = activeBullets

  if (weapon && weapon.firing === true && bulletsArray.length < maxBullets) {
    bulletsArray.push({ x: midX, y: Ship.y })
  }
  
  bulletsArray.map(bullet => {
    if (isInBounds(bullet.x, bullet.y)) {
      ctx.fillStyle = 'white'
      ctx.fillRect(bullet.x, bullet.y, 5, 5)
    }
  })
}

const animateBullets = () => {
  const { Ship, activeBullets } = s
  const moveBullets = activeBullets.map(bullet => {
    const x = bullet.x
    const y = bullet.y - 20
    return { x, y}
  })

  setState({ activeBullets: moveBullets })
}

const killInactiveBullets = () => {
  const { Ship, activeBullets } = s
  const bulletsArray = activeBullets
  bulletsArray.forEach((bullet, i) => {
    if (bullet.x < 0 || bullet.y < 0) {
      bulletsArray.splice(i, 1)
    }
  })

  setState({activeBullets: bulletsArray})
  console.log('c2', activeBullets)
}

const update = (time) => {
  const { mouse, Ship, shipImg, shipSize, weapon, bullets, activeBullets } = s
  const { size, x, y } = Ship
  
  if (shipImg !== undefined) {
    const updateShipPos = () => {
      if (Ship.x !== mouse.x && Ship.y !== mouse.y) {
        const size = shipSize
        const xPos = mouse.x - (size / 2)
        const yPos = mouse.y - size
        setState({ Ship: { x: xPos, y: yPos }})
      }
    }
    
    const setShipOrigin = () => {
      if (Ship.x === undefined || Ship.y === undefined) {
        setState({ Ship: { x: canvas.width / 2 , y: canvas.height - shipImg.height }})
      }
    }

    hasMousePosition() ? updateShipPos() : setShipOrigin()
  }
  animateBullets()
  killInactiveBullets()
}

// add error handling for assets loaded
// remove logic from draw method
const draw = (time) => {
  const { enemyShipImg, shipImg, Ship, mouse, weapon, bullets, activeBullets } = s
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  if (shipImg !== undefined) {
    drawShip()
    if (weapon !== undefined) {
      drawBullets()
    }
  }
  if (enemyShipImg !== undefined) {
    drawEnemies()
  }
}

const loop = (currentTime) => {
  update(currentTime)
  draw(currentTime)
  requestAnimationFrame(loop)
}

const init = () => {
  resize()
  loadAssets()
  requestAnimationFrame(loop)
}

window.addEventListener('resize', resize)
window.addEventListener('mousemove', onMouseMove)
window.addEventListener('mousedown', mouseDown)
window.addEventListener('mouseup', mouseUp)
window.addEventListener('keypress', onKeyPress)

init()
