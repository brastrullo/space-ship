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

const clearInactiveShips = () => {
  // removes ships at max damage from active array
  // TODO: clear ships off screen
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

export {
  createImage,
  hasMousePosition,
  hitDetection,
  clearInactiveBullets,
  clearInactiveShips,
  handleFiringBullets,
  createPlayerShip }