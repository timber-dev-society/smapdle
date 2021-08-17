import { createReducer } from '@reduxjs/toolkit'

import { SET_USER, SET_MAP, SET_IS_LOADED } from '../../actions'

const initialState = {
  user: null,
  map: null,
  isLoaded: false,
}

const appReducer = createReducer(initialState, {
  [SET_USER]: (state, action) => void (state.user = action.payload),
  [SET_MAP]: (state, action) => void (state.map = action.payload),
  [SET_IS_LOADED]: (state, action) => void (state.isLoaded = true),
})

export default appReducer
