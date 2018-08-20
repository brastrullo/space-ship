import { setState } from './store.js'
import { createImage } from './utils.js'


const loadAssets = () => {
  createImage('../images/enemyShip.png')
  .then(image => {
    setState({
      enemyShipImg: image,
      enemyShipSize: image.height
    }, () => console.log('enemyShipSize: ', image.height, 'enemyShipImg: ', image))
  })

  createImage('../images/space-ship1.png')
  .then(image => {
    setState({
      shipImg: image,
      shipSize: image.height
    }, () => console.log('shipSize: ', image.height, 'shipImg: ', image))
  })
}

export default loadAssets