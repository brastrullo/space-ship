import { State, setState } from './store.js'
import { isInBounds } from './utils.js'

export default function Bullet( x, y, type = 'default') {
  this.x = x
  this.y = y
  this.type = type
  
  switch(type) {
    default:
      this.velY = 20
      this.dmg = 1
      this.size = 5
  }
}

Bullet.prototype.update = function() {
  const { activeBullet } = State
  if (activeBullet.length > 0) {
    if (this.y > 0) this.y -= this.velY
  }
  // clear inactive bullets
  activeBullet.forEach((bullet, i) => {
    if (bullet.y < 0) activeBullet.splice(i, 1)
  })
}

Bullet.prototype.draw = function() {
  const { activeBullet, ctx } = State
  if (activeBullet) {
    if (this.type === 'default') {
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x, this.y, this.size, this.size)
    }
  }
}
