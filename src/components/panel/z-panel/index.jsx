import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import styled from 'styled-components'

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

const zombieSelector = createSelector(
  store => store.markers.z,
  z => z
)

const ZPanel = () => {
  const isLoaded = useSelector(state => state.app.isLoaded)
  const zMarkers = useSelector(zombieSelector)
                              //.map(marker => (<Item key={marker.uid} {...marker} />))

  return (
    <Wrapper>
      <List>
        { isLoaded && Object.keys(zMarkers).map(key => <Item key={key} {...zMarkers[key]} />)}
      </List>
    </Wrapper>
  )
}

export default ZPanel
