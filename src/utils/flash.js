import { createStore } from 'redux'

let i = 0
const ADD_FLASH = 'ADD_FLASH'
const REMOVE_FLASH = 'REMOVE_FLASH'
const reducer = (state = [], { type, ...action}) => {
  switch (type) {
    case ADD_FLASH:
      return [
        ...state,
        {
          content: action.text,
          style: action.style,
          id: i++,
        }
      ]
    case REMOVE_FLASH:
      return state.filter((alert) => alert.id === action.id)
    default:
      return state
  }
}

const store = createStore(reducer)

export default store

export const sendFlashMessage = (text) => ({
  type: ADD_FLASH,
  text,
  style: 'info',
})

export const sendFlashError = (text) => ({
  type: ADD_FLASH,
  text,
  style: 'error',
})

export const sendFlashWarning = (text) => ({
  type: ADD_FLASH,
  text,
  style: 'warning',
})

export const removeFlahMessage = (id) => ({
  type: REMOVE_FLASH,
  id,
})
