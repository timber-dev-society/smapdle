import ZToken from '../components/z/z-token'
import PlayerToken from '../components/player/player-token'

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
    }
  ]
}

export default config
