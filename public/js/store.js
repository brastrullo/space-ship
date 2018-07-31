export const canvas = document.getElementById('canvas')
export const ctx = canvas.getContext('2d')

const initialState = {
  started: true,
  mouse: { x: undefined, y: undefined },
  Enemies: [],
  weapon: {
    firing: false,
  },
  midX: undefined,
  bullets: 5,
  activeBullets: [],
  activeEnemies: [],
  assetsLoaded: false,
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

