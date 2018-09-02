const initialState = {
  canvas: undefined,
  ctx: undefined,
  gameRunning: false,
  mouse: { x: undefined, y: undefined },
  Enemies: [],
  weapon: {
    firing: false,
  },
  midX: undefined,
  bullets: 5,
  activeBullets: [], // we're deprcating
  activeEnemies: [],
  assetsLoaded: false,
  /*
  bullets: {
    lastTimeBulletFired: 0,
    activeBullets: []
  }
  */
  lastTimeBulletFired: 0,
  activeBullet: []
}

const State = Object.assign(true,{}, initialState)
const setState = (newObj, onStateUpdated = () => {}) => {
/*
  if (newObj.Ship !== undefined && newObj.size !== undefined) {
    newObj.size = Math.floor(newObj.size)
  }
*/
  Object.assign(State, newObj)
  onStateUpdated()
}

export { State, setState }

