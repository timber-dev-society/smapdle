import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { useState, useEffect, useRef, memo } from 'react'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from '../hooks/marker'
import { Container } from '../map/markers/__style__/token.style'
import { Wrapper } from '../map/markers/__style__/marker.style'
import { getSkin } from './skin'
import Menu from './menu'
import useAcl from 'components/hooks/acl'


const defaultVisibleAfter = 17.5

const Marker = ({ uid, visibleAfter }) => {
  const { skin, position, isHidden, owner, token: mToken, ...marker } = useSelector(state => state.markers.incident[uid], isEqual)

  const { canRead, canMove, canEdit } = useAcl({ type: `${mToken}`, owner })

  const { el, token, map } = useMarker({ position, uid, canMove })
  const [ size, setSize ] = useState(marker.size || 0)
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)
  const ref = useRef(null)
  const [ isVisible, setIsVisible ] = useState(map.getZoom() > visibleAfter)

  useEffect(() => {
    token.current.item.setDraggable(!isMenuOpen)

    if (ref.current) return;

    map.on('zoom', () => {
      if (isVisible !== (map.getZoom() > visibleAfter)) {
        setIsVisible(map.getZoom() > visibleAfter)
      }
    })
  })

  return createPortal(
    <Container>
      { isVisible &&
        <Wrapper onClick={() => setMenuIsOpen(!isMenuOpen)} >
          <Emoji style={{ fontSize: 20 + size, display: `${isHidden && !canRead ? 'none' : 'block'}`,opacity:`${isHidden ? 0.5 : 1}` }} symbol={getSkin(skin)} label="login" />
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
