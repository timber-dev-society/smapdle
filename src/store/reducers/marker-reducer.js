import { CREATE_MARKERS, UPDATE_MARKER } from '../../actions'
import { renderToken, positionToLngLat } from '../../utils/mapbox'

const defaultState = []

const defaultMarker = {
  uid: null,
  ref: null,
}

const markerReducer = (state = defaultState, { type, payload }) => {
  switch (type) {

    case CREATE_MARKERS:
      console.log(payload)
      return payload.markers.map(marker => ({
        uid: marker.uid,
        ref: renderToken(marker, payload.map)
      }))

    case UPDATE_MARKER:
      return state.map(marker => {
        if (marker.uid === payload.uid) {
          marker.ref.setLngLat(positionToLngLat(payload.position))
        }

        return marker
      })
    default:
      return state
  }
}

export default markerReducer
