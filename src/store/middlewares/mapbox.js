import { FLY_TO } from '../../actions'
import { positionToLngLat } from '../../utils/mapbox'

const mapbox = store => next => action => {

  if (action.type === FLY_TO) {
    const { token, uid } = action.payload
    const map = store.getState().app.map
    const position = store.getState().markers[token][uid].position

    map.flyTo({
      center: positionToLngLat(position),
      essential: false
    })
  }

  return next(action)
}

export default mapbox
