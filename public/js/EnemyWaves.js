import { State, setState } from './store.js'
import Ship from './Ship.js'

export const createEnemyWave = (time) => {
  // This is to create an instance of Ship but pointing to our loaded asset for Enemy Ship
  const { canvas, enemyShipImg, EnemyShips } = State
  const canvasMidX = Math.floor(canvas.width / 2) // middle of canvas horizontally
  const canvasTopY = Math.floor(canvas.height / 10) // 1/10th from the top of the screen
  const midTopPos = [canvasMidX, canvasTopY]

  const enemyType = (type, event) => {
    switch(type) {
      case 1:
        return { maxHp: 25, sizePercent: 20, img: enemyShipImg, velocity: [0, 3], spawnCondition: 500 }
        break
      default:
        console.log('No type selected')
        return false
    }
  }

  const EnemyShipArray = [].concat(
    verticalFormation(enemyType(1), 150, 8, 1),
    verticalFormation(enemyType(1), 350, 4, 2),
    verticalFormation(enemyType(1), 150, 4, 2),
    verticalFormation(enemyType(1), 150, 2, 3),
    verticalFormation(enemyType(1), 200, 2, 3),
    verticalFormation(enemyType(1), 350, 2, 3),
  )
  setState({ EnemyShips: EnemyShips.concat(EnemyShipArray), currentWave: 1, waveStarted: 0 })
}

const lineWave = (shipConfig, pos, n, spawnCondition) => {
  const formationArray = []
  const spawnInterval = (1 / shipConfig.velocity[1]) * 1000
  for (let i = 0; i < n; i++) {
    const posX = pos[0]
    const posY = pos[1]
    shipConfig.spawnCondition = spawnCondition + (spawnInterval * i)
    formationArray.push(new Ship(shipConfig.img, posX, posY, shipConfig))
  }
  return formationArray
}

const setTimeLastWaveDefeated = (time) => setState({ timeLastWaveDefeated: time})

const verticalFormation = (shipConfig, posX, n, spawnWave) => {
  const padding = 10 // space in between each ship in formation
  const size = shipConfig.img.width
  shipConfig.spawnWave = spawnWave
  const formationArray = []
  for (let i = 0; i < n; i++) {
    const scaledSize = size * (shipConfig.sizePercent/ 100) * i
    const scaledPadding = padding * i
    const posY = -shipConfig.img.height - scaledSize - scaledPadding
    formationArray.push(new Ship(shipConfig.img, posX, posY, shipConfig))
  }
  return formationArray
}

const createWave = (type, n, screen, origin, vector, event) => {
  const formationArray = []
  const padding = 10 // space in between each ship in formation
  const size = img.width
  
  switch (screen) {
    case 'top':
      break
    case 'left':
      break
    case 'right':
      break
    default:
      break
  }
  return formationArray
} 
