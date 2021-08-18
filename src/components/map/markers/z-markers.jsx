import { useSelector } from 'react-redux'

import ZToken from './tokens/z-token'

const Markers = ({ map }) => {
  const zombies = useSelector(({ markers }) => markers.z)

  return (
    <>
      { Object.keys(zombies).map(uid => (<ZToken key={uid} uid={uid} map={map} />)) }
    </>
  )
}

export default Markers
