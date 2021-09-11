import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from '../hooks/marker'
import { Container } from '../map/markers/__style__/token.style'
import { Wrapper } from '../map/markers/__style__/marker.style'
import { getSkin } from './skin'
import Menu from './menu'

const Marker = ({ uid }) => {
  const { skin, position, isHidden, ...marker } = useSelector(state => state.markers.incident[uid], isEqual)
  const { el, token } = useMarker({ position, uid })
  const [ size, setSize ] = useState(marker.size || 0)
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)
  useEffect(() => {
    token.current.item.setDraggable(!isMenuOpen)
  })

  return createPortal(
    <Container>
      <Wrapper onClick={() => setMenuIsOpen(!isMenuOpen)} >
        <Emoji style={{ fontSize: 20 + size }} symbol={getSkin(skin)} label="login" />
      </Wrapper>
      { isMenuOpen && <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} skin={skin} isHidden={isHidden} size={size} setSize={setSize} /> }
    </Container>,
    el
  )
}

export default Marker
