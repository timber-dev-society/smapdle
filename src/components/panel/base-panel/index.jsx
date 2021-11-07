
import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { positionToLngLat } from 'utils/mapbox'
import Item from '../base-item'
import { List, Wrapper } from '../__style__/admin-panel.style'

export const BasePanel = ({ style, markers, canRead, markerType, getSkin }) => {
  const ref = useRef()
  const map = useSelector(state => state.app.map, isEqual)
  const [bounds, setBounds] = useState(map.getBounds())

  useEffect(() => {
    if (ref.current) { return }

    map.on('zoomend', () => {
      setBounds(map.getBounds())
    })

    map.on('moveend', () => {
      setBounds(map.getBounds())
    })

    ref.current = true
  })

  return (
    <Wrapper style={style}>
      { canRead &&
        <List>
          { markers.filter(({ position }) => bounds.contains(positionToLngLat(position))).map(({ uid }) => <Item key={uid} uid={uid} type={markerType} getSkin={getSkin} />) }
        </List>
      }
    </Wrapper>
  )
}

const BaseContainer = ({ children }) => {
  const isLoaded = useSelector(state => state.app.isLoaded)
  
  return (
    <>
      { isLoaded && children}
    </>
  )
}

export default BaseContainer
