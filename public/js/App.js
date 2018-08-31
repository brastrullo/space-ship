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



*/


const { started } = State

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
  if (activeBullet) {
    const bulletSpeed = 3;
    activeBullet.forEach(bullet => bullet.y -= bulletSpeed);
  }
  if (weapon && weapon.firing !== undefined) {
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
  update(currentTime)
  draw(currentTime)
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

const init = () => {
  const startGame = () => requestAnimationFrame(loop)
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')

  // I want to share the access to the canvas and the context, so I'm going to put it into state
  setState({ canvas, ctx });

  window.addEventListener('resize', onResize)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mousedown', mouseDown)
  window.addEventListener('mouseup', mouseUp)
  window.addEventListener('keypress', onKeyPress)

  onResize();

  loadAssets()
    .then(createPlayerShip)
    .then(createEnemyShip)
    .then(startGame)
}

init()
