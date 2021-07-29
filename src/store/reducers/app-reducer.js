import { SET_USER } from '../../actions/app'

const defaultState = {
  user: null
}

const appReducer = (state = defaultState, { type, ...action }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      }
    default:
      return state
  }
}

export default appReducer
