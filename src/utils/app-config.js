import ZToken from '../components/z/z-token'
import PlayerToken from '../components/player/player-token'
import IncidentToken from '../components/incident/incident-token'

const config = {
  markers: [
    {
      name: 'z',
      filter: (state) => state.markers.z,
      Token: ZToken,
    },
    {
      name: 'player',
      filter: (state) => state.markers.player,
      Token: PlayerToken,
    },
    {
      name: 'incident',
      filter: (state) => state.markers.incident,
      Token: IncidentToken,
    },
  ]
}

export default config
