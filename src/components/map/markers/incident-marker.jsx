import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import styled from 'styled-components'

import { Wrapper } from './__style__/marker.style'

export const skins = ['🔥', '💥', '⚠️', '☣️']
const defaultVisibleAfter = 17.5

const Container = styled.div`
  position:relative;
`

const Menu = styled.div`
  background:white;
  height: 39px;
  left: 100%;
  margin-left: 10px;
  position:absolute;
  top: 0;
  width: 39px;
`

const IncidentMarker = ({ uid, map, skin, hidden, visibleAfter }) => {

  const [ isVisible, setIsVisible ] = useState(map.getZoom() > visibleAfter)
  const [ zMenu, toggleZMenu ] = useState(false)

  useEffect(() => {
    const handleZoom = () => {
      if (isVisible !== (map.getZoom() > visibleAfter)) {
        setIsVisible(map.getZoom() > visibleAfter)
      }
    }

    map.on('zoom', handleZoom)

    return () => map.off('zoom', handleZoom)
  }, [ isVisible, map, visibleAfter ])


  return (
    <Container>
      { isVisible && <Wrapper onClick={() => toggleZMenu(!zMenu)} style={{fontSize:'24px', opacity:`${hidden ? 0.5 : 1}`}}><Emoji symbol={skins[skin - 1]} label="z" /></Wrapper> }
      { zMenu && <Menu /> }
    </Container>
  )
}

IncidentMarker.propTypes = {
  map: PropTypes.object.isRequired,
  skin: PropTypes.number,
  visibleAfter: PropTypes.number,
  hidden: PropTypes.bool,
}

IncidentMarker.defaultProps = {
  skin: 1,
  visibleAfter: defaultVisibleAfter,
  hiddden: false,
};

export default IncidentMarker
