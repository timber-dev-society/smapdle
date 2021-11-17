import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaCog } from 'react-icons/fa'

import { Menu, VList, VItem, HList, HItem, SubMenu } from '../__style__/menu.style'
import { changeSkin } from 'actions'
import { skins } from './skin'

const Component = ({ setMenuIsOpen, uid }) => {

  const dispatch = useDispatch()
  const [ isSettingOpen, setIsSettingOpen ] = useState(false)
  const handler = (action) => {
    if (action) {
      dispatch(action())
    }
    setMenuIsOpen(false)
  }
  const subHandler = (action) => {
    setIsSettingOpen(false)
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
      </VList>
    </Menu>
  )
}

Component.propTypes = {
  uid: PropTypes.string.isRequired,
  setMenuIsOpen: PropTypes.func.isRequired,
}

export default Component
