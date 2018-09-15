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
  const { EnemyShips, activeBullets } = State
  const isInShipBounds = (ship, bullet) => {
    const bulletRadius = Math.floor(bullet.size / 2)
    return Math.pow((bullet.x - ship.x), 2) + 
           Math.pow((bullet.y - ship.y), 2) <= Math.pow((bulletRadius + ship.radius), 2)
  }
  if (EnemyShips.length > 0) {
    activeBullets.forEach(bullet => {
      EnemyShips.forEach(EnemyShip => {
        if (isInShipBounds(EnemyShip, bullet)) {
          EnemyShip.tookDamage(bullet.dmg, time)
          bullet.x = -bullet.x // place bullet off screen to set inactive
        }
      })
    })
  }
}

const clearInactiveBullets = () => {
  const { activeBullets } = State
  setState({ activeBullets: activeBullets.filter(bullet => bullet.y > 0)})
}

const clearDestroyedShips = () => {
  const { EnemyShips } = State
  setState({ EnemyShips: EnemyShips.filter(ship => ship.shipDmg < ship.maxHp)})
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
    PlayerShip.firing = weapon.firing;
  }
}

const createPlayerShip = () => {
  // This is to create an instance of Ship but pointing to our loaded asset for Player Ship
  const { canvas, shipImg } = State;
  const buffer = 20; // pixels away from the bottom of the screen, like padding
  const playerStartX = Math.floor(canvas.width / 2)
  const playerStartY = (canvas.height - shipImg.height - buffer)
  setState({ PlayerShip: new Ship(shipImg, playerStartX, playerStartY, {
    maxHp: 100,
    sizePercent: 90
  })})
}

const createEnemyWave = () => {
  // This is to create an instance of Ship but pointing to our loaded asset for Enemy Ship
  const { canvas, enemyShipImg } = State;
  const enemyStartX = Math.floor(canvas.width / 2)
  const enemyStartY = Math.floor(canvas.height / 10) // 1/10th from the top of the screen
  const numberOfEnemies = 5
  const pos = [100, 100]
  const shipConfig = {
    maxHp: 25,
    sizePercent: 20
  }
  const EnemyShipArray = []
  const horizontalFormation = (pos, size, n) => {
    const padding = 10 // space in between each ship in formation
    for (let i = 0; i < n; i++) {
      const scaledSize = size * (shipConfig.sizePercent/ 100) * i
      const scaledPadding = padding * i
      const posX = pos[0] + scaledSize + scaledPadding
      const posY = pos[1]
      EnemyShipArray.push(new Ship(enemyShipImg, posX, posY, shipConfig))
    }
  }

  horizontalFormation(pos, enemyShipImg.width, numberOfEnemies)
  setState({ EnemyShips: EnemyShipArray})
}

export { createImage, hasMousePosition, hitDetection, clearInactiveBullets, clearDestroyedShips, handleFiringBullets, createPlayerShip, createEnemyWave }