import { firestore } from '../../utils/firebase'
import { LOAD_MARKERS, setMarkers, updateMarker } from '../../actions/app'

const firestoreDb = store => next => async (action) => {

  let isLoaded = false

  switch(action.type) {
    case LOAD_MARKERS:
      if (isLoaded) { break }
      isLoaded = true
      firestore.collection("markers").get().then((querySnapshot) => {
        const markers = []

        querySnapshot.forEach(doc => {
            markers.push({ uid: doc.id, ...doc.data() })
        })

        store.dispatch(setMarkers(markers))
      })

      firestore.collection("markers").where("token", '==', 'player').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            console.log("New city: ", change.doc.data());
          }
          if (change.type === "modified") {
          console.log("Modified city: ",  change.doc.id, change.doc.data());
            store.dispatch(updateMarker({ uid: change.doc.id, ...change.doc.data() }))
          }
          if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
          }
        });
      });
      break
    default:
      break
  }

  return next(action)
}

export default firestoreDb
