import { useReducer } from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

const initialState = {
  skin: false,
  size: false,
  rotation: false,
  weapon: false,
}


const menuSlice = createSlice({
  name: 'menu',
  reducers: {
    skinMenu: (state) => ({
      ...initialState,
      skin: !state.skin,
    }),
    sizeMenu: (state) => ({
      ...initialState,
      size: !state.size,
    }),
    rotationMenu: (state) => ({
      ...initialState,
      rotation: !state.rotation,
    }),
    weaponMenu: (state) => ({
      ...initialState,
      weapon: !state.weapon,
    }),
    hyperMenu: (state) => ({
      ...initialState,
      hyper: !state.hyper,
    }),
    close: () => ({
      ...initialState,
    })
  },
  initialState,
})

export const useMenuReducer = () => {
  const [ state, dispatch ] = useReducer(menuSlice.reducer, initialState)

  return [
    state,
    dispatch,
    menuSlice.actions,
  ]
}

export const useHandler = (closeMenu, closeSubmenu) => {
  const dispatch = useDispatch()

  return (action) => {
    closeSubmenu()

    if (action) {
      dispatch(action())
      closeMenu()
    }
  }
}
