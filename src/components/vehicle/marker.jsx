import { useState, memo } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import isEqual from 'lodash.isequal'

import useMarker from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import useIsVisible from 'components/hooks/marker/is-visible'
import { Container } from 'components/map/markers/__style__/token.style'
import { Wrapper } from 'components/map/markers/__style__/marker.style'
import Menu from './menu'
import { getSkin } from './skin'

const defaultVisibleAfter = 17.5

const Marker = ({ uid, visibleAfter }) => {
  const { skin, position, isOver, owner, token } = useSelector(state => state.markers.vehicle[uid], isEqual)
  const { canMove, canEdit } = useAcl({ type: `${token}`, owner })

  const { el, map } = useMarker({ position, uid, canMove: canMove })
  const isVisible = useIsVisible(map, visibleAfter)
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)

  return createPortal(
    <Container className={`${isOver ? 'focus' : ''}`}>
      { isVisible &&
        <Wrapper onClick={() => setMenuIsOpen(!isMenuOpen)} style={{ fontSize:'110px' }}>
          <Emoji symbol={getSkin(skin)} label="vehicle" />
        </Wrapper>
      }

      { canEdit && isMenuOpen && <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} skin={skin} /> }
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
