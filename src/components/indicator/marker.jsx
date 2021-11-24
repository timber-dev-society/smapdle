import { useState } from 'react'
import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import Menu from 'components/map/markers/menu'

import useMarker, { useSizeable } from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import { Wrapper } from 'components/map/markers/__style__/marker.style'
import { getSkin, skins } from './skin'
import { Container } from 'components/map/markers/__style__/token.style'

const Marker = ({ uid }) => {
  const { position, skin, isOver, size: mSize } = useSelector(state => state.markers.indicator[uid], isEqual)
  
  const { canRead, canMove, canEdit } = useAcl({ type: 'indicator' })
  const { el } = useMarker({ position, uid, canMove })
  const [ isOpen, setIsOpen ] = useState(false)
  const [ size, setSize ] = useSizeable(mSize)

  return createPortal(
    <Container className={`${isOver ? 'focus' : ''}`}>
      { 
        canRead && 
        <Wrapper className={`zoom indicator-token size-${size}`} onClick={() => setIsOpen(!isOpen)}>
          <Emoji symbol={getSkin(skin)} label="login" />
        </Wrapper> 
      }
      { canEdit && isOpen && <Menu uid={uid} closeMenu={() => setIsOpen(false)} size={{ value: size, setSize }} skin={{ skins }} /> }
    </Container>,
    el
  )
}

export default Marker
