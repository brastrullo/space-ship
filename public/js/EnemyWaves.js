import { State, setState } from './store.js'
import Ship from './Ship.js'

// add currentTime to initialization of ship
// startTime + x seconds === time

export const createEnemyWave = (time) => {
  // This is to create an instance of Ship but pointing to our loaded asset for Enemy Ship
  const { canvas, enemyShipImg, EnemyShips } = State;
  const canvasMidX = Math.floor(canvas.width / 2) // middle of canvas horizontally
  const canvasTopY = Math.floor(canvas.height / 10) // 1/10th from the top of the screen
  const midTopPos = [canvasMidX, canvasTopY]
  
  const enemyType1 = {
    maxHp: 15,
    sizePercent: 20,
    velocity: [0, .3],
    startMotionTime: 2000
  }

  const enemyType2 = {
    maxHp: 15,
    sizePercent: 20,
    velocity: [0,.5],
    startMotionTime: 2000
  }


  // console.log(verticalFormation(enemyShipImg, enemyShipImg.width, midTopPos, 8))
  const EnemyShipArray = (EnemyShips || []).concat(
    verticalFormation(enemyType1, enemyShipImg, enemyShipImg.width, midTopPos, 8),
    horizontalFormation(enemyType2, enemyShipImg, enemyShipImg.width, [100, 100], 5)
  )
  setState({ EnemyShips: EnemyShipArray })
}

const verticalFormation = (shipConfig, img, size, pos, n) => {
  const padding = 10 // space in between each ship in formation
  const formationArray = []
  for (let i = 0; i < n; i++) {
    const scaledSize = size * (shipConfig.sizePercent/ 100) * i
    const scaledPadding = padding * i
    const posX = pos[0]
    const posY = pos[1] + scaledSize + scaledPadding
    formationArray.push(new Ship(img, posX, posY, shipConfig))
  }
  return formationArray
}

const horizontalFormation = (shipConfig, img, size, pos, n) => {
  const padding = 10 // space in between each ship in formation
  const formationArray = []
  for (let i = 0; i < n; i++) {
    const scaledSize = size * (shipConfig.sizePercent/ 100) * i
    const scaledPadding = padding * i
    const posX = pos[0] + scaledSize + scaledPadding
    const posY = pos[1]
    formationArray.push(new Ship(img, posX, posY, shipConfig))
  }
  return formationArray
}