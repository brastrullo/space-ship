const initialState = {
  started: true,
  mouse: { x: undefined, y: undefined },
  Enemies: [],
  Ship: {
    x: undefined,
    y: undefined
  },
  weapon: {
    firing: false,
  },
  bullets: 5,
  activeBullets: []
}

const State = Object.assign(true,{}, initialState)
const setState = (newObj, log = 0) => {

  if (newObj.Ship !== undefined && newObj.size !== undefined) {
    newObj.size = Math.floor(newObj.size)
  }

  // merge(State, newObj)
  Object.assign(State, newObj)
  log === 0 ? '' : log()
}

const merge = (objSrc, objTarget) => 
  Object.keys(objTarget).reduce((src, prop) => {
    if(!src.hasOwnProperty(prop)) src[prop] = objTarget[prop];
    return src
  }, objSrc)

export { State, setState }

