import firebase from 'firebase'
import 'firebase/auth'
import { FirebaseAuthProvider, IfFirebaseUnAuthed, FirebaseAuthConsumer, IfFirebaseAuthed } from '@react-firebase/auth'
import { useDispatch } from 'react-redux'

import config from '../utils/firebase'
import LoginForm from './login-form'
import Map from './map'
import { setUser } from '../actions/app'

const App = () => {
  const dispatch = useDispatch()

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          if (isSignedIn && user.uid !== undefined) {
            dispatch(setUser(user))
          }
        }}
      </FirebaseAuthConsumer>
      <IfFirebaseUnAuthed>
        { () => (<LoginForm firebase={firebase} />) }
      </IfFirebaseUnAuthed>
      <IfFirebaseAuthed>
        { () => (<Map />) }
      </IfFirebaseAuthed>
    </FirebaseAuthProvider>
  )
}


export default App
