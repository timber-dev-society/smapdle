import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from '../hooks/marker'
import useAcl from '../hooks/acl'
import { Wrapper, Icon } from '../map/markers/__style__/marker.style'
import { getSkin, getWeapon } from './skin'
import Menu from './menu'
import useMovement from 'components/hooks/marker/movement'

const Marker = ({ uid }) => {
  const { color, position, skin, weapon, owner, token, speed } = useSelector(state => state.markers.player[uid], isEqual)
  const { canRead, canMove, canEdit } = useAcl({ type: `${token}`, owner })
  const { el, token: tokenRef, map } = useMarker({ position, uid, canMove })
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)
  const Weapon = getWeapon(weapon)

  useMovement(tokenRef, map, speed)

  const weaponStyle = {
    position: 'absolute',
    top: 25,
    fontSize: 20,
    left: 15,
  }


  return createPortal(
    <Wrapper>
      { 
        canRead && 
        <Icon onClick={() => setMenuIsOpen(!isMenuOpen)} style={{ borderColor: color }} className="p-token">
          <Emoji symbol={getSkin(skin)} label="login" />
          <Weapon style={weaponStyle} />
        </Icon> 
      }
      { canEdit && isMenuOpen && <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} /> }
    </Wrapper>,
    el
  )
}

export default Marker
