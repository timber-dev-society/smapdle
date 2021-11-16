import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaCog } from 'react-icons/fa'
import { GiAxeSword } from 'react-icons/gi'

import { Menu, VList, VItem, HList, HItem, SubMenu } from '../__style__/menu.style'
import { changeSkin, changeWeapon } from 'actions'
import { skins, weapons } from './skin'

const Component = ({ setMenuIsOpen, uid }) => {

  const dispatch = useDispatch()
  const [ isSettingOpen, setIsSettingOpen ] = useState(false)
  const [ isWeaponSelectOpen, setIsWeaponSelectOpen ] = useState(false)
  const handler = (action) => {
    if (action) {
      dispatch(action())
    }
    setMenuIsOpen(false)
  }
  const subHandler = (action) => {
    setIsSettingOpen(false)
    setIsWeaponSelectOpen(false)
    if (action) {
      handler(action)
    }
  }

  return (
    <Menu>
      <VList>
        <VItem onClick={() => setIsSettingOpen(!isSettingOpen)}>
          <FaCog />
          <SubMenu visibleIf={isSettingOpen}>
            <HList>
              { skins.map((skin, id) => (
                <HItem key={id} onClick={() => subHandler(() => changeSkin({ uid, skin: id + 1 }))}>
                  <Emoji symbol={skin} label={`z-${id}`} />
                </HItem>
              )) }
            </HList>
          </SubMenu>
        </VItem>
        <VItem onClick={() => setIsWeaponSelectOpen(!isWeaponSelectOpen)}>
          <GiAxeSword />
          <SubMenu visibleIf={isWeaponSelectOpen}>
            <HList>
              { weapons.map((Weapon, id) => (
                <HItem onClick={() => subHandler(() => changeWeapon({ uid, weapon: id + 1 }))}>
                  <Weapon />
                </HItem>
              )) }
            </HList>
          </SubMenu>
        </VItem>
      </VList>
    </Menu>
  )
}

Component.propTypes = {
  uid: PropTypes.string.isRequired,
  setMenuIsOpen: PropTypes.func.isRequired,
}

export default Component
