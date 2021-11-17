import PropTypes from 'prop-types'
import Emoji from 'a11y-react-emoji'
import { useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { createSlice } from '@reduxjs/toolkit'
import { FaCheck, FaCog, FaExpandAlt, FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'

import { Menu, VList, VItem, HList, HItem, SubMenu } from '../__style__/menu.style'
import { changeSkin, deleteToken, saveSize } from 'actions'
import { skins } from './skin'

const initialState = {
  skin: false,
  size: false,
}
const menuSlice = createSlice({
  name: 'menu',
  reducers: {
    skinMenu: (state) => ({
      skin: !state.skin,
      size: false,
    }),
    sizeMenu: (state) => ({
      size: !state.size,
      skin: false,
    }),
    close: () => ({
      skin: false,
      size: false,
    })
  },
  initialState,
})

const { skinMenu, sizeMenu, close } = menuSlice.actions

const Component = ({ setMenuIsOpen, uid, size, setSize }) => {

  const dispatch = useDispatch()
  const [ isOpen, toggle ] = useReducer(menuSlice.reducer, initialState)

  const handle = (action) => {
    toggle(close)
    if (action) {
      dispatch(action())
      setMenuIsOpen(false)
    }
  }

  return (
    <Menu>
      <VList>
        <VItem onClick={() => toggle(skinMenu)}>
          <FaCog />
          <SubMenu visibleIf={isOpen.skin}>
            <HList>
              { skins.map((skin, id) => (
                <HItem key={id} onClick={() => handle(() => changeSkin({ uid, skin: id + 1 }))}>
                  <Emoji symbol={skin} label={`z-${id}`} />
                </HItem>
              )) }
            </HList>
          </SubMenu>
        </VItem>
        <VItem onClick={() => toggle(sizeMenu)}>
          <FaExpandAlt />
          <SubMenu onClick={e => e.stopPropagation()} visibleIf={isOpen.size}>
            <HList>
              <HItem><button disabled={size > 10} onClick={() => setSize(size + 1)}><FaPlus /></button></HItem>
              <HItem><button disabled={size < 0} onClick={() => setSize(size - 1)}><FaMinus /></button></HItem>
              <HItem><button onClick={() => handle(() => saveSize({uid, size}))}><FaCheck /></button></HItem>
            </HList>
          </SubMenu>
        </VItem>
        <VItem onClick={() => handle(() => deleteToken(uid))}>
          <FaTrashAlt />
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
