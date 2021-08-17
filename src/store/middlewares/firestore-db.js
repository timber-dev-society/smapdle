import { firestore } from '../../utils/firebase'
import { LOAD_MARKERS, CREATE_MARKER_AT_POSITION, updateMarker, addMarker, setIsLoaded } from '../../actions'
import { getMousePosition } from '../../utils/mapbox'

const firestoreDb = store => next => async (action) => {

  switch (action.type) {
    case LOAD_MARKERS:
      {
        if (store.getState().app.isLoaded) { break }

        const map = store.getState().app.map
        const user = store.getState().app.user
        // it seems we can use only the second system to load everthing
        // @TODO delete this code when add marker is implemented
        /*firestore.collection("users").doc(user.uid).get().then((doc) => {
          console.log(doc, doc.data())
        })

        /**
         * Add database listener
         */
        firestore.collection("markers").where("active", '==', true).onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            const marker = { uid: change.doc.id, ...change.doc.data() }

            switch (change.type) {
              case 'added':
                store.dispatch(addMarker(marker))
                return
              case 'modified':
                store.dispatch(updateMarker(marker))
                return
              case 'removed': // @TODO implement delete marker
                console.log("Removed city: ", change.doc.data())
                return
              default:
                console.error('must not raised', change)
                return
            }
          })
          store.dispatch(setIsLoaded())
        })
      }
      break

    case CREATE_MARKER_AT_POSITION:
      {
        const map = store.getState().app.map
        const owner = store.getState().app.user.uid
        const { lng, lat } = getMousePosition(action.payload, map)
        const token = action.payload.token
        const marker = {
          position: { latitude: lat, longitude: lng },
          active: true,
          owner,
          token,
        }

        firestore.collection("markers")
                 .add(marker)
                 .then(docRef => {
                    console.log(docRef)
                 }).catch((error) => {
                  console.error("Error adding document: ", error);
                 });
      }
      break

    default:
      break
  }

  return next(action)
}

export default firestoreDb
