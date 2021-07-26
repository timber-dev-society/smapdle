import firebase from 'firebase'
import 'firebase/auth'
import { FirebaseAuthProvider, IfFirebaseUnAuthed, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseAuthedAnd } from '@react-firebase/auth'

import { config } from '../utils/firebase'
import LoginForm from './login-form'
import Map from './map'

const App = () => (
  <FirebaseAuthProvider {...config} firebase={firebase}>
    <IfFirebaseUnAuthed>
      { () => (<LoginForm firebase={firebase} />) }
    </IfFirebaseUnAuthed>
    <IfFirebaseAuthed>
      { () => (<Map />) }
    </IfFirebaseAuthed>
  </FirebaseAuthProvider>
)

export default App
