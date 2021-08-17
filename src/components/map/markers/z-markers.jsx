import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import CssHack from './css-hack'
import { loadMarkers } from '../../../actions'
import ZToken from './z-token'

const Markers = ({ map }) => {
  const zombies = useSelector(({ markers }) => markers.z)

  return (
    <>
      { Object.keys(zombies).map(uid => (<ZToken key={uid} uid={uid} map={map} />)) }
    </>
  )
}

export default Markers
