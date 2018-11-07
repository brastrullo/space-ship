import { State, setState } from './store.js'

export default function UserInterface() {
  this.score = 0
}

UserInterface.prototype.update = function() {
  
}

UserInterface.prototype.draw = function() {
  const { ctx, PlayerShip } = State
  ctx.save()
  ctx.font = '18px Arial'
  ctx.fillStyle = 'white'
  ctx.fillText(`HP:${ PlayerShip.getHp() }`, 10, 50)
  ctx.restore()
  
  this.cheatMenu()
}

UserInterface.prototype.showGameOver = function() {

}

UserInterface.prototype.cheatMenu = function() {
  const { canvas, ctx, cheatMenuEnabled } = State
  if (cheatMenuEnabled) {
    ctx.save()
    ctx.fillStyle = '#222'
    ctx.fillRect(10, 10, canvas.width * .8, canvas.height / 2 )

    ctx.font = '25px Arial'
    ctx.fillStyle = 'white'
    ctx.fillText(`CHEAT MENU`, 20, 40)
    ctx.restore()
  }
}
