const initialState = {
  inGameTime: undefined,
  canvas: undefined,
  ctx: undefined,
  gameRunning: false,
  gamePaused: false,
  cheatMenuEnabled: false,
  assetsLoaded: false,
  mouse: { x: undefined, y: undefined },
  weapon: {
    firing: false,
  },
  lastTimeBulletFired: 0,
  activeBullets: [],
  PlayerShip: undefined,
  EnemyShips: [],
  defeatedEnemies: [],
  timeLastDefeated: 0,
  keysPressed: {},
  waveStarted: undefined,
  wavesCompleted: {},
  currentLevel: 0,
  currentWave: 0
}

const State = Object.assign(true,{}, initialState)
const setState = (newObj, onStateUpdated = () => {}) => {
  Object.assign(State, newObj)
  onStateUpdated()
}

export { State, setState }

