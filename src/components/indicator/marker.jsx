import { useState } from 'react'
import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import { Wrapper, Icon } from 'components/map/markers/__style__/marker.style'
import { getSkin } from './skin'
import Menu from './menu'

const Marker = ({ uid }) => {
  const { position, skin } = useSelector(state => state.markers.player[uid], isEqual)
  const { canRead, canMove, canEdit } = useAcl({ type: 'indicator' })
  const { el } = useMarker({ position, uid, canMove })
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)

  return createPortal(
    <Wrapper>
      { 
        canRead && 
        <Icon onClick={() => setMenuIsOpen(!isMenuOpen)}>
          <Emoji symbol={getSkin(skin)} label="login" />
        </Icon> 
      }
      { canEdit && isMenuOpen && <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} /> }
    </Wrapper>,
    el
  )
}

export default Marker
