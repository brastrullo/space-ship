import { State, setState } from './store.js'
import { createImage } from './utils.js'

const IMAGES_PATH = '../images/';
const IMAGE_FILENAMES = ['enemyShip.png', 'space-ship1.png'];

const loadAssets = () =>
  Promise.all(IMAGE_FILENAMES.map(filename => createImage(IMAGES_PATH + filename)))
    .then(images => {
      images.forEach((image, i) => {
        // It is safe to assume that if the filename contins 'enemy', it is the enemy ship
        const isEnemyShip = image.src.includes('enemy') // does the filename have enemy in it
        const shipImage = isEnemyShip ? 'enemyShipImg' : 'shipImg';
        const shipSize = isEnemyShip ? 'enemyShipSize' : 'shipSize';
        setState({
          [shipImage]: image,
          [shipSize]: image.height
        });
      })
    });

export default loadAssets