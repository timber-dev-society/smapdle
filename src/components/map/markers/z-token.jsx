import { useState, useEffect, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import styled from 'styled-components'

import { Wrapper } from './__style__/marker.style'
import { createMarker } from '../../../utils/mapbox'

export const skins = ['🧟', '🧟‍♂️', '🧟‍♀️']
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

const ZMarker = ({ uid, map, visibleAfter }) => {
  const canControl = true
  const [ el ] = useState(document.createElement('div'))
  const [ isVisible, setIsVisible ] = useState(map.current.getZoom() > visibleAfter)
  const [ zMenu, toggleZMenu ] = useState(false)

  const { skin, hidden, position } = useSelector(state => state.markers.z[uid])

  const token = useRef(null)

  useEffect(() => {
    if (token.current) return;

    token.current = createMarker({
      el,
      position,
      map: map.current,
    })

    map.current.on('zoom', () => {
      if (isVisible !== (map.current.getZoom() > visibleAfter)) {
        setIsVisible(map.current.getZoom() > visibleAfter)
      }
    })

  }, [ isVisible, map, visibleAfter ])


  return createPortal(
    <Container>
      { isVisible && <Wrapper onClick={() => toggleZMenu(!zMenu)} style={{fontSize:'24px', opacity:`${hidden ? 0.5 : 1}`}}><Emoji symbol={skins[skin - 1]} label="z" /></Wrapper> }
      { zMenu && <Menu /> }
    </Container>,
    el
  )
}

ZMarker.propTypes = {
  map: PropTypes.object.isRequired,
  visibleAfter: PropTypes.number,
}

ZMarker.defaultProps = {
  visibleAfter: defaultVisibleAfter,
  hiddden: false,
}

export default memo(ZMarker)
