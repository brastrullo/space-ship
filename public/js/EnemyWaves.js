import { State, setState } from './store.js'
import Ship from './Ship.js'

export const createEnemyWave = (time) => {
  // This is to create an instance of Ship but pointing to our loaded asset for Enemy Ship
  const { canvas, enemyShipImg } = State;
  const canvasMidX = Math.floor(canvas.width / 2) // middle of canvas horizontally
  const canvasTopY = Math.floor(canvas.height / 10) // 1/10th from the top of the screen
  const midTopPos = [canvasMidX, canvasTopY]
  const EnemyShipArray = []
  
  const verticalFormation = (img, size, pos, n) => {
    const shipConfig = {
      maxHp: 15,
      sizePercent: 20,
      velocity: [0, .3],
      startMotionTime: 4000
    }
    const padding = 10 // space in between each ship in formation
    for (let i = 0; i < n; i++) {
      const scaledSize = size * (shipConfig.sizePercent/ 100) * i
      const scaledPadding = padding * i
      const posX = pos[0]
      const posY = pos[1] + scaledSize + scaledPadding
      EnemyShipArray.push(new Ship(img, posX, posY, shipConfig))
    }
  }

  const horizontalFormation = (img, size, pos, n) => {
    const shipConfig = {
      maxHp: 15,
      sizePercent: 20,
      velocity: [0,.5],
      startMotionTime: 6000
    }
    const padding = 10 // space in between each ship in formation
    for (let i = 0; i < n; i++) {
      const scaledSize = size * (shipConfig.sizePercent/ 100) * i
      const scaledPadding = padding * i
      const posX = pos[0] + scaledSize + scaledPadding
      const posY = pos[1]
      EnemyShipArray.push(new Ship(img, posX, posY, shipConfig))
    }
  }

  horizontalFormation(enemyShipImg, enemyShipImg.width, [100, 100], 5)
  verticalFormation(enemyShipImg, enemyShipImg.width, midTopPos, 8)
  setState({ EnemyShips: EnemyShipArray})
}