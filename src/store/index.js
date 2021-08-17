import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducers'
import middleware from './middlewares'

const store = configureStore({
  reducer,
  middleware,
  devTools: true,
})

export default store
