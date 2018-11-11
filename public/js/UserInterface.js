import { State, setState } from './store.js'

const showGameOver = function() {
  const { ctx } = State
  ctx.save()
  ctx.font = '40pt Arial'
  ctx.fillStyle = 'white'
  const txt = 'Game Over'
  const midX = Math.floor((canvas.width/2) - (ctx.measureText(txt).width /2))
  const midY = Math.floor((canvas.height/2) - (parseInt(ctx.font)/2))
  ctx.fillText(txt, midX, midY)
  ctx.restore()
}

const showWaveDefeated = function(pts) {
  const { ctx, score } = State
  ctx.save()
  ctx.font = '20pt Arial'
  ctx.fillStyle = 'white'
  const txt = 'Wave Defeated'
  const midX = Math.floor((canvas.width/2) - (ctx.measureText(txt).width /2))
  const midY = Math.floor((canvas.height/5) - (parseInt(ctx.font)/2))
  ctx.fillText(txt, midX, midY)
  if (pts > 0) {
    ctx.fillText(`Bonus: +${pts}`, midX, midY + parseInt(ctx.font))
  }
  ctx.restore()
}

export default function UserInterface(score = 0) {
  const { ctx, PlayerShip, defeatedEnemies } = State
  this.score = score
  this.timeLastWaveDefeated = 0
  this.showNewWave = false
  this.wavePts = 0
}

UserInterface.prototype.update = function(time) {
  const { ctx, PlayerShip, defeatedEnemies, wavesCompleted, currentWave } = State
  this.score = Math.floor(defeatedEnemies.map(enemy => enemy.shipDmg).reduce((a, b) => a + b, 0))
  this.wavePts = Math.floor(calculateWavePoints())
  if (this.showNewWave) {
    if (this.timeLastWaveDefeated + 1000 <= time) {
      this.showNewWave = false
      this.timeLastWaveDefeated = 0
    }
  }
  const bonuses = this.wavePts
  setState({ score: this.score + bonuses})
}


const calculateWavePoints = () => {
  const { defeatedEnemies, wavesCompleted, currentWave } = State
  // calculated by max time wave on screen - time it takes to eliminate wave
  const maxLevelWavePoints = 6000 * .1 * .5 // TO-DO: multiplier on max time wave on screen
  const dead = defeatedEnemies.filter(enemy => enemy.spawnWave === currentWave - 1)
  const mapped = dead.map(ship => ship.shipDmg)
  const reduced = mapped.reduce((a,b) => a + b, 0) * .25 //TO-DO: should only add if perfect wave
  const wavePts = maxLevelWavePoints - (wavesCompleted[currentWave - 1] * .05) + reduced
  return wavePts > 0 ? wavePts : 0
}

UserInterface.prototype.triggerNewWave = function(time) {
  this.showNewWave = true
  this.timeLastWaveDefeated = time
}

UserInterface.prototype.draw = function() {
  const { ctx, PlayerShip, defeatedEnemies, score } = State

  ctx.save()
  ctx.font = '18pt Arial'
  ctx.fillStyle = 'white'

  const padding = 10
  const slot = (n) => (parseInt(ctx.font) + 5) * n
  ctx.fillText(`HP:${ PlayerShip.getHp() }`, padding, slot(1))
  ctx.fillText(`SCORE:${ score }`, padding, slot(2) )
  ctx.restore()
  
  this.cheatMenu()
  if (PlayerShip.timeDefeated !== null) showGameOver()
  if (this.showNewWave) showWaveDefeated(this.wavePts)
}

// UserInterface.prototype.updateScore = function(pts) {
//   console.log('Score:', this.score, `+${pts}`)
//   this.score += pts
// }

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
