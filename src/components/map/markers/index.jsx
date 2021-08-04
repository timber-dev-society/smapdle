import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

import CssHack from './css-hack'
import { loadMarkers } from '../../../actions'

const Markers = ({map}) => {
  const dispatch = useDispatch()
  const data = useSelector(({ markers }) => markers)

  useEffect(() => {

    if (data.length === 0) {
      dispatch(loadMarkers())
      return
    }
  })

  return (
    <CssHack map={map} />
  )
}

export default Markers
