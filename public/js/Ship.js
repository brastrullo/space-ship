import { State, setState } from './store.js'
import { createImage } from './utils.js'
import Bullets from './Bullets.js'
const { mouse } = State

const shipOrigin = () => {
  return [Math.round(canvas.width / 2), Math.round(canvas.height - (canvas.height * .1))]
}

export default function Ship(imgUrl, size = 80, pos = shipOrigin()) {
  this.imgUrl = imgUrl
  this.size = size
  this.pos = pos
  this.x = pos[0]
  this.y = pos[1]
  this.firing = false
  this.weapon = new Bullets('default', this.maxBullets)
  this.maxBullets = 50
  this.bulletsArray = this.weapon.arr
}

Ship.prototype.draw = function(ctx) {
  const x = this.x ? this.x : shipOrigin()[0];
  const y = this.y ? this.y : shipOrigin()[1];
  // we know from loadAssets, the shipImg will be found in State
  const { shipImg } = State;
  const hasImage = shipImg instanceof Image;
  if (hasImage) {
    ctx.drawImage(shipImg,
      0, 0, shipImg.height, shipImg.height, // Source Image, Location and size: (0, 0) => (size, size)
      x, y, this.size, this.size // Destination Image on canvas, Location and size: (10, top) => (size, size)
    )
  }
  this.weapon.draw(ctx)
}

Ship.prototype.update = function(mouse) {
  if (this.pos !== undefined && this.x !== mouse.x && this.y !== mouse.y) {
    const size = this.size
    const xPos = mouse.x - (size / 2)
    const yPos = mouse.y - size
    this.pos = [xPos, yPos]
    this.x = xPos
    this.y = yPos
    this.midX = (this.x + (this.size / 2))
  }
  if (this.firing === true) {
    this.weapon.fire([this.midX, this.y])
  }
  this.weapon.update()
}

Ship.prototype.logObj = function() {
  console.log(this)
}
