'use strict'
import { State, setState } from './store.js'
import loadAssets from './loadAssets.js'
import { 
  hasMousePosition, 
  hitDetection,
  clearInactiveBullets,
  clearDestroyedShips,
  handleFiringBullets,
  createPlayerShip,
  createEnemyWave
} from './utils.js'
import setupEventListeners from './controls.js'
import Environment from './Environment.js'

/*
TODO:
  - refactor environment
*/

const Space = new Environment()

const update = (time) => {
  const { mouse, PlayerShip, EnemyShips, activeBullets } = State

  // Update the player ship's location with the mouse location
  const hasMouse = (mouse.x !== undefined && mouse.y !== undefined);
  if (hasMouse) {
    PlayerShip.x = mouse.x
    // TODO: if you want the ship to move up and down with the mouse, uncomment this line
    // PlayerShip.y = mouse.y
  }

  activeBullets.forEach( bullet => bullet.update())
  hitDetection(time)
  clearInactiveBullets()
  clearDestroyedShips()
  handleFiringBullets(time)
}

// add error handling for assets loaded
const draw = (time) => {
  const { PlayerShip, EnemyShips, activeBullets } = State
  Space.draw()
  PlayerShip.draw(time)
  EnemyShips.forEach(enemy => enemy.draw(time))
  activeBullets.forEach(bullet => bullet.draw(time))
  //TODO: add ctx.save & restore in draw functions
}

const loop = (currentTime) => {
  const { gameRunning } = State
  if (gameRunning) {
    update(currentTime)
    draw(currentTime)
  }
  requestAnimationFrame(loop)
}

const startGame = () => {
  // Set the state so we know the game is running
  // and then kick off the game loop
  setState({ gameRunning: true }, () => requestAnimationFrame(loop))
}

const init = () => {
  // I want to share the access to the canvas and the context, so I'm going to put it into state
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  setState({ canvas, ctx });

  // Setup event listeners
  setupEventListeners()

  // Trigger the onResize event, to set the canvas to the size of the window
  window.dispatchEvent(new Event('resize'))

  // Setup everything needed for the game, and then start the game
  loadAssets()
    .then(createPlayerShip)
    .then(createEnemyWave)
    .then(startGame)
}

init()
