import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, memo } from 'react'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker, { useIsVisible, useSizeable } from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import { Container } from 'components/map/markers/__style__/token.style'
import { Wrapper } from 'components/map/markers/__style__/marker.style'
import { getSkin, skins } from './skin'
import Menu from 'components/map/markers/menu'

const defaultVisibleAfter = 17.5

const Marker = ({ uid, visibleAfter }) => {
  const { skin, position, isHidden, owner, size: mSize, token: mToken } = useSelector(state => state.markers.incident[uid], isEqual)

  const { canRead, canMove, canEdit } = useAcl({ type: `${mToken}`, owner })

  const { el, map } = useMarker({ position, uid, canMove })
  const [ size, setSize ] = useSizeable(mSize)
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)
  const isVisible = useIsVisible(map, visibleAfter)

  return createPortal(
    <Container>
      { isVisible &&
        <Wrapper className={`zoom indicator-token size-${size}`} onClick={() => setMenuIsOpen(!isMenuOpen)} >
          <Emoji style={{ display: `${isHidden && !canRead ? 'none' : 'block'}`,opacity:`${isHidden ? 0.5 : 1}` }} symbol={getSkin(skin)} label="login" />
        </Wrapper>
      }
      { canEdit && isMenuOpen && 
        <Menu 
          closeMenu={() => setMenuIsOpen(false)} 
          uid={uid} 
          skin={{ skins }} 
          visibility={{ isHidden }} 
          size={{ value: size, setSize }}
        />
      }
    </Container>,
    el
  )
}

Marker.propTypes = {
  uid: PropTypes.string.isRequired,
  visibleAfter: PropTypes.number,
}

Marker.defaultProps = {
  visibleAfter: defaultVisibleAfter,
}

export default memo(Marker)
