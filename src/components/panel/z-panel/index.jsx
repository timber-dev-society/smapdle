import useAcl from 'components/hooks/acl'
import { isEqual } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect'
import styled from 'styled-components'
import { positionToLngLat } from 'utils/mapbox'

import Item from './item'

const Wrapper = styled.div`
  background-color: white;
  border-radius: 5px;
  bottom: 50px;
  box-sizing: border-box;
  position: absolute;
  left: 50px;
`

const List = styled.ul`
  padding: 10px 10px;
  width: 60px;
`

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, (prev, next) => Object.keys(prev || {}).length === Object.keys(next || {}).length) 

const zombieSelector = createDeepEqualSelector(
  store => store.markers.z,
  zMarkers => Object.keys(zMarkers).map(uid => ({ uid, position: zMarkers[uid].position }))
)



const ZPanel = () => {
  const ref = useRef()
  const map = useSelector(state => state.app.map, isEqual)
  const [bounds, setBounds] = useState(map.getBounds())
  const zMarkers = useSelector(zombieSelector)
  const { canRead } = useAcl({ type: `zpanel`, owner: false })
                              //.map(marker => (<Item key={marker.uid} {...marker} />))


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
    <Wrapper>
      { canRead &&
        <List>
          { zMarkers.filter(({ position }) => bounds.contains(positionToLngLat(position))).map(({ uid }) => <Item key={uid} uid={uid} />) }
        </List>
      }
    </Wrapper>
  )
}

const ZPanelContainer = () => {
  const isLoaded = useSelector(state => state.app.isLoaded)
  
  return (
    <>
      { isLoaded && <ZPanel /> }
    </>
  )
}

export default ZPanelContainer
