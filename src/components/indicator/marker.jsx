import { useState } from 'react'
import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker, { useSizeable } from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import { Wrapper } from 'components/map/markers/__style__/marker.style'
import { getSkin } from './skin'
import Menu from './menu'
import { Container } from 'components/map/markers/__style__/token.style'

const Marker = ({ uid }) => {
  const { position, skin, isOver, size: mSize } = useSelector(state => state.markers.indicator[uid], isEqual)
  const { canRead, canMove, canEdit } = useAcl({ type: 'indicator' })
  const { el } = useMarker({ position, uid, canMove })
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)

  const [ size, setSize ] = useSizeable(mSize)

  return createPortal(
    <Container className={`${isOver ? 'focus' : ''}`}>
      { 
        canRead && 
        <Wrapper onClick={() => setMenuIsOpen(!isMenuOpen)}>
          <Emoji symbol={getSkin(skin)} label="login" />
        </Wrapper> 
      }
      { canEdit && isMenuOpen && <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} size={size} setSize={setSize} /> }
    </Container>,
    el
  )
}

export default Marker
