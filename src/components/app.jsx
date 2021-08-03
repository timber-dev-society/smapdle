import { FirebaseAuthProvider, IfFirebaseUnAuthed, FirebaseAuthConsumer, IfFirebaseAuthed } from '@react-firebase/auth'
import { useDispatch } from 'react-redux'

import firebase, { config } from '../utils/firebase'
import LoginForm from './login-form'
import Map from './map'
import Panel from './panel'
import { setUser, loadMarkers } from '../actions/app'

const App = () => {
  const dispatch = useDispatch()

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          if (isSignedIn && user.uid !== undefined) {
            dispatch(setUser(user))
            dispatch(loadMarkers())
          }
        }}
      </FirebaseAuthConsumer>
      <IfFirebaseUnAuthed>
        { () => (<LoginForm firebase={firebase} />) }
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthed>
        { () => (
          <>
            <Map />
            <Panel />
          </>
        ) }
      </IfFirebaseAuthed>
    </FirebaseAuthProvider>
  )
}


export default App
