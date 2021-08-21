import firebase from 'firebase/app'

import config from './app-config'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

firebase.initializeApp(config.firebase)

export const database = firebase.database()
export const firestore = firebase.firestore()
export const analytics = firebase.analytics()

export default firebase
