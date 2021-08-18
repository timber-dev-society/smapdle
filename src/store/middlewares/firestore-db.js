import { firestore } from '../../utils/firebase'
import {
  LOAD_MARKERS, CREATE_MARKER_AT_POSITION, TOGGLE_VISIBILITY, KILL, DELETE,
  updateMarker, addMarker, setIsLoaded, deleteMarker,
} from '../../actions'
import { getMousePosition } from '../../utils/mapbox'

const firestoreDb = store => next => async (action) => {

  switch (action.type) {
    case LOAD_MARKERS:
      if (store.getState().app.isLoaded) { break }
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
              console.log("Removed : ", change.doc.data())
              store.dispatch(deleteMarker(marker))
              return
            default:
              console.error('must not raised', change)
              return
          }
        })
        store.dispatch(setIsLoaded())
      })
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

    case TOGGLE_VISIBILITY:
      {
        const { uid, hidden } = action.payload
        console.log(action.payload)
        const tokenRef = firestore.collection("markers").doc(uid)

        tokenRef.update({
          hidden,
        }).then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        })
      }
      break;

    case KILL:
      {
        const tokenRef = firestore.collection("markers").doc(action.payload)

        tokenRef.update({
          isDead: true,
        }).then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        })
      }
      break;

    case DELETE:
      firestore.collection("markers").doc(action.payload).delete().then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      })
      break;

    default:
      break
  }

  return next(action)
}

export default firestoreDb
