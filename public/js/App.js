'use strict'
import { State, setState } from './store.js'
import loadAssets from './loadAssets.js'
import { hasMousePosition } from './utils.js'
import setupEventListeners from './controls.js'
import Ship from './Ship.js'
import Bullet from './Bullet.js'
import Environment from './Environment.js'

/*
TODO:
  - refactor Enemies.js
  - refactor environment
  - add hit detection
*/

const hitDetection = () => {
  const { EnemyShip, activeBullet } = State

  if (EnemyShip !== undefined) {
    const isInShipBounds = (ship, bullet) => {
      const bulletRadius = Math.floor(bullet.size / 2)
      return Math.pow((bullet.x - ship.x), 2) + 
             Math.pow((bullet.y - ship.y), 2) <= Math.pow((bulletRadius + ship.radius), 2)
    }

    activeBullet.forEach(bullet => {
      if (isInShipBounds(EnemyShip, bullet)) {
        EnemyShip.tookDamage(bullet.dmg)
      }
    })
    setState({ activeBullet: activeBullet.filter(bullet => !(isInShipBounds(EnemyShip, bullet)))})
  }
}

const clearInactiveBullets = () => {
  const { activeBullet } = State
  setState({ activeBullet: activeBullet.filter(bullet => bullet.y > 0)})
}

const handleFiringBullets = (time) => {
  const { activeBullet, PlayerShip, weapon, lastTimeBulletFired } = State
  const bulletsArray = []
  if (weapon && weapon.firing !== undefined) {
    const throttleBulletFire = 132 // time in frames to throttle weapon firing
    if (weapon.firing === true && time - lastTimeBulletFired > throttleBulletFire) {
      // then add a new bullet to the list of active bullets
      const bullet = new Bullet(PlayerShip.x,PlayerShip.y - PlayerShip.halfHeight)
      bulletsArray.push(bullet)
      setState({
        activeBullet: (activeBullet || []).concat(bulletsArray), 
        lastTimeBulletFired: time 
      })
    }
    PlayerShip.firing = weapon.firing;
  }
}


const Space = new Environment()

const update = (time) => {
  const { mouse, PlayerShip, EnemyShip, activeBullet } = State

  // Update the player ship's location with the mouse location
  const hasMouse = (mouse.x !== undefined && mouse.y !== undefined);
  if (hasMouse) {
    PlayerShip.x = mouse.x
    // TODO: if you want the ship to move up and down with the mouse, uncomment this line
    // PlayerShip.y = mouse.y
  }

  activeBullet.forEach( bullet => bullet.update())
  hitDetection()
  clearInactiveBullets()
  handleFiringBullets(time)
}

// add error handling for assets loaded
const draw = (time) => {
  const { PlayerShip, EnemyShip, activeBullet } = State;
  Space.draw()
  PlayerShip.draw()
  EnemyShip.draw()
  activeBullet.forEach( bullet => bullet.draw())
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

const createPlayerShip = () => {
  // This is to create an instance of Ship but pointing to our loaded asset for Player Ship
  const { canvas, shipImg } = State;
  const buffer = 20; // pixels away from the bottom of the screen, like padding
  const playerStartX = Math.floor(canvas.width / 2)
  const playerStartY = (canvas.height - shipImg.height - buffer)
  const playerShipSizePct = 90 // % of the original image size
  setState({ PlayerShip: new Ship(shipImg, playerStartX, playerStartY, playerShipSizePct, 'player') })
}

const createEnemyShip = () => {
  // This is to create an instance of Ship but pointing to our loaded asset for Enemy Ship
  const { canvas, enemyShipImg } = State;
  const enemyStartX = Math.floor(canvas.width / 2)
  const enemyStartY = Math.floor(canvas.height / 10) // 1/10th from the top of the screen
  const enemyShipSizePct = 20 // % of the original image size
  setState({ EnemyShip: new Ship(enemyShipImg, enemyStartX, enemyStartY, enemyShipSizePct, 'default') })
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
  setupEventListeners();

  // Trigger the onResize event, to set the canvas to the size of the window
  window.dispatchEvent(new Event('resize'))

  // Setup everything needed for the game, and then start the game
  loadAssets()
    .then(createPlayerShip)
    .then(createEnemyShip)
    .then(startGame)
}

init()
