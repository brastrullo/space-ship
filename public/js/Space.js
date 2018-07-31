import { State, setState } from './store.js'
import { createImage } from './utils.js'
import Enemies from './Enemies.js'

export default function Space() {
  this.activeEnemies = []
  this.activeBullets = []
  this.background = ""
}

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

// const resize = () => {
//   canvas.width = window.innerWidth
//   canvas.height = window.innerHeight
// }

const addBackground = (ctx) => {
  ctx.fillStyle = '#123'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}


Space.prototype.draw = function(ctx) {
  addBackground(ctx)
  EnemyShips.draw(ctx)
}

Space.prototype.update = function() {

}

Space.prototype.addEnemies = function() {

}

Space.prototype.collisionDetection = function() {
  
}