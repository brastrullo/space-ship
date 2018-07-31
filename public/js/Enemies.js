import { State, setState } from './store.js'
import { createImage, resize } from './utils.js'
import Ship from './Ship.js'
import Bullets from './Bullets.js'

export default function Enemies(imgUrl, coordinates, size = 80, type = 'default') {
  this.imgUrl = imgUrl
  this.size = size
  this.type = type
  this.coordinates = coordinates
  this.arr = []
}

function EnemyInit(Enemies) {
  Enemies.coordinates.forEach(pos => {
    const enemy = new Enemy(Enemies.type, pos)
     Enemies.arr.push(enemy)
  })

  return createImage(Enemies.imgUrl)
  .then(img => {
    Enemies.img = img
    return Enemies.arr
  })
}

function Enemy(type, pos) {
  this.pos = pos

  // this.firing = false
  // this.weapon = new Bullets('default', this.maxBullets)
  // this.maxBullets = 50
  // this.bulletsArray = this.weapon.arr

  switch(type) {
    default:
      this.hp = 10
  }
}

Enemies.prototype.draw = function(ctx) {
  if (this.img === undefined) {
    EnemyInit(this).then(arr => 
      arr.forEach(enemy => {
        ctx.drawImage(this.img, 
          0, 0, this.img.height, this.img.height, // Source Image, Location and size: (0, 0) => (size, size)
          enemy.pos.x, enemy.pos.y, this.size, this.size // Destination Image on canvas, Location and size: (10, top) => (size, size)
        )
      })
    )
  } else if (this.img !== undefined) {
    this.arr.forEach(enemy => {
      ctx.drawImage(this.img, 
        0, 0, this.img.height, this.img.height, // Source Image, Location and size: (0, 0) => (size, size)
        enemy.pos.x, enemy.pos.y, this.size, this.size // Destination Image on canvas, Location and size: (10, top) => (size, size)
      )
    })
  }

  this.arr.forEach(enemy => {
    const midX = enemy.pos.x + (this.size / 2) - 5
    const midY = enemy.pos.y + (this.size / 2) - 5
    ctx.strokeStyle = 'blue'
    ctx.beginPath()
    ctx.arc(midX, midY, this.size, 0,2*Math.PI)
    ctx.stroke()
  })
  // hitBox(this.arr, s.activeBullets)
}

Enemies.prototype.update = function() {
  // console.log(this.arr)

}

function hitBox(Enemy, Bullet) {
  // Enemy.forEach(enemy => {
    // Bullet.forEach(bullet => {
    //   const x1 = enemy.pos[0]
    //   const y1 = enemy.pos[1]
    //   const r1 = Enemy.size + 0.15
    //   const x2 = bullet.x
    //   const y2 = bullet.y
    //   const r2 = bullet.size + 0.15

    //   console.log('hit', circlesColliding(x1, y1, r1, x2, y2, r2))
    //   if (circlesColliding(x1, y1, r1, x2, y2, r2)) {
    //     ctx.beginPath();
    //     ctx.arc(x1,x2,r2,0,2*Math.PI);
    //     ctx.fillStyle = "red"
    //     ctx.stroke();
    //     takeDamage(enemy, bullet)
    //   }
    // })
  // })
}

function takeDamage(enemy, bullet) {
  enemy.hp -= bullet.dmg
  console.log(enemy.hp)
}

// function circlesColliding(x1, y1, r1, x2, y2, r2) {
//   //compare the distance to combined radii
//   const dx = x2 - x1
//   const dy = y2 - y1
//   const radii = r1 + r2
//   if ( ( dx * dx )  + ( dy * dy ) < radii * radii ) {
//     return true
//   } else {
//     return false;
//   }
// }
