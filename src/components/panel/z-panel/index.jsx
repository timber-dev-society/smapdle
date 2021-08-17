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
  const zMarkers = 'coucou' //useSelector(state => state.markers.filter(marker => marker.token === 'z'))
                              //.map(marker => (<Item key={marker.uid} {...marker} />))

  return (
    <Wrapper>
      <List>
        { zMarkers }
      </List>
    </Wrapper>
  )
}

export default ZPanel
