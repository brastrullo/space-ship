import { State } from './store.js'
// import { createImage } from './utils.js'
// import Enemies from './Enemies.js'
// import Ship from './Ship.js'

export default function Environment() {
  // this.activeEnemies = []
  // this.activeBullets = []
  // this.background = ""
}

/*
export const EnemyShips = new Enemies('../images/enemyShip.png', [
  {x: 100, y: 100},
  {x: 200, y: 100},
  {x: 300, y: 100},
  {x: 400, y: 100},
  {x: 500, y: 100},
  {x: 600, y: 100},
  {x: 700, y: 100},
  {x: 800, y: 100},
])
*/

const drawBackground = () => {
  const { canvas, ctx } = State
  ctx.beginPath()
  ctx.fillStyle = '#123'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.closePath()
}

Environment.prototype.draw = function(ctx) {
  drawBackground(ctx)
  // EnemyShips.draw(ctx)
}

Environment.prototype.update = function() {

}
