import { firestore, store } from 'utils/firebase'
import {
  LOAD_MARKERS, LOAD_USER, CREATE_MARKER_AT_POSITION, TOGGLE_VISIBILITY, KILL, DELETE, CHANGE_SKIN, SET_SIZE, CHANGE_WEAPON,
  updateMarker, addMarker, deleteMarker, setUserInfo, MOVE_PLAYER_MARKER, stepFulfilled,
} from 'actions'
import { getMousePosition } from 'utils/mapbox'
import { flashErrorMsg } from 'utils/flash'
import { createMiddleware } from 'utils/app-func'

const markerStore = store("markers")

const firestoreDb = createMiddleware({
  name: 'Firestore',
  middleware: {
    [LOAD_USER]: async ({state, dispatch}) => {
      const user = await firestore.collection('users').doc(state.app.user.uid).get()
      
      dispatch(setUserInfo(user.data()))
      dispatch(stepFulfilled())
    },
    [LOAD_MARKERS]: async ({ state, dispatch }) => {
      if (state.app.isLoaded) { return }

      /**
       * Add database listener
       */
      firestore.collection('markers').where('case', 'in', state.app.user.cases).onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const marker = { uid: change.doc.id, ...change.doc.data() }

          switch (change.type) {
            case 'added':
              dispatch(addMarker(marker))
              return
            case 'modified':
              dispatch(updateMarker(marker))
              return
            case 'removed':
              dispatch(deleteMarker(marker))
              return
            default:
              flashErrorMsg('This is crap', change)
              return
          }
        })
        dispatch(stepFulfilled())
      })
    },
    [CREATE_MARKER_AT_POSITION]: ({ state, action }) => {
      const { lng, lat } = getMousePosition(action.payload, state.app.map)

      markerStore.create({
        position: { latitude: lat, longitude: lng },
        case: window.location.hash,
        owner: state.app.user.uid,
        token: action.payload.token,
        isHidden: !action.payload.visibility,
      })
    },
    [MOVE_PLAYER_MARKER]: ({ state, action }) => {
      const { lng, lat } = getMousePosition(action.payload, state.app.map)

      markerStore.update({
        position: { latitude: lat, longitude: lng },
        uid: action.payload.uid,
      })
    },
    [TOGGLE_VISIBILITY]: ({ action }) => markerStore.update(action.payload),
    [CHANGE_SKIN]: ({ action }) => markerStore.update(action.payload),
    [CHANGE_WEAPON]: ({ action }) => markerStore.update(action.payload),
    [SET_SIZE]: ({ action }) => markerStore.update(action.payload),
    [KILL]: ({ action }) => markerStore.update({ uid: action.payload, isDead: true }),
    [DELETE]: ({ action }) => markerStore.remove(action.payload),
  }
})

export default firestoreDb
