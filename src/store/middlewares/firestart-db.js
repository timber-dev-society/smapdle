import { firestore } from '../../utils/firebase'
import { LOAD_MARKERS, CREATE_MARKER_AT_POSITION, setMarkers, createMarkers, updateMarker, addMarker } from '../../actions'
import { getMousePosition } from '../../utils/mapbox'

const firestoreDb = store => next => async (action) => {

  let isLoaded = false

  switch (action.type) {
    case LOAD_MARKERS:
      {
        if (isLoaded) { break }
        isLoaded = true
        const map = store.getState().app.map
        const user = store.getState().app.user
        // it seems we can use only the second system to load everthing
        // @TODO delete this code when add marker is implemented
        firestore.collection("users").doc(user.uid).get().then((doc) => {
          console.log(doc, doc.data())
        //   const markers = []
        //
        //   querySnapshot.forEach(doc => {
        //       markers.push({ uid: doc.id, ...doc.data() })
        //   })
        //
        //   store.dispatch(setMarkers(markers))
        //   store.dispatch(createMarkers(markers, map))
        })

        /**
         * Add database listener
         */
        firestore.collection("markers").where("active", '==', true).onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              // @TODO implement add marker
              console.log("New city: ", change.doc.data())
              // addMarker({ uid: change.doc.id, ...change.doc.data() })
              store.dispatch(addMarker({ uid: change.doc.id, ...change.doc.data() }, map, user))
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
                    store.dispatch(addMarker({
                      uid: docRef.id,
                      ...marker,
                    }, map))
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
