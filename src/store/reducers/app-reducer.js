import { createReducer } from '@reduxjs/toolkit'

import { SET_USER, SET_USER_INFO, SET_MAP, SET_IS_LOADED } from '../../actions'

const initialState = {
  user: null,
  map: null,
  isLoaded: false,
  loadingStep: 0,
}

const appReducer = createReducer(initialState, {
  [SET_USER]: (state, action) => void (state.user = action.payload),
  [SET_USER_INFO]: (state, action) => void (state.user = { ...state.user, ...action.payload }),
  [SET_MAP]: (state, action) => void (state.map = action.payload),
  [SET_IS_LOADED]: (state) => void (state.isLoaded = true),
  [SET_LOADING_STEP]: (state) => void (state.loadingStep = state.loadingStep + 1),
})

export default appReducer
