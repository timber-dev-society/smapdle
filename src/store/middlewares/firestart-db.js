import { firestore } from '../../utils/firebase'
import { LOAD_MARKERS, setMarkers } from '../../actions/app'

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
      break
    default:
      break
  }

  return next(action)
}

export default firestoreDb
