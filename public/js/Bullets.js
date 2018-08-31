import { State, setState } from './store.js'
import { isInBounds } from './utils.js'

export default function Bullets(type = 'default', max = 50) {
  this.direction = (type === 'default') ? 'up' : 'down'
  this.max = max
  this.type = type
  this.arr = [{ x: 100, y: 100, active: true }]
  this.size = 5
}

Bullets.prototype.log = function() {
  console.log(this.arr)
}

Bullets.prototype.draw = function(ctx) {
  this.arr.forEach(bullet => {
    const { x, y, active } = bullet
    if (isInBounds(x, y) && active === true) {
      ctx.fillStyle = 'red'
      ctx.fillRect(x, y - 5, this.size, this.size)
    }
  })
}

Bullets.prototype.clearInactive = function() {
  this.arr.forEach((bullet, i) => {
    if (bullet.x < 0 || bullet.y < 0 ||bullet.active !== true) {
      this.arr.splice(i, 1)
    }
  })
}

Bullets.prototype.update = function() {
  const { activeBullets } = State

  this.arr.forEach(bullet => {
    isInBounds(bullet.x, bullet.y) ? animateBullet() : unactivateBullet()
    function animateBullet() {
      bullet.active = true
      bullet.y -= bullet.velY
    }
    function unactivateBullet() {
      bullet.active = false

    }
  })
  this.clearInactive()
  setState({ activeBullets: this.arr })
  // console.log(activeBullets)
}

Bullets.prototype.fire = function(pos) {
  if (pos[1] > 0 ) {
    const bullet = new Bullet(pos)
    if (this.arr.length <= this.max) {
      this.arr.push(bullet)
    }
  }
}

Bullets.prototype.clear = function() {
  this.arr.forEach((bullet, i) => {
    if (bullet.x < 0 || bullet.y < 0 && bullet.active === false) {
      this.arr.splice(i, 1)
    }
  })
}

function Bullet(pos, type = 'default', active) {
  this.direction = (type === 'default') ? 'up' : 'down'
  this.pos = pos
  this.x = pos[0]
  this.y = pos[1]
  this.velY = 20
  this.active = undefined

  switch(type) {
    default:
      this.dmg = 1
      this.size = 5
  }
}
