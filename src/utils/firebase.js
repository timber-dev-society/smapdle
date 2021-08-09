import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'


export const config = {
    apiKey: "AIzaSyDntPnVriYJiT59lS_uPzdOGmBLnFJxXgQ",
    authDomain: "chroniques-oubliees-zombies.firebaseapp.com",
    databaseURL: "https://chroniques-oubliees-zombies-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chroniques-oubliees-zombies",
    storageBucket: "chroniques-oubliees-zombies.appspot.com",
    messagingSenderId: "808949480720",
    appId: "1:808949480720:web:8735362b08b3989eecf995",
    measurementId: "G-F9Y5KZJSTD"
}

firebase.initializeApp(config)

export const database = firebase.database()
export const firestore = firebase.firestore()
export const analytics = firebase.analytics()

export default firebase
