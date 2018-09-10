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
  activeBullet: [],
  PlayerShip: undefined,
  EnemyShip: undefined
}

const State = Object.assign(true,{}, initialState)
const setState = (newObj, onStateUpdated = () => {}) => {
  Object.assign(State, newObj)
  onStateUpdated()
}

export { State, setState }

