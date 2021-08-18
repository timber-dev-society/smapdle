import { useSelector } from 'react-redux'
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
  padding: 10px 20px;
`

const ZPanel = () => {
  const isLoaded = useSelector(state => state.app.isLoaded)
  const zMarkers = useSelector(state => state.markers.z)
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
