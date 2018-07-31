import { State as s, setState } from './store.js'
import { isInBounds } from './utils.js'

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
      const canvas = document.getElementById('canvas')
      const ctx = canvas.getContext('2d')
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
    return { x, y }
  })

  setState({ activeBullets: moveBullets })
}

export { drawBullets, animateBullets }