'use strict'
import { State, setState } from './store.js'
import loadAssets from './loadAssets.js'
import { hasMousePosition } from './utils.js'
import { onKeyPress, onMouseMove, mouseDown, mouseUp } from './controls.js'
import { drawBullets, animateBullets } from './weapons.js'
import Ship from './Ship.js'
import Enemies from './Enemies.js'
import Bullets from './Bullets.js'
import Environment from './Environment.js'

const { started } = State

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const Space = new Environment()
export const PlayerShip = new Ship('../images/space-ship1.png')

const update = (time) => {
  const { mouse } = State
  PlayerShip.update(mouse)
}

// add error handling for assets loaded
const draw = (time) => {
  Space.draw(ctx)
  PlayerShip.draw(ctx)
  //ctx.save & restore only in draws
}

const loop = (currentTime) => {
  update(currentTime)
  draw(currentTime)
  requestAnimationFrame(loop)
}

const init = () => {
  const startGame = () => requestAnimationFrame(loop)

  window.addEventListener('resize', Space.resize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mousedown', mouseDown)
  window.addEventListener('mouseup', mouseUp)
  window.addEventListener('keypress', onKeyPress)

  // resize()
  loadAssets()
  startGame()
}

init()
