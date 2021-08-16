import { CREATE_MARKERS, UPDATE_MARKER, ADD_MARKER } from '../../actions'
import { renderToken, positionToLngLat } from '../../utils/mapbox'

const defaultState = []

// const defaultMarker = {
//   uid: null,
//   ref: null,
// }

const markerReducer = (state = defaultState, { type, payload }) => {
  switch (type) {

    case CREATE_MARKERS:
      return payload.markers.map(marker => ({
        uid: marker.uid,
        mapRef: renderToken(marker, payload.map)
      }))

    case ADD_MARKER:
      return [
        ...state,
        {
          ...payload.marker,
          mapRef: renderToken(payload.marker, payload.map, payload.user)
        }
      ]

    case UPDATE_MARKER:
      return state.map(marker => {
        if (marker.uid === payload.uid) {
          marker.mapRef.setLngLat(positionToLngLat(payload.position))
        }

        return marker
      })
    default:
      return state
  }
}

export default markerReducer
