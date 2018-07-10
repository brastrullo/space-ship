import { State as s, setState } from './store.js'
import { createImage } from './utils.js'


const loadAssets = () => {
  createImage('../images/space-ship.png')
  .then(image => {
    setState({
      shipImg: image,
      shipSize: image.height
    }, () => console.log('shipSize: ', image.height, 'shipImg: ', image))
  })

  createImage('../images/enemyShip.gif')
  .then(image => {
    setState({
      enemyShipImg: image,
      enemyShipSize: image.height
    }, () => console.log('enemyShipSize: ', image.height, 'enemyShipImg: ', image))
  })


}

export default loadAssets