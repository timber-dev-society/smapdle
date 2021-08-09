import { SET_USER, SET_MARKERS, UPDATE_MARKER, SET_MAP } from '../../actions'

const defaultState = {
  user: null,
  map: null,
  markers: {},
}

const appReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      console.log(payload)
      return {
        ...state,
        user: payload,
      }
    case SET_MAP:
      return {
        ...state,
        map: payload,
      }
    case SET_MARKERS:
      return {
        ...state,
        markers: payload.reduce((marker, acc) => ({ ...acc, [marker.uid]: marker }), {}),
      }
    case UPDATE_MARKER:
      return {
        ...state,
        markers: {
          ...state.markers,
          [payload.uid]: payload,
        }
      }
    default:
      return state
  }
}

export default appReducer
