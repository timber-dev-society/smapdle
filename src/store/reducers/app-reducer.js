import { SET_USER, SET_MARKERS, UPDATE_MARKER, SET_MAP } from '../../actions'

const defaultState = {
  user: null,
  map: null,
  markers: [],
}

const appReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user,
      }
    case SET_MAP:
      return {
        ...state,
        map: payload,
      }
    case SET_MARKERS:
      return {
        ...state,
        markers: payload,
      }
    case UPDATE_MARKER:
      return {
        ...state,
        markers: state.markers.map(marker => {
          if (marker.uid !== payload.uid) { return marker }

          return payload
        })
      }
    default:
      return state
  }
}

export default appReducer
