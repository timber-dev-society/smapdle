import { FirebaseAuthProvider, IfFirebaseUnAuthed, FirebaseAuthConsumer, IfFirebaseAuthed } from '@react-firebase/auth'
import { useDispatch } from 'react-redux'

import firebase from 'utils/firebase'
import config from 'utils/app-config'
import LoginForm from './login-form'
import Map from './map'
import { ActorPanel, ToolsPanel } from './panel'
import { PanelContainer, AdminPanel, UserPanel } from './panel/base/panel'
import { setUser } from 'actions'

const App = () => {
  const dispatch = useDispatch()

  return (
    <FirebaseAuthProvider {...config.firebase} firebase={firebase}>
      <FirebaseAuthConsumer>
        {({ isSignedIn, user }) => {
          if (isSignedIn && user.uid !== undefined) {
            dispatch(setUser(user))
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
            <PanelContainer>
              <AdminPanel><ToolsPanel /></AdminPanel>
              <UserPanel><ActorPanel /></UserPanel>
            </PanelContainer>            
          </>
        ) }
      </IfFirebaseAuthed>
    </FirebaseAuthProvider>
  )
}


export default App
