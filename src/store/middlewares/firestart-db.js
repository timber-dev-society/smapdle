import { firestore } from '../../utils/firebase'
import { LOAD_MARKERS, setMarkers, createMarkers, updateMarker } from '../../actions'

const firestoreDb = store => next => async (action) => {

  let isLoaded = false

  switch (action.type) {
    case LOAD_MARKERS:
      if (isLoaded) { break }
      isLoaded = true
      console.log('loading markers')
      // it seems we can use only the second system to load everthing
      // @TODO delete this code when add marker is implemented
      firestore.collection("markers").get().then((querySnapshot) => {
        const markers = []

        querySnapshot.forEach(doc => {
            markers.push({ uid: doc.id, ...doc.data() })
        })

        console.log(markers)
        store.dispatch(setMarkers(markers))
        store.dispatch(createMarkers(markers, store.getState().app.map))
      })

      /**
       * Add database listener
       */
      firestore.collection("markers").where("token", '==', 'player').onSnapshot((snapshot) => {

        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            // @TODO implement add marker
            console.log("New city: ", change.doc.data())
          }

          if (change.type === "modified") {
            store.dispatch(updateMarker({ uid: change.doc.id, ...change.doc.data() }))
          }

          if (change.type === "removed") {
            // @TODO implement delete marker
            console.log("Removed city: ", change.doc.data())
          }
        })
      })
      break

    default:
      break
  }

  return next(action)
}

export default firestoreDb
