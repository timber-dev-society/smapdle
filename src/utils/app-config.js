import ZMarker from 'components/z/marker'
import PlayerMarker from 'components/player/marker'
import IncidentMarker from 'components/incident/marker'
import VehicleMarker from 'components/vehicle/marker'
import { READ, MOVE, NOTHING, ALL } from 'components/hooks/acl'

const config = {
  groups: [
    { role: 'admin', rules: { z: ALL, player: ALL, incident: ALL, vehicle: ALL, indicator: ALL, panels: ALL }},
    { role: 'player', rules: { z: NOTHING, player: READ, incident: NOTHING, indicator: ALL, vehicle: MOVE, panels: NOTHING }},
  ],
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
    {
      name: 'vehicle',
      filter: (state) => state.markers.vehicle,
      Marker: VehicleMarker,
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
