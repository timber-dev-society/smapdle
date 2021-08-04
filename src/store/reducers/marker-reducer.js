import { CREATE_MARKERS, UPDATE_MARKER } from '../../actions'
import { renderToken } from '../../components/map/markers'

const defaultState = []

const defaultMarker = {
  uid: null,
  ref: null,
}

const markerReducer = (state = defaultState, { type, payload }) => {
  switch (type) {

    case CREATE_MARKERS:
      return payload.markers.map(m => ({
        uid: m.uid,
        ref: renderToken(m, payload.map)
      }))

    case UPDATE_MARKER:
      return state.map(marker => {
        if (marker.uid === payload.uid) {
          marker.ref.setLngLat({ lng: payload.position.longitude, lat: payload.position.latitude })
        }

        return marker
      })
    default:
      return state
  }
}

export default markerReducer
