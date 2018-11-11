import { State, setState} from './store.js'
import Ship from './Ship.js'
import Bullet from './Bullet.js'

const createImage = (filename) => new Promise((resolve) => {
  const image = new Image()
  image.src = filename
  image.onload = () => resolve(image)
})

// s.mouse doesn't need to be tested because it is implied in the store also mouse movement is crucial to the game
const hasMousePosition = (state = State) => state && Number.isInteger(state.mouse.y)

const hitDetection = (time) => {
  const { EnemyShips, activeBullets, PlayerShip } = State
  const isInShipBounds = (ship, object) => {
    return Math.pow((object.x - ship.x), 2) + 
           Math.pow((object.y - ship.y), 2) <= Math.pow((object.radius + ship.radius), 2)
  }
  const EnemyActive = EnemyShips.filter(EnemyShip => EnemyShip.spawnCondition <= time)
  if (EnemyShips.length > 0) {
    //check if bullets hit enemy
    activeBullets.forEach(bullet => {
      EnemyActive.forEach(EnemyShip => {
        if (isInShipBounds(EnemyShip, bullet)) {
          EnemyShip.tookDamage(bullet.dmg, time)
          bullet.x = -bullet.x // place bullet off screen to set inactive
        }
      })
    })
    //check if playerShip hit enemyShip
    EnemyActive.forEach(EnemyShip => {
      if (isInShipBounds(EnemyShip, PlayerShip)) {
        const kamakazeDmg = .5 // damage multiplier that ship takes when hitting another ship
        PlayerShip.tookDamage(EnemyShip.maxHp * kamakazeDmg, time)
        EnemyShip.tookDamage(PlayerShip.maxHp * kamakazeDmg, time)
        setState({ PlayerHp: PlayerShip.getHp()})
        
        if (PlayerShip.shipDmg >= PlayerShip.maxHp) {
          console.log('Player dead. GAME OVER!!')
          PlayerShip.timeDefeated = time
        }
      }
    })
  }
}

const advanceWave = (time) => {
  const { EnemyShips, currentWave, waveStarted, wavesCompleted } = State
  const waveTimeElapsed = time - waveStarted
  setState({
    waveStarted: time,
    wavesCompleted: {...wavesCompleted, [currentWave]: waveTimeElapsed },
    currentWave: currentWave + 1
  })
}

const enemyWaveDefeated = () => {
  const { EnemyShips, defeatedEnemies, currentWave, wavesCompleted } = State
  return (EnemyShips.filter(ship => ship.spawnWave === currentWave).length === 0) &&
         (defeatedEnemies.filter(ship => ship.spawnWave === currentWave).length > 0)
}

const clearInactiveBullets = () => {
  const { activeBullets } = State
  setState({ activeBullets: activeBullets.filter(bullet => bullet.y > 0)})
}

const clearInactiveShips = (time) => {
  // removes ships at max damage from active array
  const { EnemyShips, defeatedEnemies, lastDefeatedEnemy } = State

  const enemies = EnemyShips.filter(ship => ship.shipDmg >= ship.maxHp)
  const defeated = enemies.length > 0
  enemies.forEach(ship => ship.timeDefeated = time)
  const lastDefeated = enemies.sort((a, b) => b.timeDefeated - a.timeDefeated)[0]

  setState({
    lastDefeatedEnemy: defeated ? lastDefeated : lastDefeatedEnemy,
    defeatedEnemies: defeated ? defeatedEnemies.concat(enemies) : defeatedEnemies,
    EnemyShips: EnemyShips.filter(ship => ship.shipDmg < ship.maxHp)
  })
}

const handleFiringBullets = (time) => {
  const { activeBullets, PlayerShip, weapon, lastTimeBulletFired } = State
  const bulletsArray = []
  if (weapon && weapon.firing !== undefined) {
    const throttleBulletFire = 132 // time in frames to throttle weapon firing
    if (weapon.firing === true && time - lastTimeBulletFired > throttleBulletFire) {
      // then add a new bullet to the list of active bullets
      const bullet = new Bullet(PlayerShip.x,PlayerShip.y - PlayerShip.halfHeight)
      bulletsArray.push(bullet)
      setState({
        activeBullets: (activeBullets || []).concat(bulletsArray),
        lastTimeBulletFired: time
      })
    }
    PlayerShip.firing = weapon.firing
  }
}

const createPlayerShip = () => {
  // This is to create an instance of Ship but pointing to our loaded asset for Player Ship
  const { canvas, shipImg } = State
  const buffer = 20; // pixels away from the bottom of the screen, like padding
  const playerStartX = Math.floor(canvas.width / 2)
  const playerStartY = (canvas.height - shipImg.height - buffer)
  setState({ PlayerShip: new Ship(shipImg, playerStartX, playerStartY, {
    maxHp: 100,
    sizePercent: 85
  })})
}

export {
  createImage,
  hasMousePosition,
  hitDetection,
  clearInactiveBullets,
  clearInactiveShips,
  handleFiringBullets,
  createPlayerShip,
  enemyWaveDefeated,
  advanceWave }