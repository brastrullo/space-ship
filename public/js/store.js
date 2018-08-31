const initialState = {
  started: true,
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
const setState = (newObj, log = () => {}) => {

  if (newObj.Ship !== undefined && newObj.size !== undefined) {
    newObj.size = Math.floor(newObj.size)
  }

  Object.assign(State, newObj)
  log()
}

export { State, setState }

