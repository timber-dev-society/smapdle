import { 
  INIT_APP, SET_STEP_FULFILLED,
  loadUser, loadMarkers,
} from 'actions'
import { createMiddleware } from 'utils/app-func'

const USER = 1
const MARKER = 2

const runtime = createMiddleware({
  name: 'Runtime',
  middleware: {
    [INIT_APP]: ({ dispatch }) => {
      dispatch(stepFulfilled())
    },
    [SET_STEP_FULFILLED]: ({ state, dispatch }) => {
      switch (state.app.loadingStep + 1) {
        case USER:
          dispatch(loadUser())
          return
        case MARKER:
          dispatch(loadMarkers())
          return
      }
    }
  }
})

export default runtime
