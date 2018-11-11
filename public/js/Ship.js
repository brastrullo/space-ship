import { State, setState } from './store.js'

export default function Ship(image, x, y, shipConfig) {
  // Validate the inputs before we go forwards, so that we can safely assume image, x and y
  // are all valid to use and we are safe to use them without checking
  if (!(image instanceof Image)) {
    throw new Error('Invalid or missing image!', image);
  }

  const {
    sizePercent,
    maxHp,
    shipDmg,
    velocity,
    linearSlope,
    timeCreated,
    spawnCondition,
    spawnWave
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
  this.timeDefeated = null
  
  // Calculated values based on inputs
  const pct = (this.sizePercent / 100)
  this.width = Math.floor(image.width * pct)
  this.height = Math.floor(image.height * pct)
  this.halfWidth = Math.floor(this.width / 2)
  this.halfHeight = Math.floor(this.height / 2)
  this.radius = this.halfHeight - 5
  
  // Ship stats
  this.moveSpd = 8
  this.timeWasLastHit = undefined
  this.timeCreated = timeCreated
  this.spawnCondition = spawnCondition
  this.spawnWave = spawnWave
  this.firing = false // TO-DO
}

Ship.prototype.tookDamage = function(bulletDmg, time) {
  const dmg = this.shipDmg + bulletDmg
  this.timeWasLastHit = time
  this.shipDmg = dmg >= this.maxHp ? this.maxHp : dmg
}

Ship.prototype.getHp = function() {
  return this.maxHp - this.shipDmg
}

Ship.prototype.draw = function(time) {
  if ((this.x < 0 || this.x > canvas.width) || (this.y < 0 || this.y > canvas.height)) return

  const { ctx } = State
  const shipX = this.x - this.halfWidth
  const shipY = this.y - this.halfHeight
  const shouldDrawHealthBar = this.timeWasLastHit + 150 >= time // show healthbar x ms after getting hit

  ctx.drawImage(this.image, shipX ,shipY, this.width, this.height)
  if (shouldDrawHealthBar === true) this.drawHealthBar()
}

Ship.prototype.moveShip = function(time) {
  if (this.spawnCondition <= time && this.spawnWave === State.currentWave) {
    this.x += this.velocity[0]
    this.y += this.velocity[1]
  }
}

Ship.prototype.moveLeft = function() { this.x -= this.moveSpd }
Ship.prototype.moveUp = function() { this.y -= this.moveSpd }
Ship.prototype.moveRight = function() { this.x += this.moveSpd }
Ship.prototype.moveDown = function() { this.y += this.moveSpd }
Ship.prototype.firing = function() { this.firing = !this.firing }

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
  ctx.closePath()
}