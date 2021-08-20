import { useState, useEffect, useRef, memo } from 'react'
import { createPortal } from 'react-dom'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import { FaSkull, FaEyeSlash, FaEye, FaCog, FaTrashAlt } from 'react-icons/fa'

import { Container, Menu, Sublist, HorizontalList, HorizontalItem } from '../map/markers/__style__/token.style'
import { Wrapper } from '../map/markers/__style__/marker.style'
import { createMarker } from '../../utils/mapbox'
import { toggleVisibility, kill, deleteToken, changeSkin } from '../../actions'


export const skins = ['🧟', '🧟‍♂️', '🧟‍♀️']
const defaultVisibleAfter = 17.5

const ZMarker = ({ uid, visibleAfter }) => {
  const { skin, hidden, position, isOver, isDead } = useSelector(state => state.markers.z[uid])
  const map = useSelector(state => state.app.map)

  const dispatch = useDispatch()
  const [ el ] = useState(document.createElement('div'))
  const [ isVisible, setIsVisible ] = useState(map.getZoom() > visibleAfter)
  const [ zMenu, toggleZMenu ] = useState(false)
  const [ zMenuSetting, setZMenuSetting ] = useState(false)


  const token = useRef(null)

  const handleAction = (action, payload) => {
    dispatch(action(payload))
    toggleZMenu(false)
  }

  useEffect(() => {
    if (token.current ) return;

    token.current = createMarker({
      el,
      position,
      map: map,
    })

    token.current.addControl(uid)

    map.on('zoom', () => {
      if (isVisible !== (map.getZoom() > visibleAfter)) {
        setIsVisible(map.getZoom() > visibleAfter)
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
            <li onClick={() => handleAction(toggleVisibility, { uid, hidden: !hidden })}>
              { hidden ? <FaEye /> : <FaEyeSlash /> }
            </li>
            <li onClick={() => handleAction(kill, uid)}>
              <FaSkull />
            </li>
            <li onClick={() => setZMenuSetting(!zMenuSetting)}>
              <FaCog />
              { zMenuSetting && <Sublist>
                <HorizontalList>
                  { skins.map((skin, id) => (
                    <HorizontalItem onClick={() => {
                      setZMenuSetting(false)
                      handleAction(changeSkin, { uid, skin: id + 1 })
                    }}>
                      <Emoji symbol={skin} label={`z-${id}`} />
                    </HorizontalItem>
                  )) }
                </HorizontalList>
              </Sublist> }
            </li>
            <li onClick={() => handleAction(deleteToken, uid)}>
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
