import { SET_USER, SET_MARKERS } from '../../actions/app'

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
    default:
      return state
  }
}

export default appReducer
