import { firestore, store } from 'utils/firebase'
import {
  LOAD_MARKERS, LOAD_USER, CREATE_MARKER_AT_POSITION, TOGGLE_VISIBILITY, KILL, DELETE, CHANGE_SKIN, SET_SIZE, CHANGE_WEAPON, LOAD_CASES, CHANGE_CASES,
  updateMarker, addMarker, deleteMarker, setUserInfo, MOVE_PLAYER_MARKER, stepFulfilled, setCases, clearMarkers,
} from 'actions'
import { getMousePosition } from 'utils/mapbox'
import { flashErrorMsg } from 'utils/flash'
import { createMiddleware } from 'utils/app-func'

const _it = {
  markerStore: store('markers'),
  unsuscribe: null,
}

const snapshotToMarker = (dispatch) => (snapshot) => {
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
}

const firestoreDb = createMiddleware({
  name: 'Firestore',
  middleware: {
    // Load user from firestore
    [LOAD_USER]: async ({ state, dispatch }) => {
      const user = await firestore.collection('users').doc(state.app.user.uid).get()
      console.log(user)
      
      dispatch(setUserInfo(user.data()))
      dispatch(stepFulfilled())
    },
    // Load default cases from the user
    [LOAD_CASES]: async ({state, dispatch}) => {
      dispatch(setCases(state.app.user.cases))
      dispatch(stepFulfilled())
    },
    // Load markers and subscribe to marker's updates
    [LOAD_MARKERS]: async ({ state, dispatch }) => {
      if (state.app.isLoaded) { return }

      _it.unsuscribe = firestore.collection('markers').where('case', 'in', state.app.cases).onSnapshot((snapshot) => {
        snapshotToMarker(dispatch)(snapshot)

        dispatch(stepFulfilled())
      })
    },
    // Update cases visible to user then update marker's subscriptions
    [CHANGE_CASES]: ({ dispatch }) => ({ store }) => {
      _it.unsuscribe()
      dispatch(clearMarkers())
      _it.unsuscribe = firestore.collection('markers').where('case', 'in', store.getState().app.cases).onSnapshot((snapshot) => {
        snapshotToMarker(dispatch)(snapshot)
      })
    },
    [CREATE_MARKER_AT_POSITION]: ({ state, action }) => {
      const { lng, lat } = getMousePosition(action.payload, state.app.map)

      _it.markerStore.create({
        position: { latitude: lat, longitude: lng },
        case: window.location.hash,
        owner: state.app.user.uid,
        token: action.payload.token,
        isHidden: !action.payload.visibility,
      })
    },
    [MOVE_PLAYER_MARKER]: ({ state, action }) => {
      const { lng, lat } = getMousePosition(action.payload, state.app.map)

      _it.markerStore.update({
        position: { latitude: lat, longitude: lng },
        uid: action.payload.uid,
      })
    },
    [TOGGLE_VISIBILITY]: ({ action }) => _it.markerStore.update(action.payload),
    [CHANGE_SKIN]: ({ action }) => _it.markerStore.update(action.payload),
    [CHANGE_WEAPON]: ({ action }) => _it.markerStore.update(action.payload),
    [SET_SIZE]: ({ action }) => _it.markerStore.update(action.payload),
    [KILL]: ({ action }) => _it.markerStore.update({ uid: action.payload, isDead: true }),
    [DELETE]: ({ action }) => _it.markerStore.remove(action.payload),
  }
})

export default firestoreDb
