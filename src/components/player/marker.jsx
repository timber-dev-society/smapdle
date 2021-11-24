import { useState } from 'react'
import { createPortal } from 'react-dom'
import Emoji from 'a11y-react-emoji'
import { useSelector } from 'react-redux'
import isEqual from 'lodash.isequal'

import useMarker from 'components/hooks/marker'
import useAcl from 'components/hooks/acl'
import useMovement from 'components/hooks/marker/movement'
import { Wrapper, Icon } from 'components/map/markers/__style__/marker.style'
import { getSkin, getWeapon, skins, weapons } from './skin'
import Menu from 'components/map/markers/menu'

const Marker = ({ uid }) => {
  const { color, position, skin, weapon, owner, token, speed } = useSelector(state => state.markers.player[uid], isEqual)
  const { canRead, canMove, canEdit } = useAcl({ type: `${token}`, owner })
  const { el, token: tokenRef, map } = useMarker({ position, uid, canMove })
  const [ isMenuOpen, setMenuIsOpen ] = useState(false)
  const Weapon = getWeapon(weapon)

  useMovement(tokenRef, map, speed)

  return createPortal(
    <Wrapper>
      { 
        canRead && 
        <Icon onClick={() => setMenuIsOpen(!isMenuOpen)} style={{ borderColor: color }} className="zoom p-token">
          <Emoji symbol={getSkin(skin)} label="login" />
          <Weapon className="weapon" />
        </Icon> 
      }
      { canEdit && isMenuOpen && 
        <Menu setMenuIsOpen={setMenuIsOpen} uid={uid} 
          closeMenu={() => setMenuIsOpen(false)} 
          uid={uid} 
          skin={{ skins }}
          weapon={{ weapons }}
          canDelete={false}
        />
      }
    </Wrapper>,
    el
  )
}

export default Marker
