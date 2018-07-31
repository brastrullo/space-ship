import { State as s, setState } from './store.js'
import { createImage } from './utils.js'


const loadAssets = () => {
  createImage('../images/enemyShip.gif')
  .then(image => {
    setState({
      enemyShipImg: image,
      enemyShipSize: image.height
    }, () => console.log('enemyShipSize: ', image.height, 'enemyShipImg: ', image))
  })
}

export default loadAssets