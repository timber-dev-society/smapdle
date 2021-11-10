import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, memo } from 'react'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import useIsVisible from 'components/hooks/marker/is-visible'
import { Container } from 'components/map/markers/__style__/token.style'
import { Wrapper } from 'components/map/markers/__style__/marker.style'
import { getSkin } from './skin'
import Menu from './menu'


const defaultVisibleAfter = 17.5

const getFontSize = (isMenuOpen, size, mSize) => {
  if (isMenuOpen) return 20 + size
  return 20 + (mSize || 0)
}

const Marker = ({ uid, visibleAfter }) => {
  const { skin, position, isHidden, owner, size: mSize, token: mToken } = useSelector(state => state.markers.incident[uid], isEqual)

  const { canRead, canMove, canEdit } = useAcl({ type: `${mToken}`, owner })

  const { el, map } = useMarker({ position, uid, canMove })
  const [ size, setSize ] = useState(mSize || 0)
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)
  const isVisible = useIsVisible(map, visibleAfter)
  

  return createPortal(
    <Container>
      { isVisible &&
        <Wrapper onClick={() => setMenuIsOpen(!isMenuOpen)} >
          <Emoji style={{ fontSize: getFontSize(isMenuOpen, size, mSize), display: `${isHidden && !canRead ? 'none' : 'block'}`,opacity:`${isHidden ? 0.5 : 1}` }} symbol={getSkin(skin)} label="login" />
        </Wrapper>
      }
      { canEdit && isMenuOpen && <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} skin={skin} isHidden={isHidden} size={size} setSize={setSize} /> }
    </Container>,
    el
  )
}

Marker.propTypes = {
  visibleAfter: PropTypes.number,
}

Marker.defaultProps = {
  visibleAfter: defaultVisibleAfter,
}

export default memo(Marker)
