import { SET_USER, SET_MARKERS, UPDATE_MARKER, SET_MAP, SET_IS_DRAGGING_NEW_MARKER } from '../../actions'

const defaultState = {
  user: null,
  map: null,
  markers: {},
  dragActionState: 0
}

const appReducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_IS_DRAGGING_NEW_MARKER:
      return {
        ...state,
        dragActionState: payload,
      }
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
