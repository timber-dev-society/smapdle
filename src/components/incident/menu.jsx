import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaExpandAlt, FaCheck, FaEyeSlash, FaEye, FaCog, FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa'

import { Menu, VList, VItem, HList, HItem, SubMenu } from '../__style__/menu.style'
import { toggleVisibility, deleteToken, changeSkin, saveSize } from '../../actions'
import { skins } from './skin'

const Component = ({ setMenuIsOpen, uid, isHidden, size, setSize }) => {

  const dispatch = useDispatch()
  const [ isSettingOpen, setIsSettingOpen ] = useState(false)
  const [ isSizeOpen, setIsSizeOpen ] = useState(false)

  const handler = (action) => {
    if (action) {
      dispatch(action())
    }
    setMenuIsOpen(false)
  }
  const subHandler = (action) => {
    setIsSettingOpen(false)
    setIsSizeOpen(false)
    if (action) {
      handler(action)
    }
  }

  return (
    <Menu>
      <VList>
        <VItem onClick={() => handler(() => toggleVisibility({ uid, isHidden: !isHidden }))}>
          { isHidden ? <FaEye /> : <FaEyeSlash /> }
        </VItem >
        <VItem onClick={() => setIsSizeOpen(!isSizeOpen)}>
          <FaExpandAlt />
          <SubMenu onClick={e => e.stopPropagation()} visibleIf={isSizeOpen}>
            <HList>
              <HItem><button disabled={size > 100} onClick={() => setSize(size + 10)}><FaPlus /></button></HItem>
              <HItem><button disabled={size < 10} onClick={() => setSize(size - 10)}><FaMinus /></button></HItem>
              <HItem><button onClick={() => subHandler(() => saveSize({uid, size}))}><FaCheck /></button></HItem>
            </HList>
          </SubMenu>
        </VItem>
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
        <VItem onClick={() => handler(() => deleteToken(uid))}>
          <FaTrashAlt />
        </VItem>
      </VList>
    </Menu>
  )
}

Component.propTypes = {
  uid: PropTypes.string.isRequired,
  skin: PropTypes.number.isRequired,
  isHidden: PropTypes.bool.isRequired,
  setMenuIsOpen: PropTypes.func.isRequired,
}

export default Component
