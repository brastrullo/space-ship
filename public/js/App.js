'use strict'
import { State, setState } from './store.js'
import loadAssets from './loadAssets.js'
import { hasMousePosition } from './utils.js'
import { onKeyPress, onMouseMove, mouseDown, mouseUp } from './controls.js'
// import { drawBullets, animateBullets } from './weapons.js'
import Ship from './Ship.js'
import Enemies from './Enemies.js'
import Bullets from './Bullets.js'
import Environment from './Environment.js'

/*
TODO:
- update enemy to use Ship() instead of its own entity
- refactor bullets to be a bullet, and just focus on a single bullet
- refactor environment


*/


const Space = new Environment()

const update = (time) => {
  const { mouse, PlayerShip, weapon, activeBullet, lastTimeBulletFired } = State

  // Update the player ship's location with the mouse location
  const hasMouse = (mouse.x !== undefined && mouse.y !== undefined);
  if (hasMouse) {
    PlayerShip.x = mouse.x
    // TODO: if you want the ship to move up and down with the mouse, uncomment this line
    // PlayerShip.y = mouse.y
  }

  // If there are bullets, move them
  if (activeBullet) {
    const bulletSpeed = 3;
    activeBullet.forEach(bullet => bullet.y -= bulletSpeed);
  }

  // Handle bullet firing
  if (weapon && weapon.firing !== undefined) {
    // If the weapon is firing and there has been enough time between bullets to fire another
    // then add a new bullet to the list of active bullets
    if (weapon.firing === true && time - lastTimeBulletFired > 132) {
      setState({ activeBullet: (activeBullet || []).concat({ x: PlayerShip.x, y: PlayerShip.y - PlayerShip.halfShipHeight }), lastTimeBulletFired: time })
    }
    PlayerShip.firing = weapon.firing;
  }
}

// add error handling for assets loaded
const draw = (time) => {
  const { PlayerShip, ctx, activeBullet } = State;
  Space.draw(ctx)
  PlayerShip.draw()

  if (activeBullet) {
    ctx.fillStyle = 'blue';
    activeBullet.forEach(bullet => ctx.fillRect(bullet.x, bullet.y, 5, 5));
  }

  //ctx.save & restore only in draws
}

const loop = (currentTime) => {
  const { gameRunning } = State
  if (gameRunning) {
    update(currentTime)
    draw(currentTime)
  }
  requestAnimationFrame(loop)
}

const onResize = (e) => {
  const { canvas } = State;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const createPlayerShip = () => {
  // This is to create an instance of Ship but pointing to our loaded asset for Player Ship
  // e.g. setState({ PlayerShip: new Ship() })
  const buffer = 20; // pixels away from the bottom of the screen, like padding
  setState({ PlayerShip: new Ship(State.shipImg, canvas.width / 2, canvas.height - State.shipImg.height - buffer) })
};

const createEnemyShip = () => {
  // This is to create an instance of Ship but pointing to our loaded asset for Enemy Ship
  // e.g. setState({ EnemyShip: new Ship() })
  setState({ EnemyShip: new Ship(State.enemyShipImg, canvas.width / 2, 100) })
};

const startGame = () => {
  // Set the state so we know the game is running
  // and then kick off the game loop
  setState({ gameRunning: true }, () => requestAnimationFrame(loop));
}

const init = () => {
  // I want to share the access to the canvas and the context, so I'm going to put it into state
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  setState({ canvas, ctx });

  // Setup event listeners
  window.addEventListener('resize', onResize)
  window.addEventListener('keypress', onKeyPress)
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', mouseDown)
  canvas.addEventListener('mouseup', mouseUp)

  // Trigger the onResize event, to set the canvas to the size of the window
  onResize()

  // Setup everything needed for the game, and then start the game
  loadAssets()
    .then(createPlayerShip)
    .then(createEnemyShip)
    .then(startGame)
}

init()
