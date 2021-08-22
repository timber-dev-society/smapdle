import firebase from 'firebase/app'

import config from './app-config'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

import { flashErrorMsg } from './flash'

firebase.initializeApp(config.firebase)

export const database = firebase.database()
export const firestore = firebase.firestore()
export const analytics = firebase.analytics()

export const store = (collection) => ({
  create: async (data) => {
    try {
      const docRef = await firestore.collection(collection).add(data)

      return docRef
    } catch (error) {
      flashErrorMsg(`Unable to create ${collection} document`, error)
    }
  },
  update: async ({ uid, ...data }) => {
    console.log({uid, data})
    try {
      const docRef = await firestore.collection(collection).doc(uid)
      await docRef.update(data)

      return docRef
    } catch (error) {
      flashErrorMsg(`Unable to update ${collection} ${uid} document`, error)
    }
  },
  remove: async (uid) => {
    try {
      const docRef = await firestore.collection(collection).doc(uid).delete()
      await docRef.delete()

      return docRef
    } catch (error) {
      flashErrorMsg(`Unable to delete ${collection} ${uid} document`, error)
    }
  }
})

export default firebase
