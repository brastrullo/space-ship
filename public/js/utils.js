import { State, setState} from './store.js'

const createImage = (filename) => new Promise((resolve) => {
  const image = new Image()
  image.src = filename
  image.onload = () => resolve(image)
})

const isInBounds = (x, y) => {
  return x > 0 && y > 0
}

const initializeEnemies = () => {
  
}

const hitDetection = (activeEnemies, activeBullets) => {
  if (activeEnemies.length === 0 || activeBullets.length === 0) return

  activeEnemies.forEach((enemy,i) => {
    if (enemy.didHit()) {
      // activeEnemies.slice(i, 1)
    }
  })
  //filter ships and bullets for what is the most probable hit(farthest bullet/enemy out)
  const maxEnemyY = activeEnemies.reduce((result, currentEnemy) => (currentEnemy.y > result) ? currentEnemy.y : result, 0)
  const minBulletY = activeBullets.reduce((result, currentBullet) => (currentBullet.y < result) ? currentBullet.y : result, result)
}

// s.mouse doesn't need to be tested because it is implied in the store also mouse movement is crucial to the game
const hasMousePosition = (state = State) => state && Number.isInteger(state.mouse.y)

export { createImage, hasMousePosition, isInBounds }