import ZMarker from '../components/z/marker'
import PlayerMarker from '../components/player/marker'
import IncidentMarker from '../components/incident/marker'

const config = {
  markers: [
    {
      name: 'z',
      filter: (state) => state.markers.z,
      Marker: ZMarker,
    },
    {
      name: 'player',
      filter: (state) => state.markers.player,
      Marker: PlayerMarker,
    },
    {
      name: 'incident',
      filter: (state) => state.markers.incident,
      Marker: IncidentMarker,
    },
  ],
  map: {
    with3DBuilding: false,
  },
  mapbox: {
    accessToken: process.env.REACT_APP_MAP_ACCESSTOKEN,
    style: 'mapbox://styles/joline6b/ckrjlmvix8ffu17ny2vaseowq',
  },
  firebase: {
      apiKey: process.env.REACT_APP_FRB_APIKEY,
      authDomain: `${process.env.REACT_APP_FRB_BASENAME}.firebaseapp.com`,
      databaseURL: `https://${process.env.REACT_APP_FRB_BASENAME}-default-rtdb.europe-west1.firebasedatabase.app`,
      projectId: process.env.REACT_APP_FRB_BASENAME,
      storageBucket: `${process.env.REACT_APP_FRB_BASENAME}.appspot.com`,
      messagingSenderId: process.env.REACT_APP_FRB_SENDERID,
      appId: process.env.REACT_APP_FRB_APPID,
      measurementId: process.env.REACT_APP_FRB_MEASUREMENTID,
  },
}

export default config
