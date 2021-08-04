import { combineReducers } from 'redux'

import app from './app-reducer'
import markers from './marker-reducer'

export default combineReducers({
  app,
  markers,
})
