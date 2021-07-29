import { applyMiddleware } from 'redux'

import crashReporter from './crash-report'
import realtimeDb from './realtime-db'

export default applyMiddleware(
  crashReporter,
  realtimeDb,
)
