import crashReporter from './crash-report'
import realtimeDb from './realtime-db'
import firestoreDb from './firestore-db'
import debugStore from './debug-store'
import mapbox from './mapbox'

const middlewares = [
  crashReporter,
  realtimeDb,
  firestoreDb,
  debugStore,
  mapbox,
]

export default middlewares
