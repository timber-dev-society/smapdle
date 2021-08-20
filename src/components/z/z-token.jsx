import { useState, useEffect, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, shallowEqual } from 'react-redux'
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'

import useToken from '../hooks/token'
import { Container } from '../map/markers/__style__/token.style'
import { Wrapper } from '../map/markers/__style__/marker.style'
import Menu from './menu'
import { getSkin } from './skin'

const defaultVisibleAfter = 17.5

const Token = ({ uid, visibleAfter }) => {
  const { skin, position, isHidden, isOver, isDead } = useSelector(state => state.markers.z[uid], shallowEqual)
  const { el, map } = useToken({ position, uid })
  const ref = useRef(null)
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)

  const [ isVisible, setIsVisible ] = useState(map.getZoom() > visibleAfter)

  useEffect(() => {
    if (ref.current) return;

    map.on('zoom', () => {
      if (isVisible !== (map.getZoom() > visibleAfter)) {
        setIsVisible(map.getZoom() > visibleAfter)
      }
    })

  }, [ isVisible, map, visibleAfter ])


  return createPortal(
    <Container className={`${isOver ? 'focus' : ''}`}>
      { isVisible &&
        <Wrapper onClick={() => setMenuIsOpen(!isMenuOpen)} style={{fontSize:'24px', opacity:`${isHidden ? 0.5 : 1}`}}>
          { !isDead && <Emoji symbol={getSkin(skin)} label="z" /> }
          { isDead && <Emoji symbol="💀" label="z" /> }
        </Wrapper>
      }

      { isMenuOpen && <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} skin={skin} isHidden={isHidden} isDead={isDead} /> }
    </Container>,
    el
  )
}

Token.propTypes = {
  visibleAfter: PropTypes.number,
}

Token.defaultProps = {
  visibleAfter: defaultVisibleAfter,
}

export default memo(Token)
