import { useState, useEffect, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import { FaSkull, FaEyeSlash, FaEye, FaCog, FaTrashAlt } from 'react-icons/fa'

import { Container, Menu } from '../__style__/token.style'
import { Wrapper } from '../__style__/marker.style'
import { createMarker } from '../../../../utils/mapbox'
import { toggleVisibility, kill, deleteToken } from '../../../../actions'


export const skins = ['🧟', '🧟‍♂️', '🧟‍♀️']
const defaultVisibleAfter = 17.5

const ZMarker = ({ uid, map, visibleAfter }) => {
  const dispatch = useDispatch()
  const [ el ] = useState(document.createElement('div'))
  const [ isVisible, setIsVisible ] = useState(map.current.getZoom() > visibleAfter)
  const [ zMenu, toggleZMenu ] = useState(false)

  const { skin, hidden, position, isOver, isDead } = useSelector(state => state.markers.z[uid])
  console.log(hidden)

  const token = useRef(null)

  useEffect(() => {
    if (token.current) return;

    token.current = createMarker({
      el,
      position,
      map: map.current,
    })

    token.current.addControl(uid)

    map.current.on('zoom', () => {
      if (isVisible !== (map.current.getZoom() > visibleAfter)) {
        setIsVisible(map.current.getZoom() > visibleAfter)
      }
    })

  }, [ isVisible, map, visibleAfter, el, position, uid ])


  return createPortal(
    <Container className={`${isOver ? 'focus' : ''}`}>
      { isVisible &&
        <Wrapper onClick={() => toggleZMenu(!zMenu)} style={{fontSize:'24px', opacity:`${hidden ? 0.5 : 1}`}}>
          { !isDead && <Emoji symbol={skins[skin - 1]} label="z" /> }
          { isDead && <Emoji symbol="💀" label="z" /> }
        </Wrapper>
      }
      { zMenu &&
        <Menu>
          <ul style={{cursor:'pointer'}}>
            <li onClick={() => dispatch(toggleVisibility({ uid, hidden: !hidden }))}>
              { hidden ? <FaEye /> : <FaEyeSlash /> }
            </li>
            <li onClick={() => dispatch(kill(uid))}>
              <FaSkull />
            </li>
            <li><FaCog /></li>
            <li onClick={() => dispatch(deleteToken(uid))}>
              <FaTrashAlt />
            </li>
          </ul>
        </Menu>
      }
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
