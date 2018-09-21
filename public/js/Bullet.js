import { State, setState } from './store.js'

export default function Bullet( x, y ) {
  this.x = x
  this.y = y
  this.velY = 20
  this.dmg = 10
  this.size = 5
  this.radius = Math.floor(this.size / 2)
}

Bullet.prototype.update = function() {
  if (this.y > 0) {
    this.y -= this.velY
  }
}

Bullet.prototype.draw = function() {
  const { ctx } = State
  ctx.fillStyle = 'white';
  ctx.fillRect(this.x, this.y, this.size, this.size)
}
