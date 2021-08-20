import { useSelector } from 'react-redux'

import Token from './tokens/player-token'

const Markers = ({ map }) => {
  const markers = useSelector(({ markers }) => markers.player)

  return (
    <>
      { Object.keys(markers).map(uid => (<Token key={uid} uid={uid} map={map} />)) }
    </>
  )
}

export default Markers
