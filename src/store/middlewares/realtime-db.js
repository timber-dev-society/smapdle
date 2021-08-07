import { database } from '../../utils/firebase'
import { SET_USER, CREATE_MARKER_AT_POSITION } from '../../actions'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

const realtimeDb = store => next => action => {

  switch(action.type) {
    case SET_USER:
      database.ref('users/' + action.payload.uid).set(action.payload).catch(onRejected => console.error(onRejected))
      break
    case CREATE_MARKER_AT_POSITION:
      const map = store.getState().app.map
      const el = map.getCanvasContainer()
      const rect = el.getBoundingClientRect()
      const scaling = el.offsetWidth === rect.width ? 1 : el.offsetWidth / rect.width;

      const point = new mapboxgl.Point(
          (action.payload.clientX - rect.left) * scaling,
          (action.payload.clientY - rect.top) * scaling
      )
      new mapboxgl.Marker()
                  .setLngLat(map.unproject(point))
                  .addTo(map)
    default:
      break
  }

  return next(action)
}

export default realtimeDb
