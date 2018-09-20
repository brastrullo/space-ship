import { State, setState } from './store.js'

export default function Ship(image, x, y, shipConfig) {
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

  const {
    sizePercent,
    maxHp,
    shipDmg,
    velocity,
    linearSlope,
    timeCreated,
    startMotionTime
  } = shipConfig

  // Absolute values (passed in)
  this.image = image
  this.x = x
  this.y = y
  this.velocity = velocity ? velocity : 0 // x and y velocity
  this.linearSlope = linearSlope
  this.sizePercent = sizePercent
  this.maxHp = maxHp
  this.shipDmg = 0

  // Calculated values based on inputs
  const pct = (this.sizePercent / 100)
  this.width = Math.floor(image.width * pct)
  this.height = Math.floor(image.height * pct)
  this.halfWidth = Math.floor(this.width / 2)
  this.halfHeight = Math.floor(this.height / 2)
  this.radius = this.halfHeight - 5

  // Ship stats
  this.timeWasLastHit = undefined
  this.timeCreated = timeCreated
  this.startMotionTime = startMotionTime
}

Ship.prototype.tookDamage = function(bulletDmg, time) {
  const dmg = this.shipDmg + bulletDmg
  this.timeWasLastHit = time
  this.shipDmg = dmg >= this.maxHp ? this.maxHp : dmg
}

Ship.prototype.draw = function(time) {
  const { ctx } = State
  const shipX = this.x - this.halfWidth
  const shipY = this.y - this.halfHeight
  const shouldDrawHealthBar = this.timeWasLastHit + 150 >= time // show healthbar x ms after getting hit
  ctx.drawImage(this.image, shipX ,shipY, this.width, this.height)
  if (shouldDrawHealthBar === true) this.drawHealthBar()
}

Ship.prototype.moveShip = function(time) {
  if (this.startMotionTime <= time) {
    this.x += this.velocity[0]
    this.y += this.velocity[1]
  }
}

Ship.prototype.drawHealthBar = function() {
    const { ctx } = State
    const shipX = this.x - this.halfWidth
    const shipY = this.y - this.halfHeight
    const shipTop = shipY - 10
    const healthBarLength = ((this.maxHp - this.shipDmg) / this.maxHp) * this.width
    ctx.beginPath()
    ctx.rect(shipX, shipTop, healthBarLength, 2)
    ctx.fillStyle = 'red'
    ctx.fill()
}