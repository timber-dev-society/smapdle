import { SET_USER, DEFINE_MARKER, UPDATE_MARKER, SET_MAP } from '../../actions'

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
    case DEFINE_MARKER:
      return {
        ...state,
        markers: {
          ...state.markers,
          [payload.uid]: payload,
        }
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
