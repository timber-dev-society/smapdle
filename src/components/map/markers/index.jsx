import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import CssHack from './css-hack'
import { loadMarkers } from '../../../actions'
import ZMarkers from './z-markers'

const Markers = ({ map }) => {
  const dispatch = useDispatch()
  const isLoaded = useSelector((state) => state.app.isLoaded)

  useEffect(() => {
    if (isLoaded === false) {
      return dispatch(loadMarkers())
    }
  })

  return (
    <>
      <CssHack map={map} />
      { isLoaded && <ZMarkers map={map} /> }
    </>
  )
}

export default Markers
