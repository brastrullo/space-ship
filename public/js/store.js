const initialState = {
  canvas: undefined,
  ctx: undefined,
  gameRunning: false,
  assetsLoaded: false,
  mouse: { x: undefined, y: undefined },
  weapon: {
    firing: false,
  },
  lastTimeBulletFired: 0,
  activeBullets: [],
  PlayerShip: undefined,
  EnemyShips: undefined
}

const State = Object.assign(true,{}, initialState)
const setState = (newObj, onStateUpdated = () => {}) => {
  Object.assign(State, newObj)
  onStateUpdated()
}

export { State, setState }

