import { SET_USER, SET_MARKERS, UPDATE_MARKER } from '../../actions/app'

const defaultState = {
  user: null,
  markers: [],
}

const appReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user,
      }
    case SET_MARKERS:
      return {
        ...state,
        markers: payload,
      }
    case UPDATE_MARKER:
      console.log(state)
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
