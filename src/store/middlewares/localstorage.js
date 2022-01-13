import { SET_CURRENT_CASE } from 'actions'
import { createMiddleware } from 'utils/app-func'

const localstorage = createMiddleware({
  name: 'LocalStorage',
  middleware: {
    [SET_CURRENT_CASE]: ({ getState }) => {
      window.localStorage.setItem('current_case', getState().app.currentCase)
    }
  }
})

export default localstorage
