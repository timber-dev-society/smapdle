import { createReducer } from '@reduxjs/toolkit'

import { UPDATE_MARKER, ADD_MARKER } from '../../actions'
import { renderToken, positionToLngLat } from '../../utils/mapbox'

const initialState = {
  z: {},
  player: {},
  vehicule: {},
  incident: {},
  car: {},
  boat:  {},
}

const defaultMarker = {
  hidden: true,
  skin: 1,
}


const markerReducer = createReducer(initialState, {

  [ADD_MARKER]: (state, action) => {
    const { token, uid } = action.payload
    state[token][uid] = {
      ...defaultMarker,
      ...action.payload
    }
    return state
  },

  [UPDATE_MARKER]: (state, action) => {
    const { token, uid, position } = action.payload
    state[token][uid].position = position
    return state
  },
})


export default markerReducer
