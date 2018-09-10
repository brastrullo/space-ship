import { State, setState } from './store.js'

export default function Ship(image, x, y, sizePct = 100) {
  // Validate the inputs before we go forwards, so that we can safely assume image, x and y
  // are all valid to use and we are safe to use them without checking
  if (!(image instanceof Image)) {
    throw new Error('Invalid or missing image!', image);
  }
  if (x < 0 || x > canvas.width) {
    throw new Error('Invalid X, out of bounds of canvas');
  }
  if (y < 0 || y > canvas.height) {
    throw new Error('Invalid Y, out of bounds of canvas');
  }

  // Absolute values (passed in)
  this.image = image
  this.x = x
  this.y = y

  // Calculated values based on inputs
  const pct = (sizePct / 100)
  this.width = Math.floor(image.width * pct)
  this.height = Math.floor(image.height * pct)
  this.halfWidth = Math.floor(this.width / 2)
  this.halfHeight = Math.floor(this.height / 2)
  this.radius = this.halfHeight - 5

  // Ship stats
  this.hp = 100
  this.hit = false
}

Ship.prototype.tookDamage = function(dmg) {
  this.hit = true
  this.hp = Math.max(0, this.hp - dmg) // keep hp positive 0+

  if (this.hp <= 0) {
    this.hit = false
    console.log('ENEMY DEAD')
  }
  console.log(this.hp, this.hit)
}

Ship.prototype.draw = function() {
  const { ctx } = State
  const shipX = this.x - this.halfWidth
  const shipY = this.y - this.halfHeight

  ctx.drawImage(this.image, shipX ,shipY, this.width, this.height)
  this.drawHealthBars()
}

Ship.prototype.drawHealthBars = function() {
  if (this.hit === true) {
    const { ctx } = State
    const shipX = this.x - this.halfWidth
    const shipY = this.y - this.halfHeight
    const shipTop = shipY - 10
    const healthBarWidth = this.width * (this.hp / 100)

    ctx.beginPath()
    ctx.rect(shipX, shipTop, healthBarWidth, 2)
    ctx.fillStyle = 'red'
    ctx.fill()
    
    setTimeout(() => this.hit = false, 200)
  }
}