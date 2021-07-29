import firebase from 'firebase/app'
import 'firebase/database'

import config from '../../utils/firebase'
import { SET_USER } from '../../actions/app'

firebase.initializeApp(config)
const db = firebase.database()

const realtimeDb = store => next => action => {
  console.log(action.type === SET_USER, SET_USER ,action.type)

  switch(action.type) {
    case SET_USER:
      db.ref('users/' + action.payload.uid).set(action.payload).catch(onRejected => console.error(onRejected))
      break
    default:
      break
  }

  return next(action)
}

export default realtimeDb
