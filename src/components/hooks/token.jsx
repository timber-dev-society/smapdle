import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { createMarker } from '../../utils/mapbox'

const useToken = ({ position, uid }) => {
  const [ el ] = useState(document.createElement('div'))
  const map = useSelector(state => state.app.map)
  const token = useRef(null)

  useEffect(() => {
    if (token.current) return;

    token.current = createMarker({
      el,
      position,
      map: map,
    })

    token.current.addControl(uid)

  }, [ map, el, position, uid ])

  return {
    el,
    map,
    token,
  }
}

export default useToken
